<template>
    <nav class="w-full h-10 min-h-10 border-b border-od-2 bg-od-3 flex flex-row-reverse items-center justify-between gap-1">
        <section class="w-min h-min flex flex-row-reverse items-center gap-2 mr-2">
            <!-- <div v-for="(button, index) in buttons" :key="index" class="w-10 h-8 flex justify-center items-center cursor-pointer rounded-md dark:bg-od-2 dark:hover:bg-od-hover-1 bg-ol-2 hover:bg-ol-hover-1">
                <Icon :icon="button" class="w-5 h-5 dark:text-od-icon text-ol-icon"/>
            </div> -->

            <SearchBar/>
        </section>

        <!-- <section class="flex grow h-8 items-center dark:text-od-icon text-ol-icon truncate md:ml-4 lg:ml-8 xl:ml-12 gap-1">
        </section> -->

        <section class="w-min h-min flex flex-row items-center ml-2">
            <!-- <div v-for="(button, index) in actionButtons" :key="index" class="w-8 h-8 rounded-md grid place-items-center group hover:dark:bg-od-hover-1 hover:bg-ol-hover-1">
                <Icon :icon="button.icon" class="w-5 h-5 dark:text-od-icon dark:group-hover:text-od-accent text-ol-icon group-hover:text-ol-accent"/>
            </div> -->
        </section>
    </nav>
</template>

<script lang="ts">
import { Icon } from '@iconify/vue';
import SearchBar from './extras/SearchBar.vue';

export default {
    components: {
        Icon,
        SearchBar
    },
    data() {
        return {
            buttons: [
                'tabler:calendar', 'tabler:binary-tree'
            ],
            actionButtons: [
                { icon: 'tabler:arrow-left'},
                { icon: 'tabler:arrow-right'}
            ]
        }
    }
}
</script>