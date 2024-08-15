<template>
  <div v-if="row.hasOwnProperty(col.name)">
    <q-img :src="row[col.name]?.path"/>
  </div>
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
