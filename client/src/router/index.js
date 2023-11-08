import { createRouter, createWebHistory } from "vue-router";
import LoginView from '@/views/LoginView.vue';
import SignupView from '@/views/SignupView.vue';
import TasksView from '@/views/TasksView.vue';
import HomeView from '@/views/HomeView.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomeView
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginView
    },
    {
        path: '/signup',
        name: 'Signup',
        component: SignupView
    },
    {
        path: '/tasks',
        name: 'Tasks',
        component: TasksView,
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