import { defineConfig, loadEnv, splitVendorChunkPlugin } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'

export default defineConfig(({ mode }) => {
  // this env is required for schema to be integrated
  const env = loadEnv(mode, process.cwd(), '')

  return {
    module: 'esnext',
    define: {
      'process.env': env
    },
    test: {
      globals: true,
      environment: 'jsdom',
      moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1'
      }
    },
    build: {
     emptyOutDir: true,
      outDir: env.BUILD_OUTDIR,
      sourcemap: mode === 'development' ? true : false,
      lib: {
        entry: path.resolve(__dirname, 'src/system.ts'),
        name: 'FormFacilitator',
        fileName: format => `system.${format}.js`
      },
      rollupOptions: {
        external: ["vue"],
        output: {
          globals: {
            vue: "Vue"
          }
        }
      }
    },
    resolve: {
      // https://stackoverflow.com/questions/66043612/vue3-vite-project-alias-src-to-not-working
      // still not working, resort to absolute imports your ide knows how to do it automatically anyway
      excludes: ['node_modules', 'dist'],
      extensions: ['.js', '.ts', '.tsx', '.jsx', '.json', '.vue', '.mjs'] // supports importing SFCs without file extensions
    },
    plugins: [
      vue(),
      Components({
        dts: 'typings/components.d.ts',
        extensions: ['vue', 'ts']
      }),
      vueJsx(),
      splitVendorChunkPlugin()
    ]
  }
})
