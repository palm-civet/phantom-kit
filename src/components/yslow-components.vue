<template>
<div>
  <el-table
    :data="computedRules"
    border>
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-table :header-cell-style="{background:'#f1f1f1'}" border class="demo-table-expand" :data="props.row.list" max-height="500">
          <el-table-column
           v-for="item in list" 
           :prop="item.prop"
           :label="item.label"
           :formatter="item.formatter"
           >
          </el-table-column>
        </el-table>
      </template>
    </el-table-column>
    <!-- <el-table-column
       v-for="item in list" 
       :prop="item.prop"
       :label="item.label"> -->
    </el-table-column>
    <el-table-column
       prop="type"
       label="type">
    </el-table-column>
    <el-table-column
       prop="size"
       label="SIZE(KB)">
    </el-table-column>
  </el-table>  
</div>
  
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
    props: ['results'],
    components: {ElTable, ElTableColumn, ElForm, ElFormItem},
    data () {
    	return {
    		list: [{
          label: 'TYPE',
          prop: 'type',
        },{
          label: 'SIZE(KB)',
          prop: 'size',
          formatter: this.convertUnit
        },{
          label: 'GZIP(KB)',
          prop: 'gzip',
          formatter: this.convertUnit
        },{
          label: 'COOKIE RECEIVED(KB)',
          prop: 'cr',
          formatter: this.convertUnit
        },{
          label: 'COOKIE SENT(KB)',
          prop: 'cs',
          formatter: this.convertUnit
        },{
          label: 'HEADERS',
          prop: 'headers',
        },{
          label: 'URL',
          prop: 'url',
          formatter: function (row, column, cellValue, index) {
            return decodeURIComponent(cellValue)
          }
        },{
          label: 'expires',
          prop: 'expires',
        },{
          label: 'etag',
          prop: 'etag',
        }]
    	}
    },
    methods: {
      convertUnit(row, column, cellValue, index) {
        if (!cellValue) return 0;
        return (Number(cellValue)/1000).toFixed(2)*100/100;
      }
    },
    computed: {
      computedRules() {
        let components = this.results || {};
        window.components = components;
        console.log(components)
        let data = Object.keys(components).map(rule => {
          let {list, num, size } = components[rule];
          return {
            list, list,
            num: num, 
            size: Number(size).toFixed(2)*100/100, 
            type: `${rule}(${num})`
          }
        });
        console.log(data)
        return data;
      }
    }
  }
</script>