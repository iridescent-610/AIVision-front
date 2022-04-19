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
          <b-form-group label="名称：" label-cols-sm="3" label-cols-lg="2" label-align="right">
            <b-form-input v-model="file_info.dataset_name" type="text" placeholder="请输入数据集名称"></b-form-input>
          </b-form-group>
        </b-col>

        <b-col md="3">
          <b-form-group label="公开：" label-cols-sm="6" label-cols-lg="4" label-align="right">
            <b-form-checkbox
              v-model="file_info.is_public"
              :value="true"
              :unchecked-value="false"
              class="pt-2"
            >是</b-form-checkbox>
          </b-form-group>
        </b-col>

        <b-col md="3">
          <b-form-group label="标注：" label-cols-sm="6" label-cols-lg="4" label-align="right">
            <b-form-checkbox
              v-model="file_info.is_annotated"
              :value="true"
              :unchecked-value="false"
              class="pt-2"
            >是</b-form-checkbox>
          </b-form-group>
        </b-col>

        <b-col v-if="update_key=='post'" md="6">
          <b-form-group :label="'数据集：'" label-cols-sm="3" label-cols-lg="2" label-align="right">
            <b-form-file
              v-model="file"
              placeholder="请选择或拖动文件"
              drop-placeholder="请拖动至此处"
              browse-text="浏览"
            ></b-form-file>
          </b-form-group>
        </b-col>

        <b-col md="12">
          <b-form-group :label="'备注：'" label-cols-sm="2" label-cols-lg="1" label-align="right">
            <b-form-textarea v-model="file_info.info" placeholder="请键入数据集其它信息（可选）" rows="4"></b-form-textarea>
          </b-form-group>
        </b-col>

        <!-- <b-col md="12">
          <b-form-group :label="'粗类别：'" label-cols-sm="2" label-cols-lg="1" label-align="right">
            <b-form-textarea v-model="file_info.info" placeholder="如cat1,cat2都属于cat，注意只有分类任务才需要填写此信息" rows="2"></b-form-textarea>
          </b-form-group>
        </b-col> -->

        <!-- <b-col md="12">
          <b-form-group :label="'细类别：'" label-cols-sm="2" label-cols-lg="1" label-align="right">
            <b-form-textarea v-model="file_info.info" placeholder="注意：各种类别以逗号进行分割，类别名称不要包括空格;如果是文本识别任务则输入所有的字符串" rows="2"></b-form-textarea>
          </b-form-group>
        </b-col> -->

        <!-- <b-col md="12">
          <b-form-group :label="'类别：'" label-cols-sm="2" label-cols-lg="1" label-align="right">
            <b-form-textarea v-model="file_info.info" placeholder="注意：各种类别以逗号进行分割，类别名称不要包括空格;如果是文本识别任务则输入所有的字符串" rows="2"></b-form-textarea>
          </b-form-group>
        </b-col> -->

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
      title="数据集"
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
import { getUploadOptions, postDataset, updateDataset } from "../../dataset";
import { closeDialog } from "@/utils/index";

export default {
  name: "FormDatasets",
  props: ["initial_file_info", "dataset_id", "update_key"],
  data: function () {
    return {
      file: null,
      file_info: this.initial_file_info,
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
      errors: "",
      options: [],
      is_loading: false,
      is_dialog_open: false,
      dialog_content: "",
    };
  },
  methods: {
    updateOrUpload: function () {
      if (this.update_key == "put") {
        this.updateDataset({
          file_info: this.file_info,
          dataset_id: this.dataset_id,
        });
      } else {
        this.postDataset({ file_info: this.file_info, file: this.file });
      }
    },
    closeDialog,
    postDataset,
    updateDataset,
    getUploadOptions,
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