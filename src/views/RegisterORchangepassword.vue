<template>
  <div>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区 -->
      <div class="avatar_box">
        <router-link to="/"><img src="../assets/images/logo_mini.png" alt="avatar"/></router-link>
      </div>
      <h2>{{ $route.path == '/register' ? 'Register' : 'Reset Password' }}</h2>
      <!-- 登录表单 -->
      <div style="margin-top: 20px">
        <el-form
            ref="registerFormRef"
            :model="registerForm"
            :rules="registerFormRules"
            label-position="right"
            label-width="60px"
            class="login_form"
        >

          <el-form-item label="Email" prop="username">
            <el-input v-model="registerForm.username" prefix-icon="el-icon-message"></el-input>
          </el-form-item>
          <el-form-item label="Captcha" prop="captcha">
            <el-input v-model="registerForm.captcha" prefix-icon="el-icon-chat-line-square"></el-input>
            <el-button type="primary" class="capbtn" @click="get_captcha" :disabled="captcha_disable">
              {{ captcha_state }}
            </el-button>
          </el-form-item>
          <el-form-item label="Nickname" v-if="$route.path=='/register'" prop="nickname">

            <el-input v-model="registerForm.nickname" id="nickname" prefix-icon="iconfont icon-user" key="172"></el-input>
          </el-form-item>
          <el-form-item label="Password" prop="pass">
            <el-input
                v-model="registerForm.pass"
                type="password"
                id="passwd"
                autocomplete="new-password"
                key="178"
                prefix-icon="iconfont icon-3702mima"
            ></el-input>
<!--            使用autocomplete阻止chrome自动填充input-->
          </el-form-item>
          <el-form-item label="ConfirmPass" prop="confirmPass">
            <el-input
                v-model="registerForm.confirmPass"
                type="password"
                id="conpasswd"
                prefix-icon="iconfont icon-3702mima"
            ></el-input>
          </el-form-item>
          <el-form-item class="btns">
            <el-button type="primary" @click="registerORrest" v-on:keyup.enter="registerORrest">
              {{ $route.path == '/register' ? 'Register!' : 'Reset!' }}
            </el-button>
            <el-button @click="returnLogin">Return to Login</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
  </div>
</template>

<script>

import {validateEmail, isEmail} from "../utils/validate";
import Swal from 'sweetalert2';

export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter password'));
      } else {
        if (this.registerForm.confirmPass !== '') {
          this.$refs.registerFormRef.validateField('confirmPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter password again'));
      } else if (value !== this.registerForm.pass) {
        callback(new Error('The two passwords do not match!'));
      } else {
        callback();
      }
    };
    // var validateUsername = (rule, value, callback) => {
    //   if (value.includes(' ')) {
    //     callback(new Error('User name cannot contain space'));
    //   }else if(!((value[0]>='a'&&value[0]<='z')||(value[0]>='A'&&value[0]<='Z'))){
    //     callback(new Error('User name must start with a letter'));
    //   } else {
    //     callback();
    //   }
    // };
    return {
      registerForm: {
        username: '',
        captcha: '',
        nickname: '',
        pass: '',
        confirmPass: '',
        reset: this.$route.path == '/register' ? 0 : 1,
      },
      waitTime: 60,
      timer: null,
      captcha_state: "Get Captcha",
      // 表单验证
      registerFormRules: {
        username: [
          {validator: validateEmail, trigger: 'blur'},
          {required: true, message: 'Please enter email as your login proof', trigger: 'blur'},
        ],
        captcha: [
          {required: true, message: 'Please enter captcha', trigger: 'blur'},
          {min: 6, max: 6, message: 'The captcha is a 6-digit number', trigger: 'blur'}
        ],
        nickname: [
          {required: true, message: 'Please enter nickname', trigger: 'blur'},
          {min: 2, max: 18, message: 'Nickname should between 2 to 18 characters', trigger: 'blur'}
        ],
        pass: [
          {validator: validatePass, trigger: 'blur'},
          {required: true, message: 'Please enter password', trigger: 'blur'},
          {min: 2, max: 18, message: 'Password should between 2 to 18 characters', trigger: 'blur'}
        ],
        confirmPass: [
          {validator: validatePass2, trigger: 'blur'},
          {required: true, message: 'Please enter password', trigger: 'blur'},
        ],
      }
    }
  },
  computed: {
    captcha_disable() {
      return this.captcha_state.startsWith("Get") ? false : true;
    }
  },
  methods: {
    returnLogin() {
      this.$router.push("/login");
    },
    changeWaitTime() {
      if (this.waitTime == 0) {
        clearInterval(this.timer);
        this.waitTime = 60;
        this.captcha_state = `Get Captcha`;
      } else {
        this.waitTime -= 1;
        this.captcha_state = `Please wait ${this.waitTime} s for a new captcha`;
      }

    },
    async get_captcha() {
      if (isEmail(this.registerForm.username)) {
        let info = await this.$axios.post('getCaptcha', {
          "username": this.registerForm.username, 'reset': this.registerForm.reset
        });
        if(info){
          this.timer = setInterval(this.changeWaitTime, 1000);
        }
      } else {
        await Swal.fire("","Please enter a correct email address!");
      }

    },
    registerORrest() {
      // 表单预验证
      // valid：bool类型

      this.$refs.registerFormRef.validate(async valid => {
        if (!valid) {
          return false;
        }
        let hint = this.$route.path == '/register' ? "register?" : "reset your password?";
        console.log(hint);
        this.$confirm("Do you really want to " + hint, this.$route.path == '/register' ? 'Register' : 'Reset Password', {
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
          // cancelButtonClass: 'btn-custom-cancel', // yes和no位置互换
          type: 'success'
        }).then(async () => {
          let registerFormEnctrypted = this.$lodash.clone(this.registerForm);
          registerFormEnctrypted.pass = this.$jse.encrypt(this.registerForm.pass);
          registerFormEnctrypted.confirmPass = this.$jse.encrypt(this.registerForm.confirmPass);
          console.log(registerFormEnctrypted);
          let info = null;
          if (this.$route.path == '/register') {
            info = await this.$axios.post('register', registerFormEnctrypted);
          } else {
            info = await this.$axios.post('resetPasswordUser', registerFormEnctrypted);
          }
          if (info) {
            this.$router.push("/login");
          }
        }).catch(() => {
        });

        // this.$router.push('/home');
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
  top: 45%;
  -webkit-transform: translate(-60%, -80%);
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
    //transform: translate(-30%, -100%);
    background-color: #fff;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }

  h2 {
    text-align: center;
    margin-left: 50px;
    margin-top: 10px;
  }
}

.login_form {
  //position: absolute;
  //bottom: 60px;
  width: 100%;
  padding: 0 20px;
  margin-top: 20px;
  box-sizing: border-box;
}

.btns {
  display: flex;
  justify-content: center;
}

.info {
  font-size: 13px;
  margin: 10px 15px;
}

.el-input {
  margin-left: 30px;
  width: 80%;
}

/deep/ .el-form-item__error {
  margin-left: 60px;
}

.capbtn {
  float: right;
  position: absolute; //绝对位置不占空间
  margin-left: 10px;
}
</style>
