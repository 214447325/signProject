import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [

        {
            path: '/',
            name:'list',
            component:()=>import('@/views/AboutView.vue')
        },
        {
            path: '/model',
            name:'model',
            component:()=>import('@/views/ModelView.vue')
        },

        {
            path: '/home',
            name: 'home',
            component: HomeView,
        },
        // {
        //     path: '/about',
        //     name: 'about',
        //     component: () => import('../views/AboutView.vue'),
        // },
    ],
})

export default router
