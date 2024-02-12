<script setup lang="ts">
import HybridIcon from '@/components/icons/HybridIcon.vue';
import LogoutIcon from '@/components/icons/LogoutIcon.vue';
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi';
import { bscTestnet } from 'viem/chains';
import { reconnect } from '@wagmi/core';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const projectId = 'c8af093fb15a6a3b6e325460f68d1587';

const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal Example',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
};

const config = defaultWagmiConfig({ chains: [bscTestnet], projectId, metadata });

onMounted(() => {
  reconnect(config);
});

const connectWallet = () => {
  createWeb3Modal({ wagmiConfig: config, projectId, enableAnalytics: true });
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
          <!-- <textarea type="text" rows="5" v-model="mnemonic" name="mnemonic_input" class="mnemonic_input"
            placeholder="Paste signed data here."></textarea> -->
          <button class="wallet_connect" type="button" @click="connectWallet">Wallet Connect</button>

          <br> <br>

          <label for="mnemonic_input">Connect to a social for 2FA Trx:</label>
          <button class="telegram" type="button">Authorize Telegram</button>
        </form>

        <div class="import_actions">
          <button class="import_action" @click="gotoHomeView">Bind and Continue</button>
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

.import_header_name>svg {
  width: 36px;
  height: 34.52px;
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
  font-weight: 500;
  color: #181A1C;
  background: #99F476;
  cursor: pointer;
}
</style>
