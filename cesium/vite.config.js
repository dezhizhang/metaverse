/*
 * :file description: 
 * :name: /cesium/vite.config.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-08-27 16:29:41
 * :last editor: 张德志
 * :date last edited: 2022-08-27 16:36:24
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import cesium from 'vite-plugin-cesium';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),cesium()]
})
