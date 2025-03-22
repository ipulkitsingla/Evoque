import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          mui: ['@mui/material', '@mui/icons-material', '@mui/styles', '@mui/lab', '@mui/system'],
          form: ['formik', 'yup', 'react-select'],
          slider: ['react-slick', 'slick-carousel', 'swiper', 'react-range-slider-input'],
          image: ['react-inner-image-zoom', 'react-image-magnify', 'react-lazy-load-image-component'],
          ui: ['react-loading-skeleton', 'react-hot-toast', 'react-toastify'],
          bootstrap: ['bootstrap', 'react-bootstrap'],
          utils: ['moment', 'jwt-decode', 'axios']
        }
      }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true
      }
    },
    modules: {
      localsConvention: 'camelCase'
    }
  },
  optimizeDeps: {
    include: [
      '@popperjs/core',
      'bootstrap',
      'swiper/react',
      'swiper/css',
      'react-range-slider-input',
      'react-slick',
      'slick-carousel',
      'react-inner-image-zoom',
      'react-image-magnify',
      'react-lazy-load-image-component',
      'react-loading-skeleton',
      'react-hot-toast',
      'react-toastify',
      'formik',
      'yup',
      'react-select',
      'moment',
      'jwt-decode'
    ],
    esbuildOptions: {
      target: 'es2020'
    }
  },
  resolve: {
    alias: {
      '@': '/src'
    },
    extensions: ['.js', '.jsx', '.json']
  },
  esbuild: {
    loader: 'jsx',
    target: 'es2020'
  },
  server: {
    port: 3000,
    open: true
  }
})
