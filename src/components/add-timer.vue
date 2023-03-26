<script setup lang="ts">
import IconAdd from './icons/icon-add.vue'

defineEmits<{
  (event: 'click'): void
}>()
</script>

<template>
  <button class="button" @click="$emit('click')">
    Add timer
    <IconAdd />
  </button>
</template>

<style scoped lang="scss">
.button {
  background-color: $color-bg;
  display: inline-grid;
  cursor: pointer;
  padding: 0;
  font-size: 0;
  border: 0;
  color: inherit;
  height: 120px;
  width: 225px;
  place-content: center;

  & svg {
    fill: currentColor;
    height: 20px;
    width: 20px;
  }
}
</style>
