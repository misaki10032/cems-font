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
          <el-button type="success" @click="dialogFormVisible1 = true">注册</el-button>
        </el-form-item>
        <el-form-item class="link_box">
          <el-link style="" type="warning" @click="dialogFormVisible = true">申诉</el-link>
          <span style="color: #f63f09;margin:0 10px 0 10px ">|</span>
          <el-link style="" type="danger" @click="dialogFormVisible2 = true">忘记密码?</el-link>
        </el-form-item>
      </el-form>
    </div>

    <el-dialog :visible.sync="dialogFormVisible1" title="账号注册">
      <el-form ref="form1" :model="form1" :rules="form1Rules">
        <el-form-item :label-width="formLabelWidth" label="账号" prop="acc">
          <el-input v-model="form1.acc" autocomplete="off" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="密码" prop="psw">
          <el-input v-model="form1.psw" autocomplete="off" placeholder="请输入密码" type="password"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="密码" prop="psw2">
          <el-input v-model="form1.psw2" autocomplete="off" placeholder="请再次输入密码" type="password"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="手机号" prop="phoneTwo">
          <el-input v-model="form1.phoneTwo" autocomplete="off" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="邮箱" prop="email">
          <el-input v-model="form1.email" autocomplete="off" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="dialogFormVisible1=false">取 消</el-button>
          <el-button type="primary" @click="subForm('form1')">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog :visible.sync="dialogFormVisible" title="账号申诉">
      <el-form ref="form" :model="form" :rules="formRule">
        <el-form-item :label-width="formLabelWidth" label="账号" prop="phone">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="密码" prop="psw">
          <el-input v-model="form.psw" autocomplete="off" type="password"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="理由" prop="desc">
          <el-input v-model="form.desc" type="textarea"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="send('form')">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog :visible.sync="dialogFormVisible2" title="忘记密码">
      <el-form ref="form2" :model="form2" :rules="form2Rules">
        <el-form-item :label-width="formLabelWidth" label="账号" prop="acc">
          <el-input v-model="form2.acc" autocomplete="off" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="邮箱" prop="email">
          <el-input v-model="form2.email" autocomplete="off" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item v-show="bol1" :label-width="formLabelWidth" label="验证码" prop="code">
          <el-input v-model="form2.code" autocomplete="off" placeholder="请输入验证码"></el-input>
          <!--          <el-button type="primary" size="small"  :disabled="disable" :class="{ codeGeting:isGeting }" @click="getVerifyCode">
                      {{ getCode }}
                    </el-button>-->
        </el-form-item>
        <el-form-item v-show="bol1" :label-width="formLabelWidth">
          <el-button :class="{ codeGeting:isGeting }" :disabled="disable" size="small" type="primary"
                     @click="getVerifyCode">
            {{ getCode }}
          </el-button>
        </el-form-item>
        <el-form-item v-show="bol2" :label-width="formLabelWidth" label="新密码" prop="newPsw">
          <el-input v-model="form2.newPsw" autocomplete="off" placeholder="请输入密码" type="password"></el-input>
        </el-form-item>
        <el-form-item v-show="bol2" :label-width="formLabelWidth" label="确认密码" prop="newPsw1">
          <el-input v-model="form2.newPsw1" autocomplete="off" placeholder="再次输入密码" type="password">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="dialogFormVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="send1('form2')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>

</template>

<script>
export default {
  data() {
    var checkPsw = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (value.length > 15) {
        callback(new Error('密码过长!'));
      } else {
        callback();
      }
    };
    var checkPsw2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.form2.newPsw) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    var checkPsw3 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.form1.psw) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    var checkEmail = (rule, value, callback) => {
      const regPass = /^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/
      if (value === '') {
        callback(new Error('请输入邮箱'));
      } else if (!regPass.test(value)) {
        callback(new Error('请输入正确的邮箱'));
      } else {
        callback();
      }
    }
    var checkEmail1 = (rule, value, callback) => {
      const regPass = /^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/
      if (value === '') {
        callback(new Error('请输入邮箱'));
        this.bol1 = false;
      } else if (!regPass.test(value)) {
        callback(new Error('请输入正确的邮箱'));
        this.bol1 = false;
      } else if (value == "" || this.form2.acc == "") {
        callback(new Error('请输入账号或邮箱'));
      } else {
        this.bol1 = true;
        callback();
      }
    }
    var checkPhone = (rule, value, callback) => {
      const regPass = /^((1[3,5,8,7,9][0-9])|(14[5,7])|(17[0,6,7,8])|(19[1,7]))\d{8}$/
      if (value === '') {
        callback(new Error('请输入手机号'));
      } else if (!regPass.test(value)) {
        callback(new Error('请输入正确的手机号'));
      } else {
        callback();
      }
    };
    var checkAcc1 = (rule, value, callback) => {
      var nu = /^\d{1,}$/;
      if (value === '') {
        this.bol1 = false
        callback(new Error('请输入账号'));
      } else if (nu.test(value)) {
        this.bol1 = false
        callback(new Error('账号不能为纯数字'));
      } else if (value.length > 15) {
        this.bol1 = false
        callback(new Error('账号过长!'));
      } else if (value == "" || this.form2.email == "") {
        this.bol1 = false
      } else {
        this.bol1 = true
        callback();
      }
    };
    var checkAcc = (rule, value, callback) => {
      var nu = /^\d{1,}$/;
      if (value === '') {
        callback(new Error('请输入账号'));
      } else if (nu.test(value)) {
        callback(new Error('账号不能为纯数字'));
      } else if (value.length > 15) {
        callback(new Error('账号过长!'));
      } else {
        callback();
      }
    };
    var checkDec = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入申诉理由'));
      } else {
        callback();
      }
    };
    var checkCode = (rule, value, callback) => {
      if (value === '') {
        this.bol2 = false;
        callback(new Error('请输入验证码'));
      } else if (value === this.infomation) {
        this.bol2 = true;
        callback();
      } else {
        this.bol2 = false;
        callback(new Error('验证码错误'));
      }
    }
    return {
      getCode: '获取验证码',
      isGeting: false,
      count: 60,
      disable: false,
      bol1: false,
      bol2: false,
      infomation: "",
      form: {
        phone: "",
        desc: "",
        psw: ""
      },
      formLabelWidth: "70px",
      dialogFormVisible: false,
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      userlist: {},
      form1: {
        acc: "",
        psw: "",
        psw2: "",
        phoneTwo: "",
        email: ""
      },
      form2: {
        acc: "",
        email: "",
        code: "",
        newPsw: "",
        newPsw1: ""
      },
      form2Rules: {
        acc: [{
          validator: checkAcc1,
          trigger: 'blur'
        }],
        newPsw: [{
          validator: checkPsw,
          trigger: 'blur'
        }],
        newPsw1: [{
          validator: checkPsw2,
          trigger: 'blur'
        }],
        email: [{
          validator: checkEmail1,
          trigger: 'blur'
        }],
        code: [{
          validator: checkCode,
          trigger: 'blur'
        }]
      },
      formRule: {
        phone: [{
          validator: checkAcc,
          trigger: 'blur'
        }],
        psw: [{
          validator: checkPsw,
          trigger: 'blur'
        }],
        desc: [{
          validator: checkDec,
          trigger: 'blur'
        }]
      },
      form1Rules: {
        acc: [{
          validator: checkAcc,
          trigger: 'blur'
        }],
        psw: [{
          validator: checkPsw,
          trigger: 'blur'
        }],
        psw2: [{
          validator: checkPsw3,
          trigger: 'blur'
        }],
        phoneTwo: [{
          validator: checkPhone,
          trigger: 'blur'
        }],
        email: [{
          validator: checkEmail,
          trigger: 'blur'
        }]
      },
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
    getVerifyCode() {
      var acc = this.form2.acc;
      var email = this.form2.email
      var countDown = setInterval(() => {
        if (this.count < 1) {
          this.isGeting = false;
          this.disable = false;
          this.getCode = '获取验证码';
          this.count = 60;
          clearInterval(countDown);
        } else {
          this.isGeting = true;
          this.disable = true;
          this.getCode = this.count-- + 's后重发';
        }
      }, 1000);
      this.$axios.get("forgetPsw", {
        params: {
          acc,
          email
        }
      }).then(res => {
        if (res.data == '203') {
          this.$message({
            message: "账号或邮箱错误",
            type: 'error'
          });
        } else {
          this.$message({
            message: "发送成功",
            type: 'success'
          });
          this.infomation = res.data;
        }
      })
    },
    subForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post("/register", this.form1).then(res => {
            if (res.data == "200") {
              this.$message({
                message: '注册成功',
                type: 'success'
              });
              this.dialogFormVisible1 = false;
            } else if (res.data == "401") {
              this.$message({
                message: '账号已存在!',
                type: 'error'
              });
            } else if (res.data == "402") {
              this.$message({
                message: '手机号已存在!',
                type: 'error'
              });
            } else {
              this.$message({
                message: '邮箱已存在!',
                type: 'error'
              });
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    send1(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post("/forgetPswOk", this.form2).then(res => {
            if (res.data == "402") {
              this.$message({
                message: "账号或邮箱错误",
                type: 'error'
              });
            } else {
              this.$message({
                message: res.data,
                type: 'success'
              });
              this.dialogFormVisible2 = false;
            }
          })
        }
      });
    },
    send(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post("/appeal", this.form).then(res => {
            if (res.data == "405") {
              this.$message({
                message: '账号未被封禁!',
                type: 'error'
              });
            } else if (res.data == "502") {
              this.$message({
                message: '账号或密码错误',
                type: 'error'
              });
            } else {
              this.$message({
                message: '申诉已提交',
                type: 'success'
              });
              this.dialogFormVisible = false
            }
          })
        } else {
          this.$message({
            message: '请更改错误',
            type: 'success'
          })
          return false;
        }
      });
    },
    open() {
      this.$refs.addData.dialogFormVisible = true;
    },
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
          var adminLevel = res.data.adminLevel;
          var adminId = res.data.adminId;
          window.sessionStorage.setItem("num", adminName);
          window.sessionStorage.setItem("level", adminLevel);
          window.sessionStorage.setItem("id", adminId);
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
  margin-bottom: 0;
  padding-bottom: 0;
}

.link_box {
  margin: 0;
  padding: 0;
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

.codeGeting {
  background: #cdcdcd;
  border-color: #cdcdcd;
}
</style>
