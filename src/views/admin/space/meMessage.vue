<template>
  <el-row>
    <el-col :span="9">
      <el-form ref="form" :rules="rules" :model="form" label-width="80px">
        <el-form-item label="账号" prop="adminNum">
          <el-input v-model="form.adminNum" disabled></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="adminPhone">
          <el-input v-model="form.adminPhone"></el-input>
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker type="date" prop="adminBirth" placeholder="生日" v-model="form.adminBirth"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="电子邮箱" prop="adminEmail">
          <el-input v-model="form.adminEmail"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="adminHouse">
          <el-input type="textarea" v-model="form.adminHouse"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="send()">保存</el-button>
          <el-button style="margin-left: 10px" @click="dialogFormVisible = true">修改密码</el-button>
        </el-form-item>


        <el-dialog :visible.sync="dialogFormVisible" title="修改密码">
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm">
            <el-form-item :label-width="formLabelWidth" label="旧密码" prop="psw">
              <el-input type="password" v-model="ruleForm.psw" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item :label-width="formLabelWidth" label="新密码" prop="pass">
              <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item :label-width="formLabelWidth" label="确认密码" prop="checkPass">
              <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
            <!--            <el-form-item>-->
            <!--              <el-button @click="dialogFormVisible = false">取 消</el-button>-->
            <!--              <el-button type="primary" @click="send1('form')">确 定</el-button>-->
            <!--            </el-form-item>-->
          </el-form>
        </el-dialog>


      </el-form>
    </el-col>
  </el-row>


</template>
<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };

    return {
      formLabelWidth: "100px",
      dialogFormVisible: false,
      num: sessionStorage.getItem("num"),
      form: {
        adminId: '',
        adminNum: '',
        adminPhone: '',
        adminBirth: '',
        adminEmail: '',
        adminHouse: ''
      },
      ruleForm: {
        phone: sessionStorage.getItem("num"),
        psw: '',
        pass: '',
        checkPass: '',
      },
      rules: {
        adminPhone: [
          {required: true, message: '请输入电话', trigger: 'blur'},
          {min: 11, max: 11, message: '请输入正确的电话格式', trigger: 'blur'}
        ],
        adminEmail: [
          {required: true, message: '请输入邮箱地址', trigger: 'blur'},
          {
            type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']
          }
        ],
        pass: [
          {validator: validatePass, trigger: 'blur'}
        ],
        checkPass: [
          {validator: validatePass2, trigger: 'blur'}
        ]

      }
    }

  },
  methods: {

    send() {
      var that = this;
      this.$axios.post("/updateAdminByNum/", this.form).then(function (res) {
        console.log(res);
        if (res.data == "ok") {
          that.$message({
            message: '更新成功!',
            type: 'success'
          });
        } else if (res.data == "no") {
          that.$message({
            message: '更新失败!',
            type: 'warning'
          });
        } else {
          this.$message({
            type: 'error',
            message: '未知错误!!'
          });
        }
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post("/changePassword", this.ruleForm).then(res => {
            if (res.data == "502") {
              this.$message({
                message: '密码错误,请重新输入',
                type: 'error'
              });
              this.resetForm(formName);
            } else {
              this.$message({
                message: '密码修改成功,请重新登录',
                type: 'success'
              });
                sessionStorage.clear();
                this.$router.push("/login");
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  created() {
    var that = this;
    console.log(this.num);
    this.$axios.post("/AdminByNum/" + this.num).then(function (res) {
      console.log(res.data);
      that.form.adminId = res.data.adminId;
      that.form.adminNum = res.data.adminNum;
      that.form.adminPhone = res.data.adminPhone;
      that.form.adminBirth = res.data.adminBirth;
      that.form.adminEmail = res.data.adminEmail;
      that.form.adminHouse = res.data.adminHouse;
    })
  }


}
</script>