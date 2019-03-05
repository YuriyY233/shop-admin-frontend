<template>
  <div class="admin-container">
    <el-container>
      <el-aside width="auto">
        <div class="logo"></div>
        <aside-a :isCollapse="isCollapse"></aside-a>
      </el-aside>
      <el-container>
        <el-header>
          <header-a @send="getIsCollapse"></header-a>
        </el-header>
        <el-main>
          <breadcrumb-a></breadcrumb-a>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Aside from "./../components/Aside.vue";
import Header from "../components/Header";
import Breadcrumb from "../components/Breadcrumb";
export default {
  data: function() {
    return {
      isCollapse: false
    };
  },
  components: {
    "aside-a": Aside,
    "header-a": Header,
    "breadcrumb-a": Breadcrumb
  },
  computed: {
    // breadcrumb(){
    //   const {matched} = this.$route;
    //   return matched.map(v => {
    //       return {
    //           name: v.meta,
    //           path: v.path
    //       }
    //   });
    // }
    // bread: function() {
    //   var match = this.$route.matched;
    //   console.log(match);
    // }
  },
  methods: {
    getIsCollapse: function(data) {
      this.isCollapse = data;
      // console.log(this.isCollapse);
    }
  }
};
</script>

<style>
.admin-container {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-main {
   background-color: #e9eef3 
  
}

.el-container {
  height: 100%;
  margin-bottom: 40px;
}
.el-aside {
  display: flex;
  flex-direction: column;
}
.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.logo {
  height: 60px;
  background-color: #545c64;
}
.el-header {
  background-color: #fff;
}

</style>
