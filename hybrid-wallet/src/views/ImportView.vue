<script setup lang="ts">
import HybridIcon from '@/components/icons/HybridIcon.vue';
import LogoutIcon from '@/components/icons/LogoutIcon.vue';
import { createWeb3Modal } from '@web3modal/wagmi/vue';
import { useWeb3Modal } from '@web3modal/wagmi/vue';
import { watchAccount } from '@wagmi/core';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
// @ts-ignore
import { useStore } from 'vuex';
import { key } from '../../store';
import { bindWallet, isEOA, signerOf } from '@/scripts/bind';
import { notify } from '@/reactives/notify';
import { bindWallet as domBindWllet, getBinding } from '@/scripts/dom';
import { config, projectId, chains } from '../scripts/config';
import Converter from '@/scripts/converter';

const router = useRouter();

createWeb3Modal({
  wagmiConfig: config,
  projectId: projectId,
  // @ts-ignore
  chains: chains,
  enableAnalytics: true
});

const modal = useWeb3Modal();

const store = useStore(key);
const isEmail = ref(false);
const email = ref('');

onMounted(() => {
  watchAccount(config, {
    onChange(account) {
      store.commit('setAddress', account.address);
      getSigner();
    },
  });
});

const getSigner = async () => {
  if (store.state.address) {
    const signer = await signerOf(store.state.address);
    const result = await getBinding(store.state.address);

    if (result.code == OK) {
      store.commit('setSigner', signer);
    }
  }
};

const OK = 200;

const tryBindWallet = async () => {
  if (store.state.address) {

    const result = await domBindWllet(store.state.address, email.value);

    if (result.code != OK) {
      notify.push({
        title: 'Failed to get binding.',
        description: result.message,
        category: 'error'
      });
      return;
    }

    if (!isEOA(store.state.signer)) {
      const txId = await bindWallet(result.data);

      if (!txId) {
        notify.push({
          title: 'Failed to send transaction.',
          description: 'Try again.',
          category: 'error'
        });
        return;
      }
    }

    await getSigner();

    gotoHomeView();
  }
};

const gotoHomeView = () => {
  router.push('/home');
};
</script>

<template>
  <section>
    <div class="app_width">
      <div class="import_container">
        <div class="import_header">
          <div class="import_header_name">
            <HybridIcon />
            <p>Bind Wallet</p>
          </div>

          <div class="import_header_account">
            <p>Exit</p>
            <LogoutIcon />
          </div>
        </div>

        <form class="mnemonic_form">
          <label for="mnemonic_input">Connect to a Web3 Wallet:</label>
          <button class="wallet_connect" type="button" @click="modal.open()">{{ store.state.address ? `Connected to
            ${Converter.fineHash(store.state.address, 4)}`
            : 'Wallet Connect'
          }}</button>

          <br> <br>

          <label v-if="store.state.address && !isEOA(store.state.signer)" for="mnemonic_input">Connect to a social for 2FA
            Trx:</label>
          <button @click="isEmail = true" v-if="store.state.address && !isEOA(store.state.signer)" class="telegram"
            type="button">Use Email
            Account</button>
          <input type="email" v-model="email" v-show="isEmail" placeholder="Enter your email">

          <label style="font-weight: 600; font-size: 20px; color: green; text-align: center;"
            v-if="store.state.address && isEOA(store.state.signer)" for="mnemonic_input">{{ (`Your account has
            been connected to
            ${Converter.fineHash(store.state.signer, 4)} as a secondary signer!.`) }}</label>
        </form>

        <div class="import_actions">
          <button class="import_action" @click="!isEOA(store.state.signer) ? tryBindWallet() : gotoHomeView()">{{
            !isEOA(store.state.signer) ? 'Bind and Continue' : 'Continue' }}</button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.import_container {
  height: 600px;
  position: relative;
}

.import_header {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.import_header_name {
  display: flex;
  align-items: center;
  gap: 10px;
}

.import_header_name svg {
  width: 30px;
}

.import_header_name p {
  color: #FFF;
  font-size: 24px;
  font-weight: 500;
}

.import_header_account {
  display: flex;
  align-items: center;
  gap: 10px;
  user-select: none;
  cursor: pointer;
}

.import_header_account p:first-child {
  color: #FFFFFF;
  font-size: 14px;
}

.import_header_account>svg {
  background: #99F476;
  border-radius: 20px;
  height: 36px;
  width: 36px;
  padding: 6px;
}

.mnemonic_form {
  display: flex;
  flex-direction: column;
  padding: 10px 0;
}

.mnemonic_form label {
  color: #FFFFFF;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 10px;
}

.mnemonic_input {
  background: #252728;
  border-radius: 4px;
  border: none;
  resize: none;
  padding: 8px;
  color: #FFF;
  margin-bottom: 20px;
  outline: none;
}

.mnemonic_form input {
  background: #252728;
  border-radius: 4px;
  border: none;
  resize: none;
  padding: 8px;
  color: #FFF;
  margin-bottom: 20px;
  outline: none;
  height: 40px;
  font-size: 14px;
  margin-top: 10px;
}

.mnemonic_form button {
  height: 35px;
  width: 100%;
  border: none;
  border-radius: 2px;
  font-weight: 600;
  cursor: pointer;
}

.wallet_connect {
  background: #FFF;
  color: #17318E;
}

.telegram {
  background: #17318E;
  color: #FFF;
}

.import_actions {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 10px 0;
}

.import_action {
  height: 45px;
  width: 100%;
  border: none;
  border-radius: 2px;
  font-weight: 600;
  color: #181A1C;
  background: #99F476;
  cursor: pointer;
}
</style>
