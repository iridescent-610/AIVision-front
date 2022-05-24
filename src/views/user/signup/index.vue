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

  <div class="sign-in">
    <div class="container">
      <div class="login-title">注册</div>
      <b-form>
        <span class="label">用户名</span>
        <b-form-group>
          <b-form-input placeholder="请输入用户名" class="input" v-model="user_info.username" type="text"></b-form-input>
        </b-form-group>
        <span class="label">邮箱</span>
        <b-form-group>
          <b-form-input placeholder="请输入邮箱" class="input" v-model="user_info.email" type="text"></b-form-input>
        </b-form-group>
        <span class="label">密码</span>
        <b-form-group>
          <b-form-input placeholder="请输入密码" class="input" v-model="user_info.password" type="password"></b-form-input>
        </b-form-group>
        <span class="label">确认密码</span>
        <b-form-group>
          <b-form-input placeholder="请再次输入密码" class="input" v-model="user_info.password2" type="password">
          </b-form-input>
        </b-form-group>
        <b-button class="login-button" block @click="signUp(user_info)" variant="primary" :style="style.submitBtn">注册
        </b-button>
        <div class="first-login">已有账号？返回<span @click="$router.push('/signIn')">登录</span></div>
      </b-form>
      <b-modal title="注册失败" no-close-on-backdrop no-close-on-esc ok-only :visible="is_dialog_open" ok-title="确定"
        @close="closeDialog" @ok="closeDialog" :title-class="{ style: { fontSize: '50px' } }">
        <div class="text-center">{{ dialog_content }}</div>
      </b-modal>
    </div>
    <div class="footer">
      <p>AI+X 普适化平台</p>
      <p>Copyright © 2022 浙江大学计算机创新技术研究院</p>
    </div>
  </div>
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
<style lang="scss" scoped>
.sign-in {
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .container {
    width: 400px;
    margin-bottom: 10%;

    .login-title {
      font-size: 30px;
      color: rgba(38, 50, 56, 1);
      margin-bottom: 22px;
      font-weight: 500;
    }

    .tab-pane {
      display: inline-block;
      color: rgba(25, 118, 210, 1);
      font-size: 16px;
      border-bottom: 2px solid rgba(25, 118, 210, 1);
      margin-bottom: 24px;
      font-weight: 500;
    }

    .tab-pane:hover {
      cursor: pointer;
    }

    .label {
      display: inline-block;
      line-height: 21px;
      font-size: 14px;
      color: rgba(0, 0, 0, 1);
      margin-bottom: 1px;
    }

    .input {
      border: 1px solid rgba(69, 90, 100, 0.35);
      border-radius: 4px;
      font-size: 14px;
      height: 40px;
      line-height: 40px;

      &::-webkit-input-placeholder {
        color: rgba(69, 90, 100, 0.35);
      }

      &:focus {
        box-shadow: unset;
        border-color: #1976D2;
      }
    }
  }

  .login-button {
    width: 150px;
    height: 40px;
    line-height: 40px;
    padding: 0 12px;
    background-color: #1976d2;
    font-size: 16px;
    font-weight: 600;
    margin-top: 34px;
  }
}

.footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  color: rgba(69, 90, 100, 0.35);
  line-height: 20px;
  font-size: 12px;
  text-align: center;
  padding: 4px 0 7px 0;
  border-top: 1px solid rgba(69, 90, 100, 0.1);
  margin-top: auto;

  p {
    margin: 0;
  }
}

.first-login {
  color: rgba(0, 0, 0, 0.92);
  font-size: 14px;
  font-weight: 400;
  margin-top: 16px;

  span {
    color: rgba(25, 118, 210, 1);
    cursor: pointer;
    margin-left: 2px;
  }
}
</style>
