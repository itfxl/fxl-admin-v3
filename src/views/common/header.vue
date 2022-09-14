<template>
  <t-header class="header">
    <CollapseButton v-model:collapse="appStore.menuCollapse"></CollapseButton>
    <div>
      <t-dropdown :options="[{ content: '退出登录', value: 'logout' }]"
                  :min-column-width="112"
                  @click="clickHandler">
        <t-button variant="text">
          <template #icon>
            <icon name="user"></icon>
          </template>
          {{ userState.currentUser && userState.currentUser.nickname }}
        </t-button>
      </t-dropdown>
    </div>
  </t-header>
</template>

<script lang="ts" setup>
import { Icon } from "tdesign-icons-vue-next";
import { userUserState } from "@/store/user";
import type { DropdownOption } from "tdesign-vue-next";
import { useAppStore } from "@/store";
import { useRoute, useRouter } from "vue-router";
import { MessagePlugin } from "tdesign-vue-next";

import CollapseButton from "@/components/CollapseButton.vue"

const userState = userUserState();
const appStore = useAppStore();


const router = useRouter()
const route = useRoute()


const clickHandler = async ({value}: DropdownOption)=>{
  switch (value){
    case "logout":
      await appStore.logout();
      await router.push(`logout?redirect=${route.fullPath}`)
      break;
    default:
      await MessagePlugin.error("该指令无设置任何操作")
      throw new Error("该指令无设置任何操作")
  }
}

</script>

<style lang="less" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
}
</style>