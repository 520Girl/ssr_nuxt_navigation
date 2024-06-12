import Vue from 'vue'
import SvgIcon from '@/components/pages/svg/svgIcon.vue'// svg component

// register globally
Vue.component('svg-icon', SvgIcon)

const req = require.context('@/assets/images/svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
