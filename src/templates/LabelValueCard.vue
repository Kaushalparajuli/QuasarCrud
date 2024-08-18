<template>
  <div class="flex tw-p-4 tw-bg-blue-50 tw-rounded-xl tw-flex-col">
    <h6>{{label}}</h6>
    <h6 class="tw-text-2xl">{{value}}</h6>
  </div>
</template>
<script setup>
const props = defineProps({
  label:{
    default:'label'
  },
  value:{
    default:'value'
  }
})
</script>
