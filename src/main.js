import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from 'components/common/toast'
import fastClick from 'fastclick'
import vuelazyload from 'vue-lazyload'

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()

Vue.use(toast)
Vue.use(vuelazyload)
fastClick.attach()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
