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
    <el-button class="add-button" icon="el-icon-plus" type="primary" size="small" style="font-size: 14px" @click="
  update_key = 'post';
cleanForm();
setIsUpdateDialogOpen(true);
    ">新增模型</el-button>
    <b-table striped hover responsive :items="my_models" :fields="fields" :current-page="currentPage"
      :per-page="perPage" outlined sort-by="created_time" class="table">
      <template v-slot:cell(model_type)="row">{{
          modelToType.hasOwnProperty(row.item.model_name)
            ? modelToType[row.item.model_name]
            : "squeezenet"
      }}</template>
      <template v-slot:cell(is_public)="row">{{
          row.item.is_public ? "是" : "否"
      }}</template>
      <template v-slot:cell(task)="row">{{
          row.item.task.map((t) => t.name).reduce(convertArray2String)
      }}</template>
      <template v-slot:cell(created_time)="row">{{
          parseTime(row.item.created_time)
      }}</template>
      <template v-slot:cell(method)="row">
        <div style="white-space: nowrap">
          <!-- <b-button
            size="sm"
            @click="row.toggleDetails"
            variant="outline-primary"
            :style="style.methodBtn"
          >详情</b-button> -->
          <el-button size="sm" @click="vis_structure(row.item.model_name)" type="text" :style="style.methodBtn">模型结构
          </el-button>
          <el-button size="sm" @click="download(row.item.url)" type="text" :style="style.methodBtn">下载</el-button>
          <!-- <el-button
            size="sm"
            @click="
              shareData({
                file_id: row.item.id,
                file_type: 'm',
                is_public: row.item.is_public,
              })
            "
            type="text"
            :disabled="!row.item.is_possessed"
            :style="style.methodBtn"
            >分享</el-button
          > -->
          <el-button size="sm" @click="
  update_key = 'put';
fillForm(row.item);
setIsUpdateDialogOpen(true);
          " type="text" :disabled="!row.item.is_possessed" :style="style.methodBtn">更新</el-button>
          <el-button size="sm" @click="deleteModels([row.item.id])" type="text" style="color: rgba(183, 28, 28, 1)"
            :disabled="!row.item.is_possessed" :style="style.methodBtn">删除</el-button>
        </div>
      </template>
      <template v-slot:row-details="row">
        <model-detail :row="row"></model-detail>
      </template>
    </b-table>
    <b-pagination v-model="currentPage" :total-rows="my_models.length" :per-page="perPage" align="right"
      :style="style.pagination" class="pagination"></b-pagination>
    <b-modal :title="updateDialogTitle" no-close-on-esc scrollable no-close-on-backdrop hide-footer
      :visible="is_update_dialog_open" @close="closeUpdateDialog" @cancel="closeUpdateDialog" centered
      style="position: relative;">
      <form-models :initial_file_info="file_info" :update_key="update_key" :model_id="model_id"></form-models>
      <el-button @click="is_update_dialog_open = false" size="small" class="return-button">取消</el-button>
    </b-modal>
    <b-modal title="模型" no-close-on-esc no-close-on-backdrop ok-only :visible="is_dialog_open" ok-title="确定"
      @close="closeDialog" @ok="closeDialog" :title-class="{ style: { fontSize: '18px' } }">
      <div class="text-center" :style="style.modal">{{ dialog_content }}</div>
    </b-modal>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import {
  download,
  parseTime,
  convertArray2String,
  closeDialog,
  closeUpdateDialog,
  setIsUpdateDialogOpen,
} from "@/utils/index";
import { shareData } from "@/utils/share_data";
import FormModels from "./form_models/index.vue";
import ModelDetail from "../model_detail";
import { deleteModels } from "../model";

import { modelToType } from "../modelType";

export default {
  name: "MyModels",
  components: { FormModels, ModelDetail },
  data() {
    return {
      modelToType: modelToType,
      perPage: 8,
      currentPage: 1,
      fields: [
        {
          key: "model_name",
          label: "名称",
          sortable: true,
          class: "text-center",
        },
        {
          key: "model_type",
          label: "结构",
          sortable: true,
          class: "text-center",
        },
        {
          key: "is_public",
          label: "公开",
          sortable: true,
          class: "text-center",
        },
        { key: "task", label: "任务", sortable: true, class: "text-center" },
        {
          key: "dataset_name",
          label: "数据集",
          sortable: true,
          class: "text-center",
        },
        {
          key: "created_time",
          label: "创建时间",
          sortable: true,
          class: "text-center",
          sortDirection: "asc",
        },
        {
          key: "method",
          label: "操作",
          class: "text-center table-method",
          stickyColumn: true,
        },
      ],
      update_key: "post",
      style: {
        pagination: {
          marginTop: "20px",
        },
        title: {
          fontSize: "20px",
        },
        methodBtn: {
          marginLeft: "5px",
          marginRight: "5px",
        },
        down: {
          marginBottom: "20px",
        },
        modal: {
          wordBreak: "break-all",
        },
      },
      file_info: {
        model_name: "",
        model_type: "",
        task: [],
        dataset_name: "",
        is_public: true,
        info: "",
        metrics: [],
        args: [],
      },
      model_id: null,
      errors: "",
      is_dialog_open: false,
      dialog_content: "",
      is_update_dialog_open: false,
    };
  },
  computed: {
    ...mapState("model", {
      my_models: (state) => state.my_models,
    }),
    updateDialogTitle: function () {
      if (this.update_key == "put") {
        return "更新模型";
      }
      if (this.update_key == "post") {
        return "新建模型";
      }
      return "Error";
    },
  },
  methods: {
    download,
    cleanForm: function () {
      console.log(this.file, this.file_info);
      this.file_info = {
        model_name: "",
        model_type: "",
        task: [],
        dataset_name: "",
        is_public: true,
        info: "",
        metrics: [],
        args: [],
      };
      console.log(this.file, this.file_info);
    },
    fillForm: function (item) {
      // if(!modelToType.hasOwnProperty(item.model_name)){
      //   console.log(item.model_name);
      //   modelToType[item.model_name] = 'squeezenet'
      // }
      this.file_info = {
        model_name: item.model_name,
        task: item.task.map((x) => x.id),
        model_type: modelToType[item.model_name],
        dataset_name: item.dataset_name,
        is_public: item.is_public,
        info: item.info,
        metrics: item.metrics,
        args: item.args,
      };
      this.model_id = item.id;
    },
    parseTime,
    convertArray2String,
    closeDialog,
    closeUpdateDialog,
    setIsUpdateDialogOpen,
    shareData,
    deleteModels,
    vis_structure(name) {
      console.log(name);

      // localhost:15000
      let routeUrl = "http://183.129.217.214:20182/netron/?modelFile=" + name;
      // let routeUrl = this.$router.resolve({
      //   name: 'Multiple Task',
      //   params: { flowchart_id: this.chartId, node_id: model.id },
      // })

      window.open(
        routeUrl, // routeUrl.href, // 'https://www.baidu.com/',
        "_blank" // <- This is what makes it open in a new window.
      );
    },
  },
  mounted() {
    this.$store.dispatch("model/getMyModels");
  },
};
</script>
<style lang="less" scoped>
.add-button {
  margin-bottom: 24px;
  border: unset;
}

.table {
  border: 1px solid rgba(207, 216, 220, 1);
  border-radius: 4px;

  /deep/ table {
    border: unset !important;
  }

  /deep/ thead {
    line-height: 14px;
  }

  /deep/ th {
    background-color: rgba(248, 249, 249, 1) !important;
    color: rgba(38, 50, 56, 1);
    font-size: 14px;
    font-weight: 500;
    border: unset;
    text-align: left !important;
    font-weight: bold;
  }

  /deep/ tr {
    background: unset !important;
  }

  /deep/ tbody td {
    line-height: 20px;
    padding: 10px 12px;
    color: rgba(73, 93, 103, 1);
    font-size: 14px;
    text-align: left !important;
    background: unset !important;
    border-color: rgba(238, 242, 243, 1);

    button {
      font-weight: 400;
      margin-left: 6px !important;
      margin-right: 6px !important;
      padding: 0;
      line-height: 20px;
      border: 0;
    }
  }

  /deep/ .card {
    border-radius: unset;
    border: unset !important;
  }

  .action-button {
    &:focus {
      outline: unset;
    }

    &.update {
      color: rgba(183, 28, 28, 1);

      &:disabled {
        color: #c0c4cc;
      }
    }
  }
}

.pagination {
  /deep/ .page-link {
    border: unset !important;
    font-size: 14px;
    color: rgba(69, 90, 100, 0.65);

    &:focus {
      outline: unset;
      box-shadow: unset;
    }
  }

  /deep/ .page-item.active .page-link {
    background-color: #fff;
    color: #007bff;
  }
}

/deep/ .el-button {
  &:focus {
    outline: unset;
    border: unset;
  }
}

/deep/.modal-title {
  font-size: 18px;
  font-weight: 500;
}

/deep/ .modal-content {
  width: 556px;
  box-shadow: 0px 0px 24px rgba(21, 35, 43, 0.2), 0px 4px 32px rgba(21, 35, 43, 0.3);
  border-radius: 8px;
  border: none;

  .modal-header {
    padding: 24px;
    border: none;

    .modal-title {
      color: rgba(0, 0, 0, 1);
      font-size: 20px;
      line-height: 26px;
    }
  }

  .modal-body {
    padding: 8px 24px 56px;
  }
}

/deep/ .return-button {
  width: 52px;
  height: 32px;
  font-size: 14px;
  padding: 0;
  color: rgba(69, 90, 100, 1);
  position: absolute;
  right: 84px;
}
</style>
