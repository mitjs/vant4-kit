import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import jsx from '@vitejs/plugin-vue-jsx';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import { readdirSync } from 'fs';
import { filter, map } from 'lodash-es';

//定义所有组件名称，用于分包
const COMP_NAMES = ['Button'] as const;

function getDirectoriesSync(baseDir: string) {
    const entries = readdirSync(baseDir, { withFileTypes: true });
    return map(filter(entries, (entry) => entry.isDirectory()), (entry) => entry.name);
}

export default defineConfig({
    plugins: [vue(), jsx(), dts({
        tsconfigPath: '../../tsconfig.build.json',
        outDir: 'dist/types',
    })],
    build: {
        outDir: 'dist/es',
        lib: {
            entry: resolve(__dirname, './index.ts'),
            name: 'vant4-kit',
            fileName: 'index',
            formats: ['es'],
        },
        rollupOptions: {
            external: ['vue'],
            output: {
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name === 'style.css') {
                        return 'index.css'
                    }
                    return assetInfo.name as string
                },
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        return 'vendor'
                    }
                    if (id.includes('/packages/hooks')) {
                        return 'hooks'
                    }
                    if (id.includes('/packages/utils')) {
                        return 'utils'
                    }
                    for (const name of getDirectoriesSync('../components')) {
                        if (id.includes(`/packages/components/${name}`)) {
                            return name
                        }
                    }

                }
            },
        }
    },
});