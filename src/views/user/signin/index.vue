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
  <b-container>
    <b-row align-h="center">
      <div v-if="login_way == 'DUBHE'">请通过天枢登录</div>
      <b-col v-else-if="login_way == 'NORMAL'" cols="8" lg="6">
        <b-form>
          <b-form-group label="用户名：" label-cols-sm="4" label-cols-lg="3">
            <b-form-input v-model="user_info.username" type="text"></b-form-input>
          </b-form-group>
          <b-form-group label="密码：" label-cols-sm="4" label-cols-lg="3">
            <b-form-input v-model="user_info.password" type="password"></b-form-input>
          </b-form-group>
          <b-button block @click="signIn(user_info)" variant="primary" :style="style.submitBtn">登录</b-button>
        </b-form>
        <b-modal
          title="登录"
          no-close-on-backdrop
          no-close-on-esc
          ok-only
          :visible="is_dialog_open"
          ok-title="确定"
          @close="closeDialog"
          @ok="closeDialog"
          :title-class="{style: {fontSize:'50px'}}"
        >
          <div class="text-center">{{dialog_content}}</div>
        </b-modal>
      </b-col>
      <div v-else>非法的登录方式：{{login_way}}</div>
    </b-row>
  </b-container>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import { closeDialog } from "@/store/utils";
// import { LOGIN_WAY } from "@/config";

export default {
  name: "SignIn",
  data: function () {
    return {
      user_info: {
        username: "",
        password: "",
      },
      style: {
        label: {
          width: "100px",
          alignSelf: "center",
        },
      },
      login_way: process.env.VUE_APP_LOGIN_WAY,
    };
  },
  computed: mapState("user", {
    errors: (state) => state.errors,
    is_dialog_open: (state) => state.is_dialog_open,
    dialog_content: (state) => state.dialog_content,
  }),
  methods: {
    ...mapMutations("user", [
      "setErrors",
      "setIsDialogOpen",
      "setDialogContent",
    ]),
    ...mapActions("user", ["signIn"]),
    closeDialog,
  },
};
</script>