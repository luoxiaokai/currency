import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI, {
  Message,
  MessageBox
} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/less/index.less';
import http from 'axios'
import './api/mock'

Vue.use(ElementUI);
Vue.config.productionTip = false

Vue.prototype.$http = http
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message


router.beforeEach((to, from, next) => {
  store.commit('getToken')
  const token = store.state.user.token
  if (!token && to.name !== 'login') {
    next({
      name: 'login'
    })
  } else if (token && to.name === 'login') {
    next({
      name: 'home'
    })
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    store.commit("addMenu", router);
  }
}).$mount('#app')