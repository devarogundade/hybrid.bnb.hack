<script setup lang="ts">
import CloseIconVue from '@/components/icons/CloseIcon.vue';

import { ref } from 'vue';
// @ts-ignore
import { useStore } from 'vuex';
// @ts-ignore
import { key } from '../../store';
import { notify } from '../reactives/notify';
import { newSignedMessage } from '@/scripts/dom';
import { splitSignedHash, submitApprovalProof } from '@/scripts/bind';
import { allApprovalsOf } from '@/scripts/graph';
import Converter from '@/scripts/converter';

const props = defineProps({
    active: { type: Boolean, required: true },
    approval: { type: Object, required: true },
    tokenInfo: { type: Object, required: true },
});

const store = useStore(key);

const signedMessage = ref("");

const OK = 200;

const requestNewSignedHash = async () => {
    const result = await newSignedMessage(store.state.address, "Approving Spender");

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
};

const trySubmitProof = async () => {
    const splitedHash = splitSignedHash(signedMessage.value);

    const txId = await submitApprovalProof(
        props.approval.approvalId,
        splitedHash.message,
        splitedHash.signature,
        props.tokenInfo.address
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
}

</script>

<template>
    <main :class="props.active ? 'main_active' : ''">
        <div class="app_width">
            <div class="approve_container">
                <div class="approve_header">
                    <p>Approval Request</p>
                    <CloseIconVue @click="$emit('close')" />
                </div>

                <div class="approve_token">
                    <img src="/images/coin.png" alt="">
                    <p>{{ tokenInfo.name }}</p>
                </div>

                <table>
                    <tr>
                        <td>Amount</td>
                        <td>{{ Converter.fromWei(approval.value) }} {{ tokenInfo.symbol }}</td>
                    </tr>

                    <tr>
                        <td>Spender</td>
                        <td>{{ Converter.fineHash(approval.spender, 10) }}</td>
                    </tr>

                    <tr>
                        <td>Time</td>
                        <td><span>08 : 45pm</span> 28th, Jan 2023</td>
                    </tr>
                </table>

                <div class="approval_details">
                    <textarea v-model="signedMessage" placeholder="Enter signed hash" name="" id="" cols="30"
                        rows="5"></textarea>
                    <p class="request_hash" @click="requestNewSignedHash">Request confirmation hash</p>
                </div>

                <div class="approve_actions">
                    <button @click="trySubmitProof">Approve</button>
                    <button>Reject</button>
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
    z-index: 999;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    padding-bottom: 10px;
    border-top: 1px solid rgba(165, 169, 164, 0.15)
}

.main_active {
    bottom: 0;
}

.approve_header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 45px;
}

.approve_header p {
    color: #FFFFFF;
    font-size: 16px;
}

.approve_header svg {
    cursor: pointer;
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



.approve_token {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 6px;
    padding: 10px 0;
}

.approve_token img {
    height: 40px;
    width: 40px;
    border-radius: 50%;
}

.approve_token p {
    color: #FFFFFF;
    font-size: 20px;
    font-weight: 500;
}

table,
tr {
    width: 100%;
}

table td {
    height: 35px;
}

table td:first-child {
    color: #a4a7a9;
    font-size: 12px;
    font-weight: 300;
}

table td:last-child {
    text-align: right;
    color: #FFFFFF;
    font-size: 12px;
    font-weight: 300;
}

table td span {
    color: #a4a7a9;
}

.approve_actions {
    margin-top: 60px;
}

.approve_actions button:first-child {
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

.approve_actions button:last-child {
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