

<template>
  <b-container>
    <b-col>
      <b-nav tabs>
        <b-nav-item active-class="active" :to="{ name: 'ContainerListUser' }"
          >容器信息</b-nav-item
        >
        <b-nav-item active-class="active" :to="{ name: 'ContainerLogUser' }"
          >容器日志</b-nav-item
        >
        <b-nav-item active-class="active" :to="{ name: 'ContainerTaskUser' }"
          >已结束任务</b-nav-item
        >
        <b-nav-item active-class="active" :to="{ name: 'ManageDeviceUser' }"
          >设备信息</b-nav-item
        >
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
  name: "ContainerUser",

  methods: {},
};
</script>