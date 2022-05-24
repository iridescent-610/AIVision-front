<!--  Copyright 2020 Zhejiang Lab. All Rights Reserved.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================
-->

<template>
  <div id="app">
<!--    <b-navbar toggleable="sm" type="dark" variant="primary" sticky>
      <b-navbar-brand :to="{ name: 'Welcome' }" id="brand">
        <img height="30px" src="@/assets/AIVision.png" alt="AI+X" id="title" />
        &lt;!&ndash; <img height="21px" src="@/assets/aix_logo.png" alt="AI+X" id="title" /> &ndash;&gt;
        &lt;!&ndash; <img height="21px"
             src="@/assets/atlas_title.png"
             alt="AI+X"
             id="title" /> &ndash;&gt;
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <template v-if="permission_routes">
            <b-nav-item
              v-for="route in permission_routes.filter(isShowed)"
              :key="route.name"
              :to="{ name: route.name }"
              :active-class="isActive(route) ? 'active' : ''"
              >{{ route.meta.title }}</b-nav-item
            >
          </template>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto" v-if="auth.username">
          <b-nav-item-dropdown :text="auth.username" right>
            <b-dropdown-item-button @click="logout()"
              >退出</b-dropdown-item-button
            >
          </b-nav-item-dropdown>
        </b-navbar-nav>
        <b-navbar-nav
          class="ml-auto"
          v-if="login_way == 'NORMAL' && !auth.username"
        >
          <b-nav-item :to="{ name: 'Sign Up' }" active-class="active"
            >注册</b-nav-item
          >
          <b-nav-item :to="{ name: 'Sign In' }" active-class="active"
            >登录</b-nav-item
          >
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <div class="main pt-4">
      <router-view></router-view>
    </div>
    &lt;!&ndash; <div class="footer">
      <small>© 2020 模型炼知平台</small>
    </div>&ndash;&gt;
    <b-modal
      title="用户"
      no-close-on-backdrop
      no-close-on-esc
      ok-only
      :visible="is_dialog_open"
      ok-title="确定"
      @close="closeDialog"
      @ok="closeDialog"
      :title-class="{ style: { fontSize: '50px' } }"
    >
      <div class="text-center">{{ dialog_content }}</div>
    </b-modal>-->
    <router-view />
  </div>
</template>


<script>
import { mapState, mapActions, mapMutations } from "vuex";
import { closeDialog } from "./store/utils";

export default {
  name: "app",
  data: function () {
    return {
      login_way: process.env.VUE_APP_LOGIN_WAY,
    };
  },
  computed: {
    ...mapState({
      auth: (state) => state.auth,
      permission_routes: (state) => {
        return state.permission.routes;
      },
      is_dialog_open: (state) => state.is_dialog_open,
      dialog_content: (state) => state.dialog_content,
    }),
  },
  methods: {
    ...mapMutations(["removeAuth", "setIsDialogOpen", "setDialogContent"]),
    ...mapActions("user", ["logout"]),
    closeDialog,
    isShowed: function (route) {
      return route.show === undefined || route.show === true;
    },
    isActive: function (route) {
      return this.$route.matched.some((r) => r.path == route.path);
    },
  },
};
</script>

<style scoped>
#app {
  height: 100vh;
}
#brand {
  display: -webkit-flex; /* Safari */
  -webkit-align-items: center; /* Safari 7.0+ */
  display: flex;
  align-items: center;
}
#title {
  -webkit-flex: 1; /* Safari 6.1+ */
  flex: 1;
}
.main {
  padding-bottom: 25px;
}
.footer {
  position: fixed;
  left: 0px;
  bottom: 0px;
  width: 100%;
  height: 25px;
  padding-left: 10px;
  background-color: #eee;
  z-index: 9999;
}
</style>
<style lang="less">
.modal-header .close {
  outline: none;
}
b-form-group {
  outline: none;
}
th {
  outline: none;
}
th > div {
  white-space: nowrap;
}
.table-method {
  position: -webkit-sticky;
  position: sticky;
  right: 0px;
}

/deep/ .el-button {
&:focus {
   outline: unset;
   border: unset;
 }
}

button {
  font-weight: normal !important;
  span {
    font-weight: normal !important;
  }
}
</style>
