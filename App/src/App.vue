<template>
    <main class="w-full h-full dark:bg-od-3 bg-ol-3">
        <AddProject v-if="addProjectOpen" @close-add-project="projectCreated" :Text="Text.AddProject"/>
        <SettingsWindow v-if="settingsOpen" @close-settings-window="settingsOpen = false" :Text="Text.Settings"/>
        <TitleBar/>

        <main class="w-screen flex grow">
            <Ribbon @open-add-project-window="addProjectOpen = true" @open-settings-window="settingsOpen = true" ref="ribbonComponent"/>
            <FileExplorer/>
            <section class="w-full flex flex-col overflow-hidden" style="height: calc(100vh - 2.5rem);">
                <ContentEditor />
            </section>
        </main>
    </main>
</template>

<script lang="ts">
import AddProject from './components/Popups/AddProject.vue';
import SettingsWindow from './components/Popups/SettingsWindow.vue';

import TitleBar from './components/TitleBar.vue';
import Ribbon from './components/Ribbon.vue';
import FileExplorer from './components/FileExplorer.vue';
import ContentEditor from './components/ContentEditor.vue';

const ipcRenderer = window.require('electron').ipcRenderer;

export default {
    components: {
        AddProject,
        SettingsWindow,
        TitleBar,
        Ribbon,
        FileExplorer,
        ContentEditor,
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
        setupApp() {
            const app = document.getElementById('app');

            ipcRenderer.send('setup-app');

            ipcRenderer.on('setup-app', (_, content: any) => {
                if (content.theme === 'dark') {
                    console.log('Theme is dark')
                    app?.classList.remove('dark'); //! CHANGE TO ADD
                }
                else {
                    console.log('Theme is light');
                    app?.classList.remove('dark');
                }

                this.Text = content.language;
            });
        },
        projectCreated() {
            this.addProjectOpen = false;

            const ribbonComponent = this.$refs.ribbonComponent as typeof Ribbon;
            ribbonComponent.loadProjects();
        },
    },
    mounted() {
        this.setupApp();
    },
    computed: {
        appHeight() {
            return window.innerHeight - 32 - 40;
        }
    }
}
</script>