<template>
  <el-row type="flex" class="row-bg" justify="space-between">
    <el-col :span=".5">
      <i class="el-icon-back el-btn"  @click="handleChange"></i>
    </el-col>
    <el-col :span="3">
      <i class="el-icon-picture"></i> admin
    </el-col>
  </el-row>
</template>

<script>
export default {
  data: function() {
    return {
      isCollapse: false,
    };
  },
  methods: {
    handleChange: function() {
      this.isCollapse = !this.isCollapse;
        // console.log(this.isCollapse)
      this.$emit("send", this.isCollapse);
    }
  }
};
</script>

<style>
.el-btn{
  cursor: pointer;
}
</style>
