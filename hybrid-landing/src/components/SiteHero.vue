<template>
    <section>
        <div class="site_width">
            <div class="hero_container">
                <div class="hero_text">
                    <h2>Hybrid Protocol: Reinventing Blockchain Security.</h2>
                    <p>Empowering Users with Two-Factor Authentication & Combatting Token Spamming for a Safer
                        Blockchain
                        Experience.</p>
                </div>
                <div class="hero_actions">
                    <a target="_blank" href="https://hybrid-app.netlify.app">
                        <button class="hero_action">
                            Try it!
                        </button>
                    </a>

                    <a target="_blank"
                        href="https://github.com/devarogundade/hybrid.bnb.hack/blob/main/hybrid-token/contracts/usecases/WrappedBNB.sol">
                        <button class="hero_action">
                            Read the Docs
                        </button>
                    </a>
                </div>
            </div>

            <div class="widget_container">
                <div class="widget"><img src="/images/arch.png" alt=""></div>
            </div>

            <div class="bsc_container">
                Built on BSC <img src="/images/bsc.png" alt=""> , the World's Largest Blockchain.
            </div>

            <WaveSVG />
        </div>
    </section>
</template>

<script setup lang="ts">
import WaveSVG from './icons/WaveSVG.vue';
</script>

<style scoped>
section {
    background-image: url('https://clickhouse.com/dot_grid.svg');
    background-repeat: repeat;
}

.hero_container {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-top: 150px;
    padding-bottom: 60px;
}

.hero_text {
    width: 800px;
    max-width: 100%;
    text-align: center;
    display: flex;
    align-items: center;
    flex-direction: column;
}

.hero_text h2 {
    color: var(--text-normal);
    font-size: 3.5rem;
    line-height: 5rem;
    font-weight: 500;
}

.hero_text p {
    margin-top: 40px;
    color: var(--text-normal);
    font-size: 1.3rem;
    line-height: 2rem;
    font-weight: 400;
    max-width: 100%;
    width: 700px;
}

.hero_actions {
    margin-top: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
}

.hero_action {
    height: 4rem;
    font-size: 1rem;
    background-color: var(--primary);
    width: 250px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5rem;
    font-size: 1rem;
    font-weight: 500;
    color: var(--main-bg);
    border: none;
    cursor: pointer;
}

.hero_action:last-child {
    background-color: var(--main-bg);
    color: var(--text-normal);
    border: 1px var(--primary) solid;
}

.widget_container {
    display: flex;
    justify-content: center;
    padding: 150px 0;
}

.widget {
    width: 950px;
    background-color: var(--main-bg);
    border-radius: 2rem;
    background-color: rgb(21 21 21 / 1);
    border: 1px solid rgb(28, 28, 28);
    overflow: hidden;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
    display: flex;
    justify-content: center;
}

.bsc_container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding-top: 50px;
    padding-bottom: 150px;
    font-size: 1.8rem;
    color: var(--text-normal);
}

.bsc_container img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
}
</style>