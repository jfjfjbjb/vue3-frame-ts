<template>
  <a-select class="custom-select" v-bind="attrs" :value="localValue"></a-select>
</template>

<script lang="ts" setup>
import { useAttrs, computed, watch, ref } from 'vue';
// import http from '@/utils/http/singleton';
const defaultAttrs = {
  placeholder: '请选择'
};

defineOptions({
  inheritAttrs: false
});

/** props */
const props = defineProps({
  value: [String, Number, Array<String>, Array<Number>]
});
/** emit */
const emit = defineEmits(['update:value', 'change']);

/** data */
const localValue = ref(props.value);

/** computed */
const attrs = computed(() => {
  return Object.assign({}, defaultAttrs, useAttrs(), { onChange: onChange });
});

/** methods */
const onChange = function (value: any) {
  localValue.value = value;
  emit('update:value', value);
  emit('change', value);
};

// const testHttp = function () {
//   http({
//     url: '/api/get'
//   }).then((res) => {
//     console.log(res, 'dfdfdfdf');
//   });
// };

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
