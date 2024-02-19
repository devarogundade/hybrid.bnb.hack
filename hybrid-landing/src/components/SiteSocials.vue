<template>
    <section>
        <div class="site_width">
            <div class="socials_container">
                <p class="socials_title">🔔 Stay connected with us.</p>
                <div class="socials">
                    <a href="https://www.linkedin.com/in/devarogundade" target="_blank">
                        <button>LinkedIn</button>
                    </a>
                    <a href="https://x.com/devarogundade/status/1759672192332075305?s=20" target="_blank">
                        <button>Twitter</button>
                    </a>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.socials_container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 120px;
}

.socials_title {
    font-size: 1.5rem;
    font-weight: 500;
    color: var(--text-normal);
}

.socials {
    display: flex;
    align-items: center;
    gap: 20px;
}

.socials button {
    height: 4rem;
    border-radius: 5rem;
    width: 200px;
    border: 1px solid rgb(28, 28, 28);
    color: var(--primary);
    font-size: 0.8rem;
    font-weight: 500;
    background: none;
    cursor: pointer;
}
</style>