<script setup>
import { registerCodeHighlighting } from '@lexical/code';
import { useLexicalComposer } from 'lexical-vue';
import { onMounted, onUnmounted } from 'vue';

const editor = useLexicalComposer();

onMounted(() => {
  const fn = registerCodeHighlighting(editor);

  onUnmounted(() => fn());
});
</script>

<template />
