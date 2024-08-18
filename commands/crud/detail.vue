<template>
  <Container>
    <div class="flex tw-gap-3 tw-items-center tw-justify-between">
      <div class="flex tw-gap-3 tw-items-center">
        <q-btn @click="goBack()" color="grey-3" unelevated class="text-black" round icon="mdi-arrow-left"></q-btn>
        <h6 class="tw-text-2xl">{{title}}</h6>
      </div>
      <div class="flex tw-gap-3">
        <q-btn v-if="detail?.edit_btn" @click="edit()" round icon="eva-edit-outline" color="primary"></q-btn>
        <q-btn v-if="detail?.delete_btn" @click="remove()" round icon="eva-trash-outline" color="negative"></q-btn>
      </div>
    </div>
    <div class="tw-grid xl:tw-grid-cols-5 lg:tw-grid-cols-4 md:tw-grid-cols-3 tw-gap-4 tw-mt-4">
      <LabelValueCard label="name" :value="detail.name"></LabelValueCard>
      <LabelValueCard label="address" :value="detail.address"></LabelValueCard>
      <LabelValueCard label="mobile" :value="detail.mobile"></LabelValueCard>
      <LabelValueCard label="email" :value="detail.email"></LabelValueCard>
    </div>

    <div class="tw-mt-4">
      <q-tabs v-model="tab" align="left" class="">
        <q-tab v-for="t in tabs" :key="t.value" :label="t.label" :name="t.value"></q-tab>
      </q-tabs>

      <q-tab-panels animated v-model="tab">
        <q-tab-panel name="tab1">
          <h6>Tab 1 list</h6>
        </q-tab-panel>
        <q-tab-panel name="tab2">
          <h6>Tab 2 list</h6>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </Container>
</template>

<script setup>
import Container from 'quasar-crud-kaushal/src/templates/Container.vue';
import LabelValueCard from 'quasar-crud-kaushal/src/templates/LabelValueCard.vue';
import { onMounted, ref } from "vue";
import { api } from "boot/axios";
import { useRoute, useRouter } from "vue-router";
import { useQuasar } from "quasar";


const route = useRoute();
const router = useRouter();
const $q = useQuasar();

const routePath = '${entityRouteUrl}';
const apiUrlPath = '${entityApiUrl}';
const title = '${entityModelNameCapitalized}';

const tab = ref("tab1");
const tabs = [
  {
    label: "Tab 1",
    value: "tab1",
  },
  {
    label: "Tab 2",
    value: "tab2",
  },
];
const detail = ref({
});

onMounted(() => {
  getDetail();
});

const getDetail = () => {
  api.get(`/${apiUrlPath}/${route.params.id}`).then((res) => {
    detail.value = res.data.data;
  });
};

const remove = () => {
  $q.dialog({
    title: "Confirm",
    message: "Are you sure?",
    cancel: true,
    persistent: true,
  }).onOk(() => {
    api.post(`/${apiUrlPath}/delete`,{
      delete_rows:[route.params.id]
    }).then((res) => {
      router.push(`/${routePath}`);
    });
  });
};

const edit = () =>{
  router.push(`/${routePath}/${route.params.id}/edit`)
}

const goBack = () =>{
  router.push(`/${routePath}`)
}
</script>
