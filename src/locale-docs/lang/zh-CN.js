import uivLocale from './../../locale/lang/zh-CN'

const docLocale = {
  common: {
    basicExample: '基础示例',
    dynamicExample: '动态示例',
    sampleCode: '代码',
    demoSource: '示例源码',
    source: '源码',
    note: '注意',
    props: '参数',
    slots: '槽位',
    events: '事件',
    name: '名字',
    type: '类型',
    default: '默认',
    required: '必须',
    description: '描述',
    params: '参数'
  },
  menu: {
    usage: '使用',
    install: '安装',
    i18n: '国际化',
    gettingStarted: '上手指南',
    components: '组件',
    alert: '警告框',
    carousel: '轮播',
    collapse: '折叠',
    datePicker: '日期选择器',
    dropdown: '下拉框',
    modal: '模态框',
    pagination: '分页',
    popover: '弹出框',
    progressBar: '进度条',
    tabs: '标签页',
    timePicker: '时间选择器',
    tooltip: '提示',
    typeahead: '自动补全'
  },
  home: {
    desc: '使用 <b>Vue 2</b> 实现的 <b>Bootstrap 3</b> 组件。',
    codeOnGithub: 'Github 代码',
    gettingStarted: '使用说明',
    lightWeight: '轻量',
    lightWeight1: 'Gzip 后 ~ <b>14KB</b>',
    lightWeight2: '仅依赖于',
    lightWeight3: '<b>Vue</b> & <b>Bootstrap CSS</b>',
    compatible: '兼容',
    compatible1: '测试通过',
    compatible2: '<b>现代浏览器</b>',
    compatible3: '与 <b>IE 9+</b>',
    openSource: '开源',
    openSource1: '<b>MIT</b> 许可',
    openSource2: '简单、免费',
    openSource3: '欢迎贡献 Issue 或代码！'
  },
  gettingStarted: {
    dependencies: '依赖',
    supportedBrowsers: '支持的浏览器',
    supportedBrowsersDesc: '组件与指令经过了以下浏览器的测试：',
    usage: '使用',
    usageDesc: 'uiv 使用 UMD 导出方式, 因此你可以在 ES6 / CommonJS / AMD / 浏览器等环境下使用它。',
    es6Sample: 'ES6 使用样例',
    browserSample: '浏览器使用样例'
  },
  install: {
    viaCdn: '通过 CDN',
    viaCdnDesc: '你可以在 <a href="https://unpkg.com/uiv/dist/">https://unpkg.com/uiv/dist/</a> 获取到最新的项目代码, 通过在 uiv 后面追加 <code>@version</code> 来指定版本。举个例子，<a href="https://unpkg.com/uiv@0.11.3/dist/">https://unpkg.com/uiv@0.11.3/dist/</a>',
    viaNpm: '通过 NPM',
    viaNpmDesc: '推荐使用 NPM 进行包管理以及 ES6 / Webpack 来进行 Vue 项目的开发。'
  },
  i18n: {
    basic: '基本用法',
    basicDesc: 'uiv 组件库使用英语作为默认语言, 你可以通过配置改变, 比如：',
    basicDesc2: '显然, 如果对预设的措辞不满意，我们还可以自定义, 只需要创造一个 <code>locale</code> 对象并替换之即可。',
    vueI18n: '配合 Vue I18n 使用',
    vueI18nDesc: 'uiv 兼容 <a href="https://github.com/kazupon/vue-i18n">vue-i18n</a>，可以搭配使用以进行语言切换。',
    vueI18nDesc2: '<b>注意</b>: 你需要将 uiv 的语言包合并到 app 语言包中去。比如：',
    supported: '支持的语言',
    supported1: 'English (en-US)',
    supported2: '简体中文 (zh-CN)',
    supportedContribute: '欢迎贡献代码以支持更多语言！'
  },
  alert: {
    displayTime: '显示时长',
    addAlertTime: '增加警告框 (自动关闭的)',
    addAlert: '增加警告框',
    useWithCollapse: '结合折叠使用',
    showAlert: '显示警告框'
  },
  carousel: {
    toggleIndicators: '切换指示器',
    toggleControls: '切换左右控制',
    pushSlide: '增加一页',
    interval: '循环时间'
  }
}

const locale = Object.assign({}, docLocale, uivLocale)

export default locale
