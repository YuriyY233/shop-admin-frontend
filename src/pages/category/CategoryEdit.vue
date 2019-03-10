<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <!-- <el-form-item label="所属类别">
        <el-cascader :options="data" v-model="defaultId" :show-all-levels="false" @change="handleChange"></el-cascader>
        当前分类的id为：{{form.category_id}}
      </el-form-item> -->

      <el-form-item label="排序数字">
        <el-input v-model="form.sort_id" placeholder="输入的排序值必须大于选中的类别"></el-input>
      </el-form-item>

      <el-form-item label="类别名称">
        <el-input v-model="form.title"></el-input>
      </el-form-item>

      <el-form-item label="类别级别">
        <el-input v-model="form.class_layer"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="handleCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        category_id: "",
        sort_id: "",
        title: "",
        class_layer: ""
      },
      data: [],
      defaultId: []
    };
  },
  mounted() {
    // this.$axios({
    //   url: "/admin/category/getlist/goods",
    //   withCredentials: true
    // }).then(res => {
    //   // console.log(res);
    //   const { message } = res.data;
    //   let arr = [];
    //   function loop(arr, item) {
    //     arr.forEach(v => {
    //       if (v.category_id == item.parent_id) {
    //         if (!v.children) {
    //           v.children = [];
    //         }
    //         v.children.push({
    //           ...item,
    //           value: item.category_id,
    //           label: item.title
    //         });
    //         return;
    //       }
    //       if (v.children) {
    //         loop(v.children, item);
    //       }
    //     });
    //   }
    //   message.forEach(v => {
    //     if (v.parent_id == 0) {
    //       arr.push({
    //         ...v,
    //         value: v.category_id,
    //         label: v.title
    //       });
    //     } else {
    //       loop(arr, v);
    //     }
    //   });
    //   this.data = arr;
    //   // console.log(arr)
    // });
    // this.form.category_id=this.$route.params.id;
    // this.handleChange([22,+this.form.category_id]);
    const { id } = this.$route.params;
    this.$axios({
      method: "get",
      url: `/admin/category/getcategorymodel/${id}`
    }).then(res => {
    //   console.log(res);
      const { message, status } = res.data;
      if (status == 0) {
          this.defaultId.push(message[0].channel_id)
        this.form = message[0];
      }
    });
  },
  methods: {
    onSubmit() {
      this.$axios({
        method: "post",
        url: `/admin/category/edit/${this.form.id}`,
        data: this.form,
        withCredentials: true
      }).then(res => {
        // console.log(res);

        const { message, status } = res.data;
        if (status == 0) {
          this.$message({
            type: "success",
            message: message
          });
          this.$router.push("/admin/category-list");
        } else {
          this.$message.error(message);
        }
      });
    },
    handleChange(value) {
      //   console.log(value)
    //   console.log(value);
      this.form.category_id = value[value.length - 1];
    },
    handleCancel() {
      this.$router.back();
    }
  }
};
</script>

<style>
</style>
