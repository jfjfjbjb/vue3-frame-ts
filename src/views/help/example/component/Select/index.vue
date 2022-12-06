<template>
  <div class="example-form">
    <a-card hoverable title="normal">
      <template #extra>
        <a-button @click="onGetData" size="small">获取</a-button>
      </template>
      <custom-select style="width: 200px" v-bind="selectParams" />
      <custom-select style="width: 200px" v-bind="selectParams" :value="2" />
      <custom-select style="width: 200px" v-bind="selectParams" v-model:value="modelValue" />
    </a-card>
  </div>
</template>

<script lang="tsx" setup>
import { ref } from 'vue';

// normal
const selectParams = ref({
  options: [
    { label: 'name1', value: 1 },
    { label: 'name2', value: 2 },
    { label: 'name3', value: 3 }
  ]
});
let modelValue = ref();
const onGetData = function () {
  console.log('modelValue: ', modelValue.value);
};
</script>

<style scoped lang="less"></style>
