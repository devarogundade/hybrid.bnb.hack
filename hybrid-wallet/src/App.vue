<script setup lang="ts">
import { RouterView } from 'vue-router';
import ApproveSheet from './sheets/ApproveSheet.vue';
import { ref } from 'vue';
import PinCodeSheet from './sheets/PinCodeSheet.vue';

const pendingApproval = ref<Boolean>(false);
const pendingPinCode = ref<Boolean>(false);
</script>

<template>
  <div class="app">
    <RouterView @approve_request="pendingApproval = true" @pin_request="pendingPinCode = true" />
    <ApproveSheet :active="pendingApproval.valueOf()" @close="pendingApproval = !pendingApproval" />
    <PinCodeSheet :active="pendingPinCode.valueOf()" @close="pendingPinCode = !pendingPinCode" />
  </div>
</template>

<style scoped>
.app {
  min-width: 350px;
  max-width: 95%;
  height: 600px;
  max-width: 350px;
  background: var(--bg-color);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 30px 90px;
  position: relative;
}
</style>
