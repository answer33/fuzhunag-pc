import { defineConfig } from 'umi';
import proxy from './src/config/proxy';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  // routes: [
  //   { path: '/', component: '@/pages/index' },
  // ],
  dva: {
    hmr: true,
  },
  fastRefresh: {},
  request: {
    dataField: '',
  },
  proxy,
  theme: {
    'primary-color': '#FF8149',
  },
});
