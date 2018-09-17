<template>
  <span>{{result}}</span>
</template>

<script>
  export default {
    props: ['result'],
    computed: {
      parsed() {
        if (this.result && this.result.length) {
          let parse = this.result.map(res => JSON.parse(res));
          
          return parse
        }
        return [];
      }
    },
    watch: {
      result() {
        console.log(JSON.parse(this.result[0]))
      }
    }
  }
</script>