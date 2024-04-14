<template>
    <div>
        <span @click="handleNodeClick(node)" class="py-0.5 px-2 dark:text-od-icon text-ol-icon flex items-center select-none cursor-pointer dark:hover:bg-od-hover-1">
            <Icon v-if="node.type === 'dir'" icon="tabler:chevron-right" class="w-4 h-4 transition-transform duration-200" :class="expanded ? 'rotate-90' : 'rotate-0'"/>
            {{ node.name }}
        </span>
        <ul v-show="expanded">
            <tree-node v-for="child in node.children" :key="child.id" :node="child" class="pl-4"></tree-node>
        </ul>
    </div>
</template>
  
  <script lang="ts">
    import { Icon } from '@iconify/vue';
import { ipcRenderer } from 'electron';

  export default {
    components: {
        Icon,
    },
    props: {
      node: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        expanded: false,
      }
    },
    methods: {
      // toggle() {
      //   this.expanded = !this.expanded;
      // },
      handleNodeClick(node: any) {
        if (node.type === 'dir') {
          this.expanded = !this.expanded;
        }
        if (node.type === '.json') {
          ipcRenderer.send('open-file', (node.path));
        }
      }
    }
  }
  </script>