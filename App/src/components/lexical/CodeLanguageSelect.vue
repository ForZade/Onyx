<script setup>
defineProps({
  codeLanguages: {
    type: Array,
    default: () => [],
  },
  modelValue: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:modelValue']);
function change(e) {
  emit('update:modelValue', e.target.value);
}
</script>

<template>
  <select
    class="toolbar-item code-language"
    :value="modelValue"
    @change="change"
  >
    <option :hidden="true" value="" />
    <option v-for="lang in codeLanguages" :key="lang" :value="lang">
      {{ lang }}
    </option>
  </select>
</template>
