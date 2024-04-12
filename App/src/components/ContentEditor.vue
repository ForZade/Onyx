<template>
    <section class="py-4 2xl:px-96 xl:px-72 lg:px-40 sm:px-16 px-4 overflow-y-scroll overflow-x-hidden no-scrollbar relative flex grow flex-col">
        <main class="flex flex-col grow">
            <header class="mt-8">
                <div v-if="Editing">
                    <textarea
                        v-model="NewTitle"
                        ref="textareaField"
                        class="text-4xl w-full font-black pb-6 text-purple-300 bg-red-100 outline-none resize-none bg-transparent"
                        :style="{ height: 'auto' }"
                        rows="1"
                        @input="autoExpandTextarea"
                        @blur="saveTitle"
                        @keyup.enter="saveTitle"
                    ></textarea>
                </div>
                <div v-else class="w-full">
                    <h6
                        class="text-4xl font-black pb-6 text-purple-300 cursor-text break-all"
                        @click="startEditing"
                    >
                        {{ Title || "not named" }}
                    </h6>
                </div>
            </header>

            <section class="flex flex-col grow cursor-text text-lg" @click="focusOnElement">
                <Editor/>
            </section>
        </main>
    </section>
</template>

<script lang="ts">
import Editor from './Editor.vue';
import { Icon } from '@iconify/vue';

export default {
    components: {
        Icon,
        Editor,
    },
    data() {
        return {
            Editing: false,
            NewTitle: '',
            Title: '',
        }
    },
    methods: {
        focusOnElement() {
            const element = document.getElementById('editor');
            if (element) {
                element.focus();
            }
        },
        startEditing() {
            this.NewTitle = this.Title;
            this.Editing = true;

            this.$nextTick(() => {
                const textareaField = this.$refs.textareaField as HTMLTextAreaElement;
                textareaField.focus();
                this.autoExpandTextarea();
            });
        },
        saveTitle() {
            this.Editing = false;
            const newTitle = this.NewTitle.trim() === "" ? "not named" : this.NewTitle;
            this.Title = newTitle;
    
            // Send an IPC message to save the title in the main process
            // ipcRenderer.send('save-title', newTitle);
        },
        autoExpandTextarea() {
            const textareaField = this.$refs.textareaField as HTMLTextAreaElement; // Type assertion
            textareaField.style.height = "auto";
            textareaField.style.height = `${textareaField.scrollHeight}px`;
        }
    },
}
</script>