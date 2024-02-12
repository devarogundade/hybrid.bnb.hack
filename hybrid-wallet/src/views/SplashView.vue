<script setup lang="ts">
import HybridIcon from '@/components/icons/HybridIcon.vue';
import { onMounted } from 'vue';
import { useRouter } from "vue-router";

const SPLASH_DELAY_MS = 2000;

onMounted(() => {
    const router = useRouter();
    setTimeout(() => { router.push('/import'); }, SPLASH_DELAY_MS);
});
</script>

<template>
    <section>
        <div class="app_width">
            <div class="splash_container">
                <div class="splash_icon">
                    <HybridIcon />
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.splash_container {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 600px;
}
</style>