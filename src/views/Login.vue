<template>
  <div>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区 -->
      <div class="avatar_box">
        <router-link to="/"><img src="../assets/images/logo_mini.png" alt="avatar"/></router-link>
      </div>
      <h2>Login</h2>
      <!-- 登录表单 -->
      <div>
        <el-form
            ref="loginFormRef"
            :model="loginForm"
            :rules="loginFormRules"
            label-width="60px"
            label-position="right"
            class="login_form"
        >
          <el-form-item label="Email" prop="username">
            <el-input v-model="loginForm.username" id="username" key="123"
                      @keyup.enter.native="login" prefix-icon="iconfont icon-user"></el-input>
          </el-form-item>
          <el-form-item label="Password" prop="pass" id="passwdform">
            <el-input
                v-model="loginForm.pass"
                id="passwd"
                type="password"
                key="重新渲染，但是不能解决浏览器自动填充的问题"
                prefix-icon="iconfont icon-3702mima"
                @keyup.enter.native="login"
            ></el-input>
            <a class="forgotpass" href="/forgotPassword">Forgot Password?</a>
          </el-form-item>

          <el-form-item class="btns">
            <el-button type="primary" @click="login" @keyup.enter.native="login">Login</el-button>
            <el-button @click="registerForm">Register</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import {isEmail, validateEmail} from "../utils/validate";
import getIdentity from "../store/userInfo";
export default {
  data() {

    return {
      loginForm: {
        username: '',
        pass: '',
      },
      // 表单验证
      loginFormRules: {
        username: [
          {required: true, message: 'Please enter your email address', trigger: 'blur'},
          {validator: validateEmail, trigger: 'blur'}
        ],
        pass: [
          {required: true, message:"Please enter your password", trigger: 'blur'},
          {min: 2, max: 18, message: 'Between 2 to 18 characters', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    // 表单重置按钮
    registerForm() {
      this.$router.push("/register");
    },
    login() {
      // 表单预验证
      // valid：bool类型
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) {
          return false;
        }
        let loginFormEnctrypted = this.$lodash.clone(this.loginForm);
        loginFormEnctrypted.pass = this.$jse.encrypt(this.loginForm.pass);
        const info = await this.$axios.post('login', loginFormEnctrypted);
        if (info) {
          await getIdentity(); //更新用户信息
          this.$router.push("/personalHome");
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
/* // lang="less" 支持less格式
// scoped vue的指令，只在当前组件生效 */
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}

.login_box {
  width: 450px;
  height: 360px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 35%;
  -webkit-transform: translate(-60%, -50%);
  background-color: #fff;

  .avatar_box {
    width: 130px;
    height: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    //position: absolute;
    margin-left: 40%;
    //transform: translate(-30%, -95%);
    background-color: #fff;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }

  h2 {
    //transform: translate(0%, 70%);
    text-align: center;
    margin-left: 50px;
    margin-top: 10px;
  }
}

.login_form {
  //position: absolute;
  bottom: 60px;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.btns {
  display: flex;
  justify-content: center;
  margin-left: 0;
}

.info {
  font-size: 13px;
  margin: 10px 15px;
}
//vue 2用/deep/，vue 3用:deep()
/deep/ .el-form-item__error {
  margin-left: 60px;
}

#passwdform {
  /deep/.el-form-item__error{
    top: 60%;
  }
}

//div + a{
//  color:red;
//}

.el-input {
  margin-left: 30px;
  width: 80%;
}
.forgotpass{
  float:right;
  margin-right:25px;
}
</style>
