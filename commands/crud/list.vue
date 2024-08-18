<template>
  <q-page class="q-pa-md">
    <CustomTable :dynamic-store-name="storeName" :filter="filters"  :api-url="apiUrlPath" :route-path="routePath" :title="title"></CustomTable>
  </q-page>
</template>

<script setup>
import CustomTable from 'components/crud/CustomTable.vue';

const routePath = '${entityRouteUrl}';
const apiUrlPath = '${entityApiUrl}';
const title = '${entityModelNameCapitalized}';
const storeName = '${entityModelName}';

const props = defineProps({
  filters:{
    default:{} // for default filtering. when using from another pages
  }
})

</script>

<style lang="scss">
</style>
