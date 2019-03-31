import Vue from 'vue'
import App from './App'
import PortalVue from 'portal-vue'
import router from './router'
import store from './store'
import './filters'
import './icon-setup'
import '@/assets/global.css'

Vue.config.productionTip = false
Vue.use(PortalVue)

/* eslint-disable no-new */
new Vue({
  el: `#app`,
  router,
  store,
  components: { App },
  template: `<App/>`,
})
