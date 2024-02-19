<template>
    <div class="dark:text-od-icon text-ol-icon dark:bg-od-context bg-ol-context rounded-md px-2 py-1 text-xs absolute z-50">
        {{ text }}
    </div>
</template>

<script lang="ts">
export default {
  props: {
    text: String
  },
};
</script>

<style scoped>
div {
    transition: 0.3s ease-in-out;
}
</style>