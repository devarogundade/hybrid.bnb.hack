<script setup lang="ts">
import { RouterView } from 'vue-router';
import ApproveSheet from './sheets/ApproveSheet.vue';
import ApprovalSheet from './sheets/ApprovalSheet.vue';
import SnackbarPop from './pops/SnackbarPop.vue';
import { ref } from 'vue';
import ImportTokenSheet from './sheets/ImportTokenSheet.vue';
import UnBindSheet from './sheets/UnBindSheet.vue';
import TokenSheet from './sheets/TokenSheet.vue';

const pendingImportToken = ref<Boolean>(false);
const pendingApprove = ref<Object | null>(null);
const pendingApproval = ref<Boolean>(false);
const pendingUnBindWallet = ref<Boolean>(false);
const pendingTokenInfo = ref<Object | null>(null);
</script>

<template>
  <div class="app">
    <RouterView @import_token="pendingImportToken = true" @approval_request="pendingApproval = true"
      @approve_request="pendingApprove = $event" @unbind_wallet="pendingUnBindWallet = true"
      @token_info="pendingTokenInfo = $event" />

    <ApproveSheet v-if="pendingApprove" :approval="pendingApprove.approval" :token-info="pendingApprove.tokenInfo"
      :active="pendingApprove != null" @close="pendingApprove = null" />

    <ApprovalSheet :active="pendingApproval.valueOf()" @close="pendingApproval = false" />

    <ImportTokenSheet :active="pendingImportToken.valueOf()" @close="pendingImportToken = false" />

    <UnBindSheet :active="pendingUnBindWallet.valueOf()" @close="pendingUnBindWallet = false" />

    <TokenSheet v-if="pendingTokenInfo" :token-info="pendingTokenInfo" :active="pendingTokenInfo != null"
      @close="pendingTokenInfo = null" />
    <SnackbarPop />
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
