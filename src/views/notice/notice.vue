<template>
	<div>
		<el-breadcrumb style="margin-bottom: 20px">
			<el-breadcrumb-item :to="{ path: '/mainlist' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item><a>消息管理</a></el-breadcrumb-item>
		</el-breadcrumb>
		<el-button type="success" @click="dialogFormVisible = true" plain>添加消息</el-button>

		<el-dialog :visible.sync="dialogFormVisible" title="添加信息">
			<el-form ref="form" :model="form" :rules="formRules">
				<el-form-item :label-width="formLabelWidth" label="内容" prop="text">
					<el-input v-model="form.text" autocomplete="off" placeholder="请输入内容"></el-input>
				</el-form-item>
				<el-form-item :label-width="formLabelWidth" label="开始时间" prop="time">
          <!--					<el-date-picker v-model="form.time" type="date" placeholder="选择开始日期">-->
          <!--					</el-date-picker>-->
          <el-date-picker v-model="form.time" placeholder="选择开始时间" type="datetime"></el-date-picker>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="截止时间" prop="time1">
          <el-date-picker v-model="form.time1" placeholder="选择截止日期" type="datetime">
          </el-date-picker>
        </el-form-item>
				<el-form-item style="text-align: center;">
					<el-button @click="dialogFormVisible=false">取 消</el-button>
					<el-button type="primary" @click="subForm('form')">确 定</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
		<el-table :data="tableData" style="width: 100%;">
			<el-table-column fixed label="管理员id" prop="adminId" sortable width="100"></el-table-column>
			<el-table-column label="内容" prop="noticeContent" width="300"></el-table-column>
			<el-table-column label="开始时间" :formatter="formatDate" prop="noticeBegin" sortable width="200">
			</el-table-column>
			<el-table-column label="截止时间" :formatter="formatDate" prop="noticeEnd" sortable width="200">
			</el-table-column>
			<el-table-column label="操作" width="200">
				<template slot-scope="scope">
					<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination :current-page="pageInfo.currentPage" :page-size="pageInfo.pageSize" :page-sizes="[3, 5, 8, 20]"
			:total="pageInfo.total" layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange"
			@current-change="handleCurrentChange">
		</el-pagination>
	</div>
</template>
<script>
	export default {
		data() {
			var checkText = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'));
				} else if (value.length > 30) {
					callback(new Error('内容过长!'));
				} else {
					callback();
				}
			};
			var checkTime = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入开始时间'));
				} else if (new Date(value).getTime() < new Date().getTime()) {
					callback(new Error('开始时间不能小于当前时间!'));
				} else {
					callback();
				}
			};
			var checkTime1 = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入截止时间'));
				} else if (new Date(value).getTime() <= new Date(this.form.time).getTime()) {
					callback(new Error('截止时间不能小于开始时间!'));
				} else if (new Date(value).getTime() < new Date().getTime()) {
					callback(new Error('截止时间不能小于当前时间!'));
				} else {
					callback();
				}
			};
			return {
				form: {
					text: "",
					time: "",
					time1: "",
					adminId: sessionStorage.getItem("id"),
				},
				formRules: {
					text: [{
						validator: checkText,
						trigger: 'blur'
					}],
					time: [{
						validator: checkTime,
						trigger: 'blur'
					}],
					time1: [{
						validator: checkTime1,
						trigger: 'blur'
					}]
				},
				tableData: [],
				pageInfo: {
					total: 10,
					currentPage: 1,
					pageNum: 1,
					pageSize: 8
				},
				dialogTableVisible: false,
				dialogFormVisible: false,
				formLabelWidth: '70px',

			}
		},
		mounted() {
			this.findEntList(1, this.pageInfo.pageSize);
		},
		methods: {
			subForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.$axios.post("/noticeOk", this.form).then(res => {
							if (res.data == "200") {
								this.$message({
									message: '添加成功',
									type: 'success'
								});
								this.dialogFormVisible = false;
								this.findEntList(this.pageInfo.pageNum, this.pageInfo.pageSize);
							}
						})
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			formatDate(row, column, cellValue) {
				let date = new Date(cellValue);
				return date.toLocaleString();
			},


			handleDelete(index, row) {
				this.$confirm('您确定要删除这条消息吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$axios.get("/delOne/" + row.noticeId).then(res => {
						console.log(res.data)
						this.$message({
							message: '删除成功',
							type: 'success'
						})
						this.findEntList(this.pageInfo.pageNum, this.pageInfo.pageSize);
					})
				})
			},

			findEntList(page, limit) {
				var that = this;
				this.$axios.post("/getAllNotice/" + page + "/" + limit).then(function(res) {
					if (res.data.code != "500") {
						that.tableData = res.data.data;
						that.total = res.data.total;
						that.pageInfo.total = res.data.total;
					}
				})
			},
			handleSizeChange(val) {
				this.pageInfo.pageSize = val;
				this.findEntList(this.pageInfo.pageNum, this.pageInfo.pageSize);
				console.log('当前: ${val}每页');
			},
			handleCurrentChange(val) {
				this.pageInfo.pageNum = val;
				this.findEntList(this.pageInfo.pageNum, this.pageInfo.pageSize);
				console.log('当前页: ${this.pageInfo.pageNum}');
			}
		}
	}
</script>
