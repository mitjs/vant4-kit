import type { App } from "vue";
import { createRouter, createWebHistory } from 'vue-router'
import { setupRouterGuard } from './guard'
// 利用 Vite 的 import.meta.glob 自动加载 views 目录下的所有 .vue 文件  
const modules = import.meta.glob('../../../docs/examples/*.vue');
// console.log(modules);

const routes = Object.keys(modules).map(path => {

    const name = path.split('/').pop().replace('.vue', '');

    return {
        path: `/${name.toLowerCase()}`, // 将文件名转换为小写路径  
        name, // 设置路由名称  
        component: modules[path], // 直接使用 glob 导入的组件  
    };
});
export const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior: () => ({ left: 0, top: 0 }),
});

// setup Router
export async function setupRouter(app: App) {
    setupRouterGuard(router)
    app.use(router)
    await router.isReady()
}