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
    <b-form-group style="margin-bottom: 104px;">
      <span>任务</span>
      <div class="options-tasks">
        <b-form-checkbox v-for="item in options.tasks" :key="item.id" :value="item.id" v-model="file_info.task" button
          button-variant="outline-primary" class="check-box">{{ item.name }}</b-form-checkbox>
      </div>
    </b-form-group>

    <b-form-group>
      <span>名称</span>
      <b-form-input v-model="file_info.dataset_name" type="text" placeholder="请输入数据集名称"></b-form-input>
    </b-form-group>

    <b-form-group>
      <span>公开</span>
      <b-form-checkbox v-model="file_info.is_public" :value="true" :unchecked-value="false"></b-form-checkbox>
    </b-form-group>

    <b-form-group>
      <span>标注</span>
      <b-form-checkbox v-model="file_info.is_annotated" :value="true" :unchecked-value="false"></b-form-checkbox>
    </b-form-group>

    <b-form-group v-if="update_key == 'post'">
      <span>数据集</span>
      <b-form-file v-model="file" placeholder="请选择或拖动文件" drop-placeholder="请拖动至此处" browse-text="浏览"></b-form-file>
    </b-form-group>

    <b-form-group style="margin-bottom: 108px;">
      <span>备注</span>
      <b-form-textarea v-model="file_info.info" placeholder="请键入数据集其它信息（可选）" rows="4"></b-form-textarea>
    </b-form-group>

    <!-- <b-form-group :label="'粗类别：'" label-cols-sm="2" label-cols-lg="1" label-align="right">
      <b-form-textarea v-model="file_info.info" placeholder="如cat1,cat2都属于cat，注意只有分类任务才需要填写此信息" rows="2">
      </b-form-textarea>
    </b-form-group>

    <b-form-group :label="'细类别：'" label-cols-sm="2" label-cols-lg="1" label-align="right">
      <b-form-textarea v-model="file_info.info" placeholder="注意：各种类别以逗号进行分割，类别名称不要包括空格;如果是文本识别任务则输入所有的字符串" rows="2">
      </b-form-textarea>
    </b-form-group>

    <b-form-group :label="'类别：'" label-cols-sm="2" label-cols-lg="1" label-align="right">
      <b-form-textarea v-model="file_info.info" placeholder="注意：各种类别以逗号进行分割，类别名称不要包括空格;如果是文本识别任务则输入所有的字符串" rows="2">
      </b-form-textarea>
    </b-form-group> -->

    <div class="text-center">
      <b-spinner variant="primary" style="width: 3rem; height: 3rem;" v-if="is_loading"></b-spinner>
    </div>
    <b-button v-if="!is_loading" block @click="updateOrUpload()" variant="primary"
      style="background-color: rgba(25, 118, 210, 1)">{{ update_key == 'put' ? '更新' : '上传' }}
    </b-button>
    <b-modal title="数据集" no-close-on-esc no-close-on-backdrop ok-only :visible="is_dialog_open" ok-title="确定"
      @close="closeDialog" @ok="closeDialog" :title-class="{ style: { fontSize: '50px' } }">
      <div class="text-center" :style="style.modal">{{ dialog_content }}</div>
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

<style scoped lang="less">
.form-datasets {
  position: relative;

  /deep/ .form-group {
    .bv-no-focus-ring {
      padding: 0;
      position: relative;

      span {
        line-height: 32px;
        color: rgba(38, 50, 56, 1);
        font-size: 14px;
      }

      .options-tasks {
        display: inline-block;
        position: absolute;
        left: 64px;
      }

      .btn-group-toggle {
        height: 32px;
        padding: 0;
        color: rgba(73, 93, 103, 1);

        .btn {
          line-height: 20px;
          padding: 5px 12px;
          border: 1px solid rgba(207, 216, 220, 1);
          border-radius: 3px;

          input {
            display: none;
          }
        }
      }

      input {
        font-size: 14px;
        width: 444px;
        height: 32px;
        position: absolute;
        left: 64px;
        display: inline-block;

        &::-webkit-input-placeholder {
          color: rgba(69, 90, 100, 0.35);
        }
      }

      .custom-control {
        height: 32px;
        position: absolute;
        left: 64px;
        display: inline-block;
        padding-top: 2px;

        label::before {
          height: 20px;
          width: 20px;
        }

        label::after {
          height: 20px;
          width: 20px;
        }

        .custom-control-input {
          display: none;
        }
      }

      .custom-file {
        width: 444px;
        height: 32px;
        position: absolute;
        left: 64px;
        display: inline-block;

        .custom-file-input {
          display: none;
        }
      }

      .form-control {
        width: 444px;
        position: absolute;
        left: 64px;
        display: inline-block;
      }
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

  .btn-block {
    width: 52px;
    height: 32px;
    background: rgba(25, 118, 210, 1);
    font-size: 14px;
    padding: 0;
    position: absolute;
    right: 0;
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
