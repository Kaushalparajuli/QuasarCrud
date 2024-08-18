<template>
  <div class="flex q-pa-md tw-gap-3 tw-items-center tw-justify-between">
    <div class="flex tw-gap-3 tw-items-center">
      <q-btn @click="goBack()" color="grey-3" unelevated class="text-black" round icon="mdi-arrow-left"></q-btn>
      <h6 class="tw-text-2xl">Edit {{title}}</h6>
    </div>
  </div>
  <CreateForm  @saved="goBack()" :route-path="routePath" :dynamic-store-name="storeName" form-type="edit"  :api-url="apiUrlPath"></CreateForm>

</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { useQuasar } from "quasar";
import CreateForm from 'quasar-crud-kaushal/src/templates/CreateForm.vue';
import {api} from "boot/axios";
import { use${entityModelNameCapitalized}Store } from 'stores/${entityModelName}Store';
import {createDynamicStore} from "stores/dynamicCrudStore";
import {onMounted} from "vue";

const route = useRoute();
const router = useRouter();
const $q = useQuasar();

const routePath = '${entityRouteUrl}';
const apiUrlPath = '${entityApiUrl}';
const title = '${entityModelNameCapitalized}';
const storeName = '${entityModelName}';

const dynamicStore = createDynamicStore(storeName,apiUrlPath);
const dStore = dynamicStore()
const store = use${entityModelNameCapitalized}Store();

onMounted(()=>{
  dStore.formData = {}
  getDetail()
})


const getDetail = () =>{
  api.get(`/${apiUrlPath}/${route.params.id}`).then((res) => {
    console.log('edit',res.data.data)
    if (res?.data?.data){
      processEdit(res?.data?.data)
    }else{
      console.log('Invalid response format')
    }
  });
}

const processEdit = (data) =>{
  dStore.formData = data;
}
const goBack = () =>{
  router.push(`/${routePath}`)
}
</script>
