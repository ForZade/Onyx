<template>
    <aside ref="nav" class="relative dark:bg-od-2 bg-ol-2" :style="resizableDivStyle">
        <div class="w-4 h-4 absolute top-0 -right-4 rounded-br-[50%] shadow-[10px_0_0_0] dark:text-od-2 text-ol-2 rotate-180 z-0"></div>

        <header class="w-full p-2 flex items-center justify-between">
          <h1 class="font-bold dark:text-od-icon text-ol-icon">{{ projectName }}</h1>

          <div class="w-6 h-6 rounded-md dark:hover:bg-od-hover-1 hover:bg-ol-hover-1 grid place-items-center cursor-pointer" @click="addFile">
            <Icon icon="tabler:file-plus" class="w-5 h-5 dark:text-od-icon text-ol-icon" />
          </div>
        </header>

        <TreeGrid :treeData="treeData" @context-menu="showContextMenu" class="mt-1"/>

        <div class="w-3 h-full absolute top-0 right-0 cursor-col-resize grid place-items-center group" @mousedown="startResize">
            <div class="w-1 h-1/2 group-hover:bg-od-accent rounded-full"></div>
        </div>
    </aside>

    <ContextMenu ref="contextMenu"/>
</template>

<script lang="ts">
import { Icon } from '@iconify/vue';
import { ipcRenderer } from 'electron';
import TreeGrid from './FileExplorer/TreeGrid.vue';
import ContextMenu from './ContextMenu.vue';

export default {
    components: {
        Icon,
        TreeGrid,
        ContextMenu,
    },
    data() {
      return {
        isResizing: false,
        initialMouseX: 0,
        initialWidth: 240,
        minWidth: 160,
        hideWidth: 60,
        maxWidthPercentage: 80,
        width: 280,
  
        isNavHidden: false,

        treeData: [],
        projectName: '',
      };
    },
    computed: {
      resizableDivStyle() {
        return {
          width: `${this.width}px`,
        };
      },
    },
    methods: {
      addFile() {
        this.$emit('add-file-open');
      },
      showContextMenu(event: MouseEvent, data: any, x: number, y: number, show?: boolean) {
        event.preventDefault();
        this.$emit('context-menu', event, data, x, y, show);
      },
       toggleNav() {
        this.isNavHidden = !this.isNavHidden;
        //@ts-ignore
        this.$refs.nav.style.display = this.isNavHidden ? "none" : "block";
      },
      startResize(event: Event) {
        event.preventDefault();
        this.isResizing = true;
        //@ts-ignore
        this.initialMouseX = event.clientX;
        this.initialWidth = this.width;
  
        window.addEventListener("mousemove", this.resize);
        window.addEventListener("mouseup", this.stopResize);
      },
      resize(event: Event) {
        if (this.isResizing) {
          //@ts-ignore
          const dx = event.clientX - this.initialMouseX;
          const newWidth = this.initialWidth + dx;
  
          const maxWidth = (window.innerWidth * this.maxWidthPercentage) / 100;
  
          if (newWidth >= this.minWidth && newWidth <= maxWidth) {
            this.width = newWidth;
          } else if (newWidth < this.minWidth) {
            this.width = this.minWidth;
          }
        }
      },
      stopResize() {
        this.isResizing = false;
        window.removeEventListener("mousemove", this.resize);
        window.removeEventListener("mouseup", this.stopResize);
      },



      loadFileTree() {
        ipcRenderer.send('load-file-tree');
        
        ipcRenderer.on('load-file-tree', (_, treeData) => {
          ipcRenderer.send('get-project-name');
          console.log(treeData);
          this.treeData = treeData;
          console.log(this.treeData);
        })

        
      },
    },
    mounted() {
      this.loadFileTree();

      ipcRenderer.on('get-project-name', (_, projectName) => {
          this.projectName = projectName;
      })
    }
  };
</script>