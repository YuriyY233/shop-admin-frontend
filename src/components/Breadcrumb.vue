<template>
  <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
    <el-breadcrumb-item :to="{ path: '/' }">后台管理</el-breadcrumb-item>
    <el-breadcrumb-item>{{bread}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  computed: {
    bread: function() {
      var match = this.$route.matched;
      // console.log(match)
      var res =[];
      match.forEach(function(v){
        res.push(v.meta);
      })
      return res[1]
    }
  }
};
</script>

<style>
.breadcrumb{
    padding-bottom:20px;
    border-bottom:1px #999 solid;
    margin-bottom:20px;
}
</style>
