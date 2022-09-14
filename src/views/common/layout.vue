<template>
  <div >
    <t-layout class="div">
      <sidebar></sidebar>
      <t-layout>
        <GolbalHeader></GolbalHeader>
        <t-content>
          <router-view></router-view>
        </t-content>
        <t-footer>Footer</t-footer>
      </t-layout>
    </t-layout>
  </div>
</template>

<script lang="ts" setup>
import GolbalHeader from "./header.vue"
import Sidebar from "@/views/common/sidebar.vue";
</script>

<style lang="less" scoped>
.div{
  height: 100vh;
}
</style>