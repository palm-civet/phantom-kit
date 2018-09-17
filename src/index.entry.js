import Vue from 'vue';
import app from './containers/home.vue';
import './styles/common.scss';
import 'element-ui/lib/theme-chalk/index.css';

new Vue({
  el: '#app',
  render: h => h(app)
})