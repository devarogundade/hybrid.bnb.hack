<script setup lang="ts">
import CloseIcon from '@/components/icons/CloseIcon.vue';

const props = defineProps({
    active: { type: Boolean, required: true }
});
</script>

<template>
    <main :class="props.active ? 'main_active' : ''">
        <div class="app_width">
            <div class="pin_container">
                <div class="pin_header">
                    <p>Enter OTP</p>
                    <CloseIcon @click="$emit('close')" />
                </div>

                <div class="otp_wrapper">
                    <div id="otp-input">
                        <input placeholder="_" type="number" step="1" min="0" max="9" maxlength="1" autocomplete="no"
                            pattern="\d*" />
                        <input placeholder="_" type="number" step="1" min="0" max="9" maxlength="1" autocomplete="no"
                            pattern="\d*" />
                        <input placeholder="_" type="number" step="1" min="0" max="9" maxlength="1" autocomplete="no"
                            pattern="\d*" />
                        <input placeholder="_" type="number" step="1" min="0" max="9" maxlength="1" autocomplete="no"
                            pattern="\d*" />
                        <input placeholder="_" type="number" step="1" min="0" max="9" maxlength="1" autocomplete="no"
                            pattern="\d*" />
                        <input placeholder="_" type="number" step="1" min="0" max="9" maxlength="1" autocomplete="no"
                            pattern="\d*" />
                        <input id="otp-value" placeholder="_" type="hidden" name="otp" />
                    </div>
                </div>

                <div class="pin_actions">
                    <button>Confirm</button>
                    <button>Cancel</button>
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

.pin_header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 45px;
}

.pin_header p {
    color: #FFFFFF;
    font-size: 16px;
}

.pin_header svg {
    cursor: pointer;
}

.pin_token p {
    color: #FFFFFF;
    font-size: 20px;
    font-weight: 500;
}

.pin_actions {
    margin-top: 60px;
}

.otp_wrapper {
    padding-top: 20px;
    padding-bottom: 140px;
}

.pin_actions button:first-child {
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

.pin_actions button:last-child {
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

#otp-input {
    display: flex;
    column-gap: 8px;
}

#otp-input input {
    text-align: center;
    border: none;
    padding: 10px 8px 10px 8px;
    background: #252728;
    border-radius: 4px;
    outline: none;
    height: 64px;
    width: 50px;
    color: #FFFFFF;
}

#otp-input input:focus {
    border: 1px solid #99F476;
}

#otp-input input:focus::placeholder {
    color: transparent;
}

#otp-input input::-webkit-outer-spin-button,
#otp-input input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>