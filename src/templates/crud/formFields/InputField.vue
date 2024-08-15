<template>
  <q-input v-model="value"
           :label="data?.label ?? ''"
           :type="type"
           :dense="data?.dense ?? false"
           :rules="data?.rules??[]"
           :outlined="data?.outlined??true"
           clearable

  >
    <template #append v-if="data.type==='password'">
      <q-btn v-if="type==='password'" @click="toggleType('text')" round flat icon="eva-eye-off-outline"></q-btn>
      <q-btn v-if="type==='text'" @click="toggleType('password')" round flat icon="eva-eye-outline"></q-btn>
    </template>

  </q-input>
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
const type = ref('')

onMounted(()=>{
  type.value = props.data.type;
})

const toggleType = (elem)=>{
type.value = elem
}

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
