import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
  routes,
  mode: 'history'
})

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       next({
//         name: 'login',
//         component: LoginView,
//         query: { redirect: to.fullPath }
//       });
//     }
//     else{
      
      
       
//       next();
//     }
//   }
   
//   });
export default router
