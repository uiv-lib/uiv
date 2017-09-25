import uivLocale from './../../locale/lang/fr-FR'

const docLocale = {
  common: {
    basicExample: 'Exemple Basique',
    dynamicExample: 'Exemple Dynamique',
    sampleCode: 'Code d\'exemple',
    demoSource: 'Code Source de la démo',
    source: 'Source',
    note: 'Note',
    props: 'Props',
    slots: 'Slots',
    events: 'Events',
    name: 'Nom',
    type: 'Type',
    default: 'Défaut',
    required: 'Requis',
    description: 'Description',
    params: 'Params'
  },
  menu: {
    usage: 'Utilisation',
    install: 'Installation',
    i18n: 'I18n',
    gettingStarted: 'Pour démarrer',
    components: 'Composants',
    alert: 'Alert',
    carousel: 'Carousel',
    collapse: 'Collapse',
    datePicker: 'Date Picker',
    dropdown: 'Dropdown',
    modal: 'Modal',
    pagination: 'Pagination',
    popover: 'Popover',
    progressBar: 'Progress Bar',
    tabs: 'Tabs',
    timePicker: 'Time Picker',
    tooltip: 'Tooltip',
    typeahead: 'Typeahead'
  },
  home: {
    desc: 'Le composants <b>Bootstrap 3</b> implémentés avec <b>Vue 2</b>.',
    codeOnGithub: 'Code sur Github',
    gettingStarted: 'Pour démarrer',
    lightWeight: 'Léger',
    lightWeight1: '~ <b>14KB</b> Gziped',
    lightWeight2: 'Uniques dépendances',
    lightWeight3: '<b>Vue</b> & <b>Bootstrap CSS</b>',
    compatible: 'Compatible',
    compatible1: 'Testé avec les',
    compatible2: '<b>Navigateurs modernes</b>',
    compatible3: 'et <b>IE 9+</b>',
    openSource: 'Open Source',
    openSource1: 'Licence <b>MIT</b>',
    openSource2: 'Façile à utiliser et gratuit',
    openSource3: 'Ouvert aux collaborations!'
  },
  gettingStarted: {
    dependencies: 'Dépendances',
    supportedBrowsers: 'Navigateurs supportés',
    supportedBrowsersDesc: 'Les composants et les directives sont testés avec les navigateurs suivants:',
    usage: 'Utilisation',
    usageDesc: 'uiv utilise l\'export UMD, ce qui vous permet de l\'utiliser avec ES6 / CommonJS / AMD / Browser.',
    es6Sample: 'Exemple ES6',
    browserSample: 'Exemple de markup'
  },
  install: {
    viaCdn: 'Via CDN',
    viaNpm: 'Via NPM',
    viaNpmDesc: 'Il est recommandé d\'utiliser NPM pour gérer vos paquets et ES6 / Webpack pour développer vos projets Vue.'
  },
  i18n: {
    basic: 'Utilisation basique',
    basicDesc: 'Tous les composants uiv utilisent l\'anglais comme langue par défaut, vous pouvez utilise d\'autres langues, par exemple:',
    basicDesc2: 'Comme vous pouvez le constater, vous pouvez définir vos propres traductions, créer votre propre <code>locale</code> et remplacer les valeurs par défaut.',
    vueI18n: 'Utilisation avec Vue I18n',
    vueI18nDesc: 'uiv est aussi compatible avec <a href="https://github.com/kazupon/vue-i18n">vue-i18n</a>.',
    vueI18nDesc2: '<b>Note</b>: Vous devez fusionner les paquets langues uiv dans votre/vos application(s). Par exemple:',
    supported: 'Langues supportées',
    supportedSortBy: '(Affichées par ordre alphabétique)',
    supportedContribute: 'Nous vous invitons à contribuer à l\'ajout de langues supplémentaire !'
  },
  alert: {
    displayTime: 'Durée d\'affichage',
    addAlertTime: 'Ajouter un Alert (avec durée)',
    addAlert: 'Ajouter un Alert',
    useWithCollapse: 'Utilisation avec Collapse',
    showAlert: 'Afficher Alert'
  },
  carousel: {
    toggleIndicators: 'Afficher/Masquer les puces',
    toggleControls: 'Afficher/Masquer les contrôles',
    pushSlide: 'Ajoute un Slide',
    interval: 'Intervalle'
  }
}

const locale = Object.assign({}, docLocale, uivLocale)

export default locale
