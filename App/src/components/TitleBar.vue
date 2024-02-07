<!-- WINDOWS TITLEBAR -->
<template>
    <nav class="w-screen h-8 dark:bg-od-1 bg-ol-1 flex justify-end top-0 left-0">
        <section id="drag" class="h-full grow order-2"></section>

        <section class="h-full flex order-3">
            <div id="minimize" class="winBtn grid h-full cursor-pointer place-items-center w-10 dark:hover:bg-od-hover-1 hover:bg-ol-hover-1 dark:text-od-icon text-ol-icon dark:hover:text-white hover:text-black" @click="minimize">
                <Icon icon="tabler:minus" />
            </div>

            <div id="maximize" class="winBtn grid h-full cursor-pointer place-items-center w-10 dark:hover:bg-od-hover-1 hover:bg-ol-hover-1 dark:text-od-icon text-ol-icon dark:hover:text-white hover:text-black" @click="changeSize">
                <Icon v-if="isMaximized" icon="tabler:minimize" />
                <Icon v-else icon="tabler:maximize" />
            </div>

            <div id="close" class="winBtn grid h-full cursor-pointer place-items-center w-10 dark:hover:bg-red-500 dark:text-od-icon text-ol-icon dark:hover:text-white hover:text-black" @click="close">
                <Icon icon="tabler:x" />
            </div>
        </section>
    </nav>
</template>

<script lang="ts">
import { Icon } from '@iconify/vue';

const ipcRenderer = window.require('electron').ipcRenderer;

export default {
    name: 'TitleBar',
    components: {
        Icon
    },
    data() {
        return {
            isMaximized: false,
        }
    },
    methods: {
        minimize() {
            ipcRenderer.send('minimize-window');
        },
        changeSize() {
            ipcRenderer.send('change-window-size');
        },
        close() {
            ipcRenderer.send('close-window');
        },

        updateWindowState() {
            ipcRenderer.send('get-window-state');
            ipcRenderer.on('window-state', (_, isMaximized) => {
                this.isMaximized = isMaximized;
            });
        },
    },
    mounted() {
    // Checks for window maximized state
    this.updateWindowState();

    // Listen for the resize event to update the window state
    window.addEventListener('resize', this.updateWindowState);
  },
  beforeDestroy() {
    // Remove the resize event listener when the component is destroyed
    window.removeEventListener('resize', this.updateWindowState);
  },
}
</script>

<style>
#drag {
    -webkit-app-region: drag;
}
</style>