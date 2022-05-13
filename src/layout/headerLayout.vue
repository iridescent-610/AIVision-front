<template>
  <div style="height: 100%">
    <div class="header">
      <img class="logo" src="../assets/logo.jpg" alt="" @click="$router.push('/')">
      <div class="right-container">
        <div class="tab-list">
          <div class="tab-pane" @click="jumpDoc">使用文档</div>
          <div :class="['tab-pane', $route.path.includes('dashboard') && 'active']" @click="$router.push('/dashboard')">
            控制台
          </div>
        </div>
        <!-- <div v-if="!$store.state.auth.username" class="user-info" @click="$router.push('/signIn')">
          登录/注册
        </div> -->
        <div v-if="!$store.state.auth.username" class="user-info" @click="$router.push('/signIn')">
          登录
        </div>
        <el-dropdown class="user-info" v-else placement="bottom" @command="handleCommand">
          <div>{{ $store.state.auth.username }} <i class="el-icon-caret-bottom"></i></div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <el-container class="layout-container">
      <router-view />
    </el-container>
  </div>
</template>
<script>
export default {
  methods: {
    jumpDoc() {
      window.open("http://10.214.211.207:10087/")
      // window.location.replace(`${process.env.VUE_APP_DOC_URL}/#/?userName=${this.$store.state.auth.username}`)
    },
    handleCommand(command) {
      if (command === 'logout') {
        this.$store.commit('removeAuth')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.layout-container {
  height: 100%;
  padding-top: 58px;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 58px;
  z-index: 999;
  background-color: #263238;
  display: flex;
  align-items: center;
  padding-left: 24px;
  padding-right: 32px;
  box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
  font-family: PingFangSC-Regular, PingFang SC;

  .logo {
    height: 30px;
    cursor: pointer;
  }

  .right-container {
    display: flex;
    align-items: center;
    margin-left: auto;
    font-size: 20px;
    font-weight: 800;
    line-height: 58px;
    text-align: center;

    .tab-pane {
      margin-left: 64px;
      padding: 0 8px;
      color: #fff;
      position: relative;
      cursor: pointer;
      height: 58px;
      line-height: 58px;
      transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      border-radius: 4px;
      text-transform: uppercase;

      &:hover {
        background: rgba(0, 0, 0, .1);
      }

      &.active {
        color: #219fff;
        background: unset;

        &:before {
          content: "";
          width: 100%;
          height: 2px;
          position: absolute;
          bottom: 4px;
          background: #219fff;
          left: 50%;
          transform: translateX(-50%);
        }
      }
    }

    .tab-list {
      display: flex;
      align-items: center;
    }

    .user-info {
      padding: 0 8px;
      line-height: 58px;
      height: 58px;
      font-size: 14px;
      font-weight: 500;
      margin-left: 90px;
      color: #fff;
      cursor: pointer;
    }
  }
}
</style>
