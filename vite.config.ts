/* eslint-disable no-undef */
import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import eslint from 'vite-plugin-eslint';
import postcssPresetEnv from 'postcss-preset-env';
import { viteMockServe } from 'vite-plugin-mock';
// import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import DefineOptions from 'unplugin-vue-define-options/vite';
import svgLoader from 'vite-svg-loader';
import commonjs from 'vite-plugin-commonjs';
import { visualizer } from 'rollup-plugin-visualizer';
// 引入theme
// import theme from './src/style/theme';

// chunks相关
const { pathname = '' } = new URL('./node_modules', import.meta.url);
const chunkIncludes = function (includes: string[], path: string) {
  let flag = false;
  includes.forEach((item) => {
    const pathPrefix = `${pathname}/${item}/`.replace(/^[/]?/, '');
    // console.log(path, pathPrefix)
    if (path.includes(pathPrefix)) {
      flag = true;
      return false;
    }
  });
  return flag;
};

// 获取打包命令符
const lifecycle = process.env.npm_lifecycle_event;
// 获取脚本参数
const envTheme = process.env.npm_config_theme || '';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // console.log(command, mode);
  return {
    base: './',
    define: {
      __THEME__: JSON.stringify(envTheme)
    },
    plugins: [
      vue(),
      vueJsx(),
      viteMockServe({
        mockPath: './src/mock'
      }),
      eslint({
        cache: false
      }),
      svgLoader(),
      // AutoImport({
      //   imports: ['vue', 'vue-router']
      // }),
      Components({
        include: [/\.vue$/, /\.vue\?vue/, /\.tsx$/],
        resolvers: [
          AntDesignVueResolver({
            // 局部引入且不换肤时赋值less
            importStyle: false,
            resolveIcons: true
          })
        ]
      }),
      DefineOptions(),
      commonjs(),
      // 打包分析
      lifecycle === 'report'
        ? visualizer({ open: true, gzipSize: true, filename: 'report.html' })
        : null
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    css: {
      postcss: {
        plugins: [postcssPresetEnv]
      },
      preprocessorOptions: {
        less: {
          // 本地换肤时使用
          // modifyVars: theme['compact'],
          javascriptEnabled: true,
          charset: false,
          additionalData: '@import "./src/style/var.less";'
        }
      }
    },
    server: {
      port: 8000
    },
    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          //生产环境时移除console
          drop_console: true,
          drop_debugger: true
        }
      },
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (chunkIncludes(['lodash', 'lodash-es'], id)) {
              return 'lodash';
            }
            if (chunkIncludes(['vue', 'vue-router', 'pinia'], id)) {
              return 'vue-base';
            }
          }
        }
      }
    }
  };
});
