import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import VueRouter from 'vue-router'
import CreateUser from './components/CreateUser.vue'
 
Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
 
Vue.config.productionTip = false

 
const router = new VueRouter({
  routes: [
    { path: '/createUser', component: CreateUser },
  ]
})
 
new Vue({
  render: h => h(App),
  router
}).$mount('#app')