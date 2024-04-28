<template>
    <section v-if="editor" class="w-full p-2 flex gap-4 lg:gap-10 justify-center items-center sticky top-0 border-b dark:border-od-1 border-ol-1">
            <div class="w-3/4 flex justify-start md:justify-around rounded-lg z-10 dark:bg-od-2 flex-wrap py-0.5 dark:text-slate-100 text-slate-800">
                <button @click="editor.chain().focus().toggleBold().run()" :disabled="!editor.can().chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }" class="w-8 h-8 dark:bg-od-hover-2.5 dark:hover:bg-od-hover-2 bg-ol-hover-2.5 hover:bg-ol-hover-2 rounded-lg grid place-items-center">
                    <Icon icon="tabler:bold" class="w-6 h-6 text-slate-800 dark:text-slate-100" />
                </button>

                <button @click="editor.chain().focus().toggleItalic().run()" :disabled="!editor.can().chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }" class="w-8 h-8 dark:bg-od-hover-2.5 dark:hover:bg-od-hover-2 bg-ol-hover-2.5 hover:bg-ol-hover-2 rounded-lg grid place-items-center">
                    <Icon icon="tabler:italic" class="w-6 h-6 text-slate-800 dark:text-slate-100" />
                </button>

                <button @click="editor.chain().focus().toggleStrike().run()" :disabled="!editor.can().chain().focus().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }" class="w-8 h-8 dark:bg-od-hover-2.5 dark:hover:bg-od-hover-2 bg-ol-hover-2.5 hover:bg-ol-hover-2 rounded-lg grid place-items-center">
                    <Icon icon="tabler:strikethrough" class="w-6 h-6 text-slate-800 dark:text-slate-100" />
                </button>

                <button @click="editor.chain().focus().unsetAllMarks().run()" class="w-8 h-8 dark:bg-od-hover-2.5 dark:hover:bg-od-hover-2 bg-ol-hover-2.5 hover:bg-ol-hover-2 rounded-lg grid place-items-center">
                    <Icon icon="tabler:clear-formatting" class="w-6 h-6 text-slate-800 dark:text-slate-100"/>
                </button>

                <button @click="editor.chain().focus().setParagraph().run()" :class="{ 'is-active': editor.isActive('paragraph') }" class="w-8 h-8 dark:bg-od-hover-2.5 dark:hover:bg-od-hover-2 bg-ol-hover-2.5 hover:bg-ol-hover-2 rounded-lg grid place-items-center">
                    <Icon icon="tabler:menu-deep" class="w-6 h-6 text-slate-800 dark:text-slate-100"/>
                </button>

                <button @click="editor.chain().focus().toggleHeading({ level: 1 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }" class="w-8 h-8 dark:bg-od-hover-2.5 dark:hover:bg-od-hover-2 bg-ol-hover-2.5 hover:bg-ol-hover-2 rounded-lg grid place-items-center">
                    <Icon icon="tabler:h-1" class="w-6 h-6 text-slate-800 dark:text-slate-100"/>
                </button>

                <button @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }" class="w-8 h-8 dark:bg-od-hover-2.5 dark:hover:bg-od-hover-2 bg-ol-hover-2.5 hover:bg-ol-hover-2 rounded-lg grid place-items-center">
                    <Icon icon="tabler:h-2" class="w-6 h-6 text-slate-800 dark:text-slate-100" />
                </button>

                <button @click="editor.chain().focus().toggleHeading({ level: 3 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }" class="w-8 h-8 dark:bg-od-hover-2.5 dark:hover:bg-od-hover-2 bg-ol-hover-2.5 hover:bg-ol-hover-2 rounded-lg grid place-items-center">
                    <Icon icon="tabler:h-3" class="w-6 h-6 text-slate-800 dark:text-slate-100" />
                </button>

                <button @click="editor.chain().focus().toggleBulletList().run()" :class="{ 'is-active': editor.isActive('bulletList') }" class="w-8 h-8 dark:bg-od-hover-2.5 dark:hover:bg-od-hover-2 bg-ol-hover-2.5 hover:bg-ol-hover-2 rounded-lg grid place-items-center">
                    <Icon icon="tabler:list" class="w-6 h-6 text-slate-800 dark:text-slate-100" />
                </button>

                <button @click="editor.chain().focus().toggleOrderedList().run()" :class="{ 'is-active': editor.isActive('orderedList') }" class="w-8 h-8 dark:bg-od-hover-2.5 dark:hover:bg-od-hover-2 bg-ol-hover-2.5 hover:bg-ol-hover-2 rounded-lg grid place-items-center">
                    <Icon icon="tabler:list-numbers" class="w-6 h-6 text-slate-800 dark:text-slate-100" />
                </button>

                <button @click="editor.chain().focus().toggleCodeBlock().run()" :class="{ 'is-active': editor.isActive('codeBlock') }" class="w-8 h-8 dark:bg-od-hover-2.5 dark:hover:bg-od-hover-2 bg-ol-hover-2.5 hover:bg-ol-hover-2 rounded-lg grid place-items-center">
                    <Icon icon="tabler:code" class="w-6 h-6 text-slate-800 dark:text-slate-100" />
                </button>

                <button @click="editor.chain().focus().toggleBlockquote().run()" :class="{ 'is-active': editor.isActive('blockquote') }" class="w-8 h-8 dark:bg-od-hover-2.5 dark:hover:bg-od-hover-2 bg-ol-hover-2.5 hover:bg-ol-hover-2 rounded-lg grid place-items-center">
                    <Icon icon="tabler:quote" class="w-6 h-6 text-slate-800 dark:text-slate-100" />
                </button>

                <button @click="editor.chain().focus().setHorizontalRule().run()" class="w-8 h-8 dark:bg-od-hover-2.5 dark:hover:bg-od-hover-2 bg-ol-hover-2.5 hover:bg-ol-hover-2 rounded-lg grid place-items-center">
                    <Icon icon="tabler:minus" class="w-6 h-6 text-slate-800 dark:text-slate-100" />
                </button>

                <button @click="editor.chain().focus().undo().run()" :disabled="!editor.can().chain().focus().undo().run()" class="w-8 h-8 dark:bg-od-hover-2.5 dark:hover:bg-od-hover-2 bg-ol-hover-2.5 hover:bg-ol-hover-2 rounded-lg grid place-items-center">
                    <Icon icon="tabler:arrow-back" class="w-6 h-6 text-slate-800 dark:text-slate-100"/>
                </button>

                <button @click="editor.chain().focus().redo().run()" :disabled="!editor.can().chain().focus().redo().run()" class="w-8 h-8 dark:bg-od-hover-2.5 dark:hover:bg-od-hover-2 bg-ol-hover-2.5 hover:bg-ol-hover-2 rounded-lg grid place-items-center">
                    <Icon icon="tabler:arrow-forward" class="w-6 h-6 text-slate-800 dark:text-slate-100"/>
                </button>

                <button @click="console.log(editor)" :disabled="!editor.can().chain().focus().redo().run()" class="w-8 h-8 dark:bg-od-hover-2.5 dark:hover:bg-od-hover-2 bg-ol-hover-2.5 hover:bg-ol-hover-2 rounded-lg grid place-items-center">
                    <Icon icon="tabler:x" class="w-6 h-6 text-slate-800 dark:text-slate-100"/>
                </button>

                <button @click="setData" class="w-8 h-8 dark:bg-od-hover-2.5 dark:hover:bg-od-hover-2 bg-ol-hover-2.5 hover:bg-ol-hover-2 rounded-lg grid place-items-center">
                    <Icon icon="tabler:bucket" class="w-6 h-6 text-slate-800 dark:text-slate-100"/>
                </button>
            </div>

            <div class="py-0.5 px-1 flex gap-1 rounded-lg dark:bg-od-2 bg-ol-2 dark:text-slate-100 text-slate-800">
                <div v-for="(option, index) in options" :key="index" class="option-container relative w-8 h-8 dark:bg-od-2.5 dark:hover:bg-od-hover-2 bg-ol-hover-2.5 hover:bg-ol-hover-2 rounded-lg grid place-items-center">
                    <input type="radio" :id="'option' + index" name="options" :value="option.value" v-model="selectedOption" class="z-10 w-8 h-8 absolute top-0 left-0 opacity-0">
                    <Icon :icon="option.icon" class="w-6 h-6 z-0 transition-colors" :class="{ 'dark:text-od-accent text-purple-400': isSelected(index), 'dark:text-slate-100': !isSelected(index) }"/>
                </div>
            </div>

        </section>
    <section class="py-4 2xl:px-96 xl:px-72 lg:px-40 sm:px-16 px-4 overflow-y-scroll overflow-x-hidden no-scrollbar relative flex grow flex-col">
        <main class="flex flex-col grow">
            <header class="mt-8">
                <div class="w-full">
                    <h6
                        class="text-4xl font-black pb-6 text-purple-300 cursor-text break-all"
                    >
                        {{ title || "not named" }}
                    </h6>
                </div>
            </header>

            <section class="flex flex-col grow cursor-text text-lg" @click="focusOnElement">
                <editor-content :editor="editor" class="text-slate-100" spellcheck="false"/>
            </section>
        </main>
    </section>
</template>

<script lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import { Icon } from '@iconify/vue';
import { ipcRenderer } from 'electron';

export default {
    components: {
        Icon,
        EditorContent,
    },
    data() {
        return {
            selectedOption: 'option1',
            options: [
                { value: 'option1', icon: 'tabler:pencil' },
                { value: 'option2', icon: 'tabler:book' }
            ],
            Editing: false,
            title: '',
            i: 0,
            data: {}
        }
    },
    setup() {

        const editor = useEditor({
            editorProps: {
                    attributes: {
                    class: 'prose-default dark:prose-dark prose-sm lg:prose-lg xl:prose-xl mx-auto focus:outline-none text-slate-800 dark:text-slate-100',
                    },
            },
            content: 'hello',
            extensions: [StarterKit],
            onUpdate: ({ editor }) => {
                    const json = editor.getJSON();
                    ipcRenderer.send('save-file', json);
            },
        });
        
        return { editor };
    },
    watch: {
        editable() {
            //@ts-ignore
            this.editor.setEditable(this.option1); //! FIX THIS
        },
    },
    methods: {
        setData(data: any) {
            this.editor?.chain().focus().setContent(data).run()
        },
        focusOnElement() {
            const element = document.getElementById('editor');
            if (element) {
                element.focus();
            }
        },
        isSelected(index: number) {
            return this.selectedOption === this.options[index].value;
        }
    },
    mounted() {
        ipcRenderer.send('open-file');
    
        ipcRenderer.on('open-file', (_, data: any, title: string) => {
            this.data = JSON.parse(data);
            console.log(this.data, title);
            this.setData(this.data);
            this.title = title;
        });
    }
}
</script>