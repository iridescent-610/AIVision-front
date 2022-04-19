

<template>
  <b-container>
    <b-col>
      <b-nav tabs>
        <b-nav-item active-class="active" :to="{ name: 'ContainerOverview' }"
          >总览</b-nav-item
        >
        <b-nav-item active-class="active" :to="{ name: 'ContainerList' }"
          >容器列表</b-nav-item
        >
        <b-nav-item active-class="active" :to="{ name: 'ContainerLog' }"
          >容器日志</b-nav-item
        >
        <b-nav-item active-class="active" :to="{ name: 'ContainerTask' }"
          >已结束任务</b-nav-item
        >
        <b-nav-item active-class="active" :to="{ name: 'ManageDevice' }"
          >设备管理</b-nav-item
        >
        <b-nav-item active-class="active" :to="{ name: 'ErrorManage' }"
          >自动错误解析</b-nav-item
        >
        <b-nav-item active-class="active" :to="{ name: 'PackageSource' }"
          >源配置</b-nav-item
        >
        <b-nav-item active-class="active">平台日志管理</b-nav-item>
      </b-nav>
      <div class="pt-4">
        <router-view></router-view>
      </div>
    </b-col>
  </b-container>
</template>

<script>
// import './iconfont'

export default {
  name: "Container",

  methods: {},
};
</script>