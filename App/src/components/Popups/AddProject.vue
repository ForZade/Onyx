<template>
    <main class="bg-od-darken backdrop-blur w-screen h-full absolute z-30 flex justify-center items-center overflow-hidden top-0 left-0" @click="cancelCreation">
        <section class="w-[400px] h-[500px] bg-od-4 rounded-xl flex flex-col overflow-hidden">

            <section v-if="selectIconGUI" class="w-full grow flex flex-col justify-center items-center p-4 gap-3">
                <header class="w-full h-auto flex flex-col justify-center items-center gap-1">
                    <h1 class="text-white text-xl font-bold">Pick an icon</h1>
                    <input v-model="selected.name" type="text" id="projectName" class="w-full border-none outline-none bg-od-1 py-2 px-3 rounded-md text-od-icon text-base font-semibold" placeholder="Search" />
                </header>

                <section class="w-full h-[324px] bg-od-2 rounded-lg p-2 overflow-y-scroll scrollbar-hide">
                    <div class="w-full flex flex-wrap justify-start h-min gap-2">
                        <section v-if="isIconLoaded">
                            <div v-for="icon in icons" :key="icon" class="w-16 h-16 rounded-md dark:hover:bg-od-hover-1" @click="selectIcon(icon)">
                                <Icon :icon="icon" class="w-10 h-10" />
                            </div>
                        </section>

                        <section v-else class="flex justify-center items-center w-full h-full z-50">
                            <div class="loader"></div>
                        </section>
                    </div>
                </section>
            </section>

            <section v-else class="w-full grow flex flex-col justify-between items-center py-10">
                <div class="px-4">
                    <h1 class="text-2xl text-white font-bold text-center">Customize your project</h1>
                    <p class="text-base text-od-icon text-center px-6">Give your project a personality! Give it a name, a color and an icon!</p>
                </div>

                <div class="w-20 h-20 rounded-full grid place-items-center border-2 border-white border-dashed cursor-pointer" @click="iconMenu">
                    <Icon icon="tabler:folder" class="w-10 h-10 text-od-icon" />
                </div>

                <div class="w-4/5 flex flex-col gap-1">
                    <label for="projectName" class="flex flex-col text-sm text-white font-bold ml-1">Project Name</label>
                    <input v-model="selected.name" type="text" id="projectName" class="w-full border-none outline-none bg-od-1 py-2 px-3 rounded-md text-od-icon text-base" placeholder="New Project" />
                </div>

                <div class="w-4/5 flex flex-col gap-1">
                    <label for="projectColor" class="flex flex-col text-sm text-white font-bold ml-1">Project Color</label>
                    <div class="w-full h-14 flex text-white items-center justify-center select-none">
                        <!-- <div class="bg-od-2 h-full p-1.5 flex items-center gap-3 rounded-lg">
                            <div class="w-10 h-10 flex justify-center items-center">
                                <div class="color-picker outline-none w-6 h-6"></div>
                            </div>
                        </div> -->

                        <div class="bg-od-2 h-full py-2 px-3 flex items-center justify-evenly rounded-lg w-full">
                            <div v-for="color in givenColors" :key="color" class="w-6 h-6 rounded-full cursor-pointer" :class="[color, { 'selected-color': isColorSelected(color) }, { 'border-2 border-white': isColorSelected(color) }]" @click="selectColor(color)"></div>
                        </div>
                    </div>
                </div>
            </section>

            <nav class="h-16 w-full bg-od-3 flex flex-row-reverse justify-between items-center px-4">
                <div 
                    v-for="button in actionButtons" 
                    :key="button.id" 
                    :class="button.class" 
                    class="h-min w-min rounded cursor-pointer select-none flex justify-center items-center gap-1 py-2 px-3"
                    @click="button.action"
                    >
                    <Icon :icon="button.icon" class="w-5 h-5"/>
                    {{ button.label }}
                </div>
            </nav>
        </section>
    </main>
</template>

<script lang="ts">
import { Icon, listIcons } from '@iconify/vue';
const ipcRenderer = window.require('electron').ipcRenderer;

export default {
    name: "AddProject",
    components: {
        Icon
    },
    data() {
        return {
            selectIconGUI: false,
            actionButtons: [
                { id: 0, label: 'create', icon: 'tabler:plus', class: 'bg-purple-500 text-white hover:bg-purple-400', action: this.createProject },
                { id: 1, label: 'cancel', icon: 'tabler:x', class: 'bg-transparent text-white hover:bg-od-hover-2', action: this.cancelCreation },
            ],
            selected: {
                name: '',
                icon: '',
                color: '',
            },
            givenColors: [
                'bg-od-icon', 'bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-green-400', 'bg-cyan-400', 'bg-blue-400', 'bg-purple-400',
            ],

            isIconLoaded: false,
            icons: ['tabler:x'],

            loadingMessage: 'Loading icons...',
        }
    },
    methods: {
        selectColor(color:string) {
            this.selected.color = color;
            console.log(this.selected)
        },
        cancelCreation(event:any) {
            if (event.target === event.currentTarget) {
                this.$emit('close-add-project');
            }
            else if (event.key === 'Escape') {
                this.$emit('close-add-project');
            }
        },
        createProject() {
            const selectedProjectColor = this.selected.color || 'bg-od-icon';
            const projectName = this.selected.name.trim();
            const projectIcon = this.selected.icon || 'tabler:folder';

            const projectColor = selectedProjectColor.replace("bg-", "text-");
            

            ipcRenderer.send('create-folder', projectName, projectIcon, projectColor);
            this.$emit('close-add-project');
        },
        iconMenu() {
            this.selectIconGUI = !this.selectIconGUI;
            this.actionButtons.pop();
            this.actionButtons.push({ id: 1, label: 'back', icon: 'tabler:arrow-back', class: 'bg-transparent text-white hover:bg-od-hover-2', action: this.backAction },);
        },
        backAction() {
            this.selectIconGUI = !this.selectIcon;
            this.actionButtons.pop();
            this.actionButtons.push({ id: 1, label: 'cancel', icon: 'tabler:x', class: 'bg-transparent text-white hover:bg-od-hover-2', action: this.cancelCreation },);
        },

        loadIcons() {
            console.log(listIcons('', 'tabler'));
            // import('@iconify/vue').then((iconsModule:any) => {
            //     console.log(iconsModule.listIcons('tabler', ''));
            //     this.icons = iconsModule.tabler.defaults.icons;
            //     this.isIconLoaded = true;
            // }).catch(error => {
            //     console.error('Error loading icons:', error);
            // });
        },
        selectIcon(icon:any) {
            this.selected.icon = icon;
            this.backAction()
        },

        handleKeyPress(event: any) {
            if (event.key === 'Enter') {
                this.createProject();
            }

            if (event.key === 'Escape') {
                if (this.selectIconGUI) {
                    this.backAction();
                }
                else {
                    this.cancelCreation(event);
                }
            }
        },
    },
    computed: {
        isColorSelected() {
            return (color:string) => this.selected.color === color;
        },
    },
    mounted() {
        this.loadIcons();
        document.addEventListener('keyup', this.handleKeyPress);
    }
}
</script>

<style scoped>
.loader {
  width: 12px;
  aspect-ratio: 1;
  border-radius: 50%;
  animation: l5 1s infinite linear alternate;
}
@keyframes l5 {
    0%  {box-shadow: 20px 0 #9A85C7, -20px 0 #fff2;background: #9A85C7 }
    33% {box-shadow: 20px 0 #9A85C7, -20px 0 #fff2;background: #fff2}
    66% {box-shadow: 20px 0 #fff2,-20px 0 #9A85C7; background: #fff2}
    100%{box-shadow: 20px 0 #fff2,-20px 0 #9A85C7; background: #9A85C7 }
}
</style>
