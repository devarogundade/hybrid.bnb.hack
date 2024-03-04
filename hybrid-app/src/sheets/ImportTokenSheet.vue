<script setup lang="ts">
import CloseIcon from '@/components/icons/CloseIcon.vue';

import { ref } from 'vue';
// @ts-ignore
import { useStore } from 'vuex';
import { key } from '../../store';
import { getTokens, readToken, upgradeAsset } from '../scripts/bind';
import { notify } from '../reactives/notify';
import { saveToken } from '../scripts/bind';

const store = useStore(key);

const props = defineProps({
    active: { type: Boolean, required: true }
});

const tokenAddress = ref("");
const tokenInfo = ref<any>(null);

const emit = defineEmits(['close', 'unClose']);

const tryImport = async () => {
    tokenInfo.value = await readToken(
        tokenAddress.value as `0x${string}`
    );

    if (!tokenInfo.value) {
        notify.push({
            title: 'Token not found.',
            description: 'Try again.',
            category: 'error'
        });
        return;
    }

    saveToken(tokenInfo.value);

    store.commit('setAssets', (getTokens()));

    emit('close');
};
</script>


<template>
    <main :class="props.active ? 'main_active' : ''">
        <div class="app_width">
            <div class="approval_container">
                <div class="approval_header">
                    <p>Import Token</p>
                    <CloseIcon @click="$emit('close')" />
                </div>

                <div class="approval_details">
                    <input type="text" v-model="tokenAddress" placeholder="Enter token address">
                    <br> <br>
                    <label for="">Token Info</label>
                    <input type="text" :value="tokenInfo?.name" disabled placeholder="Token name">
                    <input type="text" :value="tokenInfo?.symbol" disabled placeholder="Token symbol">
                </div>

                <div class="approval_actions">
                    <button @click="tryImport">Confirm</button>
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

.approval_details input {
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

label {
    color: #FFFFFF;
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