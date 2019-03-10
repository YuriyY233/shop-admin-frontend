<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  mounted() {
    this.$axios({
      url: "/admin/account/islogin",
      withCredentials: true
    }).then(res => {
      console.log(res);
      
      const { code } = res.data;
      if (code == "nologin") {
        this.$router.push("/login");
      }
    });
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.mt20 {
  margin-top: 20px;
}
.md {
  margin-bottom: 20px;
}
</style>
