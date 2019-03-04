const path = require('path')
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const babel = require('babel-core')
const PrerenderSpaPlugin = require('prerender-spa-plugin')
const SitemapPlugin = require('sitemap-webpack-plugin').default
const _ = require('lodash')

exports.assetsPath = function (_path) {
  let assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
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

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
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
  const output = []
  const loaders = exports.cssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}

// Get routes array from /docs/router/routes.js
getDocumentRoutes = () => {
  let routesCode = babel.transformFileSync(path.join(__dirname, '../docs/router/routes.js')).code
  routesCode = routesCode
    .replace(/import\('[\S\s].*?'\)/ig, 'null')
    .replace(/export default[\S\s].*?;/, '')
  var routes = []
  eval(routesCode)
  return routes.map(v => v.path)
}

exports.generateRenderPlugins = () => {
  let paths = getDocumentRoutes()
  let total = paths.length
  let chunks = _.chunk(paths, 5)
  let plugins = []
  let progress = 0
  let distPath = path.join(__dirname, './../dist-docs')
  chunks.forEach(chunk => {
    // console.log('static', chunk)
    plugins.push(new PrerenderSpaPlugin(
      distPath,
      chunk,
      {
        maxAttempts: 5,
        navigationLocked: true,
        postProcessHtml (context) {
          console.log(`[PRE-RENDER] (${++progress} / ${total}) ${context.route}`)
          return context.html
        }
      }
    ))
  })
  // site map plugin
  plugins.push(new SitemapPlugin(
    'https://uiv.wxsm.space',
    paths.map(path => path === '/' ? path : path + '/'),
    {
      changeFreq: 'weekly'
    }
  ))
  return plugins
}
