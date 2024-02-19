<template>
    <section>
        <div class="site_width">
            <header>
                <div class="logo">
                    <img src="/images/logo.png" alt="">
                    <p>Hybrid</p>
                </div>

                <div class="navigation">
                    <a target="_blank" href="">#BuildonBNBChain</a>
                    <a target="_blank" href="https://dorahacks.io/hackathon/bnbchain-hackathon/detail">Hackathon</a>
                    <a target="_blank" href="https://github.com/devarogundade/hybrid.bnb.hack">GitHub</a>
                    <a target="_blank" href="https://www.linkedin.com/in/devarogundade">Me</a>
                </div>

                <div class="header_actions">
                    <a target="_blank" href="https://hybrid-app.netlify.app">
                        <button class="header_action">Launch App</button>
                    </a>
                </div>
            </header>
        </div>
    </section>
</template>

<style scoped>
section {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 50;
    width: 100%;
    height: 75px;
    background-color: rgb(21 21 21 / 1);
    border-bottom: 1px solid rgb(28, 28, 28);
    backdrop-filter: blur(12px);
    transition-duration: .3s;
    transition-timing-function: cubic-bezier(.4, 0, .2, 1);
}

header {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    justify-content: space-between;
}

.logo {
    width: 300px;
    align-items: center;
    gap: 10px;
    display: flex;
    font-size: 20px;
    font-weight: 500;
    color: #ffffff;
}

.logo img {
    height: 50px;
}

.header_actions {
    width: 300px;
    display: flex;
    justify-content: flex-end;
}

.header_action {
    height: 3rem;
    font-size: 1rem;
    background-color: var(--primary);
    width: 12rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5rem;
    font-weight: 500;
    color: var(--main-bg);
    border: none;
    cursor: pointer;
}

.navigation {
    display: flex;
    gap: 30px;
    align-items: center;
}

.navigation a {
    color: var(--text-dimmed);
    cursor: pointer;
}
</style>