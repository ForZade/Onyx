<!-- WINDOWS TITLEBAR -->
<template>
    <nav class="w-screen h-8 dark:bg-od-1 bg-ol-1 flex justify-end top-0 left-0">
        <section id="drag" class="h-full grow order-2"></section>

        <section class="h-full flex order-3">
            <div id="minimize" class="winBtn grid h-full cursor-pointer place-items-center w-10 dark:hover:bg-od-hover-1 hover:bg-ol-hover-1 dark:text-od-icon text-ol-icon dark:hover:text-white hover:text-black">
                <Icon icon="tabler:minus" />
            </div>

            <div id="maximize" class="winBtn grid h-full cursor-pointer place-items-center w-10 dark:hover:bg-od-hover-1 hover:bg-ol-hover-1 dark:text-od-icon text-ol-icon dark:hover:text-white hover:text-black">
                <Icon v-if="isMaximized" icon="tabler:minimize" />
                <Icon v-else icon="tabler:maximize" />
            </div>

            <div id="close" class="winBtn grid h-full cursor-pointer place-items-center w-10 dark:hover:bg-red-500 dark:text-od-icon text-ol-icon dark:hover:text-white hover:text-black">
                <Icon icon="tabler:x" />
            </div>
        </section>
    </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';

let isMaximized = ref(false);
</script>

<script lang="ts">
import { Icon } from '@iconify/vue';

export default {
    name: 'TitleBar',
    components: {
        Icon
    }
}
</script>

<style>
#drag {
    -webkit-app-region: drag;
}
</style>