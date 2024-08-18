<template>
  <div>
    <component
      v-if="getFieldComponent(col?.type)"
      :is="getFieldComponent(col?.type)"
      :row="row"
      :col="col"
    ></component>
    <div v-else>
      {{row[col.name]}}
    </div>
  </div>
</template>
<script setup>
import {useRouter, useRoute} from "vue-router";
import ColText from "./ColText.vue";
import ColTextarea from "./ColTextarea.vue";
import ColBoolean from "./ColBoolean.vue";
import ColDate from "./ColDate.vue";
import ColNumber from "./ColNumber.vue";
import ColRadio from "./ColRadio.vue";
import ColUpload from "./ColUpload.vue";
import ColRelation from "./ColRelation.vue";

const router = useRouter()
const route = useRoute()
const emits = defineEmits(['update:modelValue'])
const props = defineProps({
  col:{
    default:{}
  },
  row:{
    default:{}
  }
})


// get field component
function getFieldComponent(type) {
  const components = {
    text: ColText,
    email: ColText,
    textarea: ColTextarea,
    boolean:ColBoolean,
    relation:ColRelation,
    'date':ColDate,
    'datetime':ColDate,
    'number':ColNumber,
    'radio':ColRadio,
    'upload':ColUpload,
  };
  return components[type] || 'div';
}



</script>
