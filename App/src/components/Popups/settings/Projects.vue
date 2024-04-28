<template>
    <main class="p-8">
        <section>
            <h1 class="text-2xl dark:text-od-icon text-ol-icon font-bold">{{ Text.Header }}</h1>
            <p class="pb-4 dark:text-od-icon text-ol-icon text-md">{{ Text.Description }}</p>
            <div class="flex flex-wrap items-center justify-start gap-6">
                <div 
                    v-for="(project, index) in Projects" 
                    :key="index" 
                    class="w-12 h-12 rounded-md grid place-items-center cursor-pointer dark:bg-od-hover-1 dark:hover:bg-od-hover-1.5 bg-ol-hover-1 hover:bg-ol-hover-1.5" 
                    @click="selectProject(project)"
                >
                    <Icon :icon="'tabler:' + project.icon" class="w-8 h-8" :class="project.color"/>
                </div>
            </div>
        </section>
    </main>
</template>

<script lang="ts">
import { Icon } from '@iconify/vue';
const ipcRenderer = window.require('electron').ipcRenderer;

export default {
    components: {
        Icon,
    },
    props: {
        Text: {
            type: Object,
            default: () => ({}),
        },
    },
    data() {
        return {
            Projects: [] as any,
        }
    },
    methods: {
        loadProjects() {
            ipcRenderer.invoke('get-folders', 'test').then((projects) => {
                this.Projects = projects;
            });
        },
        selectProject(project: string) {
            this.$emit('edit-project', project);
            console.log('selected')
        }
    },
    mounted() {
        this.loadProjects();
    }
}
</script>