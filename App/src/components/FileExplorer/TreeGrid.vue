<template>
    <div class="tree-grid">
      <tree-node v-for="node in treeData" :key="node.id" :node="node"></tree-node>
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
        type: Array,
        required: true,
      }
    }
  }
  </script>