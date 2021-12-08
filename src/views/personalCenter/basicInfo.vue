<template>
  <div>
  <!-- 面包屑导航区 -->
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/personalHome' }">{{$store.state.userInfo.role=='user'?'Personal Center':'Management Center'}}</el-breadcrumb-item>
    <el-breadcrumb-item>Personal Info</el-breadcrumb-item>
    <el-breadcrumb-item>Basic Info</el-breadcrumb-item>
  </el-breadcrumb>
  <el-card>
    <h3>User Info</h3>
    <div class="form_center_layout">
      <el-form :model="readableUserInfo" label-width="130px" ref="FormRef"
               :rules="validateFormRules">
        <el-form-item label="Email Address" prop="username">
          <el-input v-model="readableUserInfo.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="Nickname" prop="nickname">
          <el-input v-model="readableUserInfo.nickname"></el-input>
        </el-form-item>
        <el-form-item label="Role" prop="role">
          <el-input v-model="readableUserInfo.role" disabled></el-input>
        </el-form-item>
        <el-form-item label="Register Time" prop="register_time">
          <el-input v-model="readableUserInfo.register_time" disabled></el-input>
        </el-form-item>
        <el-form-item class="disabledClass" v-if="!userInfo.status" label="Status" prop="status">
          <el-input v-model="readableUserInfo.status" disabled></el-input>
        </el-form-item>
        <el-form-item class="enabledClass" v-else label="Status" prop="status">
          <el-input v-model="readableUserInfo.status" disabled></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="changeInfo">Change Info</el-button>
    </div>
  </el-card>
  </div>
</template>

<script>
import getIdentity from "@/store/userInfo";
import {convert_time} from "../../utils/time";

export default {
  name: "basicInfo",
  async created() { //第一次加载basicinfo组件的时候才会执行，因此简单的在左边切换标签页是没办法执行此函数的
    await this.getInfo();
  },
  data() {
    return {
      userInfo: {
        username:"",
        nickname:"",
        role:"",
        status:"",
      },// 表单验证
      validateFormRules: {
        nickname: [
          {required: true, message: 'Please enter nickname', trigger: 'blur'},
          {min: 2, max: 18, message: 'Nickname should between 2 to 18 characters', trigger: 'blur'}
        ],
      }
    }
  },
  computed:{
    readableUserInfo() {
      let info = this.userInfo;
      info.status = info.status==1?"Normal":"Disabled";
      return info;
    }
  },
  methods: {
    getInfo: async function(){
      const info = await this.$axios.get('getUserInfo');
      convert_time(info);
      console.log(info.data);
      this.userInfo = info.data;
    },
    changeInfo: function () {
      this.$refs.FormRef.validate(async valid => {
        if (!valid) {
          return false;
        }
        this.$confirm(`Do you really want to change user info?`, 'Confirm', {
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
          cancelButtonClass: 'btn-custom-cancel',
          type: 'success'
        }).then(async () => {
          let info = await this.$axios.get('changeUserInfo', {
            params: {
              "nickname": this.userInfo.nickname,
            }
          });
          if (info) {
            await this.getInfo();
            await getIdentity();
          }
        }).catch(() => {
        });
      })
    },
  }
}
</script>

<style scoped>
.el-card {
  min-height: 630px;
}
.disabledClass /deep/ .el-input__inner
{
  color:red!important;
}
.enabledClass /deep/.el-input__inner
{
  color:blue!important;
}
</style>
