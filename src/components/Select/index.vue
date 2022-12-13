<template>
  <a-select class="custom-select" v-bind="attrs" :value="localValue" :loading="loading">
    <a-select-option v-for="item in data" :key="item.value">
      {{ item.label }}
    </a-select-option>
  </a-select>
</template>

<script lang="ts" setup>
import { useAttrs, computed, watch, ref, onBeforeMount } from 'vue';
import http from '@/utils/http/singleton';
const defaultAttrs = {
  placeholder: '请选择',
  virtual: false
};

defineOptions({
  inheritAttrs: false
});

/** props */
const props = defineProps({
  value: [String, Number, Array<String>, Array<Number>],
  options: Array<ObjectAny>,
  url: String,
  reqParams: Object
});
/** emit */
const emit = defineEmits(['update:value', 'change']);

/** data */
const localValue = ref(props.value);
const data = ref<Array<ObjectAny>>([]);
let loading = ref(false);

/** computed */
const attrs = computed(() => {
  return Object.assign({}, defaultAttrs, useAttrs(), { onChange: onChange });
});

/** life circle */
onBeforeMount(() => {
  const { options } = props;
  if (options && options.length > 0) {
    data.value = options;
    return;
  }
  getList();
});

/** methods */
const onChange = function (value: any) {
  localValue.value = value;
  emit('update:value', value);
  emit('change', value);
};
const getList = function () {
  const { url, reqParams } = props;
  if (!url) return;

  loading.value = true;
  http({
    url,
    reqParams
  })
    .then((res) => {
      loading.value = false;
      data.value = res as Array<ObjectAny>;
    })
    .catch((e) => {
      loading.value = false;
    });
};

/** watch */
watch(
  () => props.value,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      console.log('select newVal:', newVal, oldVal);
      localValue.value = newVal;
    }
  }
);
</script>

<style scoped lang="less"></style>
