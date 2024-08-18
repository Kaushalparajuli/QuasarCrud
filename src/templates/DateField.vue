<template>
  <q-input :label="data?.label" outlined v-model="value" mask="date" :rules="data?.rules??[]">
    <template v-slot:append>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-date v-model="value">
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="Close" color="primary" flat />
            </div>
          </q-date>
        </q-popup-proxy>
      </q-icon>
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
