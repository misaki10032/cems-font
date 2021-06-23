<template>
  <div>
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" class="demo-ruleForm" label-width="80px">
      <el-form-item label="自身账号" prop="adminNum">
        <el-input v-model="ruleForm.adminNum"></el-input>
      </el-form-item>
      <el-form-item label="目标职位" prop="target">
        <el-radio-group v-model="ruleForm.target">
          <el-radio label="超级管理员" value="super"></el-radio>
          <el-radio label="最高管理员" value="root"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="申请理由" prop="desc">
        <el-input v-model="ruleForm.desc" type="textarea"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        adminNum: '',
        target: '',
        adminNow: sessionStorage.getItem("level"),
        desc: '',
        id: sessionStorage.getItem("id")
      },
      rules: {
        adminNum: [
          {required: true, message: '请输入账号!', trigger: 'blur'},
          {min: 3, max: 15, message: '账号格式异常!', trigger: 'blur'}
        ],
        target: [
          {required: true, message: '请选择目标职位!', trigger: 'change'}
        ],
        desc: [
          {required: true, message: '请填写理由!', trigger: 'blur'}
        ]
      }
    }
  },
  mounted() {
    this.ruleForm.adminNow = sessionStorage.getItem("level");
    this.ruleForm.id = sessionStorage.getItem("id");
  },
  methods: {
    submitForm(formName) {
      var that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.ruleForm.adminNum != sessionStorage.getItem("num")) {
            this.$message({
              message: '只能申请本人的账号!',
              type: 'error'
            });
            return false;
          }
          if (that.ruleForm.target == '最高管理员') {
            this.ruleForm.target = 'root';
          } else {
            this.ruleForm.target = 'super';
          }
          if (this.ruleForm.target == this.ruleForm.adminNow) {
            this.$message({
              message: '已经是当前职位了哦!',
              type: 'error'
            });
            return false;
          }
          that.$axios.post("/addlevelup", that.ruleForm).then(res => {
            if (res.data == '200') {
              this.$message({
                message: '提交成功!id:' + this.ruleForm.id,
                type: 'success'
              });
            } else {
              this.$message({
                message: '服务器异常,请稍后重试!',
                type: 'error'
              });
            }
          });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>