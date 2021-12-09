<template>
  <div>
    <!-- 面包屑导航区 -->
    <div class="page-header">
      <h3 class="page-title">
      <span class="page-title-icon bg-gradient-info text-white mr-2">
        <i class="mdi mdi-account"></i>
      </span> User Information View/Change </h3>
    </div>
    <div class="row">
      <div class="col-lg-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h3>User Information</h3>
            <div class="form_center_layout">
              <el-form :model="readableUserInfo" label-width="130px" ref="FormRef"
                       :rules="validateFormRules">
                <el-form-item label="Email Address" prop="username">
                  <el-input v-model="readableUserInfo.username" disabled></el-input>
                </el-form-item>
                <el-form-item label="Nickname" prop="nickname">
                  <el-input v-model="readableUserInfo.nickname"></el-input>
                </el-form-item>
                <el-form-item style="text-align: left" label="Profile">
                  <div class="row">
                    <div class="col-md-4">
                      <el-upload
                          class="avatar-uploader"
                          :action="$axios.defaults.baseURL+'uploadFile'"
                          :show-file-list="false"
                          with-credentials
                          :on-success="handleSuccess"
                          :before-upload="beforeAvatarUpload">
                        <img :src="staticURL+'pics/'+userInfo.profile" class="avatar"/>
                      </el-upload>
                    </div>
                    <div class="col-md-8 hint">
                    <p>Click the image to upload a new profile, and click the <strong>Change
                      Info</strong> button in the bottom to update.</p>
                      </div>
                  </div>
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
              <b-button variant="info" @click="changeInfo">Change Info</b-button>

            </div>
          </div>
        </div>
      </div>
    </div>
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
        username: "",
        nickname: "",
        role: "",
        status: "",
        profile: "",
      },// 表单验证
      validateFormRules: {
        nickname: [
          {required: true, message: 'Please enter nickname', trigger: 'blur'},
          {min: 2, max: 18, message: 'Nickname should between 2 to 18 characters', trigger: 'blur'}
        ],
      }
    }
  },
  computed: {
    readableUserInfo() {
      let info = this.userInfo;
      info.status = info.status == 1 ? "Normal" : "Disabled";
      return info;
    }
  },
  methods: {
    getInfo: async function () {
      const info = await this.$axios.get('getUserInfo');
      convert_time(info);
      console.log(info.data);
      this.userInfo = info.data;
    },
    handleSuccess(response, file, fileList) {
      if (response) {
        this.$message.success("Upload Success!");
        this.userInfo.profile = response["filename"];
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/gif' || file.type === 'image/svg' || file.type === 'image/bmp';
      const isLt2M = file.size / 1024 / 1024 < 5;

      if (!isJPG) {
        this.$message.error('Please upload an image file!');
      }
      if (!isLt2M) {
        this.$message.error('The max image size is 5MB!');
      }
      return isJPG && isLt2M;
    },
    changeInfo: function () {
      this.$refs.FormRef.validate(async valid => {
        if (!valid) {
          return false;
        }
        this.$confirm(`Do you really want to change your info?`, 'Confirm', {
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
          cancelButtonClass: 'btn-custom-cancel',
          type: 'success'
        }).then(async () => {
          let info = await this.$axios.get('changeUserInfo', {
            params: {
              "nickname": this.userInfo.nickname,
              "profile": this.userInfo.profile,
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
/** {*/
/*  font-family: 'ubuntu-regular'!important;*/
/*}*/
.el-card {
  min-height: 630px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.hint {
  /*position: absolute;*/
  /*top: 27%;*/
  margin: auto 0;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px solid #0f1531;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.disabledClass /deep/ .el-input__inner {
  color: red !important;
}

.enabledClass /deep/ .el-input__inner {
  color: blue !important;
}
</style>
