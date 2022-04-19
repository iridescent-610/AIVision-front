

<template>
  <b-container>
    <b-col>
      <b-nav tabs>
        <b-nav-item active-class="active" :to="{ name: 'ManageFlowchart' }"
          >流程图统一管理</b-nav-item
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
  name: "AIXAdmin",

  methods: {},
};
</script>