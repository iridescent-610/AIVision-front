<template>
  <div class="menu-layout">
    <el-aside class="layout-aside">
      <div class="menu-title">AIVision 控制台</div>
      <el-menu
        class="el-menu-vertical"
        background-color="#F9FAFA"
        text-color="#000"
        router
        :default-active="activeMenu"
        active-text-color="#fff"
      >
        <el-menu-item
          v-for="item in menuList"
          :key="item.title"
          :index="item.path"
        >
          <svg-icon class="menu-icon" :svg-name="item.icon" />
          <span>{{ item.title }}</span>
        </el-menu-item>
        <div class="collapse" @click="collapse = !collapse">xxx</div>
      </el-menu>
    </el-aside>
    <el-main class="layout-main">
      <router-view />
    </el-main>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeMenu: "",
      collapse: false,
      menuList: [
        {
          title: "图谱列表",
          path: "/dashboard/modelZoo",
          icon: "menu_icon_1",
        },
        {
          title: "图谱可视化",
          path: "/dashboard/visgraph",
          icon: "menu_icon_2",
        },
        {
          title: "我的数据集",
          path: "/dashboard/dataset",
          icon: "menu_icon_3",
        },
        {
          title: "模型管理",
          path: "/dashboard/model",
          icon: "menu_icon_4",
        },
        {
          title: "业务机理建模",
          path: "/dashboard/flowchart",
          icon: "menu_icon_5",
        },
        {
          title: "我的容器",
          path: "/dashboard/5",
          icon: "menu_icon_6",
        },
      ],
    };
  },
  created() {
    const { path } = this.$route;
    const findMenu = this.menuList.find((menu) => path.includes(menu.path));
    if (findMenu) {
      this.activeMenu = findMenu.path;
    }
  },
};
</script>
<style lang="less" scoped>
.menu-layout {
  display: flex;
  height: calc(100vh - 58px);
}

.layout-aside {
  height: 100%;
  width: 192px !important;
  border-right: 1px solid #cfd8dc;

  .menu-title {
    font-size: 20px;
    line-height: 16px;
    color: rgba(73, 93, 103, 0.65);
    font-weight: 800;
    padding-top: 30px;
    padding-bottom: 10px;
    text-align: center;
    border-bottom: 1px solid rgba(207, 216, 220, 0.85);
  }
}

.layout-main {
  height: 100%;
  overflow: auto;
  flex: 1;
}

.el-menu-vertical {
  font-size: 16px;

  /deep/ .el-menu-item {
    height: 40px;
    line-height: 40px;

    &.is-active {
      background-color: rgba(25, 118, 210, 1) !important;
    }
  }

  .menu-icon {
    width: 20px;
    height: 20px;
    margin-right: 8px;
  }
}
</style>
