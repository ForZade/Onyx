<template>
    <AddProject v-if="addProjectOpen" @close-add-project="addProjectOpen = false"/>
    <TitleBar/>

    <main class="w-screen flex grow">
        <Ribbon @open-add-project-window="addProjectOpen = true"/>
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
    }
}
</script>