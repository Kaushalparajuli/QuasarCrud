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
import ColText from "components/crud/columnFields/ColText.vue";
import ColTextarea from "components/crud/columnFields/ColTextarea.vue";
import ColBoolean from "components/crud/columnFields/ColBoolean.vue";
import ColDate from "components/crud/columnFields/ColDate.vue";
import ColNumber from "components/crud/columnFields/ColNumber.vue";
import ColRadio from "components/crud/columnFields/ColRadio.vue";
import ColUpload from "components/crud/columnFields/ColUpload.vue";
import ColRelation from "components/crud/columnFields/ColRelation.vue";

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
