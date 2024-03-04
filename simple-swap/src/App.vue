<script setup lang="ts">
import { tryBuy, trySell, tryMint, tryNativeBalance, tryTokenBalance, tryAllowance, tryApprove } from './scripts/swap';
import { createWeb3Modal, useWeb3Modal } from '@web3modal/wagmi/vue';
import { config, projectId, chains } from './scripts/config';
import Converter from './scripts/converter';
import { watchAccount } from '@wagmi/core';
import { onMounted, ref } from 'vue';

const allowance = ref<string>('0');
const amount = ref<number | undefined>(undefined);
const address = ref<`0x${string}` | undefined>(undefined);

const buying = ref<boolean>(false);
const minting = ref<boolean>(false);
const approving = ref<boolean>(false);
const selling = ref<boolean>(false);
const refreshing = ref<boolean>(false);

const balance0 = ref<string>('0');
const balance1 = ref<string>('0');

createWeb3Modal({
  wagmiConfig: config,
  projectId: projectId,
  // @ts-ignore
  chains: chains,
  enableAnalytics: true,
  themeMode: 'light'
});

const modal = useWeb3Modal();

onMounted(() => {
  watchAccount(config, {
    onChange(account) {
      address.value = account.address;
      getProfile(address.value);
    },
  });
});

const getProfile = async (address?: `0x${string}`) => {
  if (!address) return;

  refreshing.value = true;

  balance0.value = Converter.toMoney(
    Converter.fromWei(
      await tryNativeBalance(address)
    )
  );

  balance1.value = Converter.toMoney(
    Converter.fromWei(
      await tryTokenBalance(address)
    )
  );

  allowance.value = Converter.fromWei(
    await tryAllowance(address)
  );

  refreshing.value = false;
};

const mint = async (amount?: number) => {
  if (Number(balance1.value) > 0) {
    alert('You have some tokens already. Buy tokens instead!');
    return;
  }

  if (!amount) return;

  if (address == null) {
    alert('Connect your Web3 wallet');
    return;
  }

  if (amount <= 0) {
    alert('Enter a valid amount');
    return;
  }

  if (minting.value) {
    return;
  }

  minting.value = true;

  const trxId = await tryMint(Converter.toWei(amount));

  if (trxId) {
    alert('Minted tokens at ' + trxId);
    getProfile(address.value);
  } else {
    alert('Failed to mint tokens');
  }

  minting.value = false;
};


const approve = async (amount?: number) => {
  if (!amount) return;

  if (address == null) {
    alert('Connect your Web3 wallet');
    return;
  }

  if (amount <= 0) {
    alert('Enter a valid amount');
    return;
  }

  if (approving.value) {
    return;
  }

  approving.value = true;

  const trxId = await tryApprove(Converter.toWei(amount));

  if (trxId) {
    alert('Approved tokens at ' + trxId);
    getProfile(address.value);
  } else {
    alert('Failed to approve tokens');
  }

  approving.value = false;
};

const sell = async (amount?: number) => {
  if (!amount) return;

  if (address == null) {
    alert('Connect your Web3 wallet');
    return;
  }

  if (amount <= 0) {
    alert('Enter a valid amount');
    return;
  }

  if (selling.value) {
    return;
  }

  selling.value = true;

  const trxId = await trySell(Converter.toWei(amount));

  if (trxId) {
    alert('Sold tokens at ' + trxId);
    getProfile(address.value);
  } else {
    alert('Failed to sell tokens');
  }

  selling.value = false;
};

const buy = async (amount?: number) => {
  if (!amount) return;

  if (address == null) {
    alert('Connect your Web3 wallet');
    return;
  }

  if (amount <= 0) {
    alert('Enter a valid amount');
    return;
  }

  if (buying.value) {
    return;
  }

  buying.value = true;

  const trxId = await tryBuy(Converter.toWei(amount));

  if (trxId) {
    alert('Bought tokens at ' + trxId);
    getProfile(address.value);
  } else {
    alert('Failed to buy tokens');
  }

  buying.value = false;
};
</script>

<template>
  <main>
    <div class="title">Simple Swap</div>

    <div class="connection" v-if="!address?.valueOf()">
      <button class="connect_button" @click="modal.open()">Connect Wallet</button>
    </div>

    <div v-if="address?.valueOf()" class="connected">
      <div class="faucet">
        <button class="faucet_button" @click="mint(amount?.valueOf())">
          {{ minting.valueOf() ? 'Minting...' : 'Mint Wrapped BNB' }}
        </button>
      </div>

      <div class="swap">
        <div class="profile">
          <div class="balances">
            <div class="balance">
              <p class="token_name">tBNB</p>
              <h3 class="token_amount">{{ balance0.valueOf() }}</h3>
            </div>

            <div class="balance">
              <p class="token_name">WBNB</p>
              <h3 class="token_amount">{{ balance1.valueOf() }}</h3>
            </div>
          </div>
        </div>

        <div class="swap_input">
          <p class="label">Enter WBNB Amount</p>
          <input type="number" placeholder="0.00" v-model="amount">
        </div>

        <div class="swap_actions">
          <button class="buy" @click="buy(amount?.valueOf())">{{ buying.valueOf() ? 'Buying...' : 'Buy' }}</button>

          <div>
            <button class="sell"
              v-if="(!amount && Number(allowance) > 0) || (amount && Number(allowance) >= amount.valueOf())"
              @click="sell(amount?.valueOf())">
              {{ selling.valueOf() ? 'Selling...' : 'Sell' }}
            </button>

            <button class="sell" v-else @click="approve(amount?.valueOf())">
              {{ approving.valueOf() ? 'Approving...' : 'Approve to sell' }}
            </button>
          </div>
        </div>
      </div>

      <div>
        <p class="refresh" @click="getProfile(address.valueOf() as `0x${string}`)">
          {{ refreshing.valueOf() ? 'Refreshing...' : 'Refresh' }}
        </p>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  gap: 40px;
}

.title {
  text-align: center;
  font-size: 30px;
  font-weight: 600;
}

.connection {
  width: 250px;
  padding: 30px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #fafafa;
  border: 1px solid #ccc;
  border-radius: 16px;
}

button {
  padding: 6px 12px;
  border-radius: 6px;

  border: none;
  cursor: pointer;

  background: #dbdada;
}

.faucet {
  display: flex;
  align-items: center;
  justify-content: center;

  padding-bottom: 20px;
  border-bottom: 1px solid #ccc;
}

.connected {
  width: 350px;
  padding: 30px;

  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 20px;

  background: #fafafa;
  border: 1px solid #ccc;
  border-radius: 16px;
}

.balances {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
  text-align: center;
}

.swap_input {
  margin-top: 20px;
}

.swap_input .label {
  font-size: 12px;
  text-align: center;
  width: 100%;
}

.swap_input input {
  font-size: 18px;
  height: 40px;
  padding: 0 10px;
  width: 100%;
  margin-top: 10px;
  text-align: center;
  border-radius: 6px;
  border: 1px solid #ccc;
  outline: none;
}

.swap_actions {
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.refresh {
  text-align: center;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
  user-select: none;
  color: teal;
  font-weight: 600;
}
</style>
