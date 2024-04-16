<template>
    <aside ref="nav" class="relative dark:bg-od-2 bg-ol-2" :style="resizableDivStyle" @mousemove="checkHideNav">
        <div class="w-4 h-4 absolute top-0 -right-4 rounded-br-[50%] shadow-[10px_0_0_0] dark:text-od-2 text-ol-2 rotate-180 z-0"></div>
        
        <TreeGrid :treeData="treeData" class="mt-4"/>

        <div class="w-3 h-full absolute top-0 right-0 cursor-col-resize grid place-items-center group" @mousedown="startResize">
            <div class="w-1 h-1/2 group-hover:bg-od-accent rounded-full"></div>
        </div>
    </aside>

    
</template>

<script lang="ts">
import { ipcRenderer } from 'electron';
import TreeGrid from './FileExplorer/TreeGrid.vue';

export default {
    components: {
        TreeGrid,
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

        treeData: []
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
       toggleNav() {
        this.isNavHidden = !this.isNavHidden;
        this.$refs.nav.style.display = this.isNavHidden ? "none" : "block";
      },
      startResize(event: Event) {
        event.preventDefault();
        this.isResizing = true;
        this.initialMouseX = event.clientX;
        this.initialWidth = this.width;
  
        window.addEventListener("mousemove", this.resize);
        window.addEventListener("mouseup", this.stopResize);
      },
      resize(event: Event) {
        if (this.isResizing) {
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
          console.log(treeData);
          this.treeData = treeData;
          console.log(this.treeData);
        })
      }
    },
    mounted() {
      this.loadFileTree();
    }
  };
</script>