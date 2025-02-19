import type { Router } from "vue-router";
export function setupRouterGuard(router: Router) {

    router.beforeEach(async (to, form, next) => {
        // console.log(router.getRoutes());
        next()
    })

    router.beforeResolve((to) => {
    })

    router.onError((error) => {
        // console.warn("路由错误", error.message);
    });

    router.afterEach(() => {
    })
}

// 加载动态路由
export async function addDynamicRoutes() { }
