<template>
  <container name="home">
    <el-row :gutter="12">
      <el-col :span="6">
        <el-input 
          v-model="url" 
          autocomplete="true" 
          placeholder="请输入网址"
          @keyup.enter.native="submit"></el-input>
      </el-col>
      <el-col :span="2"><el-button @click="submit" type="primary">
        <span v-if="!loading">提交</span>
        <i v-else class="el-icon-loading"></i>
      </el-button></el-col>
    </el-row>
    
    <result-table 
      :result="result" 
      class="result-container">    
    </result-table>
  </container>
</template>

<script>
  import '../styles/home.scss';
  // 基础容器
  import Container from '../components/container.vue';
  // 结果展示表格
  import ResultTable from '../components/result-table.vue';

  import {Input as ElInput, Button as ElButton, Main as ElMain, Row as ElRow, Col as ElCol, Message} from 'element-ui';
  import axios from 'axios';
  export default {
    data() {
      return {
        url: 'https://biztest.chunyu.me/',
        loading: false,
        result: []
      }
    },
    components: {Container, ResultTable, ElInput, ElButton, ElMain, ElRow, ElCol},
    methods: {
      submit() {
        this.loading = true;
        // 提交验证
        axios.post('/api/run-url', {url: this.url})
          .then(({data}) => data)
          .then(({code, data, msg}) => {
            if (code !== 1) {
              this.result = data;
            } else {
              Message.error(msg)
            }
          })
          .finally(() => {
            this.loading = false;
          })
      }
    }
  }
</script>