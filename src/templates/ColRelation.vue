<template>
  <div>
    {{ displayValue }}
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  row: {
    type: Object,
    default: () => ({})
  },
  col: {
    type: Array,
    default: () => []
  }
});

// Computed property to dynamically get the value from the row object
const displayValue = computed(() => {
  let value = props.row;
  props.col?.relation_map?.forEach(key => {
    value = value?.[key];
  });
  return value;
});
</script>
