<template>
    <main v-show="isVisible" :style="{ top: `${position.y}px`, left: `${position.x}px` }" class="absolute transition-opacity flex flex-col gap-3 dark:bg-od-context bg-ol-context p-1 rounded-lg z-50">

        <section v-for="(category, index) in categories" :key="index" class="w-full flex flex-col gap-0.5 items-center justify-start cursor-pointer">
          
          <div v-for="(item, index) in category.items" :key="index" class="w-full h-6 flex gap-2 px-2 place-items-center rounded-md transition-colors hover:dark:bg-od-hover-1 dark:text-od-icon hover:dark:text-white" @click="item.onClick">
            <Icon :icon="'tabler:' + item.icon" class="w-4 h-4" />
            <h1 class="text-sm font-normal">{{ item.name }}</h1>
          </div>

        </section>

        <section v-if="colorsShow" class="w-full flex flex-col gap-1 items-start px-2 py-1">
          <h1 class="text-xs dark:text-od-icon text-ol-icon cursor-default">Change color</h1>
          <div class="flex">
            <section class="flex gap-2">
              <div class="w-4 h-4 rounded-full bg-red-400 cursor-pointer"></div>
              <div class="w-4 h-4 rounded-full bg-yellow-400 cursor-pointer"></div>
              <div class="w-4 h-4 rounded-full bg-green-400 cursor-pointer"></div>
              <div class="w-4 h-4 rounded-full bg-blue-400 cursor-pointer" ></div>
              <div class="w-4 h-4 rounded-full bg-purple-400 cursor-pointer"></div>
            </section>
            <section>

            </section>
          </div>
        </section>

    </main>
</template>

<script lang="ts">
import { Icon } from '@iconify/vue';

interface Props {
  name: string
  items: {
    type: any
  }
}

export default {
  components: {
    Icon
  },
  data() {
    return {
      isVisible: false,
      position: { x: 0, y: 0 },
      colorsShow: false,
      categories: [] as Props[],
    };
  },
  methods: {
    toggleContextMenu(data: any, x: number, y: number, show?: boolean) {
      this.position.x = x;
      this.position.y = y;
      this.isVisible = true;
      this.categories = data;
      if(show) {
        this.colorsShow = show;
      }
      document.addEventListener('click', this.hideContextMenu);
    },
    hideContextMenu() {
      this.isVisible = false;
      document.removeEventListener('click', this.hideContextMenu);
    },
  }
};
</script>