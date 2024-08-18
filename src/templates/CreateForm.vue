<template>
  <div class="">
    <q-form ref="formRef" @submit="proceedSubmit(false)">
      <div class=" tw-px-7 tw-pr-3">
        <div class="row q-col-gutter-md">
          <template v-if="store.formData">
            <FormField v-model="store.formData[f.name]" :class="f?.wrapper?.class ?? 'col-12'" v-for="(f, index) in fields" :data="f" :key="index"></FormField>
          </template>
        </div>
      </div>
      <div class="flex justify-between tw-border-t q-pa-md">
        <q-btn label="Cancel" color="negative" @click="cancel"></q-btn>
        <div class="flex tw-gap-3">
          <q-btn @click="submitForm(false)" label="Submit & New" color="positive" type="button"></q-btn>
          <q-btn @click="submitForm(true)" label="Submit" color="primary" type="button"></q-btn>
        </div>
      </div>
    </q-form>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { Notify, useQuasar } from 'quasar';
import FormField from 'components/crud/formFields/FormField.vue';
import {inject, onMounted, ref} from "vue";
import {createDynamicStore} from "stores/dynamicCrudStore";
import {api} from "boot/axios";
import useValidation from "src/composable/useValidation";

const router = useRouter();
const route = useRoute();
const $q = useQuasar();

const props = defineProps({
  dynamicStoreName: {
    default: null
  },
  apiUrl: {
    default: ''
  },
  formType: {
    default: 'save'
  },
  routePath: {
    default: '',
  },
});


const $emit = defineEmits(['saved']);
const formRef = ref(null);
const fields = ref([])
const {isRequired} = useValidation()

const dynamicStore = createDynamicStore(props.dynamicStoreName,props.apiUrl);
const store = dynamicStore()
if (!store) {
  throw new Error('Store not provided');
}

onMounted(()=>{
  getMetaData()
})


const cancel = () => {
  router.push(`/${props.routePath}`)
};

const getMetaData = () =>{
  api.get(`/${props.apiUrl}/meta-data`).then((res) => {
    const f = Object.values(res.data.data.fields);
    f.forEach(field => {
      field.rules = mapRules(field?.rules??{});
    });
    fields.value = f;
  });
}

const mapRules = (rules) => {
  const mappedRules = [];
  if (rules.required) {
    mappedRules.push(isRequired);
  }
  // Add other rule mappings here as needed
  return mappedRules;
};


const submitForm = (isNew) => {
  if (formRef.value) {
    formRef.value.validate().then(success => {
      if (success) {
        proceedSubmit(isNew);
      } else {
        Notify.create({
          message: 'Please fix the errors before submitting.',
          type: 'negative'
        });
      }
    });
  }
};

const proceedSubmit = (addMore) => {
  $q.loading.show();
  if (props.formType==='add'){
    store.saveData().then(res=>{
      Notify.create({
        message:'Data added successfully',
        color:'positive'
      })
      if (!addMore.value){
        $emit('saved');
      }
      $q.loading.hide();
      store.formData = {}
    }).catch(err=>{
      $q.loading.hide();
    })
  }else if (props.formType==='edit'){
    store.editData().then(res=>{
      Notify.create({
        message:'Data updated successfully',
        color:'positive'
      })
      if (!addMore.value){
        $emit('saved');
      }
      $q.loading.hide();
      store.formData = {}
    }).catch(err=>{
      $q.loading.hide();
    })
  }
};

</script>
