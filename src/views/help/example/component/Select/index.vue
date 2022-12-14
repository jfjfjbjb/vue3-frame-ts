<template>
  <div class="example-form">
    <a-card hoverable title="normal">
      <template #extra>
        <a-button @click="onGetData" size="small">打印</a-button>
      </template>
      <custom-select style="width: 200px" v-bind="selectParams" />
      <custom-select style="width: 200px" v-bind="selectParams" :value="2" />
      <custom-select
        style="width: 200px"
        v-bind="selectParams"
        v-model:value="modelValue"
        placeholder="双向绑定"
      ></custom-select>
    </a-card>
    <a-card hoverable title="请求">
      <!-- <template #extra>
        <a-button @click="onGetData" size="small">获取</a-button>
      </template> -->
      <custom-select style="width: 200px" v-bind="reqSelectParams" />
    </a-card>
  </div>
</template>

<script lang="tsx" setup>
import { ref } from 'vue';

// normal
let selectParams = ref({
  options: [
    { label: 'name1', value: 1 },
    { label: 'name2', value: 2 },
    { label: 'name3', value: 3 }
  ]
});
let modelValue = ref();
const onGetData = function () {
  // vite cache bug;
  $message.info(`modelValue: ${modelValue.value}`);
};

// 带请求
let reqSelectParams = ref({
  url: 'api/select',
  allowClear: true,
  fieldNames: { label: 'name' },
  loaded: (res: Array<ObjectAny>) => {
    console.log('reqSelectData: ', res);
  }
});
console.log(reqSelectParams);

</script>

<style scoped lang="less"></style>
