<template>
  <span v-if="col?.prefix">{{col.prefix}}</span>
  <span>{{row[col?.name]}}</span>
  <span v-if="col?.suffix">{{col.suffix}}</span>
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
