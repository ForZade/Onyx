<template>
    <section class="w-min h-min rounded-md flex dark:bg-od-1 transition-transform" :class="expanded ? 'pl-2' : 'pl-0'">
        <input 
            type="text" 
            id="search" 
            class="h-8 bg-transparent dark:text-od-icon text-ol-icon focus:outline-none transition-[width] text-sm select-none" 
            :class="expanded ? 'w-64' : 'w-0'"
            placeholder="Search"
        >

        <div class="w-10 h-8 rounded-md grid place-items-center dark:hover:bg-od-hover-1 hover:bg-ol-hover-1 transition-colors" @click="expanded = !expanded">
            <Icon icon="tabler:search" class="w-5 h-5 dark:text-od-icon text-ol-icon" />
        </div>
    </section>
</template>

<script lang="ts">
import { Icon } from '@iconify/vue';

export default {
    components: {
        Icon
    },
    data() {
        return {
            expanded: false,
        }
    }
}
</script>