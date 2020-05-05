import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import VueRouter from 'vue-router'
import VueSession from 'vue-session'

import CreateUser from './components/CreateUser.vue'
import UserList from './components/UserList.vue'
import EditUser from './components/EditUser.vue'
import Login from './components/Login.vue'
import AddBook from './components/AddBook.vue'
 
Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.use(VueSession)
Vue.config.productionTip = false

const router = new VueRouter({
  routes: [
    {path: '/', redirect: '/userList'},
    { path: '/createUser', component: CreateUser, meta: {title: "Lectio - Create new user"} },
    { path: '/user/edit/:id', component: EditUser, meta: {title: "Lectio - Edit user"} },
    { path: '/login', component: Login, name : "login", meta: {title: "Lectio - Login"} },
    { path: '/addNewBook', component: AddBook, name : "addBook", meta: {title: "Lectio - Add new book"} },
    { path: '/userList', component: UserList, name : "userList", meta: {title: "Lectio - Home"} },
  ]
})

router.beforeEach((to, from, next) => {
  // This goes through the matched routes from last to first, finding the closest route with a title.
  // eg. if we have /some/deep/nested/route and /some, /deep, and /nested have titles, nested's will be chosen.
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);

  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

  // If a route with a title was found, set the document (page) title to that value.
  if(nearestWithTitle) document.title = nearestWithTitle.meta.title;

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));

  // Skip rendering meta tags if there are none.
  if(!nearestWithMeta) return next();

  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta.meta.metaTags.map(tagDef => {
    const tag = document.createElement('meta');

    Object.keys(tagDef).forEach(key => {
      tag.setAttribute(key, tagDef[key]);
    });

    // We use this to track which meta tags we create, so we don't interfere with other ones.
    tag.setAttribute('data-vue-router-controlled', '');

    return tag;
  })
  // Add the meta tags to the document head.
  .forEach(tag => document.head.appendChild(tag));

  next();
});

 
new Vue({
  render: h => h(App),
    options : {
      persist: true
  },
  router,
}).$mount('#app')