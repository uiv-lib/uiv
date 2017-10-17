const path = require('path')
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

exports.assetsPath = function (_path) {
  let assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  let cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV === 'production',
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    let loaders = [cssLoader]
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // http://vuejs.github.io/vue-loader/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', {indentedSyntax: true}),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  let output = []
  let loaders = exports.cssLoaders(options)
  for (let extension in loaders) {
    let loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
}

// Assemble markdown demo page
exports.assembleMarkdownDemo = (source) => {
  const NEW_LINE = '\r\n'
  const DEMO_CODE_REGEX = /<!-- Live demo -->/
  const DEMO_SCRIPT_REGEX = /<!-- Live demo script([\S\s]+?)-->/
  const DEMO_CSS_REGEX = /<style>([\S\s]+?)<\/style>/
  const PRE_REGEX = /```([\S\s]+?)```/igm
  const TEMPLATE_REGEX = /<template>([\s\S]*)<\/template>/
  let matches = []
  let match = null
  let stylesheets = []
  let result = source
  // Find demo code blocks
  do {
    match = PRE_REGEX.exec(source)
    if (match && DEMO_CODE_REGEX.exec(match[0])) {
      matches.push(match)
    }
  } while (match)
  // Loop code blocks for operations
  matches.forEach(match => {
    // Fetch template string in code block
    let template = TEMPLATE_REGEX.exec(match[0])
    if (template) {
      template = template[0]
    } else {
      template = match[0]
        .replace(/```([\S\s]+?)[\n\r]/, '')
        .replace(/```/, '')
    }
    // Fetch stylesheets in code block
    let style = DEMO_CSS_REGEX.exec(match[0])
    if (style) {
      stylesheets.push(style[1])
    }
    // Insert real template before it's <pre> tag
    // IMPORTANT: This assumes that every code block is unique in a single markdown file
    result = result.replace(match[0], '<div class="markdown-live-example">' + template + '</div>' + NEW_LINE + NEW_LINE + match[0])
  })
  // Uncomment live demo script
  let demoScript = DEMO_SCRIPT_REGEX.exec(result)
  if (demoScript) {
    result = result.replace(demoScript[0], demoScript[1])
  }
  // Assemble stylesheet
  if (stylesheets.length) {
    result += NEW_LINE + NEW_LINE + '<style>'
    stylesheets.forEach(style => {
      result += NEW_LINE + NEW_LINE + style + NEW_LINE + NEW_LINE
    })
    result += '</style>' + NEW_LINE + NEW_LINE
  }
  // console.log('-------------\n', result)
  return result
}
