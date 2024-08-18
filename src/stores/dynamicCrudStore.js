import {defineStore} from 'pinia';
import {api} from "boot/axios";
import {ref} from 'vue'
import {Notify} from "quasar";

export function createDynamicStore(storeName,url){
  return defineStore(storeName, () => {
    const apiUrl = ref(url);
    const isLoading = ref(false);
    const rowData = ref([]);
    const formData = ref({})
    const formType = ref('add')
    const filters = ref({});
    const query = ref('')
    const pagination = ref({
      sortBy: 'id',
      descending: true,
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 1
    })

    const resetForm = () => {
      formData.value = {}
      formType.value = 'add'
    }

    const fetchMetaData = () => {
      return new Promise((resolve, reject) => {
        isLoading.value = true;
        api.get(`${apiUrl.value}/meta-data`).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    }

    const fetchData = () => {
      return new Promise((resolve, reject) => {
        isLoading.value = true;
        api.get(`${apiUrl.value}?page=${pagination.value.page}&rowsPerPage=${pagination.value.rowsPerPage}&query=${query.value}&filters=${JSON.stringify(filters.value)}&descending=${pagination.value.descending}&sortBy=${pagination.value.sortBy}`).then(res => {
          isLoading.value = false
          rowData.value = res.data.data
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      });
    }


    const saveData = () => {
      return new Promise((resolve, reject) => {
        api.post(`${apiUrl.value}`, formData.value).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    }
    const editData = () => {
      return new Promise((resolve, reject) => {
        api.post(`${apiUrl.value}/${formData.value.id}`, formData.value).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    }


    return {
      apiUrl,
      formData,
      query,
      pagination,
      rowData,
      filters,
      isLoading,
      formType,
      fetchData,
      fetchMetaData,
      resetForm,
      saveData,
      editData,
    };
  });
}
