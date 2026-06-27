import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/__test__/vitest.setup.js'],
    include: ['src/**/*.spec.js'],
    exclude: ['test/**', 'node_modules/**', 'docs/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      include: ['src/**/*'],
      exclude: ['src/__test__/**', '**/*.snap'],
    },
  },
});
