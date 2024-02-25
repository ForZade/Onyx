<template>
    <main class="dark:bg-od-darken bg-ol-darken backdrop-blur w-screen h-full absolute z-30 flex justify-center items-center overflow-hidden top-0 left-0" @click="cancelCreation">
        <section class="min-w-[700px] min-h-[500px] w-3/4 h-3/4 dark:bg-od-4 bg-ol-4 rounded-xl flex overflow-hidden">
            <nav class="min-w-[160px] w-3/12 h-full dark:bg-od-3 bg-ol-3">
                <h1 class="px-4 pt-4 text-xl dark:text-white text-black font-bold">Options</h1>
                <ul class="w-full p-4 flex flex-col gap-3 select-none">
                    <li v-for="item in settingList" :key="item.id" class="group flex gap-1 cursor-pointer dark:text-od-icon text-ol-icon" @click="openPage = item.id">
                        <span 
                            class="w-6 h-6 rounded-md grid place-items-center" 
                            :class="openPage === item.id ? 'bg-purple-400 dark:text-white' : ' dark:group-hover:bg-od-hover-1 group-hover:bg-ol-hover-1'
                        ">
                            <Icon :icon="item.icon" class="w-4 h-4"/>
                        </span>
                        <p class="text-base">{{ item.name }}</p>
                    </li>
                </ul>
            </nav>

            <section class="w-full h-full p-4">
                <component :is="settingList[openPage].name" @theme-changed="changeTheme"/>
            </section>
        </section>
    </main>
</template>

<script></script>

<script lang="ts">
import { Icon } from '@iconify/vue';
import Themes from './settings/Themes.vue';

export default {
    components: {
        Icon,
        Themes,
    },
    data() {
        return {
            openPage: 0 as number,
            settingList: [
                { id: 0, name: 'General', icon: 'tabler:settings',},
                { id: 1, name: 'Themes', icon: 'tabler:palette',},
                { id: 2, name: 'Project', icon: 'tabler:folder',},
            ],
        }
    },
    methods: {
        cancelCreation(event:any) {
            if (event.target === event.currentTarget) {
                this.$emit('close-settings-window');
            }
            else if (event.key === 'Escape') {
                this.$emit('close-settings-window');
            }
        },
        openSettingsPage(page: number) {
            this.openPage = page;
        },
        changeTheme(theme: string) {
            this.$emit('theme-changed', theme);
        }
    }
}
</script>