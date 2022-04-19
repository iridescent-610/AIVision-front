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
    <b-form>
      <b-row>
        <b-col md="12">
          <b-form-group label="任务：" label-cols-sm="2" label-cols-lg="1" label-align="right">
            <b-form-checkbox
              v-for="item in options.tasks"
              :key="item.id"
              :value="item.id"
              v-model="file_info.task"
              button
              button-variant="outline-primary"
              :style="style.checkbox"
            >{{item.name}}</b-form-checkbox>
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group label="名称：" label-cols-sm="4" label-cols-lg="2" label-align="right">
            <b-form-input v-model="file_info.model_name" type="text" placeholder="请输入模型名称"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group label="公开：" label-cols-sm="4" label-cols-lg="2" label-align="right">
            <b-form-checkbox
              v-model="file_info.is_public"
              :value="true"
              :unchecked-value="false"
              class="pt-2"
            >是</b-form-checkbox>
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group label="数据集：" label-cols-sm="4" label-cols-lg="2" label-align="right">
            <b-form-input v-model="file_info.dataset_name" type="text" placeholder="请输入数据集名称"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col v-if="update_key=='post'" md="6">
          <b-form-group :label="'模型：'" label-cols-sm="4" label-cols-lg="2" label-align="right">
            <b-form-file
              v-model="file"
              placeholder="请选择或拖动文件"
              drop-placeholder="请拖动至此处"
              browse-text="浏览"
            ></b-form-file>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-button-group style="float: right; margin-bottom: 1rem">
            <b-button
              v-show="file_info.metrics.length == 0"
              :style="style.down"
              variant="outline-primary"
              @click="addMetricField(0)"
            >添加度量</b-button>
            <b-button
              :style="style.down"
              v-show="file_info.args.length == 0"
              variant="outline-primary"
              @click="addArgField(0)"
            >添加参数</b-button>
          </b-button-group>
        </b-col>
        <!-- <b-col cols="4" v-show="file_info.metrics.length == 0">
          <b-button :style="style.down" variant="outline-primary" @click="addMetricField(0)">添加度量</b-button>
        </b-col>-->
        <b-col v-for="(field, index) in file_info.metrics" :key="field.key" cols="12">
          <b-form-group
            :label="'度量'+(index+1)+'：'"
            label-cols-sm="2"
            label-cols-lg="1"
            label-align="right"
          >
            <b-input-group>
              <b-form-input v-model="field.name" type="text" placeholder="请输入度量名称"></b-form-input>
              <b-form-input
                v-model="field.type"
                type="text"
                placeholder="请输入度量类型"
                :style="style.up"
              ></b-form-input>
              <b-form-input
                v-model="field.value"
                type="text"
                placeholder="请输入度量默认值（可选）"
                :style="style.up"
              ></b-form-input>
              <b-form-input
                v-model="field.description"
                type="text"
                placeholder="请输入度量说明（可选）"
                :style="style.up"
              ></b-form-input>
              <b-input-group-append>
                <b-button
                  :style="style.field_btn"
                  variant="outline-primary"
                  @click="addMetricField(index)"
                >添加</b-button>
                <b-button
                  :style="style.field_btn"
                  variant="outline-danger"
                  @click="removeMetricField(index)"
                >删除</b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>
        <!-- <b-col cols="4" v-show="file_info.args.length == 0">
          <b-button :style="style.down" variant="outline-primary" @click="addArgField(0)">添加参数</b-button>
        </b-col>-->
        <b-col v-for="(field, index) in file_info.args" :key="field.key" cols="12">
          <b-form-group
            :label="'参数'+(index+1)+'：'"
            label-cols-sm="2"
            label-cols-lg="1"
            label-align="right"
          >
            <b-input-group>
              <b-form-input v-model="field.name" type="text" placeholder="请输入字段名称"></b-form-input>
              <b-form-input
                v-model="field.value"
                type="text"
                placeholder="请输入参数默认值（可选）"
                :style="style.up"
              ></b-form-input>
              <b-form-input
                v-model="field.description"
                type="text"
                placeholder="请输入参数说明（可选）"
                :style="style.up"
              ></b-form-input>
              <b-input-group-append>
                <b-button
                  :style="style.field_btn"
                  variant="outline-primary"
                  @click="addArgField(index)"
                >添加</b-button>
                <b-button
                  :style="style.field_btn"
                  variant="outline-danger"
                  @click="removeArgField(index)"
                >删除</b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>
        <b-col md="12">
          <b-form-group :label="'备注：'" label-cols-sm="2" label-cols-lg="1" label-align="right">
            <b-form-textarea v-model="file_info.info" placeholder="请键入模型其它信息（可选）" rows="8"></b-form-textarea>
          </b-form-group>
        </b-col>
      </b-row>
      <div class="text-center">
        <b-spinner variant="primary" style="width: 3rem; height: 3rem;" v-if="is_loading"></b-spinner>
      </div>
      <b-button
        v-if="!is_loading"
        block
        @click="updateOrUpload()"
        variant="primary"
        :style="style.submitBtn"
      >{{update_key=='put'?'更新': '上传'}}</b-button>
    </b-form>
    <b-modal
      title="模型"
      no-close-on-esc
      no-close-on-backdrop
      ok-only
      :visible="is_dialog_open"
      ok-title="确定"
      @close="closeDialog"
      @ok="closeDialog"
      :title-class="{style: {fontSize:'50px'}}"
    >
      <div class="text-center" :style="style.modal">{{dialog_content}}</div>
    </b-modal>
  </div>
</template>

<script>
import {
  download,
  parseTime,
  closeDialog,
  convertArray2String,
} from "@/utils/index";
import { postModel, updateModel, getUploadOptions } from "../../model";
export default {
  name: "FormModels",
  props: ["initial_file_info", "model_id", "update_key"],
  data() {
    return {
      style: {
        submitBtn: {
          marginTop: "20px",
        },
        checkbox: {
          marginLeft: "0px",
          marginRight: "10px",
          marginTop: "5px",
          marginBottom: "5px",
        },
      },
      file: null,
      file_info: this.initial_file_info,
      errors: "",
      options: [],
      is_loading: false,
      is_dialog_open: false,
      dialog_content: "",
    };
  },
  methods: {
    download,
    closeDialog,
    updateOrUpload: function () {
      if (this.update_key == "put") {
        this.updateModel({
          file_info: this.file_info,
          model_id: this.model_id,
        });
      } else {
        this.postModel({ file_info: this.file_info, file: this.file });
      }
    },
    postModel,
    updateModel,
    getUploadOptions,
    addArgField: function (index) {
      this.file_info.args.splice(index + 1, 0, {
        name: "",
        value: "",
        description: "",
      });
    },
    removeArgField: function (index) {
      this.file_info.args.splice(index, 1);
    },
    addMetricField: function (index) {
      this.file_info.metrics.splice(index + 1, 0, {
        name: "",
        value: "",
        type: "",
        description: "",
      });
    },
    removeMetricField: function (index) {
      this.file_info.metrics.splice(index, 1);
    },
  },
  mounted() {
    this.getUploadOptions();
  },
};
</script>

<style scoped>
form {
  margin: 20px 20px 20px 20px;
}
</style>