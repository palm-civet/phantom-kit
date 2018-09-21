<template>
  <el-table
    :data="computedRules"
    border
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="问题描述">
            <span v-html="props.row.description"></span>
          </el-form-item>
          <el-form-item label="问题文件">
            <span v-html="props.row.offenders"></span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      prop="color"
      label="">
      <template slot-scope="scope">
        <i v-if="scope.row.color" class="el-icon-success"></i>
        <i v-else class="el-icon-error"></i>
      </template>
    </el-table-column>
    <el-table-column
      prop="name"
      label="名称">
    </el-table-column>
    <el-table-column
      prop="weight"
      label="权重">
    </el-table-column>
    <el-table-column
      prop="score"
      label="得分">
    </el-table-column>
  </el-table>
</template>

<script>
  import {
    Table as ElTable, 
    TableColumn as ElTableColumn,
    Form as ElForm,
    FormItem as ElFormItem
  } from 'element-ui';
  import yslowRulesMap from '../assets/yslow-rules.json';

  export default {
    props: ['rules', 'pass'],
    components: {ElTable, ElTableColumn, ElForm, ElFormItem},
    computed: {
      computedRules() {
        let rules = this.rules || {};

        return Object.keys(rules).map(rule => {
          let {components, message, score} = this.rules[rule];
          let {name, weight} = yslowRulesMap[rule] || {};

          return {
            name, weight, score,
            color: score > this.pass, 
            description: message, 
            offenders: components.map(component => decodeURIComponent(component)).join('<br/>')
          }
        })
      }
    }
  }
</script>