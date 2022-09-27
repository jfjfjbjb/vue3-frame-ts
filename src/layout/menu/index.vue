<template>
  <a-menu
    :openKeys="openKeys"
    :selectedKeys="selectedKeys"
    mode="inline"
    theme="light"
    @click="onMenuClick"
  >
    <template v-for="item in list" :key="item.key">
      <sub-menu :menu-info="item" />
    </template>
  </a-menu>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import SubMenu from './SubMenu.vue';
import config from './config';

export default defineComponent({
  components: {
    'sub-menu': SubMenu
  },
  props: {
    collapsed: Boolean
  },
  setup(props) {
    const router = useRouter();
    const route = useRoute();
    let selectedKeys = ref<string[]>([]);
    let openKeys = ref<string[]>([]);

    // watch
    watch(
      route,
      (newVal, oldVal) => {
        selectedKeys.value = getSelectedKeys(newVal);
        if (!props.collapsed) {
          openKeys.value = getOpenKeys(newVal);
        }
      },
      {
        immediate: true
      }
    );

    // methods
    function onMenuClick({ item, key, keyPath }: any) {
      router.push({
        name: key
      });
    }
    function getSelectedKeys(route: any) {
      const { meta = {} } = route;
      const { _parent: parent } = meta;

      if (meta.isEntry) {
        return [route.name];
      }
      return [(parent || {}).name];
    }
    function getOpenKeys(route: any) {
      const keys: string[] = [];

      function recursion(route: any) {
        const { meta = {} } = route;
        const { _parent: parent } = meta;

        if (parent) {
          parent.path === 'null' && keys.push(parent.name);
          recursion(parent);
        }
      }
      recursion(route);
      return keys;
    }

    return {
      list: config.menus,
      selectedKeys,
      openKeys,
      onMenuClick
    };
  }
});
</script>
