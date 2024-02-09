<!-- WINDOWS TITLEBAR -->
<template>
    <nav class="w-screen h-8 dark:bg-od-1 bg-ol-1 flex justify-end top-0 left-0 z-20">
        <section id="drag" class="h-full grow order-2"></section>

        <section class="h-full flex order-3">
            <div id="minimize" class="winBtn grid h-full cursor-pointer place-items-center w-10 dark:hover:bg-od-hover-1 hover:bg-ol-hover-1 dark:text-od-icon text-ol-icon dark:hover:text-white hover:text-black" @click="minimize">
                <Icon icon="tabler:minus" />
            </div>

            <div id="maximize" class="winBtn grid h-full cursor-pointer place-items-center w-10 dark:hover:bg-od-hover-1 hover:bg-ol-hover-1 dark:text-od-icon text-ol-icon dark:hover:text-white hover:text-black" @click="changeSize">
                <Icon v-if="isMaximized" icon="tabler:minimize" />
                <Icon v-else icon="tabler:maximize" />
            </div>

            <div id="close" class="winBtn grid h-full cursor-pointer place-items-center w-10 hover:bg-red-500 dark:text-od-icon text-ol-icon dark:hover:text-white hover:text-black" @click="close">
                <Icon icon="tabler:x" />
            </div>
        </section>
    </nav>
</template>


<!-- Linux TITLEBAR -->

<!-- <template>
    <nav class="w-screen h-8 dark:bg-od-1 bg-ol-1 flex justify-end top-0 left-0">
        <section id="drag" class="h-full grow order-2"></section>

        <section class="h-full flex order-3">
            <div id="minimize" class="winBtn grid h-full cursor-pointer place-items-center w-10 dark:text-od-icon text-ol-icon" @click="minimize">
                <div class="w-5 h-5 rounded-full dark:hover:bg-od-hover-1 hover:bg-ol-hover-1 grid place-items-center dark:hover:text-white hover:text-black">
                    <Icon icon="tabler:minus" />
                </div>
            </div>

            <div id="maximize" class="winBtn grid h-full cursor-pointer place-items-center w-10 dark:text-od-icon text-ol-icon" @click="changeSize">
                <div class="w-5 h-5 rounded-full dark:hover:bg-od-hover-1 hover:bg-ol-hover-1 grid place-items-center dark:hover:text-white hover:text-black">
                    <Icon v-if="isMaximized" icon="tabler:minimize" />
                    <Icon v-else icon="tabler:maximize" />
                </div>
            </div>

            <div id="close" class="winBtn grid h-full cursor-pointer place-items-center w-10 dark:text-od-icon text-ol-icon" @click="close">
                <div class="w-5 h-5 rounded-full hover:bg-red-500 grid place-items-center dark:hover:text-white hover:text-black">
                    <Icon icon="tabler:x" />
                </div>
            </div>
        </section>
    </nav>
</template> -->

<!-- macOS TITLEBAR -->

<!-- <template>
    <nav class="w-screen h-8 dark:bg-od-1 bg-ol-1 flex justify-start top-0 left-0">
        <section id="drag" class="h-full grow order-3"></section>

        <section class="h-full flex flex-row-reverse order-1 ml-1">
            <div id="maximize" class="grid h-full place-items-center w-5 dark:text-od-icon text-ol-icon" @click="changeSize">
                <div class="w-3 h-3 rounded-full bg-green-300 grid place-items-center dark:hover:text-white hover:text-black cursor-pointer group">
                    <Icon v-if="isMaximized" icon="tabler:minimize" class="w-3 h-3 hidden group-hover:block"/>
                    <Icon v-else icon="tabler:maximize" class="w-2 h-2 hidden group-hover:block"/>
                </div>
            </div>

            <div id="minimize" class="grid h-full place-items-center w-5 dark:text-od-icon text-ol-icon" @click="minimize">
                <div class="w-3 h-3 rounded-full bg-yellow-300 grid place-items-center dark:hover:text-white hover:text-black cursor-pointer group">
                    <Icon icon="tabler:minus" class="w-2 h-2 hidden group-hover:block"/>
                </div>
            </div>

            <div id="close" class="grid h-full place-items-center w-5 dark:text-od-icon text-ol-icon" @click="close">
                <div class="w-3 h-3 rounded-full bg-red-400 grid place-items-center dark:hover:text-white hover:text-black cursor-pointer group">
                    <Icon icon="tabler:x" class="w-2 h-2 hidden group-hover:block"/>
                </div>
            </div>
        </section>
    </nav>
</template> -->

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