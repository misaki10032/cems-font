<template>
  <div class="hello">
    <el-container style="height: 760px; border: 1px solid #e5e5e5">
      <el-aside style="height: 100%;background-color: #ffffff;color: white;" width="250px">
        <el-menu :default-openeds="['1']" router>
          <div style="height: 21px;text-align: center;padding: 20px 0 20px 0;background-color: #06baec;">
            <h1><i class="el-icon-s-help"></i>后台管理系统</h1>
          </div>
          <el-submenu index="1">
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
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-setting"></i>申诉管理</template>
            <el-menu-item-group>
              <template slot="title">申诉</template>
              <el-menu-item index="3-1">用户账号申诉</el-menu-item>
              <el-menu-item index="3-2">委托申诉</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 16px;height: 61px;">
          <el-menu active-text-color="#15087c" background-color="#06baec" router
                   class="el-menu-demo" mode="horizontal" text-color="#fff" @select="handleSelect">
            <el-menu-item index="1">处理中心</el-menu-item>
            <el-submenu index="2">
              <template slot="title">管理员管理</template>
              <el-menu-item index="2-1">管理员信息</el-menu-item>
              <el-menu-item index="/adminappeal">管理员申诉</el-menu-item>
              <el-menu-item index="2-3">管理员升级请求</el-menu-item>
              <el-menu-item index="2-4">管理员绩效</el-menu-item>
              <el-submenu index="2-4">
                <template slot="title">选项4</template>
                <el-menu-item index="2-4-1">选项1</el-menu-item>
                <el-menu-item index="2-4-2">选项2</el-menu-item>
                <el-menu-item index="2-4-3">选项3</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
            <el-tooltip class="item" content="退出登录" effect="dark" placement="bottom">
              <el-button circle icon="el-icon-s-release" style="margin-right:20px " type="primary"
                         @click="logOut"></el-button>
            </el-tooltip>
            <span style="color: white;"><i class="el-icon-user-solid"></i>&nbsp;&nbsp;{{ num }}</span>
            <el-dropdown style="margin-left: 20px;">
              <i class="el-icon-s-operation" style="margin-right: 15px;color: white;"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>个人空间</el-dropdown-item>
                <el-dropdown-item>升级申请</el-dropdown-item>
                <el-dropdown-item>修改密码</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
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
      num: sessionStorage.getItem("num")
    }
  },
  methods: {
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
</style>
