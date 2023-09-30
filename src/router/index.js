import { createRouter, createWebHistory } from "vue-router";
import HomeView from '@/views/HomeView.vue';
import AuthView from '@/views/AuthView.vue';

const routes = [
    {
        path: "/",
        component: HomeView,
    },
    {
        path: "/auth",
        component: AuthView,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;