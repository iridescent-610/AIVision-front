<template>
  <div>
    <el-tabs class="el-tab" v-model="activeName" @tab-click="handleTabClick">
      <el-tab-pane label="容器信息" name="ContainerList"/>
      <el-tab-pane label="容器日志" name="ContainerLog"/>
      <el-tab-pane label="已结束任务" name="ContainerTask"/>
      <el-tab-pane label="设备管理" name="ManageDevice"/>
    </el-tabs>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "Container",
  data() {
    return {
      activeName: 'ContainerList'
    }
  },
  methods: {
    handleTabClick(e) {
      this.$router.push({name: e.name})
    }
  }
};
</script>
<style lang="less" scoped>
.el-tab {
  /deep/ .el-tabs__item {
    font-size: 18px;
    color: rgba(69, 90, 100, 0.65);
    font-weight: 400;

    &.is-active {
      color: rgba(25, 118, 210, 1);
    }
  }
}
</style>
