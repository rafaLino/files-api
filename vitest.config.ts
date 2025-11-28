import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        environment: 'node',
        setupFiles: ['./src/config/vitest.setup.ts'],
        hookTimeout: 120000,
        testTimeout: 60000
    },
    resolve: {
        alias: {
            '@': '/src'
        }
    }
})