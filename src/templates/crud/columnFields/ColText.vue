<template>
  <span>{{row[col?.name]}}</span>
</template>
<script setup>

const props = defineProps({
  row:{
    default:{}
  },
  col:{
    default:{}
  }
})


</script>
