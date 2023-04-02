/*
 * :file description: 
 * :name: /threejs6/config/config.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-01-01 21:32:37
 * :last editor: 张德志
 * :date last edited: 2023-04-03 06:40:24
 */
import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/scene/index' },
  ],
  fastRefresh: {},
});
