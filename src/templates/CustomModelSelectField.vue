<template>
  <q-select v-model="value"
            emit-value
            :multiple="data?.multiple ?? false"
            :dense="data?.dense ?? false"
            use-chips
            use-input
            map-options
            :input-debounce="data?.debounce ?? 1000"
            @filter="filterFn"
            :options="options"
           :label="data.label"
           :rules="data?.rules ?? []"
            :option-label="'label'"
            :option-value="'value'"
            :outlined="data?.outlined??true"

  ></q-select>
</template>
<script setup>
import {useRouter, useRoute} from "vue-router";
import {ref, onMounted, computed} from "vue";
import {api} from "boot/axios";

const router = useRouter()
const route = useRoute()

const props = defineProps({
  data:{
    default: {}
  },
  modelValue:{
    default:null
  },
  apiUrl:{
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

const options = ref([])

onMounted(()=>{
  getData()
})

function filterFn (val, update, abort) {
  update(() => {
    console.log(val)
    getData(val)
  })
}

const getData = (val = '') =>{
  api.get(`dropdown?query=${val}&model=${props.data.model}&columns=${JSON.stringify(props?.data?.columns?? [])}`).then(res=>{
    console.log('data',res)
    options.value =  res.data.data.map(elem=>{
      return{
        label:elem[props?.data.attribute ?? 'label'],
        value:elem[props?.data.hasOwnProperty('value') ?props?.data.id:'id'],
      }
    });
  })
}

</script>
