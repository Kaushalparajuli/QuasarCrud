<template>
  <div class="flex tw-gap-2">
    <q-radio  v-for="(r,index) in data?.options??[]" v-model="value" :val="index" :label="r" />
  </div>
</template>
<script setup>
import {useRouter, useRoute} from "vue-router";
import {ref, onMounted, computed} from "vue";

const router = useRouter()
const route = useRoute()

const props = defineProps({
  data:{
    default: {}
  },
  modelValue:{
    default:null
  },
})

const emits = defineEmits(['update:modelValue'])

const value = computed({
  get(){
    return props.modelValue
  },
  set(val){
    emits('update:modelValue',val)
  }
})



onMounted(()=>{

})

</script>
