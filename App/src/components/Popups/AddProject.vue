<template>
    <main class="dark:bg-od-darken bg-ol-darken backdrop-blur w-screen h-full absolute z-30 flex justify-center items-center overflow-hidden top-0 left-0" @click="cancelCreation">
        <section class="w-[400px] h-[500px] dark:bg-od-4 bg-ol-4 rounded-xl flex flex-col overflow-hidden">

            <section v-if="selectIconGUI" class="w-full grow flex flex-col justify-center items-center p-4 gap-3">
                <header class="w-full h-auto flex flex-col justify-center items-center gap-1">
                    <h1 class="dark:text-white text-black text-xl font-bold">{{ Text.Icon }}</h1>
                    <input type="text" v-model="searchText" id="projectName" class="w-full border-none outline-none dark:bg-od-1 bg-ol-1 py-2 px-3 rounded-md dark:text-od-icon text-ol-icon text-base font-semibold" :placeholder="Text.Search" />
                </header>

                <section class="w-full h-[324px] dark:bg-od-2 bg-ol-2 rounded-lg p-2 overflow-y-scroll scrollbar-hide">
                    <div class="w-full flex flex-wrap justify-start h-min gap-2">
                        <div v-for="icon in filteredIcons" :key="icon" class="w-16 h-16 rounded-md dark:hover:bg-od-hover-1 hover:bg-ol-hover-1 grid place-items-center cursor-pointer" @click="selectIcon(icon)">
                            <Icon :icon="'tabler:' + icon" class="w-10 h-10 dark:text-od-icon text-ol-icon" />
                        </div>
                    </div>
                </section>
            </section>

            <section v-else class="w-full grow flex flex-col justify-between items-center py-10">
                <div class="px-4">
                    <h1 class="text-2xl text-white font-bold text-center">{{ Text.Header }}</h1>
                    <p class="text-base text-od-icon text-center px-6">{{ Text.Description }}</p>
                </div>

                <div class="w-20 h-20 rounded-full grid place-items-center border-2 dark:border-white border-black border-dashed cursor-pointer" @click="iconMenu">
                    <Icon :icon="'tabler:' + selected.icon" class="w-10 h-10" :class="selected.color"/>
                </div>

                <div class="w-4/5 flex flex-col gap-1">
                    <label for="projectName" class="flex flex-col text-sm dark:text-white text-black font-bold ml-1">{{ Text.Name }}</label>
                    <input v-model="selected.name" type="text" id="projectName" class="w-full border-none outline-none dark:bg-od-1 bg-ol-1 py-2 px-3 rounded-md dark:text-od-icon text-ol-icon text-base" placeholder="New Project" />
                </div>

                <div class="w-4/5 flex flex-col gap-1">
                    <label for="projectColor" class="flex flex-col text-sm dark:text-white text-black font-bold ml-1">{{ Text.Color }}</label>
                    <div class="w-full h-14 flex dark:text-white text-black items-center justify-center select-none">
                        <!-- <div class="bg-od-2 h-full p-1.5 flex items-center gap-3 rounded-lg">
                            <div class="w-10 h-10 flex justify-center items-center">
                                <div class="color-picker outline-none w-6 h-6"></div>
                            </div>
                        </div> -->

                        <div class="dark:bg-od-2 bg-ol-2 h-full py-2 px-3 flex items-center justify-evenly rounded-lg w-full">
                            <div v-for="color in givenColors" :key="color" class="w-6 h-6 rounded-full cursor-pointer" :class="[color, { 'selected-color': isColorSelected(color) }, { 'border-2 border-white': isColorSelected(color) }]" @click="selectColor(color)"></div>
                        </div>
                    </div>
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
                    {{ Text.Buttons[button.name] }}
                </div>
            </nav>
        </section>
    </main>
</template>

<script lang="ts">
import { Icon } from '@iconify/vue';
const ipcRenderer = window.require('electron').ipcRenderer;

export default {
    name: "AddProject",
    components: {
        Icon
    },
    props: {
        Text: {
            type: Object,
            default: () => ({}),
        }
    },
    data() {
        return {
            searchText: '' as string,
            selectIconGUI: false as boolean,
            actionButtons: [
                { id: 0, name: "Create", icon: 'tabler:plus', class: 'bg-purple-500 text-white hover:bg-purple-400', action: this.createProject },
                { id: 1, name: "Cancel", icon: 'tabler:x', class: 'bg-transparent dark:text-white text-black hover:bg-od-hover-2', action: this.cancelCreation },
            ],
            selected: {
                name: '',
                icon: 'folder',
                color: 'text-od-icon',
            },
            givenColors: [
                'bg-od-icon', 'bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-green-400', 'bg-cyan-400', 'bg-blue-400', 'bg-purple-400',
            ],

            icons: [ 
                'alert-circle', 'app-window', 'apps', 'bandage', 'basket', 'book',
                'braces', 'brackets', 'brand-adobe', 'brand-airbnb', 'brand-amd',
                'brand-amazon', 'brand-android', 'brand-apple', 'brand-aws', 'brand-azure',
                'brand-bing', 'brand-blender', 'brand-bluesky', 'brand-booking', 'brand-bootstrap',
                'brand-chrome', 'brand-cloudflare', 'brand-codepen', 'brand-css3', 'brand-debian',
                'brand-deno', 'brand-discord', 'brand-docker', 'brand-dribbble',
                'brand-edge', 'brand-facebook', 'brand-figma', 'brand-firefox', 'brand-flickr',
                'brand-flutter', 'brand-foursquare', 'brand-github', 'brand-gitlab', 'brand-google',
                'brand-google-play', 'brand-gravatar', 'brand-html5', 'brand-instagram',
                'brand-intercom', 'brand-javascript', 'brand-kotlin', 'brand-laravel',
                'brand-linkedin', 'brand-messenger', 'brand-netbeans', 'brand-nodejs',
                'brand-openvpn', 'brand-opera', 'brand-paypal', 'brand-php', 'brand-pinterest',
                'brand-polymer', 'brand-python', 'brand-react', 'brand-reddit',
                'brand-sass', 'brand-snapchat', 'brand-soundcloud', 'brand-spotify', 'brand-stackoverflow',
                'brand-steam', 'brand-stripe', 'brand-svelte', 'brand-tabler', 'brand-tailwind',
                'brand-tiktok', 'brand-twitch', 'brand-twitter', 'brand-ubuntu', 'brand-vue',
                'brand-whatsapp', 'brand-windows', 'brand-youtube', 'brand-zoom',
                'briefcase', 'broadcast', 'browser', 'brush', 'bug', 'building', 'bulb', 'calendar',
                'camera', 'car', 'cast', 'check', 'checklist', 'chevron-down', 'chevron-left', 'chevron-right',
                'chevron-up', 'chevrons-down', 'chevrons-left', 'chevrons-right', 'chevrons-up', 'circle', 'clipboard',
                'clock', 'cloud', 'cloud-upload', 'code', 'coffee', 'columns',
                'command', 'compass', 'copy', 'copyleft', 'copyright', 'crown', 'cube', 'cut',
                'device-desktop', 'device-laptop', 'device-mobile', 'device-tablet', 'diamond', 'direction',
                'disc', 'discount', 'divide', 'download', 'droplet', 'edit',
                'eye', 'eye-off', 'feather', 'file', 'file-plus',
                'file-text', 'filter', 'flag', 'folder',
                'gift', 'git-branch', 'git-commit', 'git-merge', 'git-pull-request',
                'globe', 'grid', 'hash', 'headphones', 'heart', 'help-circle', 'home',
                'inbox', 'italic', 'key', 'layout', 'link', 'list', 'loader', 'lock', 'mail',
                'map', 'map-pin', 'menu', 'message-circle', 'minus', 'moon', 'music', 'navigation', 'octagon', 'package',
                'paperclip', 'pause', 'phone', 'phone-call', 'play', 'printer', 'radio', 'repeat', 'rss', 'scissors',
                'search', 'send', 'server', 'settings', 'share', 'share-2', 'shield', 'shield-off',
                'shopping-bag', 'shopping-cart', 'skip-back', 'skip-forward','slash','square', 'star',
                'sun', 'sunrise', 'sunset', 'tag', 'target', 'terminal',
                'thermometer', 'toggle-left', 'toggle-right', 'tool',
                'trash', 'trending-down', 'trending-up', 'triangle', 'truck',
                'umbrella', 'underline', 'upload',
                'user', 'user-check', 'user-minus', 'user-plus', 'user-x',
                'users', 'video', 'video-off', 'volume', 'volume-2',
                'wifi', 'wifi-off', 'wind', 'x','zoom-in', 'zoom-out',
            ] as string[],
            language: 'en' as string,
        }
    },
    methods: {
        getConfig() {
            ipcRenderer.invoke('get-config').then((config: any) => {
                this.language = config.language;
            });
        },
        selectColor(color:string) {
            const newColor = color.replace("bg-", "text-");
            this.selected.color = newColor;
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
            const projectColor = this.selected.color || 'text-od-icon';
            const projectName = this.selected.name.trim();
            const projectIcon = this.selected.icon || 'tabler:folder';
            
            ipcRenderer.send('create-folder', projectName, projectIcon, projectColor);
            this.$emit('close-add-project');
        },
        iconMenu() {
            this.selectIconGUI = !this.selectIconGUI;
            this.actionButtons.pop();
            this.actionButtons.push({ id: 1, name: 'Back', icon: 'tabler:arrow-back', class: 'bg-transparent text-white hover:bg-od-hover-2', action: this.backAction },);
        },
        backAction() {
            this.selectIconGUI = !this.selectIcon;
            this.actionButtons.pop();
            this.actionButtons.push({ id: 1, name: 'Cancel', icon: 'tabler:x', class: 'bg-transparent text-white hover:bg-od-hover-2', action: this.cancelCreation },);
        },

        selectIcon(icon:any) {
            this.selected.icon = icon;
            this.backAction()
            console.log(this.selected.icon);
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
        filteredIcons() {
            return this.icons.filter(icon => icon.includes(this.searchText.toLowerCase()));
        }
    },
    mounted() {
        this.getConfig();
        document.addEventListener('keyup', this.handleKeyPress);

        console.log(this.Text);
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
