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
      <b-col cols="8" lg="6">
        <b-form>
          <b-form-group label="用户名：" label-cols-sm="4" label-cols-lg="3">
            <b-form-input v-model="user_info.username" type="text"></b-form-input>
          </b-form-group>
          <b-form-group label="邮箱：" label-cols-sm="4" label-cols-lg="3">
            <b-form-input v-model="user_info.email" type="text"></b-form-input>
          </b-form-group>
          <b-form-group label="密码：" label-cols-sm="4" label-cols-lg="3">
            <b-form-input v-model="user_info.password" type="password"></b-form-input>
          </b-form-group>
          <b-form-group label="确认密码：" label-cols-sm="4" label-cols-lg="3">
            <b-form-input v-model="user_info.password2" type="password"></b-form-input>
          </b-form-group>
          <b-button block @click="signUp(user_info)" variant="primary" :style="style.submitBtn">注册</b-button>
        </b-form>
        <b-modal
          title="注册"
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
    </b-row>
  </b-container>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import { closeDialog } from "@/store/utils";

export default {
  name: "SignUp",
  data: function () {
    return {
      user_info: {
        username: "",
        email: "",
        password: "",
        password2: "",
      },
      style: {
        label: {
          width: "100px",
          alignSelf: "center",
        },
      },
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
    ...mapActions("user", ["signUp"]),
    closeDialog,
  },
};
</script>