<template>
  <div class="custom-tree-container">
    <div class="block">
      <el-row type="flex" justify="space-between" align="middle" class="mb20">
        <div>
          <!-- 跳转到新增商品 -->
          <el-button @click="handleCategoryAdd">新增</el-button>
        </div>
      </el-row>
      <el-row type="flex" justify="space-between" class="tree-header mt20">
        <span>类别</span>
        <span>排序</span>
        <span>操作</span>
      </el-row>
      <el-tree
        :data="data"
        show-checkbox
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
      >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
          <span>
            <el-input size="mini" v-model="data.sort_id" @blur="handleEnter(data)"/>
          </span>
          <span>
            <el-button type="text" size="mini" @click="() => append(data)">添加</el-button>
            <el-button type="text" size="mini" @click="() => edit(data)">编辑</el-button>
            <el-button type="text" size="mini" @click="() => remove(node, data)">删除</el-button>
          </span>
        </span>
      </el-tree>
    </div>
  </div>
</template>

<script>
let id = 1000;
export default {
  mounted() {
    this.$axios({
      method: "get",
      url: "/admin/category/getlist/goods"
    }).then(res => {
      // console.log(res);
      let arr = [];
      let { message } = res.data;
      message = message.sort((a, b) => {
        // 如果a的category_id大于B的，那么b数据就排到a的前面
        return a.category_id - b.category_id;
      });
      function loop(arr, item) {
        arr.forEach(v => {
          if (v.category_id == item.parent_id) {
            if (!v.children) {
              v.children = [];
            }
            v.children.push({
              ...item,
              id: item.category_id,
              label: item.title
            });
            return;
          }
          if (v.children) {
            loop(v.children, item);
          }
        });
      }
      message.forEach(v => {
        if (v.parent_id == 0) {
          arr.push({
            ...v,
            id: v.category_id,
            label: v.title
          });
        } else {
          loop(arr, v);
        }
      });
      this.data = arr;
      // console.log(arr);
      
    });
  },
  data() {
    return {
      data: []
    };
  },
  methods: {
    edit(data) {
      this.$router.push(`/admin/category-edit/${data.category_id}`)
    },
    append(data) {
      const newChild = { id: id++, label: "testtest", children: [] };
      if (!data.children) {
        this.$set(data, "children", []);
      }
      data.children.push(newChild);
    },

    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    },
    handleCategoryAdd(){
      this.$router.push("/admin/category-add")
    },
    handleEnter(data) {
      // 修改排序
      this.$axios({
        method: "POST",
        url: `/admin/category/edit/${data.category_id}`,
        data,
        // 处理跨域
        withCredentials: true
      }).then(res => {
        const { status, message } = res.data;
        if (status == 0) {
          this.$message({
            type: "success",
            message
          });
        }
      });
    },
  }
};
</script>

<style>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.el-input--mini .el-input__inner {
  width: 80px;
  height: 18px !important;
  line-height: 18px !important;
}
.tree-header{
    background-color: #fff;
    padding: 0 40px;
}
</style>
