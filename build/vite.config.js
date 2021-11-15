import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'
import { resolve } from 'path'

const { UIV_ENTRY, UIV_FILENAME } = process.env

console.log('env:', UIV_ENTRY, UIV_FILENAME)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  build: {
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, `../src/${UIV_ENTRY || 'index.js'}`),
      name: UIV_ENTRY ? undefined : 'uiv',
      formats: UIV_ENTRY ? ['es'] : ['cjs', 'es', 'iife', 'umd'],
      fileName: (format) => (UIV_FILENAME ? UIV_FILENAME : `uiv.${format}.js`),
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
