<template>
  <q-input
    :label="data?.label"
    v-model="dateRangeValue"
    :rules="data?.rules ?? []"
    :outlined="data?.outlined ?? true"
    :dense="data?.dense ?? false"
    clearable
    @click="showDatePicker"
  >
    <template v-slot:append>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy
          ref="qDateProxy"
          cover
          transition-show="scale"
          transition-hide="scale"
        >
          <q-date
            v-model="dateRangeValue"
            :options="dateOptions"
            range
            mask="YYYY-MM-DD"
          >
            <div class="items-center justify-end row">
              <q-btn v-close-popup label="Close" color="primary" flat />
            </div>
          </q-date>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script setup>
import { ref, computed } from "vue";

import _ from "lodash";
import moment from "moment";

const props = defineProps({
  data: {
    default: {},
  },
  modelValue: {
    default: null,
  },
});

const emits = defineEmits(["update:modelValue", "clear"]);

const qDateProxy = ref(null);

const dateRangeValue = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    let value = formatDate(val);
    emits("update:modelValue", value);
    qDateProxy.value?.hide();
  },
});

const dateOptions = (date) => {
  return date <= moment().format("YYYY/MM/DD");
};

const formatDate = (value) => {
  if (_.isString(value)) {
    value = `${value} to ${value}`;
  } else if (value?.from && value?.to) {
    value = value.from + " to " + value.to;
  }
  return value;
};

const showDatePicker = () => {
  qDateProxy.value?.show();
};
</script>
