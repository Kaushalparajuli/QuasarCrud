<template>
  <div class="flex tw-justify-between tw-items-center">
    <div class="flex tw-items-center tw-gap-2">
      <q-btn unelevated  color="primary" @click="showMedia = false" round icon="mdi-arrow-left"> </q-btn>
      <h6 class="tw-text-2xl tw-font-bold">Medias</h6>
    </div>
    <div class="flex tw-mb-5 tw-gap-3">
      <q-btn flat color="red" @click="clearFilter" round icon="mdi-filter-remove-outline"> </q-btn>
      <q-input  dense style="width: 300px" outlined label="Search" v-model="filters.query">
        <template #append>
          <q-icon name="eva-search"></q-icon>
        </template>
      </q-input>
    </div>
  </div>

  <div class="tw-mb-5">
    <q-pagination :max="pagination.last_page" v-model="pagination.page" input></q-pagination>
  </div>

  <div class="tw-grid tw-grid-cols-12">
    <div class="flex tw-col-span-9  flex-wrap tw-gap-5">

      <div @dblclick="emits('select',d)" class="tw-cursor-pointer tw-h-[140px] tw-w-[140px] tw-relative  " v-for="d in dataList" :key="d.index">
        <q-img :ratio="2/2" class="tw-rounded-xl bg-grey h-full w-full" :src="d.path"/>
        <div class="tw-absolute flex tw-gap-2 tw-top-1 tw-right-1">
          <!--            <q-btn icon="eva-edit" color="primary" round size="md" dense> </q-btn>-->
          <q-btn @click="deleteImage(d)" icon="eva-trash" color="negative" round size="md" dense> </q-btn>
        </div>
      </div>
    </div>
    <div class="tw-col-span-3 ">
      <q-uploader
        class="w-full"
        flat
        field-name="uploaded_file"
        :factory="factoryFn"
        label="Select or Drag your files here"
        :form-fields="[{name:'upload_for',value:'image'}]"
        multiple
        auto-upload
        @uploaded="getMedia"
        @failed="null"
      />
    </div>
  </div>
</template>
<script setup>
import {onMounted, ref, watch} from "vue";
import {api} from "boot/axios";
import {Notify, useQuasar} from "quasar";

const $q = useQuasar()


const filters = ref({
  tag:'',
  query:''
})
const dataList= ref([])
const pagination = ref({
  page:1,
  last_page:1
})
const apiUrl = import.meta.env.VITE_API_URL

const emits = defineEmits(['select'])

watch(()=>filters.value.query,()=>{
  getMedia();
})

onMounted(()=>{
  getMedia()
})

const getMedia = () =>{
  api.get(`/media?page=${pagination.value.page}&filters=${JSON.stringify(filters.value)}`).then(res=>{
    dataList.value = res.data.data;
    pagination.value.last_page = res.data.meta.last_page
  })
}

const deleteImage = () =>{
  $q.dialog({
    title: 'Confirm',
    message: 'Are you sure?',
    cancel: true,
    persistent: true
  }).onOk(() => {
    api.delete('/app/all-medias').then(res=>{
      Notify.create({
        message:'Media deleted.',
        color:'positive'
      })
    })
  })
}



const clearFilter = () =>{
  filters.value.tag = ''
  filters.value.query = ''
  getMedia();
}

function factoryFn (file) {
  return new Promise((resolve, reject) => {
    // Retrieve JWT token from your store.
    const token = "myToken";
    resolve({
      url: `${apiUrl}media/upload`,
      method: 'POST',
      headers: [
        { name: 'Authorization', value: `Bearer ${token}` }
      ]
    })
  })
}


</script>
