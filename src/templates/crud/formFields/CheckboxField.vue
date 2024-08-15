<template>
  <div class="flex tw-gap-2">
    <q-checkbox    v-model="value"  :label="data.label" />
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
