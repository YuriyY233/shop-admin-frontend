<template>
  <el-row type="flex" class="row-bg" justify="space-between">
    <el-col :span=".5">
      <i class="el-icon-back el-btn"  @click="handleChange"></i>
    </el-col>
    <el-col :span="3">
      <i class="el-icon-picture"></i>
      <span>{{username}}{{identity}}</span>
      <a href="javascript:;" @click="handleQuit">退出</a>
    </el-col>
  </el-row>
</template>

<script>
import {mapState} from "vuex";
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
    },
    handleQuit(){
      this.$store.dispatch("user/logout").then(res=>{
        this.$router.push("/login")
      })
    }
  },
  computed:{
    ...mapState('user',{
      username:'username',
      identity:'identity'
    })
  }
};
</script>

<style>
.el-btn{
  cursor: pointer;
}
</style>
