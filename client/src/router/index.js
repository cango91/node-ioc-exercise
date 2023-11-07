import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: '/',
        name: 'Home',
    },
    {
        path: '/login',
        name: 'Login'
    },
    {
        path: '/signup',
        name: 'Signup'
    },
    {
        path: '/tasks',
        name: 'Tasks',
        meta: { requiresAuth: true}
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

router.beforeEach((to,from,next) =>{
  if(to.matched.some(record => record.meta.requiresAuth)){
    if(!localStorage.getItem('token')){
        next('/login');
    }else{
        next();
    }
  }else{
    next();
  }
});

export default router;