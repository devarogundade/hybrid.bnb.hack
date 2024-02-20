<script setup lang="ts">
import CloseIcon from '@/components/icons/CloseIcon.vue';

// @ts-ignore
import { useStore } from 'vuex';
import { key } from '../../store';
import { onMounted, ref } from 'vue';
import { notify } from '../reactives/notify';
import { approve, getTokens } from '../scripts/bind';
import Converter from '@/scripts/converter';
import { allApprovalsOf } from '@/scripts/graph';

const store = useStore(key);

const props = defineProps({
    active: { type: Boolean, required: true }
});

const tryGetTokens = () => {
    store.commit('setAssets', (getTokens()));
};

const selectToken = (e: any) => {
    tokenAddress.value = e.target.value;
};

const tokenAddress = ref("");
const spenderAddress = ref("");
const amount = ref("");

const tryApprove = async () => {
    const txId = await approve(
        tokenAddress.value as `0x${string}`,
        spenderAddress.value as `0x${string}`,
        BigInt(Converter.toWei(amount.value))
    );

    if (txId) {
        notify.push({
            title: 'Approval successful.',
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
    tryGetTokens();
});
</script>


<template>
    <main :class="props.active ? 'main_active' : ''">
        <div class="app_width">
            <div class="approval_container">
                <div class="approval_header">
                    <p>Approve Spender</p>
                    <CloseIcon @click="$emit('close')" />
                </div>

                <div class="approval_details">
                    <select name="" id="" @change="selectToken">
                        <option value="">Select token</option>
                        <option v-for="token, index in store.state.assets" :key="index" :value="token.address">
                            {{ token.name }} ~ {{ token.symbol }}</option>
                    </select>
                    <input type="text" v-model="spenderAddress" placeholder="Enter spender address">
                    <input type="number" v-model="amount" placeholder="Enter amount">
                </div>

                <div class="approval_actions">
                    <button @click="tryApprove">Confirm</button>
                    <button @click="$emit('close')">Cancel</button>
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped>
main {
    display: flex;
    justify-content: center;
    background: #141617;
    width: 350px;
    position: absolute;
    bottom: -100vh;
    left: 0;
    z-index: 1000;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    padding-bottom: 10px;
    border-top: 1px solid rgba(165, 169, 164, 0.15)
}

.main_active {
    bottom: 0;
}

.approval_header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 45px;
}

.approval_header p {
    color: #FFFFFF;
    font-size: 16px;
}

.approval_header svg {
    cursor: pointer;
}

.approval_actions {
    margin-top: 60px;
}

.approval_details input,
select {
    background: #252728;
    border-radius: 4px;
    border: none;
    resize: none;
    padding: 8px;
    width: 100%;
    color: #FFF;
    margin-bottom: 6px;
    outline: none;
    height: 40px;
    font-size: 14px;
    margin-top: 10px;
}


.approval_actions button:first-child {
    width: 100%;
    height: 45px;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    font-weight: 500;
    color: #181A1C;
    background: #99F476;
    cursor: pointer;
}

.approval_actions button:last-child {
    width: 100%;
    height: 45px;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    color: #F5274E;
    background: none;
    margin-top: 10px;
    text-decoration: underline;
    cursor: pointer;
}
</style>