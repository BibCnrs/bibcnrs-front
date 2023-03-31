import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), eslint()],
    build: {
        minify: 'terser',
        terserOptions: {
            ecma: 2018,
            compress: {
                ecma: 2018,
            },
            format: {
                ecma: 2018,
            },
        },
    },
});
