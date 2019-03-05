<template>
  <el-menu
    default-active="1-1"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :collapse="isCollapse"
  >
    <el-submenu v-for="(item, index) in lists" :key="index" :index="`${index+1}`">
      <template slot="title">
        <i :class="item.icons"></i>
        <span slot="title">{{item.title}}</span>
      </template>
      <el-menu-item-group >
        <!-- <span slot="title">分组一</span> -->
        <router-link class="list-word" :to="item1.path" v-for="(item1, index1) in item.groups" :key="index1">
          <el-menu-item :index="`${index+1}-${index1+1}`">{{item1.option}}</el-menu-item>
        </router-link>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      // isCollapse: false,
      lists: [
        {
          icons: "el-icon-menu",
          title: "购物商城",
          groups: [
            { path: "/admin/goods-list", option: "商品管理" },
            { path: "/admin/category-list", option: "栏目管理" }
          ]
        },
        {
          icons: "el-icon-service",
          title: "会员管理",
          groups: [{ path: "/admin/account-list", option: "会员列表" }]
        },
        {
          icons: "el-icon-tickets",
          title: "商城订单",
          groups: [{ path: "/admin/order-manage", option: "订单管理" }]
        }
      ]
    };
  },
  props: ["isCollapse"]
};
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu-vertical-demo {
  flex: 1;
  border-right: none !important;
}
.el-menu-item-group__title {
  display: none;
}
.list-word:active {
  text-decoration: none;
}
</style>
