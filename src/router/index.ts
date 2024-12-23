// import routes from './routes';
import { createRouter, createWebHashHistory } from 'vue-router';


import Index from '../views/Home/index.vue'; // 确保路径正确

const routes = [
    {
        path: '/', // 默认路径
        name: 'Index',
        component: Index, // 指向 index.vue
    },
];


export const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
});

// // 全局前置守卫
// router.beforeEach((to, from, next) => {
//     next();
// });
//
// // 全局后置守卫
// router.afterEach((to, from) => {});

export default router;