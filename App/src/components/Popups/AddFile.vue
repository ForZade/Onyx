<template>
    <main class="dark:bg-od-darken bg-ol-darken backdrop-blur w-screen h-full absolute z-30 flex justify-center items-center overflow-hidden top-0 left-0" @click="cancelCreation">
        <div class="w-[300px] dark:bg-od-4 bg-ol-4 rounded-xl overflow-hidden">
            <section class="p-4 w-full grid place-items-center">
                <div class="w-4/5 flex flex-col gap-1">
                        <label for="noteName" class="flex flex-col text-sm dark:text-white text-black font-bold ml-1">Note name</label>
                        <input v-model="title" type="text" id="noteName" class="w-full border-none outline-none dark:bg-od-1 bg-ol-1 py-2 px-3 rounded-md dark:text-od-icon text-ol-icon text-base" placeholder="New Note" />
                    </div>
            </section>
            <nav class="h-16 w-full dark:bg-od-3 bg-ol-3 flex flex-row-reverse justify-between items-center px-4">
                <div 
                        v-for="button in actionButtons" 
                        :key="button.id" 
                        :class="button.class" 
                        class="h-min w-min rounded cursor-pointer select-none flex justify-center items-center gap-1 py-2 px-3"
                        @click="button.action"
                        >
                        <Icon :icon="button.icon" class="w-5 h-5"/>
                        {{  button.name }}
                </div>
            </nav>
        </div>
    </main>
</template>

<script lang="ts">
    import { Icon } from '@iconify/vue';
import { ipcRenderer } from 'electron';

    export default {
        data() {
            return {
                title: '',
                actionButtons: [
                { id: 0, name: "Create", icon: 'tabler:plus', class: 'bg-purple-500 text-white hover:bg-purple-400', action: this.createFile },
                { id: 1, name: "Cancel", icon: 'tabler:x', class: 'bg-transparent dark:text-white text-black hover:bg-od-hover-2', action: this.cancelCreation },
                ],
            }
        },
        methods: {
            cancelCreation(event:any) {
                if (event.target === event.currentTarget) {
                    this.$emit('close-add-file');
                }
                else if (event.key === 'Escape') {
                    this.$emit('close-add-file');
                }
            },
            createFile() {
                ipcRenderer.send('create-note', this.title);
                this.$emit('close-add-file')
            }
        }
    }
</script> 