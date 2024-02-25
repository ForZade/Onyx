<template>
    <main class="p-8">
        <section>
            <h1 class="text-2xl dark:text-od-icon text-ol-icon font-bold pb-4">Theme</h1>
            <div class="flex items-center justify-start gap-6">
                <div 
                    v-for="theme in themes" 
                    :key="theme" 
                    class="w-10 h-10 rounded-full grid place-items-center" 
                    :class="[theme.color, { 'outline-offset-2 outline outline-2 dark:outline-od-accent': setTheme === theme.label }]"
                    @click="changeTheme(theme.label)"
                >
                    <Icon :icon="theme.icon" class="w-6 h-6" :class="theme.iconColor"/>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
import { Icon } from '@iconify/vue';

export default {
    components: {
        Icon,
    },
    data() {
        return {
            setTheme: 'light',
            themes: [
                { label: 'light', color: 'bg-ol-1', icon: 'tabler:sun', iconColor: 'text-ol-3' },
                { label: 'dark', color: 'bg-od-2', icon: 'tabler:moon', iconColor: 'text-od-4' },
                { label: 'system', color: 'dark:bg-od-2 bg-ol-2', icon: 'tabler:device-desktop', iconColor: 'dark:text-od-4 text-ol-3' },
            ],
        }
    },
    methods: {
        changeTheme(theme) {
            this.setTheme = theme;
            this.$emit('theme-changed', theme);
        }
    },
}
</script>