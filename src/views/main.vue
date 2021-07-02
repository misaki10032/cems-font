<template>
	<div class="hello">
		<el-container style="height: 760px; border: 1px solid #e5e5e5">
			<el-aside style="height: 100%;background-color: #ffffff;color: white;" width="250px">
				<el-menu router>
					<div style="height: 21px;text-align: center;padding: 20px 0 20px 0;background-color: #06baec;">
						<h1 @click="toMainList"><i class="el-icon-s-help"></i>后台管理系统</h1>
					</div>
					<el-submenu :class="{ levelInsufficient:isSuper}" index="1">
						<template slot="title"><i class="el-icon-message"></i>信息管理</template>
						<el-menu-item-group>
							<template slot="title">用户|委托</template>
							<el-menu-item index="/userlist">用户管理</el-menu-item>
							<el-menu-item index="/entlist">委托管理</el-menu-item>
							<el-menu-item index="/enttypelist">委托类型管理</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
					<el-submenu index="2">
						<template slot="title"><i class="el-icon-menu"></i>论坛管理</template>
						<el-menu-item-group>
							<template slot="title">帖子|评论</template>
							<el-menu-item index="/articlelist">帖子管理</el-menu-item>
							<el-menu-item index="/commentlist">评论管理</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
					<el-submenu :class="{levelInsufficient:isSuper}" index="3">
						<template slot="title" class="menu-super"><i class="el-icon-setting"></i>申诉管理</template>
						<el-menu-item-group>
							<template slot="title">申诉</template>
							<el-menu-item index="3-1">用户账号申诉</el-menu-item>
							<el-menu-item index="3-2">委托申诉</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
					<el-submenu :class="{levelInsufficient:isSuper}" index="4">
						<template slot="title" class="menu-super"><i class="el-icon-message-solid"></i>通知管理</template>
						<el-menu-item-group>
							<template slot="title">通知</template>
							<el-menu-item index="/notice">消息管理</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
				</el-menu>
			</el-aside>

			<el-container>
				<el-header style="text-align: right; font-size: 16px;height: 61px;">
					<el-menu active-text-color="#15087c" background-color="#06baec" router class="el-menu-demo"
						mode="horizontal" text-color="#fff" @select="handleSelect">
						<el-submenu :class="{levelInsufficient:isRoot}" index="2">
							<template slot="title">管理员管理</template>
							<el-menu-item index="/adminlist">管理员信息</el-menu-item>
							<el-menu-item index="/adminappeal">管理员申诉</el-menu-item>
							<el-menu-item index="/adminLevelManagement">管理员升级请求</el-menu-item>
							<el-menu-item index="2-4">管理员绩效</el-menu-item>
						</el-submenu>
						<el-dropdown style="margin-left: 20px;">
							<el-button round type="primary">
								<i class="el-icon-user-solid"></i>
								<span style="color: white;margin:0 10px 0 5px">{{ num }}</span>
								<i class="el-icon-s-operation"></i>
							</el-button>
							<el-dropdown-menu slot="dropdown">
								<router-link style="text-decoration: none" to="meMessage">
									<el-dropdown-item>个人空间</el-dropdown-item>
								</router-link>
								<router-link :class="{levelInsufficient:!isRoot}" style="text-decoration:none"
									to="/adminlevelUp">
									<el-dropdown-item>升级申请</el-dropdown-item>
								</router-link>
								<span @click="logOut">
									<el-dropdown-item>退出登录</el-dropdown-item>
								</span>
							</el-dropdown-menu>
						</el-dropdown>
						<el-tooltip class="item" content="退出登录" effect="dark" placement="bottom">
							<el-button circle icon="el-icon-s-release" style="margin-left:20px " type="primary"
								@click="logOut"></el-button>
						</el-tooltip>
					</el-menu>
				</el-header>
				<el-main style="height: 600px;">
					<router-view></router-view>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>
<script>
	export default {

		data() {
			return {
				num: sessionStorage.getItem("num"),
				isRoot: true,
				isSuper: true
			}
		},
		mounted() {
			var level = sessionStorage.getItem("level");
			if (level == "root") {
				this.isSuper = false;
				this.isRoot = false;
			} else if (level == "super") {
				this.isSuper = false;
				this.isRoot = true;
			}
			this.$router.push("/mainlist")
		},
		methods: {
			toMainList() {
				this.$router.push("/mainlist")
			},
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
			},
			logOut() {
				sessionStorage.clear();
				this.$router.push("/login");
			}
		}
	};
</script>

<style>
	* {
		padding: 0;
		margin: 0;
	}

	.el-header {
		background-color: #06baec;
		color: #333;
		line-height: 60px;
	}

	.el-aside {
		color: #333;
	}

	.levelInsufficient {
		display: none;
	}
</style>
