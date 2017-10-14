import uivLocale from '../../../src/locale/lang/zh-CN'

const docLocale = {
  common: {
    basicExample: '基础示例',
    dynamicExample: '动态示例',
    sampleCode: '代码',
    demoSource: '示例源码',
    source: '源码',
    note: '注意',
    props: 'Props',
    slots: 'Slots',
    events: 'Events',
    name: '名字',
    type: '类型',
    default: '默认',
    required: '必填',
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
    dropdown: '下拉菜单',
    modal: '模态框',
    pagination: '分页',
    popover: '弹出框',
    progressBar: '进度条',
    tabs: '标签页',
    timePicker: '时间选择器',
    tooltip: '工具提示',
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
    supportedSortBy: '（根据字母表排序）',
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
  },
  collapse: {
    accordion: '手风琴示例',
    navbar: '导航条',
    navbarNote: '注意:',
    navbarNote1: '使用移动设备分辨率来观察可折叠部分。',
    navbarNote2: '记得给折叠组件加上 <code>class="navbar-collapse"</code>， 详细请看示例代码。'
  },
  datePicker: {
    inlineExample: '行内示例',
    withDropdown: '下拉示例',
    showTodayBtn: '显示“今天”按钮',
    showClearBtn: '显示“清空”按钮',
    closeOnSelected: '选中后关闭',
    limitFrom: '限制起始日期',
    limitTo: '限制结束日期',
    weekStartsWith: '一周始于',
    format: '格式化（示例）',
    formatNote: '一些浏览器（比如 IE）可能无法支持以上的所有格式'
  },
  dropdown: {
    dropdown1: '下拉 1',
    dropdown2: '下拉 2',
    splitButton: '分裂式按钮',
    dropdownAppendToBody: '追加到 Body 的下拉',
    dropup: '上拉',
    menuOnRight: '菜单右对齐'
  },
  modal: {
    simple: '简单的模态框与回调',
    sizes: '不同的尺寸',
    customize: '自定义模态框头与脚',
    others: '其它'
  },
  pagination: {
    currentPage: '当前页',
    size: '尺寸',
    totalPage: '总页数',
    maxSize: '最大显示页数',
    boundaryLinks: '边界按钮',
    directionLinks: '方向按钮'
  },
  popover: {
    dynamicPopover: '动态弹出框',
    functionalPopover: '功能性的弹出框',
    enableOrDisable: '启用或禁用弹出框',
    autoAdjust: '自动调整位置',
    title: '标题',
    placement: '位置',
    trigger: '触发方式'
  },
  progressBar: {
    label: '提示标签',
    customLabel: '自定义提示标签',
    minimumWidth: '最小宽度',
    differentStyles: '情景样式',
    striped: '条纹效果',
    activeStriped: '动画效果',
    stacked: '堆叠效果'
  },
  tabs: {
    activeTab: '激活标签页',
    enableOrDisable: '启用或禁用标签页',
    justifiedStyle: '两端对齐',
    withSlot: '带有右侧插槽'
  },
  timePicker: {
    setTo: '设为',
    toggleReadonly: '切换只读',
    hourStep: '时阶',
    minuteStep: '分阶',
    minTime: '最小时间',
    maxTime: '最大时间'
  },
  tooltip: {
    enableOrDisable: '启用或禁用提示',
    autoAdjust: '自动调整位置',
    text: '提示文字（支持 HTML）',
    placement: '位置',
    trigger: '触发方式'
  },
  typeahead: {
    staticQueryExample: '静态查询示例',
    ignoreCase: '忽略大小写',
    matchStart: '从头匹配',
    forceSelect: '强制选择',
    reset: '重置',
    setTo: '设为',
    customExample: '异步以及自定义模板示例'
  }
}

const locale = Object.assign({}, docLocale, uivLocale)

export default locale
