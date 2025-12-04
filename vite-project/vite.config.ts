import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {TanStackRouterVite} from '@tanstack/router-plugin/vite'

export default defineConfig({
    plugins: [
        TanStackRouterVite({
            routesDirectory: './src/routes', // ТОЛЬКО одна строка
            generatedRouteTree: './src/routeTree.gen.ts',
        }),
        react({
            jsxImportSource: '@emotion/react',
            babel: {
                plugins: ['@emotion/babel-plugin'],
            },
        }),
    ],
    test: {
        environment: 'jsdom',
        globals: true,
    },
})