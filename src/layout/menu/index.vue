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
import type { RouteRecordRaw, RouteRecordName, RouteLocationNormalizedLoaded } from 'vue-router';
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
    let selectedKeys = ref<Array<RouteRecordName | null | undefined>>([]);
    let openKeys = ref<Array<RouteRecordName | null | undefined>>([]);

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
    function getSelectedKeys(route: RouteLocationNormalizedLoaded) {
      const { meta = {} } = route;
      // const { _parent: parent } = meta;
      const parent = meta._parent as RouteRecordRaw;

      if (meta.isEntry) {
        return [route.name];
      }
      if (parent) {
        return [parent.name];
      }
      return [];
    }
    function getOpenKeys(route: RouteLocationNormalizedLoaded) {
      const keys: Array<RouteRecordName | null | undefined> = [];

      function recursion(route: RouteLocationNormalizedLoaded | RouteRecordRaw) {
        const { meta = {} } = route;
        // const { _parent: parent } = meta;
        const parent = meta._parent as RouteRecordRaw;

        if (parent) {
          // parent.path === 'null' && keys.push(parent.name);
          parent.children && parent.children.length > 0 && keys.push(parent.name);
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
