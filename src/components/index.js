/**
 *                      ::
 *                     :;J7, :,                        ::;7:
 *                     ,ivYi, ,                       ;LLLFS:
 *                     :iv7Yi                       :7ri;j5PL
 *                    ,:ivYLvr                    ,ivrrirrY2X,
 *                    :;r@Wwz.7r:                :ivu@kexianli.
 *                   :iL7::,:::iiirii:ii;::::,,irvF7rvvLujL7ur
 *                  ri::,:,::i:iiiiiii:i:irrv177JX7rYXqZEkvv17
 *               ;i:, , ::::iirrririi:i:::iiir2XXvii;L8OGJr71i
 *             :,, ,,:   ,::ir@mingyi.irii:i:::j1jri7ZBOS7ivv,
 *                ,::,    ::rv77iiiriii:iii:i::,rvLq@huhao.Li
 *            ,,      ,, ,:ir7ir::,:::i;ir:::i:i::rSGGYri712:
 *          :::  ,v7r:: ::rrv77:, ,, ,:i7rrii:::::, ir7ri7Lri
 *         ,     2OBBOi,iiir;r::        ,irriiii::,, ,iv7Luur:
 *       ,,     i78MBBi,:,:::,:,  :7FSL: ,iriii:::i::,,:rLqXv::
 *       :      iuMMP: :,:::,:ii;2GY7OBB0viiii:i:iii:i:::iJqL;::
 *      ,     ::::i   ,,,,, ::LuBBu BBBBBErii:i:i:i:i:i:i:r77ii
 *     ,       :       , ,,:::rruBZ1MBBqi, :,,,:::,::::::iiriri:
 *    ,               ,,,,::::i:  @arqiao.       ,:,, ,:::ii;i7:
 *   :,       rjujLYLi   ,,:::::,:::::::::,,   ,:i,:,,,,,::i:iii
 *   ::      BBBBBBBBB0,    ,,::: , ,:::::: ,      ,,,, ,,:::::::
 *   i,  ,  ,8BMMBBBBBBi     ,,:,,     ,,, , ,   , , , :,::ii::i::
 *   :      iZMOMOMBBM2::::::::::,,,,     ,,,,,,:,,,::::i:irr:i:::,
 *   i   ,,:;u0MBMOG1L:::i::::::  ,,,::,   ,,, ::::::i:i:iirii:i:i:
 *   :    ,iuUuuXUkFu7i:iii:i:::, :,:,: ::::::::i:i:::::iirr7iiri::
 *   :     :rk@Yizero.i:::::, ,:ii:::::::i:::::i::,::::iirrriiiri::,
 *    :      5BMBBBBBBSr:,::rv2kuii:::iii::,:i:,, , ,,:,:i@petermu.,
 *         , :r50EZ8MBBBBGOBBBZP7::::i::,:::::,: :,:,::i;rrririiii::
 *             :jujYY7LS0ujJL7r::,::i::,::::::::::::::iirirrrrrrr:ii:
 *          ,:  :@kevensun.:,:,,,::::i:i:::::,,::::::iir;ii;7v77;ii;i,
 *          ,,,     ,,:,::::::i:iiiii:i::::,, ::::iiiir@xingjief.r;7:i,
 *       , , ,,,:,,::::::::iiiiiiiiii:,:,:::::::::iiir;ri7vL77rrirri::
 *        :,, , ::::::::i:::i:::i:i::,,,,,:,::i:i:::iir;@Secbone.ii:::
 *
 */

import Carousel from './carousel/Carousel.vue'
import Slide from './carousel/Slide.vue'
import Collapse from './collapse/Collapse.vue'
import Dropdown from './dropdown/Dropdown.vue'
import Modal from './modal/Modal.vue'
import Tab from './tabs/Tab.vue'
import Tabs from './tabs/Tabs.vue'
import DatePicker from './datepicker/DatePicker.vue'
import Alert from './alert/Alert.vue'
import Pagination from './pagination/Pagination.vue'
import Tooltip from './tooltip/Tooltip.vue'
import Popover from './popover/Popover.vue'
import TimePicker from './timepicker/TimePicker.vue'
import Typeahead from './typeahead/Typeahead.vue'
import ProgressBar from './progressbar/ProgressBar.vue'
import ProgressBarStack from './progressbar/ProgressBarStack.vue'
import locale from './../locale'

const components = {
  Tooltip,
  Carousel,
  Slide,
  Collapse,
  Dropdown,
  Modal,
  Tab,
  Tabs,
  DatePicker,
  Alert,
  Pagination,
  Popover,
  TimePicker,
  Typeahead,
  ProgressBar,
  ProgressBarStack
}

const install = (Vue, options = {}) => {
  locale.use(options.locale)
  locale.i18n(options.i18n)
  for (let key in components) {
    Vue.component(key, components[key])
  }
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export {
  install,
  Tooltip,
  Carousel,
  Slide,
  Collapse,
  Dropdown,
  Modal,
  Tab,
  Tabs,
  DatePicker,
  Alert,
  Pagination,
  Popover,
  TimePicker,
  Typeahead,
  ProgressBar,
  ProgressBarStack
}
