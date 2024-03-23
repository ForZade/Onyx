<template>
    <main class="w-full h-full dark:bg-od-3 bg-ol-3">
        <AddProject v-if="addProjectOpen" @close-add-project="projectCreated" :Text="Text.AddProject"/>
        <SettingsWindow v-if="settingsOpen" @close-settings-window="settingsOpen = false" :Text="Text.Settings"/>
        <TitleBar/>

        <main class="w-screen flex grow">
            <Ribbon @open-add-project-window="addProjectOpen = true" @open-settings-window="settingsOpen = true" ref="ribbonComponent"/>
            <FileExplorer/>
        </main>
    </main>
</template>

<script lang="ts">
import AddProject from './components/Popups/AddProject.vue';
import SettingsWindow from './components/Popups/SettingsWindow.vue';

import TitleBar from './components/TitleBar.vue';
import Ribbon from './components/Ribbon.vue';
import FileExplorer from './components/FileExplorer.vue';

const ipcRenderer = window.require('electron').ipcRenderer;

export default {
    components: {
        AddProject,
        SettingsWindow,
        TitleBar,
        Ribbon,
        FileExplorer
    },
    data() {
        return {
            addProjectOpen: false as boolean,
            settingsOpen: false as boolean,

            AddProjectText: {} as object,
            SettingsWindowText: {} as object,

            Text: {} as any,
        }
    },
    methods: {
        getLanguageText() {
            ipcRenderer.invoke('get-language').then((item: any) => {
                this.Text = item;
            });
        },
        projectCreated() {
            this.addProjectOpen = false;

            const ribbonComponent = this.$refs.ribbonComponent as typeof Ribbon;
            ribbonComponent.loadProjects();
        },
        getMainConfig() {
            ipcRenderer.invoke('get-config').then((config: any) => {
                this.setTheme(config.theme);
            });
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
    },
    mounted() {
        this.getLanguageText();
        this.getMainConfig();
    }
}
</script>