<template>
  <b-container>
    <b-col>
      <b-nav tabs>
        <b-nav-item active-class="active" :to="{ name: 'AptSource' }"
          >Apt源</b-nav-item
        >
        <b-nav-item active-class="active" :to="{ name: 'PipSource' }"
          >Pip源</b-nav-item
        >
      </b-nav>
      <div class="pt-4">
        <router-view></router-view>
      </div>
    </b-col>
  </b-container>
</template>

<script>
export default {
  name: "index",
};
</script>

<style scoped>
</style>
