<template>

    <div class="flex q-mb-lg justify-between items-center">
      <h6 class="tw-text-2xl">{{ $t(title.toLowerCase())}}</h6>
          <div class="flex tw-gap-3 justify-between items-center">
            <q-btn  v-if="tablePermission.filter_button && Object.keys(filter).length === 0" @click="clearFilter()" round unelevated icon="mdi-filter-remove-outline"  color="red-2"  />
<!--            <q-input v-if="tablePermission.query" outlined label="Search" dense v-model="store.query" @keyup.enter="getData">-->
<!--              <template #append>-->
<!--                <q-icon name="eva-search"></q-icon>-->
<!--              </template>-->
<!--            </q-input>-->
            <q-btn v-if="tablePermission.refresh_button" @click="getData" round unelevated icon="eva-refresh-outline" color="primary" />
            <q-btn v-if="tablePermission.add_button" @click="previewForm" round unelevated icon="eva-plus" color="primary" />
            <q-btn v-if="tablePermission.export_button" @click="exportData" round unelevated icon="eva-cloud-upload-outline" color="secondary" ></q-btn>
          </div>
    </div>

  <div class="">
    <div class="row tw-py-2 tw-px-1  tw-bg-gray-100 tw-border tw-mb-2 tw-rounded" v-if="filterFields.length > 0">
      <template  v-for="(f, index) in filterFields">
        <FormField v-if="!filter.hasOwnProperty(f.name)"  v-model="store.filters[f.name]" :class="f?.wrapper?.class ?? 'col-12'" :data="{...f,outlined:false}" :key="index"></FormField>
      </template>
    </div>
  </div>

  <!--  {{store.rowData}}-->
  <q-table
    v-if="columns.length > 0"
    :columns="columns"
    :rows="store?.rowData"
    bordered
    flat
    :no-data-label="noDataMsg"
    :row-key="rowKey"
    @row-click="(evt, row, index) => $router.push(`/${routePath}/${row.id}`)"

    @request="refreshData"
    v-model:pagination="store.pagination"
  >
    <template v-for="s in columns" v-slot:[`body-cell-${s.name}`]="props">
      <q-td :props="props">
        <ColSn v-if="s.name==='sn'" :sn="(props.pageIndex + 1) + ((store.pagination.page - 1) * store.pagination.rowsPerPage)"></ColSn>
        <ColFields v-else :col="s" :row="props.row"></ColFields>
      </q-td>
    </template>
  </q-table>

</template>

<script setup>
import {useRouter} from 'vue-router';
import {useQuasar} from 'quasar';
import { onMounted, ref, watch} from 'vue';
import ColFields from "./ColFields.vue";
import {api} from "boot/axios";
import {createDynamicStore} from "../stores/dynamicCrudStore";
import FormField from "./FormField.vue";
import ColSn from "./ColSn.vue";
// import _ from 'lodash';


const props = defineProps({
  dynamicStoreName: {
    default: null
  },
  title: {
    default: '',
  },
  formFields: {
    default: () => [],
  },
  rowKey: {
    default: 'id',
  },
  noDataMsg: {
    default: 'No Data Found',
  },
  apiUrl: {
    default: '',
  },
  routePath: {
    default: '',
  },
  filter: {
    default: {},
  },
});

const dynamicStore = createDynamicStore(props.dynamicStoreName,props.apiUrl);
const store = dynamicStore()
if (!store) {
  throw new Error('Store not provided');
}

console.log('store',store)

const tablePermission = ({
  add_button: true,
  refresh_button: true,
  export_button: true,
  filter_button: true,
  query: true,
})
const columns = ref([]);
const filterFields = ref([])
const router = useRouter();
const $q = useQuasar();

// watch(() => store.filters, _.debounce(() => {
//   getData();
// }, 500), { deep: true });


onMounted(() => {
  if (props.filters){
    store.filters = props.filters
  }
  getMetaData()
  getData()
})

const clearFilter = () => {
  store.filters = {}
  store.query = ''
  getData()
}


const refreshData = (elem) => {
  console.log(elem)
  store.pagination = elem.pagination
  getData()
}

const getData = () => {
  store.fetchData().then(res => {
    console.log(res.data.data)
    store.isLoading = false
    store.rowData = res?.data?.data ?? [];
    store.pagination.rowsNumber = res.data.meta.total
  }).catch(err => {
      store.isLoading = false
    }
  )
}

const getMetaData = () =>{
  store.fetchMetaData().then(res=>{
    tablePermission.value = res?.data?.data?.table
    filterFields.value= res?.data?.data?.filters ?? []

    var col = res?.data?.data?.columns ??[]
    if (col.length >0){
      columns.value = col.map(elem=>{
        return {
          ...elem,
          field:(val)=>val.name
        }
      })
    }
  });
}




const previewForm = () => {
  router.push(`/${props.routePath}/add`);
};

const exportData = () =>{
  api.get(`${store.apiUrl}/export?rows=${50}&query=${store.query}&filters=${JSON.stringify(store.filters)}`)
    .then(res => {
      console.log('export',res)
    window.open(res?.data?.url,'__blank')
  }).catch(err => {
  })
}

</script>

<style scoped lang="scss"></style>
