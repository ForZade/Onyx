<template>
    <AddProject v-if="addProjectOpen" @close-add-project="projectCreated"/>
    <TitleBar/>

    <main class="w-screen flex grow">
        <Ribbon @open-add-project-window="addProjectOpen = true" ref="ribbonComponent"/>
    </main>
</template>

<script setup lang="ts">
import AddProject from './components/Popups/AddProject.vue';

import TitleBar from './components/TitleBar.vue';
import Ribbon from './components/Ribbon.vue';
</script>

<script lang="ts">
export default {
    data() {
        return {
            addProjectOpen: false,
        }
    },
    methods: {
        projectCreated() {
            this.addProjectOpen = false;

            const ribbonComponent = this.$refs.ribbonComponent as typeof Ribbon;
            ribbonComponent.loadProjects();
        }
    }
}
</script>