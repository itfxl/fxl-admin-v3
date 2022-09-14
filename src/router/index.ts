import type { RouteRecordRaw } from "vue-router";
import LoginView from "@/views/login/index.vue";
import LayoutView from "@/views/common/layout.vue";
import PageLayoutView from "@/views/common/page-layout.vue"
import { createRouter, createWebHashHistory } from "vue-router";
import { useAppStore } from "@/store";
import { PermissionEnum } from "@/config/permission.config";


declare module "vue-router" {
  interface RouteMeta extends Record<string | number | symbol, undefined> {
    permission?: string;
    icon?: string;
    title?: string;
  }
}

export const MENU_ROUTE_NAME = "root"


export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: MENU_ROUTE_NAME,
    component: LayoutView,
    redirect: "dashboard",
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: () => import("@/views/dashboard/index.vue"),
        meta:{
          permission:PermissionEnum.DASHBOARD,
          title:"控制台",
          icon:"dashboard",
        }
      },
      {
        path: "user",
        name: "user",
        component: PageLayoutView,
        meta:{
          permission:PermissionEnum.USER,
          title:"用户",
          icon:"usergroup",
        },
        redirect:{name:"user-list"},
        children:[
          {
            path: "list",
            name: "user-list",
            component: () => import("@/views/user/index.vue"),
            meta:{
              permission:PermissionEnum.USER_LIST,
              title:"用户管理",
              icon:"user",
            }
          }
        ]

      }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: LoginView
  }
];


const router = createRouter({
  history: createWebHashHistory(),
  strict: true,
  routes,
  scrollBehavior: () => ({
    left: 0,
    top: 0
  })
});

const whiteList = ["/login"];

router.beforeEach((to, from, next) => {
  const appStore = useAppStore();
  if (!appStore.token) {
    whiteList.indexOf(to.path) !== -1 ? next() : next(`/login?redirect=${to.path}`);
  }
  if (appStore.token && to.path === "/login") {
    next({ name: "dashboard" });
  }
  next();
});


export default router;


