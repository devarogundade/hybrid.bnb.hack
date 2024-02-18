<script setup lang="ts">
import CloseIcon from '@/components/icons/CloseIcon.vue';

import { ref } from 'vue';
import { useStore } from 'vuex';
import { key } from '../../store';
import { notify } from '../reactives/notify';
import { newSignedMessage } from '@/scripts/dom';

const props = defineProps({
    active: { type: Boolean, required: true }
});

const store = useStore(key);

const signedMessage = ref("");

const OK = 200;

const requestNewSignedHash = async () => {
    const result = await newSignedMessage(store.state.address, "Unbinding Wallet Request");

    console.log(result);


    if (result.code == OK) {
        notify.push({
            title: 'Confirmation hash sent to mail.',
            description: 'Mail was sent.',
            category: 'success',
            linkText: 'View Trx',
            linkUrl: ''
        });
    } else {
        notify.push({
            title: 'Failed to send mail.',
            description: 'Try again.',
            category: 'error'
        });
    }
};

const tryUnBind = async () => {
    const splitedHash = splitSignedHash(signedMessage);

    const txId = await unBindWallet(
        splitedHash.messageHash,
        splitedHash.r,
        splitedHash.v,
        splitedHash.s
    );

    if (txId) {
        notify.push({
            title: 'Approval successful.',
            description: 'Transaction was sent.',
            category: 'success',
            linkText: 'View Trx',
            linkUrl: ''
        });
    } else {
        notify.push({
            title: 'Failed to send transaction.',
            description: 'Try again.',
            category: 'error'
        });
    }
};
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
                    <textarea placeholder="Enter signed hash" name="" id="" cols="30" rows="5"></textarea>
                    <p class="request_hash" @click="requestNewSignedHash">Request confirmation hash</p>
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