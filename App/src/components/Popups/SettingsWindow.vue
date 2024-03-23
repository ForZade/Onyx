<template>
    <main class="dark:bg-od-darken bg-ol-darken backdrop-blur w-screen h-full absolute z-30 flex justify-center items-center overflow-hidden top-0 left-0" @click="cancelCreation">
        <section class="min-w-[700px] min-h-[500px] w-3/4 h-3/4 dark:bg-od-4 bg-ol-4 rounded-xl flex overflow-hidden">
            <nav class="min-w-[160px] w-3/12 h-full dark:bg-od-3 bg-ol-3">
                <h1 class="px-4 pt-4 text-xl dark:text-white text-black font-bold">{{ Text.Options }}</h1>
                <ul class="w-full p-4 flex flex-col gap-3 select-none">
                    <li v-for="(item, index) in settingList" :key="index" class="group flex gap-2 cursor-pointer dark:text-od-icon text-ol-icon" @click="openPage = item.id">
                        <span 
                            class="w-7 h-7 rounded-md grid place-items-center" 
                            :class="openPage === item.id ? 'bg-purple-400 dark:text-white' : ' dark:group-hover:bg-od-hover-1 group-hover:bg-ol-hover-1'
                        ">
                            <Icon :icon="`tabler:` + item.icon" class="w-5 h-5"/>
                        </span>
                        <p class="text-md mt-px">{{ Text[item.name].ModuleName }}</p>
                    </li>
                </ul>
            </nav>

            <section class="w-full h-full p-4">
                <component v-if="openPage <= 99" :is="settingList[openPage].name" @edit-project="editProject" :Text="Text[settingList[openPage].name]" />
                <Project v-if="openPage === 100" :project="selectedProject" :Text="Text.Project" @close-settings-window="this.$emit('close-settings-window')" @open-icon-change="openIconChange" :Icon="this.icon"/>
                <ChangeIcon v-if="openPage === 101" @back-action="openPage = 100" :Text="Text.Project" :Icon="this.icon" />
            </section>
        </section>
    </main>
</template>

<script></script>

<script lang="ts">
import { Icon } from '@iconify/vue';

import Appearance from './settings/Appearance.vue';
import Projects from './settings/Projects.vue';
import Project from './settings/Project.vue';
import ChangeIcon from './settings/ChangeIcon.vue';

export default {
    components: {
        Icon,
        Appearance,
        Projects,
        Project,
        ChangeIcon,
    },
    props: {
        Text: Object,
    },
    data() {
        return {
            openPage: 101 as number,
            selectedProject: {} as object,
            icon: '' as string,
            settingList: [
                { id: 0, name: 'General', icon: 'settings' },
                { id: 1, name: 'Appearance', icon: 'palette' },
                { id: 2, name: 'Projects', icon: 'folders' },
            ] as object[],
            language: 'en' as string,
        }
    },
    methods: {
        openIconChange(icon: string) {
            this.openPage = 101;
            this.icon = icon;
        },
        changeIcon(newIcon: string) {
            this.openPage = 100;
            this.icon = newIcon;
        },
        cancelCreation(event:any) {
            if (event.target === event.currentTarget) {
                this.$emit('close-settings-window');
            }
            else if (event.key === 'Escape') {
                this.$emit('close-settings-window');
            }
        },
        editProject(project: object) {
            console.log(project)
            this.openPage = 100;
            this.selectedProject = project;
        },
        closeProject() {
            this.openPage = 2;
            this.selectedProject = {};
        },
        openSettingsPage(page: number) {
            this.openPage = page;
        },
    },
    mounted() {
        console.log(this.Text);
    },
}
</script>