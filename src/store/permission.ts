import { defineStore } from "pinia";
import type { RouteRecordRaw } from "vue-router";
import { MENU_ROUTE_NAME, routes } from "@/router";


type PermissionStore = {
  routes: Array<RouteRecordRaw>
}


const filterRoutes = (
  routes:Array<RouteRecordRaw>,
  permissions:Array<string>
)=>{
  return routes.filter((route)=>{
    if(route.children){
      route.children = filterRoutes(route.children,permissions);
    }
    return(
      !route.meta || (route.meta && (!route.meta.permission || (route.meta.permission && permissions.includes(route.meta.permission))))
    )
  })
}

export const usePermissionStore = defineStore("permission", {
  state: ():PermissionStore => {
      return{
        routes:[],
      }
  },
  persist:true,
  actions:{
    generateRoutes(permissions:Array<string>,admin=false){
      this.routes = admin ? routes:filterRoutes(routes, permissions);
    }
  },
  getters:{
    menuRoutes():Array<RouteRecordRaw> | undefined{
      return this.routes.find(
        (route:RouteRecordRaw)=>route.name === MENU_ROUTE_NAME
      )?.children;
    }
  }
});