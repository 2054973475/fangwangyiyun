import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/mock/index'
import 'element-ui/lib/theme-chalk/index.css'
import { Pagination } from 'element-ui'
import 'nprogress/nprogress.css'
import VueLazyload from 'vue-lazyload'
import 'swiper/swiper-bundle.css'
import VueWechatTitle from 'vue-wechat-title'
Vue.use(VueWechatTitle)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  // error: '@/assets/error.png',
  loading: require('@/assets/loading.gif'),
  attempt: 1,
  listenEvents: ['scroll']
})
Vue.use(Pagination)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
