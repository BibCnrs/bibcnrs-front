import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import stylelint from 'vite-plugin-stylelint';
import md5 from 'md5';

const regex = /(.*node_modules\/)([^\/]+)(.*)/;

export default defineConfig({
    plugins: [react(), eslint(), stylelint()],
    build: {
        rollupOptions: {
            output: {
                manualChunks: (id, meta) => {
                    if (id.includes('node_modules')) {
                        if (meta.getModuleInfo(id).isIncluded) {
                            const hash = md5(
                                id.match(regex)[2]
                                    .replace('@', '')
                            );
                            return `vendor/${hash.slice(0, 8)}`;
                        }
                    }
                },
            },
        },
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
