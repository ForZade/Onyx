<template>
    <main class="p-8 h-full relative">
        <section class="mb-4">
            <h1 class="text-2xl dark:text-od-icon text-ol-icon font-bold">{{ Text.Headers.Icon }}</h1>
            <p class="pb-4 dark:text-od-icon text-ol-icon text-md">{{ Text.Descriptions.Icon }}</p>
            <div class="w-16 h-16 rounded-lg grid place-items-center dark:bg-od-hover-1 dark:hover:bg-od-hover-1.5 bg-ol-hover-1 hover:bg-ol-hover-1.5" @click="editIcon">
                <Icon :icon="'tabler:' + icon" class="w-12 h-12" :class="color"/>
            </div>
        </section>

        <section class="mb-4">
            <h1 class="text-2xl dark:text-od-icon text-ol-icon font-bold">{{ Text.Headers.Name }}</h1>
            <p class="pb-4 dark:text-od-icon text-ol-icon text-md">{{ Text.Descriptions.Name }}</p>
            <input type="text" class="w-2/3 h-8 p-4 rounded-lg grid place-items-center dark:text-od-icon dark:bg-od-hover-1 dark:hover:bg-od-hover-1.5 text-ol-icon bg-ol-hover-1 hover:bg-ol-hover-1.5 focus:border-none focus:outline-none" v-model="label"/>
        </section>

        <section class="mb-4">
            <h1 class="text-2xl dark:text-od-icon text-ol-icon font-bold">{{ Text.Headers.Color }}</h1>
            <p class="pb-4 dark:text-od-icon text-ol-icon text-md">{{ Text.Descriptions.Color }}</p>
            <div class="w-60 h-10 flex items-center justify-evenly rounded-md dark:bg-od-1 bg-ol-1">
                <div 
                    v-for="(color, index) in colors" :key="index" class="w-5 h-5 rounded-full" 
                    :class="[color, { 'selected-color': isColorSelected(color) }, { 'border-2 border-white': isColorSelected(color) }]" 
                    @click="selectColor(color)"></div>
            </div>
        </section>

        <section class="absolute bottom-0 right-0 w-full flex items-center justify-end gap-5">
            <button v-for="btn in Buttons" :key="btn.id"
                class="h-min w-min rounded-md cursor-pointer select-none flex justify-center items-center gap-1 py-2 px-3 bg-purple-400"
                :class="btn.class"
                @click="btn.action"
            >
                <Icon :icon="btn.icon" class="w-5 h-5"/>
                {{ Text.Buttons[btn.name] }}
            </button>
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
        project: {
            type: Object,
            default: () => ({}),
        },
        Text: {
            type: Object,
            default: () => ({}),
        }
    },
    data() {
        return {
            label: '' as string,
            color: '' as string,
            icon: '' as string,

            oldProjectName: '' as string,
            selectedColor: '' as string,
            colors: [
                'bg-od-icon', 'bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-green-400', 'bg-cyan-400', 'bg-blue-400', 'bg-purple-400',
            ] as string[],

            Buttons: [
                { id: 0, name: "Cancel", icon: 'tabler:x', class: 'bg-transparent dark:text-white text-black hover:bg-od-hover-2', action: this.cancelProjectChanges },
                { id: 1, name: "Save", icon: 'tabler:plus', class: 'bg-purple-500 text-white hover:bg-purple-400', action: this.saveProjectChanges },
            ]
        }
    },
    methods: {
        editIconMenu() {
            this.$emit('edit-icon');
        },
        editIcon() {
            console.log('Editing icon');
        },
        selectColor(color: string) {
            const newColor = color.replace("bg-", "text-");
            this.selectedColor = color;
            this.color = newColor;
        },
        saveProjectChanges() {
            ipcRenderer.send('change-project-config', this.label, this.color, this.icon, this.oldProjectName);
            this.$emit('close-settings-window');
        },
        cancelProjectChanges() {
            this.$emit('close-settings-window');
        }
    },
    mounted() {
        this.selectedColor = this.project.color;
        this.oldProjectName = this.project.label;

        this.color = this.project.color;
        this.label = this.project.label;
        this.icon = this.project.icon;

        console.log(this.icon);
    },
    computed: {
        isColorSelected() {
            return (color:string) => this.selectedColor === color;
        },
    }
}
</script>