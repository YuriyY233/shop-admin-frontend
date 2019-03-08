<template>
  <div class="login-form">
    <div class="login-form-header">登录</div>
    <el-form :model="ruleForm2" status-icon label-width="100px">
      <el-form-item label="账号">
        <el-input type="text" v-model="ruleForm2.uname" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="ruleForm2.upwd" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item class="button-list">
        <el-button type="primary" @click="submitForm(ruleForm2)">提交</el-button>
        <el-button @click="resetForm('ruleForm2')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm2: {
        uname: "",
        upwd: ""
      }
    };
  },
  methods: {
    submitForm(ruleForm2) {
      // console.log(ruleForm2);

      this.$axios({
        method: "post",
        url: "/admin/account/login",
        data: this.ruleForm2,
        withCredentials: true
      }).then(res => {
        // console.log(res);
        const { message, status } = res.data;
        if (status == 0) {
          this.$message({
            message: "登录成功",
            type: "success"
          });
          setTimeout(() => {
              this.$router.back();
          }, 1000);
        } else {
          this.$message.error(message);
        }
      });
    },
    resetForm(formName) {
      this.ruleForm2 = {
        uname: "",
        upwd: ""
      };
    }
  }
};
</script>

<style>
.login-form {
  width: 500px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin: -120px 0 0 -250px;
}

.login-form-header {
  color: #66b1ff;
  text-align: center;
  line-height: 2;
  margin-bottom: 20px;
  padding-left: 60px;
}

.button-list {
  text-align: center;
}
</style>
