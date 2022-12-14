<template>
  <a-select class="custom-select" v-bind="attrs" :value="selectValue" :loading="loading">
    <a-select-option v-for="item in selectOptions" :key="item.value">
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
  reqParams: Object,
  // 钩子
  beforeLoaded: Function,
  loaded: Function
});
/** emit */
const emit = defineEmits(['update:value', 'change']);

/** data */
const localValue = ref(props.value);
const data = ref<Array<ObjectAny>>([]);
let loading = ref(false);

/** computed */
const attrs = computed(() => {
  return Object.assign({}, defaultAttrs, useAttrs(), { fieldNames: {}, onChange: onChange });
});
const selectValue = computed(() => {
  return localValue.value;
});
const selectOptions = computed(() => {
  const { fieldNames = {} } = useAttrs() as any;
  // 自行处理fieldNames以支持a-select-option，暂时只支持一级
  return (data.value || []).map((item) => {
    return {
      ...item,
      label: item[fieldNames.label || 'label'],
      value: item[fieldNames.value || 'value']
    };
  });
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
      const { beforeLoaded, loaded } = props;
      beforeLoaded && beforeLoaded(res);
      // 处理数据
      data.value = res as Array<ObjectAny>;
      loaded && loaded(res);
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
watch([() => props.url, () => props.reqParams], (newVal, oldVal) => {
  if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
    getList();
  }
});
watch(
  () => props.options,
  (newVal = [], oldVal) => {
    data.value = newVal;
  }
);
</script>

<style scoped lang="less"></style>
