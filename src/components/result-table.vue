<template>
  <el-tabs v-model="current" type="border-card" @tab-click="handleClick">
    <el-tab-pane label="基础指标" name="basic">
      <basic-results 
        v-for="result in readyTimes"
        :key="result.url"
        :results="result">
      </basic-results>
    </el-tab-pane>
    <el-tab-pane label="yslow组件" name="ys-component">yslow组件</el-tab-pane>
    <el-tab-pane label="yslow优化" name="ys-optimization">
      <yslow-rules 
        v-for="(rule, index) in yslowRules" 
        :key="index" 
        :rules="rule" 
        :pass="80">
      </yslow-rules>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  import {Tabs as ElTabs, TabPane as ElTabPane} from 'element-ui';
  // yslow24金规建议
  import YslowRules from './yslow-rules.vue';
  // 基础指标
  import BasicResults from './basic-results.vue';

  export default {
    props: ['result'],
    data() {
      return {
        current: 'basic',
      }
    },
    components: {ElTabs, ElTabPane, YslowRules, BasicResults},
    computed: {
      parsed() {  
        let {yslow, readyTime} = this.result;
        // 解析结果
        return {
          yslow: yslow && yslow.map(y => JSON.parse(y||'{}')),
          readyTime: readyTime && readyTime.map(r => JSON.parse(r||'{}')),
        }
      },
      // yslow优化结果
      yslowRules() {
        let {yslow} = this.parsed;

        return yslow && yslow.map(({g}) => g);
      },
      // ready数据
      readyTimes() {
        let {readyTime} = this.parsed;
        console.log(readyTime)
        return readyTime;
      }
    },
    methods: {
      handleClick(tab, event) {

      }
    }
  }
</script>