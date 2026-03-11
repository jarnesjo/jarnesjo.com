import {defineConfig} from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    environment: 'node',
  },
  resolve: {
    alias: {
      '@/components': path.resolve(__dirname, 'src/client/components'),
      '@/lib': path.resolve(__dirname, 'src/lib'),
      '@/css': path.resolve(__dirname, 'src/css'),
      '@/types': path.resolve(__dirname, 'src/types'),
      '@/public': path.resolve(__dirname, 'public'),
    },
  },
})
