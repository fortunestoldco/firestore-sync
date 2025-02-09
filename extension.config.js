export default {
    plugins: [],
    watch: {
        clearScreen: false
    },
    build: {
        entries: {
            index: 'src/index.ts'
        },
        outDir: 'dist',
        sourcemap: true,
        format: 'esm',
        target: 'node18',
        rollup: {
            output: {
                format: 'es',
                exports: 'default',
                entryFileNames: 'index.js'
            }
        }
    }
};
