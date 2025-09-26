import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { readdirSync } from 'fs'

const entrypointsDir = resolve(__dirname, 'src/entrypoints')
const allEntryFiles = readdirSync(entrypointsDir)
    .filter(file => file.endsWith('.ts'))
    .map(file => file.replace('.ts', ''))

const selectedEntries: string[] = [
    'page-header',
    'std-table',
]

const targetEntries = selectedEntries.length > 0
    ? allEntryFiles.filter(name => selectedEntries.includes(name))
    : allEntryFiles

const inputConfig = targetEntries.reduce((acc, name) => {
    acc[name] = resolve(__dirname, `src/entrypoints/${name}.ts`)
    return acc
}, {} as Record<string, string>)

export default defineConfig({
    plugins: [vue()],
    build: {
        outDir: '../admin/Lib/vueapp',
        emptyOutDir: true,
        cssCodeSplit: true,
        assetsInlineLimit: 1024 * 1024 * 10,
        rollupOptions: {
            input: inputConfig,
            output: {
                entryFileNames: '[name].js',
                assetFileNames: '[name].[ext]',
                manualChunks: undefined,
            },
        },
        minify: 'esbuild',
        assetsDir: 'assets',
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
            '@image': resolve(__dirname, '../image'),
            '@material-icons': resolve(__dirname, '../image/material-icons'),
        },
    },
    assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.svg'],
    define: {
        'process.env': {},
        __VUE_OPTIONS_API__: true,
        __VUE_PROD_DEVTOOLS__: false,
    },
})