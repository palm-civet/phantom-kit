<template>
  <el-container :class="`page-${name} page-container`" direction="vertical">
    <el-header></el-header>
    <el-main>
      <slot></slot>
    </el-main>
    <el-footer></el-footer>
  </el-container>
</template>

<script>
  import {Container as ElContainer, Header as ElHeader, Main as ElMain, Footer as ElFooter} from 'element-ui';

  export default {
    props: ['name'],
    components: {ElContainer, ElHeader, ElMain, ElFooter}
  }
</script>