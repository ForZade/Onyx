<template>
    <nav class="h-screen w-12 min-w-12 dark:bg-od-1 relative -mt-8">
        <section class="h-full flex flex-col gap-2 justify-center items-center">
            <main class="w-full items-center flex flex-col gap-2 relative">
                
            </main>

            <div class="w-9 h-9 rounded-xl grid place-items-center dark:bg-od-hover-1 dark:hover:bg-od-hover-1.5">
                <Icon icon="tabler:plus" class="w-7 h-7 dark:text-od-icon dark:hover:text-white" />
            </div>
        </section>

        

        <section class="w-full h-11 flex flex-col justify-evenly items-center absolute bottom-0 left-0">
            <div class="w-7 h-7 rounded-lg grid place-items-center dark:hover:bg-od-hover-1">
                <Icon icon="tabler:settings" class="w-5 h-5 dark:text-od-icon" />
            </div>
        </section>
    </nav>
</template>

<script lang="ts">
import { Icon } from '@iconify/vue';

export default {
    name: "Ribbon",
    components: {
        Icon,
    },
}
</script>

<style scoped>
nav:before {
    content: "";
    width: 1rem;
    height: 1rem;
    position: absolute;
    top: 2rem;
    left: 3rem;
    border-bottom-right-radius: 50%;
    box-shadow: 5px 0 0 0;
    color: #1E1F22;
    transform: rotate(180deg);
    z-index: 2;
}
</style>