<template>
    <div class="tree-grid">
      <tree-node v-for="node in treeData" :key="node.id" :node="node" @context-menu="handleContextMenu"></tree-node>
    </div>
  </template>
  
  <script lang="ts">
  import TreeNode from './TreeNode.vue';
  
  export default {
    components: {
      TreeNode,
    },
    props: {
      treeData: {
        type: Object,
      }
    },
    methods: {
      handleContextMenu(event: MouseEvent, data: any, x: number, y: number, show: boolean) {
        this.$emit('context-menu', event, data, x, y, show);
      }
    }
  }
  </script>