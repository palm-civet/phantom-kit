<template>
  <container name="home">
    <el-input v-model="url" placeholder="请输入网址"></el-input>
    <el-button @click="submit">提交</el-button>
    <result-table :result="msg"></result-table>
  </container>
</template>

<script>
  // 基础容器
  import Container from '../components/container.vue';
  // 结果展示表格
  import ResultTable from '../components/result-table.vue';

  import {Input as ElInput, Button as ElButton} from 'element-ui';
  import axios from 'axios';
  export default {
    data() {
      return {
        url: '',
        msg: []
      }
    },
    components: {Container, ResultTable, ElInput, ElButton},
    methods: {
      submit() {
        axios.post('/api/run-url', {url: this.url})
          .then(({data}) => data)
          .then(({code, data, msg}) => {
            if (code !== 1) {
              this.msg = data;
            } else console.log(msg)
          })
      }
    }
  }
</script>