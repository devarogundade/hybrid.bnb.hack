<script setup lang="ts">
import CloseIcon from '@/components/icons/CloseIcon.vue';

import { ref } from 'vue';
// @ts-ignore
import { useStore } from 'vuex';
import { key } from '../../store';
import { notify } from '../reactives/notify';
import { newSignedMessage, unBindWallet as domUnBindWallet } from '@/scripts/dom';
import { splitSignedHash, unBindWallet } from '@/scripts/bind';

const props = defineProps({
    active: { type: Boolean, required: true }
});

const store = useStore(key);

const signedMessage = ref("");
const requesting = ref(false);
const approving = ref(false);

const OK = 200;

const requestNewSignedHash = async () => {
    if (requesting.value) return;
    requesting.value = true;

    const result = await newSignedMessage(store.state.address, "Unbinding Wallet Request");

    if (result.code == OK) {
        notify.push({
            title: 'Confirmation hash sent to mail.',
            description: 'Mail was sent.',
            category: 'success',
            linkTitle: 'View Trx',
            linkUrl: ''
        });
    } else {
        notify.push({
            title: 'Failed to send mail.',
            description: 'Try again.',
            category: 'error'
        });
    }

    requesting.value = false;
};

const tryUnBind = async () => {
    if (approving.value) return;
    approving.value = true;

    const splitedHash = splitSignedHash(signedMessage.value);

    const txId = await unBindWallet(
        splitedHash.message,
        splitedHash.signature
    );

    if (txId) {
        notify.push({
            title: 'Approval successful.',
            description: 'Transaction was sent.',
            category: 'success',
            linkTitle: 'View Trx',
            linkUrl: ''
        });

        await domUnBindWallet(store.state.address);
    } else {
        notify.push({
            title: 'Failed to send transaction.',
            description: 'Try again.',
            category: 'error'
        });
    }

    approving.value = false;
};
</script>


<template>
    <main :class="props.active ? 'main_active' : ''">
        <div class="app_width">
            <div class="approval_container">
                <div class="approval_header">
                    <p>Unbind Wallet</p>
                    <CloseIcon @click="$emit('close')" />
                </div>

                <div class="approval_details">
                    <textarea v-model="signedMessage" placeholder="Enter signed hash" name="" id="" cols="30"
                        rows="5"></textarea>
                    <p class="request_hash" @click="requestNewSignedHash">
                        {{ requesting.valueOf() ? 'Requesting...' : 'Request confirmation hash' }}
                    </p>
                </div>

                <div class="approval_actions">
                    <button @click="tryUnBind">
                        {{ approving.valueOf() ? 'Confirming...' : 'Confirm' }}
                    </button>
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

.approval_details textarea {
    background: #252728;
    border-radius: 4px;
    border: none;
    resize: none;
    padding: 8px;
    width: 100%;
    color: #FFF;
    margin-bottom: 6px;
    outline: none;
    resize: none;
    font-size: 14px;
    margin-top: 10px;
}

.request_hash {
    color: green;
    padding: 6px 0;
    text-decoration: underline;
    cursor: pointer;
    user-select: none;
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