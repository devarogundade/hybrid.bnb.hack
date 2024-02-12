<script setup lang="ts">
import CloseIconVue from '@/components/icons/CloseIcon.vue';

const props = defineProps({
    active: { type: Boolean, required: true }
});
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
                    <img src="/images/usdc.png" alt="">
                    <p>Circle USD</p>
                </div>

                <table>
                    <tr>
                        <td>Amount</td>
                        <td>50 USDC</td>
                    </tr>

                    <tr>
                        <td>Spender</td>
                        <td>0x60E0a0eAd05...34A97f13E6ff21</td>
                    </tr>

                    <tr>
                        <td>Time</td>
                        <td><span>08 : 45pm</span> 28th, Jan 2023</td>
                    </tr>
                </table>

                <div class="approve_actions">
                    <button>Approve</button>
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

.approve_token {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 6px;
    padding: 10px 0;
}

.approve_token img {
    height: 60px;
    width: 60px;
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