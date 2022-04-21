<template>
  <el-container>
    <el-header class="layout-header">
      <img class="logo" src="../assets/logo.jpg" alt="" @click="$router.push('/')">
      <div class="header-link">
        <router-link to="/doc" :class="{'router-link': true, active: $route.path.includes('/doc') }">使用文档</router-link>
        <router-link to="/dashboard" :class="{'router-link': true, active: $route.path.includes('/dashboard') }">控制台
        </router-link>
      </div>
    </el-header>
    <el-container class="layout-container">
      <router-view/>
    </el-container>
  </el-container>
</template>
<script>
export default {}
</script>
<style lang="less" scoped>
.layout-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 58px;
  background: #263238;
  z-index: 999;
  display: flex;
  align-items: center;

  .logo {
    width: 261px;
    height: 30px;
    cursor: pointer;
  }

  .header-link {
    margin-left: auto;
  }

  .router-link {
    font-size: 20px;
    color: #FFFFFF;
    font-weight: 600;
    margin-right: 64px;
    padding-bottom: 10px;
    background: unset;

    &:hover {
      text-decoration: unset;
    }

    &.active {
      color: #219FFF;
      border-bottom: 2px solid #219FFF;
    }
  }
}

.layout-container {
  height: 100%;
  padding-top: 58px;
}
</style>
