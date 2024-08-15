<template>
  <q-badge v-show="row[col?.name] === index" v-for="(o,index) in col?.options" :key="o.index" :label="o"></q-badge>
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
