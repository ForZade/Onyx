<template>
    <main :key="reloadKey" class="w-full h-full dark:bg-od-3 bg-ol-3">
        <AddProject v-if="addProjectOpen" @close-add-project="projectCreated" :Text="Text.AddProject"/>
        <SettingsWindow v-if="settingsOpen" @close-settings-window="settingsOpen = false" :Text="Text.Settings" @set-theme="setupApp"/>
        <AddFile v-if="addFileOpen" @close-add-file="addFileOpen = false"/>
        <RenameWindow v-if="renameWindowOpen" @close-rename-window="renameWindowOpen = false"/>

        <TitleBar/>

        <main class="w-screen flex grow">
            <Ribbon @open-add-project-window="addProjectOpen = true" @open-settings-window="settingsOpen = true" ref="ribbonComponent" @context-menu="showContextMenu" />
            <FileExplorer v-if="fileExplorer" @context-menu="showContextMenu" @add-file-open="addFileOpen = true" />
            <section class="w-full flex flex-col overflow-hidden" style="height: calc(100vh - 2.5rem);">
                <ContentEditor v-if="path !== 'NotLoaded'"/>
                <NoItemLoaded v-else/>
            </section>
        </main>
    </main>

    <ContextMenu ref="contextMenu"/>
</template>

<script lang="ts">
import AddProject from './components/Popups/AddProject.vue';
import SettingsWindow from './components/Popups/SettingsWindow.vue';
import AddFile from './components/Popups/AddFile.vue';
import RenameWindow from './components/Popups/RenameWindow.vue';

import TitleBar from './components/TitleBar.vue';
import Ribbon from './components/Ribbon.vue';
import FileExplorer from './components/FileExplorer.vue';
import ContentEditor from './components/ContentEditor.vue';
import NoItemLoaded from './components/NoItemLoaded.vue'

import ContextMenu from './components/ContextMenu.vue';

const ipcRenderer = window.require('electron').ipcRenderer;

export default {
    components: {
        AddProject,
        SettingsWindow,
        AddFile,
        RenameWindow,
        TitleBar,
        Ribbon,
        FileExplorer,
        ContentEditor,
        NoItemLoaded,
        ContextMenu,
    },
    data() {
        return {
            addProjectOpen: false as boolean,
            settingsOpen: false as boolean,
            addFileOpen: false as boolean,
            renameWindowOpen: false as boolean,

            fileExplorer: true as boolean,

            AddProjectText: {} as object,
            SettingsWindowText: {} as object,

            Text: {} as any,

            contextMenuVisible: false as boolean,
            x: 0 as number,
            y: 0 as number,
            contextMenuItems: [] as string[],

            path: '',
            reloadKey: 0
        }
    },
    created() {
        ipcRenderer.on('path-changed', (_, path: string) => {
            console.log(path);
            this.path = path
        })
    },
    methods: {
        closeAddFile() {
            this.addFileOpen = false;
            this.fileExplorer = false;
            setTimeout(() => {
                this.fileExplorer = true;
            }, 100)
        },
        checkPath() {
            ipcRenderer.send('get-config');
            ipcRenderer.on('get-config', (_, config: any) => {
                this.path = config.loadedFilePath;
                console.log(config.loadedFilePath);
            })
        },
        setupApp() {
            const app = document.getElementById('app');

            ipcRenderer.send('setup-app');

            ipcRenderer.on('setup-app', (_, content: any) => {
                if (content.theme === 'dark') {
                    console.log('Theme is dark')
                    app?.classList.add('dark'); //! CHANGE TO ADD
                }
                else {
                    console.log('Theme is light');
                    app?.classList.remove('dark');
                }

                this.Text = content.language;
            });
        },
        showContextMenu(event: MouseEvent, data: any, x: number, y: number, show?: boolean) {
            event.preventDefault();
            //@ts-ignore
            this.$refs.contextMenu.toggleContextMenu(data, x, y, show);
        },
        projectCreated() {
            this.addProjectOpen = false;

            const ribbonComponent = this.$refs.ribbonComponent as typeof Ribbon;
            ribbonComponent.loadProjects();
        },
    },
    mounted() {
        this.setupApp();
        this.checkPath();

        ipcRenderer.on('reload-components', () => {
            this.reloadKey += 1
        });

        ipcRenderer.on('open-rename-window', () => {
          this.renameWindowOpen = true;
        })
    },
    computed: {
        appHeight() {
            return window.innerHeight - 32 - 40;
        },
    }
}
</script>