<template>
    <nav class="h-screen w-12 min-w-12 dark:bg-od-1 bg-ol-1 relative -mt-8">
        <div class="w-4 h-4 absolute top-8 -right-4 rounded-br-[50%] shadow-[5px_0_0_0] dark:text-od-1 text-ol-1 rotate-180 z-10"></div>

        <section class="h-full flex flex-col gap-2 justify-center items-center">
            <main class="w-full items-center flex flex-col gap-2 relative">
                <div 
                    v-for="(project, index) in Projects" 
                    :key="index" 
                    class="w-9 h-9 cursor-pointer rounded-xl grid place-items-center dark:hover:bg-od-hover-1 relative" 
                    @click="selectProject(project.label)" 
                    @contextmenu.prevent="showContextMenu($event, project.label)"
                >
                    <Icon :icon="'tabler:' + project.icon" class="w-7 h-7" :class="project.color"/>
                </div>
            </main>

            <hr v-if="Projects.length > 0" class="w-9 h-0.5 dark:bg-od-hover-1 bg-ol-hover-1 border-none rounded-full">

            <div class="group cursor-pointer w-9 h-9 rounded-xl grid place-items-center dark:bg-od-hover-1 dark:hover:bg-od-hover-1.5 bg-ol-hover-1 hover:bg-ol-hover-1.5" @click="addProject">
                <Icon icon="tabler:plus" class="w-7 h-7 dark:text-od-icon dark:group-hover:text-white group-hover:text-black" />
            </div>
        </section>

        <section class="w-full h-11 flex flex-col justify-evenly items-center absolute bottom-0 left-0">
            <div class="w-7 h-7 rounded-lg cursor-pointer grid place-items-center dark:hover:bg-od-hover-1 bg-ol-hover-1 hover:bg-ol-hover-1.5" @click="openSettings">
                <Icon icon="tabler:settings" class="w-5 h-5 dark:text-od-icon text-ol-icon" />
            </div>
        </section>
    </nav>

    
</template>

<script lang="ts">
import { Icon } from '@iconify/vue';
import ContextMenu from './ContextMenu.vue';
import Tooltip from './extras/ribbonTooltip.vue';
const ipcRenderer = window.require('electron').ipcRenderer;

export default {
    name: "Ribbon",
    components: {
        Icon,
        ContextMenu,
        Tooltip,
    },
    data() {
        return {
            tooltipIndex: null,
            tooltipTimeout: undefined,
            x: 0,
            y: 0,

            selectedProject: '',
            contextProject: '',
            Projects: [] as any,

            contextData: [
                {
                    category: "edit-project",
                    projectColors: true,
                    items: [
                        {
                            name: 'Rename',
                            icon: 'pencil',
                            onClick: () => {
                                console.log('Rename');
                            }
                        },
                        {
                            name: 'Delete',
                            icon: 'trash',
                            onClick: () => {
                                ipcRenderer.send('delete-project', this.contextProject);
                            }
                        }
                    ]
                },
            ]
        }
    },
    mounted() {
        // Call the IPC endpoint to get the initial list of folders
        this.loadProjects();
    },
    methods: {
        showContextMenu(event: MouseEvent, project: string) {
            event.preventDefault();
            this.contextProject = project;
            this.$emit('context-menu', event, this.contextData, event.clientX, event.clientY, true);
        },
        loadProjects() {
            ipcRenderer.invoke('get-folders', 'test').then((Projects) => {
                this.Projects = Projects;
            });
        },
        selectProject(project: string) {
            this.selectedProject = project;
            ipcRenderer.send('select-project', this.selectedProject);
            ipcRenderer.send('load-file-tree');
        },
        addProject() {
            this.$emit('open-add-project-window');
        },

        openSettings() {
            this.$emit('open-settings-window');
        }
    },
}
</script>

<style scoped>
/* nav:before {
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
} */

.text-red-400 {
    color: rgb(248 113 113);
}

.text-orange-400 {
    color: rgb(251 146 60);
}

.text-yellow-400 {
    color: rgb(250 204 21);
}

.text-green-400 {
    color: rgb(74 222 128);
}

.text-cyan-400 {
    color: rgb(34 211 238);
}

.text-blue-400 {
    color: rgb(96 165 250);
}

.text-purple-400 {
    color: rgb(192 132 252);
}
</style>