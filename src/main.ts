import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router";

// TDesign-ui引入
import TDesign from 'tdesign-vue-next';
// 引入组件库全局样式资源
import 'tdesign-vue-next/dist/reset.css';
import 'tdesign-vue-next/es/style/index.css';

// 引入Pinia
import { createPinia } from "pinia";
// 引入Pinia的相关插件
import piniapluginpersistedstate from "pinia-plugin-persistedstate"

// 自定义指令
import { permissionDirective } from "@/directives/permission";





const pinia = createPinia()
pinia.use(piniapluginpersistedstate)


createApp(App)
  .use(router)
  .use(TDesign)
  .use(pinia)
  .directive("permission", permissionDirective)
  .mount('#app')
