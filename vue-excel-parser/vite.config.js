import { resolve } from 'path'
import { defineConfig } from 'vite'
import { createVuePlugin } from "vite-plugin-vue2"
import { createHtmlPlugin } from 'vite-plugin-html'
import Components from 'unplugin-vue-components/vite'
import { VuetifyResolver } from 'unplugin-vue-components/resolvers'
import { babel } from '@rollup/plugin-babel';

const pathResolve = (dir) => {
  return resolve(__dirname, '.', dir)
}

// https://vitejs.dev/config/
export default defineConfig({
  base: './',

  plugins: [
    babel(),
    createVuePlugin(),
    Components({
      resolvers: [VuetifyResolver()],
    }),
    createHtmlPlugin({
      minify: true,
    }),
  ],

  resolve: {
    alias: {
      '@': pathResolve('src/js'),
    }
  },

  build: {
    commonjsOptions: {
      ignoreTryCatch: false
    },
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
      }
    },
    assetsDir: "vue-excel-parser/assets"
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/css/main.scss";` 
      }
    }
  },

  test: {
    include: ['test/**/*.test.ts'],
    globals: true,
    environment: 'happy-dom',
  },
})