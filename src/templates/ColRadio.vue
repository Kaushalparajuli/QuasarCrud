<template>
  <span v-show="row[col?.name] == index" v-for="(o,index) in col?.options" :key="o.index">
    {{o}}
  </span>
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
