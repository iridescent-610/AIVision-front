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
  <div class="form-datasets">
    <b-form>
      <b-row>
        <b-col md="12">
          <b-form-group label="任务" label-cols-sm="3" label-cols-lg="2" label-align="left" style="margin-bottom: 16px;">
            <b-form-checkbox
              v-for="item in options.tasks"
              :key="item.id"
              :value="item.id"
              v-model="file_info.task"
              button
              button-variant="outline-primary"
              class="check-box"
            >{{item.name}}</b-form-checkbox>
          </b-form-group>
        </b-col>
        <b-col md="12">
          <b-form-group label="名称" label-cols-sm="3" label-cols-lg="2" label-align="left">
            <b-form-input v-model="file_info.model_name" type="text" placeholder="请输入模型名称"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="12">
          <b-form-group label="公开" label-cols-sm="3" label-cols-lg="2" label-align="left">
            <b-form-checkbox
              v-model="file_info.is_public"
              :value="true"
              :unchecked-value="false"
            >是</b-form-checkbox>
          </b-form-group>
        </b-col>
        <b-col md="12">
          <b-form-group label="数据集" label-cols-sm="3" label-cols-lg="2" label-align="left">
            <b-form-input v-model="file_info.dataset_name" type="text" placeholder="请输入数据集名称"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col v-if="update_key=='post'" md="12">
          <b-form-group :label="'模型'" label-cols-sm="3" label-cols-lg="2" label-align="left" style="margin-bottom: 0">
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
              variant="outline-primary"
              style="font-size: 14px; height: 32px; line-height: 20px; padding: 6px 12px; margin-bottom: 8px; margin-top: 16px;"
              @click="addMetricField(0)"
            >添加度量</b-button>
            <b-button
              v-show="file_info.args.length == 0"
              variant="outline-primary"
              style="font-size: 14px; height: 32px; line-height: 20px; padding: 6px 12px; margin-bottom: 8px; margin-top: 16px;"
              @click="addArgField(0)"
            >添加参数</b-button>
          </b-button-group>
        </b-col>
        <!-- <b-col cols="4" v-show="file_info.metrics.length == 0">
          <b-button :style="style.down" variant="outline-primary" @click="addMetricField(0)">添加度量</b-button>
        </b-col>-->
        <b-col v-for="(field, index) in file_info.metrics" :key="field.key" cols="12">
          <b-form-group
            :label="'度量'+(index+1)"
            label-cols-sm="3"
            label-cols-lg="2"
            label-align="left"
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
                  variant="outline-primary"
                  @click="addMetricField(index)"
                  style="font-size: 14px; height: 32px; line-height: 20px; padding: 6px 12px"
                >添加</b-button>
                <b-button
                  variant="outline-danger"
                  @click="removeMetricField(index)"
                  style="font-size: 14px; height: 32px; line-height: 20px; padding: 6px 12px"
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
            label-cols-sm="3"
            label-cols-lg="2"
            label-align="left"
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
                  variant="outline-primary"
                  @click="addArgField(index)"
                  style="font-size: 14px; height: 32px; line-height: 20px; padding: 6px 12px"
                >添加</b-button>
                <b-button
                  variant="outline-danger"
                  @click="removeArgField(index)"
                  style="font-size: 14px; height: 32px; line-height: 20px; padding: 6px 12px"
                >删除</b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>
        <b-col md="12">
          <b-form-group :label="'备注：'" label-cols-sm="3" label-cols-lg="2" label-align="left">
            <b-form-textarea v-model="file_info.info" placeholder="请键入模型其它信息（可选）" rows="4"></b-form-textarea>
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
        style="margin-top: 20px; background-color: rgba(25, 118, 210, 1)"
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

<style scoped lang="less">
.form-datasets {
  /deep/ input {
    font-size: 14px !important;
    height: 32px;

    &::-webkit-input-placeholder {
      color: rgba(69, 90, 100, 0.35);
    }
  }

  /deep/ .custom-file-label {
    height: 32px;
    line-height: 20px;
    padding: 6px 12px;
    font-size: 14px !important;
    color: rgba(69, 90, 100, 0.35);

    &:after {
      height: 30px;
      line-height: 19px;
      padding: 6px 12px;
    }
  }

  /deep/ textarea {
    font-size: 14px !important;
    &::-webkit-input-placeholder {
      color: rgba(69, 90, 100, 0.35);
    }
  }

  /deep/ .col-form-label {
    font-size: 14px;
    padding: 6px 12px;
    line-height: 20px;
  }

  /deep/ .custom-checkbox {
    padding-top: 5px;
  }
}
.check-box {
  margin-right: 8px;
  margin-bottom: 8px;
  /deep/ label {
    box-sizing: border-box;
    color: rgba(73, 93, 103, 1) !important;
    border-color: rgba(207, 216, 220, 1);
    line-height: 20px;
    padding: 6px 12px;
    font-size: 14px;

    &:hover {
      color: #fff !important;
      border-color: #007bff;
    }

    &.active {
      color: #fff !important;
    }
  }
}

/deep/ .form-group {
  margin-bottom: 24px;
}
</style>
