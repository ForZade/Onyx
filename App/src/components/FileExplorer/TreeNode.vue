<template>
    <div>
        <span @click="toggle" class="py-0.5 px-2 dark:text-od-icon text-ol-icon flex items-center select-none cursor-pointer dark:hover:bg-od-hover-1">
            <Icon v-if="node.type === 'dir'" :icon="iconByType" class="w-4 h-4 transition-transform duration-200" :class="expanded ? 'rotate-90' : 'rotate-0'"/>
            {{ node.name }}
        </span>
        <ul v-show="expanded">
            <tree-node v-for="child in node.children" :key="child.id" :node="child" class="pl-4"></tree-node>
        </ul>
    </div>
</template>
  
  <script lang="ts">
    import { Icon } from '@iconify/vue';

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
    computed: {
        iconByType() {
            switch (this.node.type) {
                case 'dir':
                    return 'tabler:chevron-right';

                case 'jpg':
                    return 'tabler:file-type-jpg';

                case 'png':
                    return 'tabler:file-type-png';

                default: 
                    return 'tabler:file';
            }
        }
    },
    methods: {
      toggle() {
        this.expanded = !this.expanded;
      }
    }
  }
  </script>