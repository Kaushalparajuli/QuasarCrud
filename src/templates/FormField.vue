<template>
  <div class="tw-px-1">
    <div v-if="errors.length">
      <div v-for="error in errors" class="tw-text-red-500" :key="error">{{ error }}</div>
    </div>
    <component
      v-if="data?.type"
      :is="getFieldComponent(data?.type)"
      v-model="value"
      :data="data"
    ></component>
  </div>
</template>
<script setup>
import {useRouter, useRoute} from "vue-router";
import {ref, onMounted, computed} from "vue";
import InputField from "./InputField.vue";
import SelectField from "./SelectField.vue";
import CustomSelectField from "./CustomSelectField.vue";
import CustomModelSelectField from "./CustomModelSelectField.vue";
import RadioField from "./RadioField.vue";
import CheckboxField from "./CheckboxField.vue";
import ToggleField from "./ToggleField.vue";
import DateField from "./DateField.vue";
import DateTimeField from "./DateTimeField.vue";
import FilePicker from "./FilePicker.vue";

const router = useRouter()
const route = useRoute()
const emits = defineEmits(['update:modelValue'])
const props = defineProps({
  data:{
    default:{}
  },
  modelValue:{
    default:null
  }
})


const requiredFields = ['name','type']
const value = computed({
  get(){
    return props.modelValue
  },
  set(val){
    emits('update:modelValue',val)
  }
})

// get field component
function getFieldComponent(type) {
  const components = {
    text: InputField,
    email: InputField,
    textarea:InputField,
    password:InputField,
    number:InputField,
    select_from_array: SelectField,
    select_from_url: CustomSelectField,
    select_from_model: CustomModelSelectField,
    radio: RadioField,
    checkbox: CheckboxField,
    switch:ToggleField,
    date: DateField,
    datetime: DateTimeField,
    upload: FilePicker,
    upload_multiple: FilePicker
  };
  return components[type] || 'div';
}

// Check for missing required fields
const errors = computed(() => {
  const errorMessages = [];
  requiredFields.forEach((field) => {
    if (!props.data[field]) {
      errorMessages.push(`${field} is required`);
    }
  });
  return errorMessages;
});

</script>
