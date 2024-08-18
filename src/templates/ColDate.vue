<template>
  <span>{{moment(row[col?.name]).calendar()}}</span>
</template>
<script setup>

import moment from "moment";

const props = defineProps({
  row:{
    default:{}
  },
  col:{
    default:{}
  }
})


</script>
