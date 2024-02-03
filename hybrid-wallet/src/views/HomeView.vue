<script setup lang="ts">
import HybridIcon from '@/components/icons/HybridIcon.vue';
import ProfileIcon from '@/components/icons/ProfileIcon.vue';
import ReceiveIcon from '@/components/icons/ReceiveIcon.vue';
import SendIcon from '@/components/icons/SendIcon.vue';
import LogoutIcon from '@/components/icons/LogoutIcon.vue';
import ArrowDownIcon from '@/components/icons/ArrowDownIcon.vue';
import ApproveSheet from '@/sheets/ApproveSheet.vue';
import { ref } from 'vue';

const pop = ref<Boolean>(false);
</script>

<template>
  <section>
    <div class="app_width">
      <div class="home_header">
        <div class="home_header_name">
          <HybridIcon />
          <p>Home</p>
        </div>

        <div class="home_header_account">
          <p>0x839...934a</p>
          <ProfileIcon />
        </div>
      </div>

      <div class="home_worth">
        <h3>$50.93</h3>
      </div>

      <div class="home_actions">
        <div class="home_action">
          <ReceiveIcon />
          <p>Receive</p>
        </div>

        <div class="home_action">
          <SendIcon />
          <p>Send</p>
        </div>

        <div class="home_action">
          <LogoutIcon />
          <p>Unbind</p>
        </div>
      </div>
    </div>
  </section>
  <section>
    <div class="home_tabs">
      <div class="home_tab home_tab_active">
        <p>Requests <span>10</span></p>
        <div class="indicator"></div>
      </div>

      <div class="home_tab">
        <p>Completed</p>
        <div class="indicator"></div>
      </div>
    </div>
  </section>
  <section>
    <div class="app_width">
      <div class="requests">
        <div class="request" v-for="i in 10" :key="i">
          <div class="request_head">
            <div class="request_head_token">
              <img src="/images/usdc.png" alt="">
              <p>Circle USD</p>
            </div>

            <div class="request_head_amount">
              <p>30 USDC</p>
              <ArrowDownIcon />
            </div>
          </div>

          <div class="request_sender">
            <p>Spender: 0x60E0a0eAd051314E7510AE803334A97f13E6ff21</p>
          </div>

          <div class="request_actions">
            <button class="request_action">Reject</button>
            <button class="request_action" @click="pop = !pop">Approve</button>
          </div>
        </div>
      </div>
    </div>

    <ApproveSheet :active="pop.valueOf()" @close="pop = !pop" />
  </section>
</template>

<style scoped>
section:first-child {
  border-bottom: 1px solid #252728;
  padding-bottom: 16px;
}

section:last-child {
  overflow-y: auto;
  height: 330px;
  position: relative;
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

.home_header_name {
  display: flex;
  align-items: center;
  gap: 10px;
}

.home_header_name>svg {
  width: 36px;
  height: 34.52px;
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
