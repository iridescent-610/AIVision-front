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
    <b-row align-h="start" :style="style.down">
      <b-col lg="2" cols="3">
        <b-button
          block
          variant="primary"
          @click="updateKey='post'; cleanForm(); setIsUpdateDialogOpen(true)"
        >新建</b-button>
      </b-col>
      <b-col lg="2" cols="3" v-show="!isEditing">
        <b-button block @click="isEditing=true" variant="primary">编辑</b-button>
      </b-col>
      <b-col lg="2" cols="3" v-show="isEditing">
        <b-button block @click="isEditing=false">取消</b-button>
      </b-col>
    </b-row>
    <b-modal
      title="算法管理"
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

    <b-modal
      :title="updateDialogTitle"
      no-close-on-esc
      no-close-on-backdrop
      scrollable
      :visible="is_update_dialog_open"
      ok-title="确定"
      cancel-title="取消"
      @close="closeUpdateDialog"
      @ok="closeUpdateDialog();updateMethod(algorithm_info)"
      @cancel="closeUpdateDialog"
      :title-class="{style: {fontSize:'50px'}}"
    >
      <b-form>
        <b-row align-h="end">
          <b-col cols="12">
            <b-form-group label="算法名称：" label-cols-md="3" label-align="right">
              <b-form-input
                v-model="algorithm_info.alg_name"
                type="text"
                placeholder="请输入算法名称"
                :state="algorithm_info.alg_name.length>0?true:false"
              ></b-form-input>
              <b-form-invalid-feedback>算法名称不得为空</b-form-invalid-feedback>
            </b-form-group>
          </b-col>

          <b-col cols="4" v-show="algorithm_info.fields.length == 0">
            <b-button :style="style.down" variant="outline-primary" @click="addField(0)">添加字段</b-button>
          </b-col>

          <b-col v-for="(field, index) in algorithm_info.fields" :key="field.key" cols="12">
            <b-form-group label="字段：" label-cols-md="3" label-align="right">
              <b-form-input
                v-model="field.field_name"
                type="text"
                placeholder="请输入字段名称"
                :state="field.field_name.length>0?true:false"
              ></b-form-input>
              <b-form-invalid-feedback>字段名称不得为空</b-form-invalid-feedback>
              <b-form-input
                v-model="field.field_value"
                type="text"
                placeholder="请输入字段默认值（可选）"
                :style="style.up"
              ></b-form-input>
              <b-form-input
                v-model="field.field_note"
                type="text"
                placeholder="请输入字段说明（可选）"
                :style="style.up"
              ></b-form-input>
              <b-button
                :style="style.field_btn"
                variant="outline-primary"
                @click="addField(index)"
              >添加</b-button>
              <b-button
                :style="style.field_btn"
                variant="outline-danger"
                @click="removeField(index)"
              >删除</b-button>
            </b-form-group>
          </b-col>
        </b-row>
      </b-form>
    </b-modal>
    <b-card
      v-for="alg in algorithms.slice(currentPage*perPage-perPage, currentPage*perPage)"
      :key="alg.alg_name"
      :title="alg.alg_name"
      :style="style.down"
    >
      <div v-for="f in alg.fields" :key="f.field_name">
        <b-row>
          <b-col md="3">名称：{{f.field_name}}</b-col>
          <b-col md="3">默认值：{{f.field_value}}</b-col>
          <b-col md="6">说明：{{f.field_note}}</b-col>
        </b-row>
      </div>
      <b-row v-show="isEditing" align-h="end" :style="style.up">
        <b-col lg="2" cols="3">
          <b-button
            block
            variant="outline-primary"
            @click="algorithm_info=JSON.parse(JSON.stringify(alg)); updateKey='put'; setIsUpdateDialogOpen(true)"
          >更新</b-button>
        </b-col>
        <b-col lg="2" cols="3">
          <b-button block variant="outline-danger" @click="deleteAlgorithms([alg.id])">删除</b-button>
        </b-col>
      </b-row>
    </b-card>

    <b-pagination
      v-model="currentPage"
      :total-rows="algorithms.length"
      :per-page="perPage"
      align="right"
      :style="style.pagination"
    ></b-pagination>
  </div>
</template>

<script>
import {
  postAlgorithm,
  putAlgorithm,
  getAlgorithms,
  deleteAlgorithms,
} from "./manage_algorithm";
import {closeDialog, closeUpdateDialog, setIsUpdateDialogOpen} from '@/utils/index'

export default {
  name: "ManageAlgorithm",
  data() {
    return {
      algorithm_info: {
        id: null,
        alg_name: "",
        fields: [],
      },
      perPage: 8,
      currentPage: 1,
      updateKey: "post",
      isEditing: false,
      errors: "",
      algorithms: [],
      is_dialog_open: false,
      dialog_content: "",
      is_update_dialog_open: false,
      style: {
        pagination: {
          marginTop: "20px",
        },
        down: {
          marginBottom: "20px",
        },
        up: {
          marginTop: "20px",
        },
        field_btn: {
          marginTop: "20px",
          marginRight: "10px",
        },
      },
    };
  },
  computed: {
    updateDialogTitle: function () {
      if (this.updateKey == "put") {
        return "更新算法";
      }
      if (this.updateKey == "post") {
        return "新建算法";
      }
      return "Error";
    },
    updateMethod: function () {
      if (this.updateKey == "put") {
        return this.putAlgorithm;
      }
      if (this.updateKey == "post") {
        return this.postAlgorithm;
      }
      return "Error";
    },
  },
  methods: {
    postAlgorithm,
    putAlgorithm,
    getAlgorithms,
    deleteAlgorithms,
    cleanForm: function () {
      this.algorithm_info = {
        id: null,
        alg_name: "",
        fields: [],
      };
    },
    addField: function (index) {
      this.algorithm_info.fields.splice(index + 1, 0, {
        field_name: "",
        field_value: "",
        field_note: "",
      });
    },
    removeField: function (index) {
      this.algorithm_info.fields.splice(index, 1);
    },
    closeDialog, closeUpdateDialog, setIsUpdateDialogOpen,
  },
  mounted() {
    console.log("mounte algorithms");
    this.getAlgorithms();
  },
};
</script>