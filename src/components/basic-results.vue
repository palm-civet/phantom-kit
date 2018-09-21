<template>
  <el-form 
    class="basic-wrap" 
    label-width="200px"
    ref="form" >
    <el-form-item 
      v-for="rule in computedRules" 
      :key="rule.label"
      :label="rule.label">
      <el-progress 
        :show-text="false"
        :percentage="rule.percent">
      </el-progress>
      {{rule.value}}ms
    </el-form-item>
  </el-form>
</template>

<script>
  import {
    Form as ElForm,
    FormItem as ElFormItem,
    Progress as ElProgress
  } from 'element-ui';

  const RESULTS_KEYS = {
    dom_complete: 'DOMContentLoaded',
    window_onload: 'OnLoad'
  };

  export default {

    props: ['results'],
    components: {ElForm, ElFormItem, ElProgress},
    computed: {
      computedRules() {
        if(!this.results) return;
        let kvs = Object.keys(this.results)
          .filter(key => (key in RESULTS_KEYS))
          .map(key => {
            return {
              label: RESULTS_KEYS[key], 
              value: this.results[key]
            }
          })

        let max = Math.max(...kvs.map(kv => kv.value));

        return kvs.map(({value, label}) => {
          return {
            percent: value/max*100,
            value,
            label
          }
        });
      }
    }
  }
</script>