import { defineConfig, loadEnv } from "vite";
import path from "path";
import vue from "@vitejs/plugin-vue";
import vueJsx from '@vitejs/plugin-vue-jsx';
export default defineConfig(({ mode, command }) => {
    // this env is required for schema to be integrated
    const env = loadEnv(mode, process.cwd(), '');
    return {
        define: {
            'process.env': env
        },
        build: {
            lib: {
                entry: path.resolve(__dirname, "src/system.ts"),
                name: "CommonFormComponent",
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
        plugins: [vue(), vueJsx()]
    };
});
