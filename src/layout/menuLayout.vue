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
    <el-main class="main">
      <div class="layout-main">
        <router-view />
      </div>
      <div class="footer">
        <p>AI+X 普适化平台</p>
        <p>Copyright © 2022 浙江大学计算机创新技术研究院</p>
      </div>
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
       /* {
          title: "图谱可视化",
          path: "/dashboard/visgraph",
          icon: "menu_icon_2",
        },*/
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
          path: "/dashboard/container",
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
  width: 100%;
  display: flex;
  height: calc(100vh - 58px);
}

.layout-aside {
  background: #F9FAFA;
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

.main {
  height: 100%;
  overflow: auto;
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 !important;

  .layout-main {
    height: 100%;
    overflow: auto;
    flex: 1;
    padding: 18px 32px;
  }

  .footer {
    color: rgba(69, 90, 100, 0.35);
    line-height: 20px;
    font-size: 12px;
    text-align: center;
    padding: 4px 0 7px 0;
    border-top: 1px solid rgba(69, 90, 100, 0.1);
    margin-top: auto;

    p {
      margin: 0 !important;
    }
  }
}

.el-menu-vertical {
  font-size: 16px;
  border-right: unset !important;

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
