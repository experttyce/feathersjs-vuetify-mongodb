import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  store.dispatch('auth/authenticate').then(() => {
    if ((to.path === '/login' || to.path === '/signup')) {
      next('/')
    } else {
      next()
    }
  }).catch(() => {
    if (requiresAuth) {
      next('/login')
    } else {
      next()
    }
  })
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
