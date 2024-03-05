<script setup lang="ts">
import HybridIcon from '@/components/icons/HybridIcon.vue';
import ProfileIcon from '@/components/icons/ProfileIcon.vue';
import ReceiveIcon from '@/components/icons/ReceiveIcon.vue';
import SendIcon from '@/components/icons/SendIcon.vue';
import LogoutIcon from '@/components/icons/LogoutIcon.vue';
import ArrowDownIcon from '@/components/icons/ArrowDownIcon.vue';

// @ts-ignore
import { useStore } from 'vuex';
import { key } from '../../store';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { allApprovalsOf } from '../scripts/graph';
import { getTokens, getToken, rejectAprroval } from '../scripts/bind';
import { notify } from '@/reactives/notify';
import Converter from '@/scripts/converter';

const store = useStore(key);

const router = useRouter();

const tab = ref('tokens');

const tryGetApprovals = async () => {
  store.commit('setApprovals', await allApprovalsOf(store.state.address, 2));
};

const tryGetTokens = () => {
  store.commit('setAssets', (getTokens()));
};

const tryRejectApproval = async (token: any, approvalId: any) => {
  const txId = await rejectAprroval(token, approvalId);

  if (txId) {
    notify.push({
      title: 'Reject successful.',
      description: 'Transaction was sent.',
      category: 'success',
      linkTitle: 'View Trx',
      linkUrl: ''
    });

    store.commit('setApprovals', await allApprovalsOf(store.state.address, 2));
  } else {
    notify.push({
      title: 'Failed to send transaction.',
      description: 'Try again.',
      category: 'error'
    });
  }
};

onMounted(() => {
  if (!store.state.address || !store.state.signer) {
    router.push('/import');
  } else {
    tryGetTokens();
    tryGetApprovals();
  }
});
</script>

<template>
  <div class="home_container">
    <section>
      <div class="app_width">
        <div class="home_header">
          <div class="home_header_name">
            <HybridIcon />
            <p>App</p>
          </div>

          <div class="home_header_account">
            <p>{{ Converter.fineHash(store.state.address, 3) }} + {{ Converter.fineHash(store.state.email, 5) }}</p>
            <ProfileIcon />
          </div>
        </div>

        <div class="home_worth">
          <h3>$0.00</h3>
        </div>

        <div class="home_actions">
          <div class="home_action" @click="$emit('import_token')">
            <ReceiveIcon />
            <p>Add Token</p>
          </div>

          <div class="home_action" @click="$emit('approval_request')">
            <SendIcon />
            <p>Approve</p>
          </div>

          <div class="home_action" @click="$emit('unbind_wallet')">
            <LogoutIcon />
            <p>Unbind</p>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="home_tabs">
        <div @click="tab = 'tokens'; tryGetTokens()"
          :class="tab.valueOf() == 'tokens' ? `home_tab home_tab_active` : `home_tab`">
          <p>Tokens</p>
          <div class="indicator"></div>
        </div>

        <div @click="tab = 'approvals'; tryGetApprovals()"
          :class="tab.valueOf() == 'approvals' ? `home_tab home_tab_active` : `home_tab`">
          <p>Requests <span>{{ store.state.approvals.length }}</span></p>
          <div class="indicator"></div>
        </div>
      </div>
    </section>
    <section>
      <div class="app_width">
        <div class="requests">
          <div class="request" v-show="tab.valueOf() == 'tokens'" v-for="token, index in store.state.assets"
            :key="index" @click="$emit('token_info', token)">
            <div class="request_head">
              <div class="request_head_token">
                <img src="/images/coin.png" alt="">
                <p>{{ token.name }}</p>
              </div>

              <div class="request_head_amount">
                <p> {{ token.symbol }}</p>
                <ArrowDownIcon :style="'rotate: 90deg;'" />
              </div>
            </div>
          </div>

          <div class="request" v-show="tab.valueOf() == 'approvals'" v-for="approval, index in store.state.approvals"
            :key="index">
            <div class="request_head">
              <div class="request_head_token">
                <img src="/images/coin.png" alt="">
                <p>{{ getToken(approval.assetId).name }}</p>
              </div>

              <div class="request_head_amount">
                <p>{{ Converter.fromWei(approval.value) }} {{ getToken(approval.assetId).symbol }}</p>
                <ArrowDownIcon />
              </div>
            </div>

            <div class="request_sender">
              <p>Spender: {{ Converter.fineHash(approval.spender, 10) }}</p>
            </div>

            <div class="request_actions">
              <button class="request_action"
                @click="tryRejectApproval(getToken(approval.assetId).address, approval.approvalId)">Reject</button>
              <button class="request_action" @click="$emit('approve_request', {
              tokenInfo: getToken(approval.assetId),
              approval: approval
            })">Approve</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
section:first-child {
  border-bottom: 1px solid #252728;
  padding-bottom: 16px;
}

section:last-child {
  overflow-y: auto;
  height: 330px;
}

section:last-child::-webkit-scrollbar {
  display: none;
}

.home_header {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.home_header_name svg {
  width: 30px;
}

.home_header_name {
  display: flex;
  align-items: center;
  gap: 10px;
}


.home_header_name p {
  color: #FFF;
  font-size: 24px;
  font-weight: 500;
}

.home_header_account {
  display: flex;
  align-items: center;
  gap: 10px;
  user-select: none;
  cursor: pointer;
}

.home_header_account p:first-child {
  color: #FFFFFF;
  font-size: 14px;
}

.home_header_account>svg {
  background: #99F476;
  border-radius: 20px;
  height: 36px;
  width: 36px;
  padding: 6px;
}

.home_worth {
  text-align: center;
  padding: 10px 0;
}

.home_worth h3 {
  color: #FFF;
  font-size: 32px;
  font-weight: 700;
}

.home_actions {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 10px 0;
}


.home_action {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 6px;
  user-select: none;
  cursor: pointer;
}

.home_action>p {
  color: #FFFFFF;
  font-size: 14px;
  font-weight: 300;
}

.home_action>svg {
  background: #99F476;
  border-radius: 25px;
  height: 45px;
  width: 45px;
  padding: 10px;
}

.home_tabs {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 60px;
  border-bottom: 1px solid #252728;
}

.home_tab {
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  height: 45px;
  position: relative;
  user-select: none;
  cursor: pointer;
}

.home_tab p {
  color: #FFFFFF;
  font-size: 14px;
  font-weight: 300;
}

.home_tab span {
  background: #CF2E2E;
  padding: 1px 4px;
  border-radius: 4px;
  font-size: 12px;
}

.home_tab .indicator {
  position: absolute;
  bottom: 0;
  height: 6px;
  width: 130px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

.home_tab_active .indicator {
  background: #252728;
}

.requests {
  padding: 14px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.request {
  border: 1px solid #252728;
  border-radius: 4px;
  cursor: pointer;
  user-select: none;
}

.request_head {
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.request_head_token {
  display: flex;
  align-items: center;
  gap: 6px;
}

.request_head_token img {
  width: 20px;
  height: 20px;
  border-radius: 50%;
}

.request_head_token p {
  color: #FFFFFF;
  font-size: 14px;
  font-weight: 300;
}

.request_head_amount {
  display: flex;
  align-items: center;
  gap: 12px;
}

.request_head_amount p {
  color: #FFFFFF;
  font-size: 14px;
  font-weight: 300;
}

.request_sender {
  padding: 10px 8px;
  background: #252728;
  overflow: hidden;
}

.request_sender p {
  color: #cacacc;
  font-size: 12px;
  font-weight: 300;
}

.request_actions {
  margin-top: 2px;
  background: #252728;
  display: flex;
  gap: 4px;
  padding: 4px;
}

.request_action {
  height: 32px;
  border: none;
  border-radius: 2px;
  font-weight: 500;
  cursor: pointer;
}

.request_action:first-child {
  width: 124px;
  background: #CF2E2E;
  color: #FFF;
}

.request_action:last-child {
  width: calc(100% - 124px);
  background: #FFFFFF;
  color: #181A1C;
}
</style>
