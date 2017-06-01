import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {path: '/', component: require('./../docs/pages/Home.vue')},
  {path: '/install', component: require('./../docs/pages/Install.vue')},
  {path: '/i18n', component: require('./../docs/pages/I18n.vue')},
  {path: '/getting-started', component: require('./../docs/pages/GettingStarted.vue')},
  {path: '/alert', component: require('./../docs/pages/AlertDoc.vue')},
  {path: '/carousel', component: require('./../docs/pages/CarouselDoc.vue')},
  {path: '/collapse', component: require('./../docs/pages/CollapseDoc.vue')},
  {path: '/date-picker', component: require('./../docs/pages/DatePickerDoc.vue')},
  {path: '/dropdown', component: require('./../docs/pages/DropdownDoc.vue')},
  {path: '/modal', component: require('./../docs/pages/ModalDoc.vue')},
  {path: '/pagination', component: require('./../docs/pages/PaginationDoc.vue')},
  {path: '/popover', component: require('./../docs/pages/PopoverDoc.vue')},
  {path: '/progress-bar', component: require('./../docs/pages/ProgressBarDoc.vue')},
  {path: '/tabs', component: require('./../docs/pages/TabsDoc.vue')},
  {path: '/time-picker', component: require('./../docs/pages/TimePickerDoc.vue')},
  {path: '/tooltip', component: require('./../docs/pages/TooltipDoc.vue')},
  {path: '/typeahead', component: require('./../docs/pages/TypeaheadDoc.vue')}
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.afterEach(route => {
  window.scrollTo(0, 0)
})

export default router
