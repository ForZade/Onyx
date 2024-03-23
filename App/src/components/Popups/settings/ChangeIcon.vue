<template>
    <main class="p-8 h-full relative flex flex-col gap-6">
        <header class="w-full h-auto flex flex-col justify-center items-center gap-1">
            <h1 class="text-2xl dark:text-od-icon text-ol-icon font-bold text-start w-full">{{ Text.Headers.Icon }}</h1>
            <input type="text" v-model="searchText" id="projectName" class="w-full border-none outline-none dark:bg-od-1 bg-ol-1 py-2 px-3 rounded-md dark:text-od-icon text-ol-icon text-base font-semibold" :placeholder="Text.Search" />
        </header>

        <section class="w-full h-full dark:bg-od-2 bg-ol-2 rounded-lg p-2 overflow-y-scroll scrollbar-hide">
            <div class="w-full flex flex-wrap justify-start h-min gap-2">
                <div v-for="icon in filteredIcons" :key="icon" class="w-16 h-16 rounded-md dark:hover:bg-od-hover-1 hover:bg-ol-hover-1 grid place-items-center cursor-pointer" @click="selectIcon(icon)">
                    <Icon :icon="'tabler:' + icon" class="w-10 h-10 dark:text-od-icon text-ol-icon" />
                </div>
            </div>
        </section>
    </main>
</template>

<script lang="ts">
import { Icon } from '@iconify/vue';

export default {
    components: {
        Icon,
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
            icon: '' as string,
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
        }
    },
    methods: {
        selectIcon(icon: string) {
            this.icon = icon;
            this.$emit('back-action');
        }
    },
    computed: {
        filteredIcons() {
            return this.icons.filter(icon => icon.includes(this.searchText.toLowerCase()));
        }
    }
}
</script>