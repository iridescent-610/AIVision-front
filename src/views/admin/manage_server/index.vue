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
  <div>
    <b-row align-h="start" v-show="!isEditing" :style="style.down">
      <b-col lg="2" cols="3">
        <b-button block variant="primary" @click="setIsUpdateDialogOpen(true)">新建</b-button>
      </b-col>
      <b-col lg="2" cols="3">
        <b-button block variant="primary" @click="isEditing=true">编辑</b-button>
      </b-col>
    </b-row>
    <b-row v-show="isEditing" align-h="end" :style="style.down">
      <b-col lg="2" cols="3">
        <b-button block variant="success" @click="isEditing=false;unselectAll()">取消</b-button>
      </b-col>
      <b-col lg="2" cols="3">
        <b-button block variant="danger" @click="isEditing=false; deleteServers();unselectAll();">删除</b-button>
      </b-col>
    </b-row>
    <b-modal
      :title="updateDialogTitle"
      no-close-on-backdrop
      no-close-on-esc
      :visible="is_update_dialog_open"
      ok-title="确定"
      cancel-title="取消"
      @close="closeUpdateDialog"
      @ok="closeUpdateDialog();postServer(server_info)"
      @cancel="closeUpdateDialog"
      :title-class="{style: {fontSize:'50px'}}"
    >
      <b-form>
        <b-row>
          <b-col cols="12">
            <b-form-group label="名字：" label-cols-md="3" label-align="right">
              <b-form-input v-model="server_info.username" type="text"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group label="密码：" label-cols-md="3" label-align="right">
              <b-form-input v-model="server_info.password" type="password"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group label="确认密码：" label-cols-md="3"  label-align="right">
              <b-form-input v-model="server_info.password2" type="password"></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
      </b-form>
    </b-modal>

    <b-table
      striped
      hover
      responsive
      :items="servers"
      :fields="isEditing? fieldsEditing: fields"
      :current-page="currentPage"
      :per-page="perPage"
      outlined
    >
      <template v-slot:cell(selected)="row">
        <b-form-checkbox
          :key="row.item.id"
          :checked="row.item.selected?'yes':'no'"
          @input="select(row.item)"
          value="yes"
          unchecked-value="no"
        ></b-form-checkbox>
      </template>
      <template v-slot:cell(name)="row">{{ row.value.first }} {{ row.value.last }}</template>

      <template v-slot:cell(text)="row">
        <b-button
          size="sm"
          @click="row.toggleDetails"
          variant="outline-primary"
          class="mr-1"
          block
        >{{ row.detailsShowing ? '收起' : '展开'}}</b-button>
      </template>
      <template v-slot:row-details="row">
        <b-card>{{row.item.text}}</b-card>
      </template>
    </b-table>
    <b-pagination
      v-model="currentPage"
      :total-rows="servers.length"
      :per-page="perPage"
      align="right"
      :style="style.pagination"
    ></b-pagination>
    <b-modal
      title="算力机管理"
      no-close-on-esc
      no-close-on-backdrop
      ok-only
      :visible="is_dialog_open"
      ok-title="确定"
      @close="closeDialog"
      @ok="closeDialog"
      :title-class="{style: {fontSize:'50px'}}"
    >
      <div class="text-center">{{dialog_content}}</div>
    </b-modal>
  </div>
</template>

<script>
import { postServer, getServers, deleteServers } from "./manage_server";
import {
  closeDialog,
  closeUpdateDialog,
  setIsUpdateDialogOpen,
} from "@/utils/index";

export default {
  name: "ManageServer",
  data() {
    return {
      server_info: {
        username: "",
        password: "",
        password2: "",
      },
      perPage: 8,
      currentPage: 1,
      updateDialogTitle: "新建算力机",
      fields: [
        {
          key: "username",
          label: "服务器名",
          sortable: true,
          class: "text-center",
        },
        {
          key: "last_login",
          label: "最后登录时间",
          sortable: true,
          class: "text-center",
        },
      ],
      isEditing: false,
      style: {
        pagination: {
          marginTop: "20px",
        },
        down: {
          marginBottom: "20px",
        },
      },
      errors: "",
      servers: [],
      is_dialog_open: false,
      dialog_content: "",
      is_update_dialog_open: false,
    };
  },
  computed: {
    fieldsEditing: function () {
      var res = [{ key: "selected", label: "", class: "text-center" }];
      return res.concat(this.fields);
    },
  },
  methods: {
    getServers,
    deleteServers,
    postServer,
    select(item) {
      item.selected = !item.selected;
    },
    unselectAll() {
      this.servers.forEach((server) => (server.selected = false));
    },
    cleanForm: function () {
      this.server_info = {
        username: "",
        password: "",
        password2: "",
      };
    },
    closeDialog,
    closeUpdateDialog,
    setIsUpdateDialogOpen,
  },
  mounted() {
    console.log("mounte server");
    this.getServers();
  },
};
</script>

