<template>

  <el-row>
    <el-col :span="9">
      <el-form ref="form" :rules="rules" :model="form" label-width="80px">
        <el-form-item label="id" prop="id">
          <el-input v-model="form.adminId" disabled></el-input>
        </el-form-item>

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
        <el-form-item label="电子邮箱" prop="adminEmail"
                      :rules="[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ]">
          <el-input v-model="form.adminEmail"


          ></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="adminHouse">
          <el-input type="textarea" v-model="form.adminHouse"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="info" @click="dialogFormVisible = true">申诉</el-button>
          <el-button type="primary" @click="send()">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-col>

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
          <el-button @click="goto">取 消</el-button>
          <el-button type="primary" @click="send1('form')">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-row>


</template>

<script>
export default {
  data() {
    return {
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
      rules: {
        adminPhone: [
          {required: true, message: '请输入电话', trigger: 'blur'},
          {min: 11, max: 11, message: '请输入正确的电话格式', trigger: 'blur'}
        ],
      }
    }

  },
  methods: {

    goto() {
      this.$router.go(-1)
    },
    send1(formName) {
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