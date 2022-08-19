import { resolve } from 'path'

import { defineConfig } from 'vite'
import { createVuePlugin } from "vite-plugin-vue2";
import Components from 'unplugin-vue-components/vite'
import { VuetifyResolver } from 'unplugin-vue-components/resolvers'

const pathResolve = (dir) => {
  return resolve(__dirname, '.', dir)
}

// https://vitejs.dev/config/
export default defineConfig({

  plugins: [
    createVuePlugin(),
    Components({
      resolvers: [VuetifyResolver()],
    }),
  ],

  server: {
    port: 8900
  },
  
  optimizeDeps: {
    include: ['vuetify']
  },

  resolve: {
    alias: {
      '@': pathResolve('src/js'),
    }
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