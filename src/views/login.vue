<template>
  <div class="login_container">
    <!-- 登录盒子-->
    <div class="login_box">
      <!-- 头像盒子-->
      <div class="img_box">
        <img src="../assets/snut.png"/>
      </div>
      <!-- 表单区域表单数据绑定-->
      <el-form ref="formRef" :model="loginForm" :rules="loginFormRules" class="login_form">
        <el-form-item prop="account">
          <el-input v-model="loginForm.num" placeholder="请输入账号" prefix-icon="iconfont icon-yonghu">
          </el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input v-model="loginForm.pwd" placeholder="请输入密码" prefix-icon="iconfont icon-mima"
                    type="password">
          </el-input>
        </el-form-item>

        <el-form-item class="btn_box">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userlist: {},
      loginForm: {
        num: "",
        pwd: ""
      },
      loginFormRules: {
        num: [{
          required: true,
          message: '请输入账号',
          trigger: 'blur'
        },
          {
            min: 3,
            max: 30,
            message: '账号长度在 3 个字符以上',
            trigger: 'blur'
          }
        ],
        pwd: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        },
          {
            min: 3,
            max: 30,
            message: '密码长度在 3 个字符以上',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  mounted() {
  },
  methods: {
    //重置表单
    resetForm() {
      this.$refs.formRef.resetFields();
    },
    //登录
    login() {
      this.$axios.post('/userlogin', this.loginForm).then(res => {
        if (res.data == "404") {
          this.$message({
            message: '账号不存在!',
            type: 'error'
          });
        } else if (res.data == "502") {
          this.$message({
            message: '账号或密码错误',
            type: 'error'
          });
        } else if (res.data == "403") {
          this.$message({
            message: '账号被锁定',
            type: 'error'
          });
        } else if (res.data == "500") {
          this.$message({
            message: '未知错误',
            type: 'error'
          });
        } else {
          this.$message({
            message: '登录成功',
            type: 'success'
          });
          var adminName = res.data.adminName;
          var adminToken = res.data.adminToken;
          window.sessionStorage.setItem("num", adminName);
          window.sessionStorage.setItem("token", adminToken);
          this.$router.push("/main");
        }
      });
    }
  }
}
</script>

<style>
html,
body,
#app,
.login_container {
  height: 100%;
  margin: 0px;
  padding: 0px;
}

.login_container {
  background-color: #00a7fa;
  background: linear-gradient(145deg, #8b0389, #7f51ce, #00a7fa, #7f51ce, #8b0389);
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 10px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.img_box {
  width: 130px;
  height: 130px;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 50%;
  padding: 5px;
  border: 1px solid #eee;
}

.img_box img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #eee;
}

.btn_box {
  text-align: right;
  padding-right: 20px;
}

.login_form {
  position: absolute;
  bottom: 20px;
  width: 100%;
  padding: 0px 20px;
  box-sizing: border-box;
}
</style>
