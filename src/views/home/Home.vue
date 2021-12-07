<template>
  <el-container class="personalInfo">
    <a v-if="$store.state.userInfo.role !='guest'" class="el-button el-button--primary" href="/personalHome">Personal
      Center</a>
    <a class="el-button el-button--primary" v-else href="/login">Login</a>
  </el-container>

</template>

<script>
import getIdentity from "@/store/userInfo";

export default {
  name: 'Home',
  async created() {
    await getIdentity();
  },
  data() {
    return {};
  },
  methods: {
    logout: async function () {
      await this.$axios.get("logout");
      await getIdentity();
    },
  }
}
</script>
<style lang="less" scoped>
.personalInfo {
  float: right;
  margin-top: 15px;
  line-height: 72px;
  margin-left: 60px;
}

:deep(.el-button) {
  span > a {
    color: white;
  }
}
</style>
