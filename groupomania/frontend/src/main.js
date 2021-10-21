import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import store from './store'


Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.prototype.$http=axios

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
