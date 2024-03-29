<script setup lang="ts">
import CloseIcon from '@/components/icons/CloseIcon.vue';

import { notify } from '../reactives/notify';
import { optIn, optOut, upgradeAsset } from '@/scripts/bind';
import { ref } from 'vue';

const props = defineProps({
    active: { type: Boolean, required: true },
    tokenInfo: { type: Object, required: true }
});

const emit = defineEmits(['close', 'unClose']);

const optingIn = ref(false);
const optingOut = ref(false);
const upgrading = ref(false);

const tryOptIn = async () => {
    if (optingIn.value) return;
    optingIn.value = true;

    const txId = await optIn(props.tokenInfo.address);

    if (txId) {
        notify.push({
            title: 'Opt In successful.',
            description: 'Transaction was sent.',
            category: 'success',
            linkTitle: 'View Trx',
            linkUrl: ''
        });

        emit('close');
    } else {
        notify.push({
            title: 'Failed to send transaction.',
            description: 'Try again.',
            category: 'error'
        });
    }

    optingIn.value = false;
};

const tryUpgradeAsset = async () => {
    if (upgrading.value) return;
    upgrading.value = true;

    const txId = await upgradeAsset(
        props.tokenInfo.address as `0x${string}`
    );

    if (txId) {
        notify.push({
            title: 'Upgrade successful.',
            description: 'Transaction was sent.',
            category: 'success',
            linkTitle: 'View Trx',
            linkUrl: ''
        });

        emit('close');
    } else {
        notify.push({
            title: 'Failed to send transaction.',
            description: 'Try again.',
            category: 'error'
        });
    }

    upgrading.value = true;
};

const tryOptOut = async () => {
    if (optingOut.value) return;
    optingOut.value = true;

    const txId = await optOut(props.tokenInfo.address);

    if (txId) {
        notify.push({
            title: 'Opt Out successful.',
            description: 'Transaction was sent.',
            category: 'success',
            linkTitle: 'View Trx',
            linkUrl: ''
        });

        emit('close');
    } else {
        notify.push({
            title: 'Failed to send transaction.',
            description: 'Try again.',
            category: 'error'
        });
    }

    optingOut.value = true;
};
</script>


<template>
    <main :class="props.active ? 'main_active' : ''">
        <div class="app_width">
            <div class="approval_container">
                <div class="approval_header">
                    <p>Token Info</p>
                    <CloseIcon @click="$emit('close')" />
                </div>

                <div class="approval_details">
                    <img src="" alt="">
                    <h3 class="token_name">{{ tokenInfo.name }}</h3>
                    <p class="token_symbol">{{ tokenInfo.symbol }}</p>
                </div>

                <div class="approval_actions">
                    <div class="grid_action">
                        <button @click="tryOptIn">
                            {{ optingIn.valueOf() ? 'Opting in...' : `Opt in to ${tokenInfo.symbol}` }}
                        </button>
                        <button @click="tryUpgradeAsset">
                            {{ upgrading.valueOf() ? 'Upgrading...' : 'Upgrade to hybrid token' }}
                        </button>
                        <button @click="tryOptOut">
                            {{ optingOut.valueOf() ? 'Opting out...' : `Opt out from ${tokenInfo.symbol}` }}
                        </button>
                    </div>
                    <button class="cancel" @click="$emit('close')">Cancel</button>
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

.approval_details {
    text-align: center;
}

.approval_details h3 {
    font-size: 20px;
    color: #FFFFFF;
}

.approval_details p {
    margin-top: 6px;
    font-size: 16px;
    color: #9a9d9f;
}

.grid_action {
    gap: 10px;
    display: flex;
    flex-direction: column;
    align-content: center;
}

.grid_action button:first-child {
    width: 100%;
    height: 35px;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    color: #181A1C;
    background: #99F476;
    cursor: pointer;
}

.grid_action button:nth-child(2) {
    width: 100%;
    height: 35px;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    color: #181A1C;
    background: #99F476;
    cursor: pointer;
}

.grid_action button:last-child {
    width: 100%;
    height: 35px;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    color: #FFFFFF;
    background: #f76c67;
    cursor: pointer;
}

.cancel {
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