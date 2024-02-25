<template>
    <main class="w-full h-full dark:bg-od-3 bg-ol-3">
        <AddProject v-if="addProjectOpen" @close-add-project="projectCreated"/>
        <SettingsWindow v-if="settingsOpen" @close-settings-window="settingsOpen = false" @theme-changed="setTheme"/>
        <TitleBar/>

        <main class="w-screen flex grow">
            <Ribbon @open-add-project-window="addProjectOpen = true" @open-settings-window="settingsOpen = true" ref="ribbonComponent"/>
        </main>
    </main>
</template>

<script setup lang="ts">
import AddProject from './components/Popups/AddProject.vue';
import SettingsWindow from './components/Popups/SettingsWindow.vue';

import TitleBar from './components/TitleBar.vue';
import Ribbon from './components/Ribbon.vue';
</script>

<script lang="ts">
export default {
    data() {
        return {
            addProjectOpen: false as boolean,
            settingsOpen: false as boolean,
        }
    },
    methods: {
        projectCreated() {
            this.addProjectOpen = false;

            const ribbonComponent = this.$refs.ribbonComponent as typeof Ribbon;
            ribbonComponent.loadProjects();
        },
        setTheme(theme: string) {
            const app = document.getElementById('app');

            if(theme === 'system') {
                if(window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    app.classList.add('dark')
                }
                else {
                    app.classList.remove('dark')
                }
            }
            else if(theme === 'light') {
                app.classList.remove('dark')
            }
            else if(theme === 'dark') {
                app.classList.add('dark')
            }
        }
    }
}
</script>