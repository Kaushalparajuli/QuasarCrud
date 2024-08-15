<template>
 <q-dialog v-model="showMedia" maximized>
   <q-card class="q-pa-md">
     <FileManagement @select="selectImage"></FileManagement>
   </q-card>
 </q-dialog>



  <div @click="previewMedia" class="flex tw-cursor-pointer tw-gap-3 tw-bg-blue-50 tw-rounded-xl tw-p-3 tw-items-center">
    <q-icon size="40px" name="eva-image-outline"></q-icon>
    <h6 class="tw-text-xl">Select Attachment</h6>
  </div>


  <div class="tw-mt-4">
    <div class="flex" v-if="data?.type==='upload_multiple' && Array.isArray(value)">
      <div
        v-for="img in value"
        :key="img.id"
        class="tw-cursor-pointer   tw-relative tw-mr-2 tw-mb-2">
        <q-img class="tw-rounded-xl bg-grey tw-h-[120px] tw-w-[120px]" :src="img.path" />
        <div class="tw-absolute flex tw-gap-2 tw-top-1 tw-right-1">
          <q-btn @click="removeImage(img)" icon="eva-trash" color="negative" round size="md" dense></q-btn>
        </div>
      </div>
    </div>
    <div v-else-if="value" class="tw-cursor-pointer tw-h-[120px] tw-w-[120px]  tw-relative tw-mr-2 tw-mb-2">
      <q-img class="tw-rounded-xl bg-grey tw-h-[120px] tw-w-[120px]" :src="value.path" />
      <q-btn class="tw-absolute tw-z-10 flex tw-gap-2 tw-top-1 tw-right-1" @click="value = null" icon="eva-trash" color="negative" round size="md" dense></q-btn>
    </div>
  </div>


</template>
<script setup>
import {useRouter, useRoute} from "vue-router";
import {ref, onMounted, computed, watch} from "vue";
import {api} from "boot/axios";
import {Notify, useQuasar} from "quasar";
import FileManagement from "components/crud/formFields/FileManagement.vue";

const router = useRouter()
const route = useRoute()
const $q = useQuasar()

const props = defineProps({
  data:{
    default: {}
  },
  modelValue:{
    default:null
  },
})



const showMedia = ref(false);
const emits = defineEmits(['update:modelValue'])
const value = computed({
  get(){
    return props.modelValue
  },
  set(val){
    emits('update:modelValue',val)
  }
})

const selectImage = (img) => {
  if (props.data?.type ==='upload_multiple') {
    if (Array.isArray(value.value)) {
      value.value = [...value.value, img];
    } else {
      value.value = [img];
    }
  } else {
    value.value = img;
  }
  showMedia.value = false;
};

const previewMedia = ()=>{
  showMedia.value = true;
}

const removeImage = (img) => {
  if (props.data?.type === 'upload_multiple' && Array.isArray(value.value)) {
    value.value = value.value.filter(i => i.id !== img.id);
  } else {
    value.value = null;
  }
};

</script>
