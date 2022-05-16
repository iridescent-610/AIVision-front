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
    <el-button class="add-button" icon="el-icon-plus" type="primary" size="small"
      @click="update_key = 'post'; cleanForm(); setIsUpdateDialogOpen(true)">新建数据集</el-button>
    <b-table striped hover responsive :items="my_datasets" :fields="fields" :current-page="currentPage"
      :per-page="perPage" outlined sort-by="created_time" class="table">
      <template v-slot:cell(is_public)="row">{{ row.item.is_public ? "是" : "否" }}</template>
      <template v-slot:cell(is_annotated)="row">{{ row.item.is_annotated ? "是" : "否" }}</template>
      <template v-slot:cell(task)="row">{{ row.item.task.map(t => t.name).reduce(convertArray2String) }}</template>
      <template v-slot:cell(created_time)="row">{{ parseTime(row.item.created_time) }}</template>
      <template v-slot:cell(method)="row">
        <div style="white-space: nowrap">
          <!-- <el-button
            size="sm"
            @click="row.toggleDetails"
            type="text"
            :style="style.methodBtn"
            class="action-button"
          >详情</el-button> -->
          <el-button size="sm" @click="download(row.item.url)" type="text" :style="style.methodBtn"
            class="action-button">下载</el-button>
          <!-- <el-button
            size="sm"
            @click="shareData({file_id: row.item.id, file_type: 'd', is_public: row.item.is_public})"
            :variant="row.item.is_possessed?'outline-primary': 'outline-secondary'"
            type="text"
            :disabled="!row.item.is_possessed"
            :style="style.methodBtn"
            class="action-button"
          >分享</el-button> -->
          <el-button size="sm" @click="update_key = 'put'; fillForm(row.item); setIsUpdateDialogOpen(true)"
            :variant="row.item.is_possessed ? 'outline-danger' : 'outline-secondary'" type="text"
            :disabled="!row.item.is_possessed" class="action-button update">更新</el-button>
          <el-button size="sm" @click="deleteDatasets([row.item.id])" type="text" style="color: rgba(183, 28, 28, 1)"
            :disabled="!row.item.is_possessed" :style="style.methodBtn" class="action-button">删除</el-button>
        </div>
      </template>
      <template v-slot:row-details="row">
        <b-card>
          <i v-if="!row.item.info">无详细信息</i>
          <span v-else>{{ row.item.info }}</span>
        </b-card>
      </template>
    </b-table>
    <b-pagination v-model="currentPage" :total-rows="my_datasets.length" :per-page="perPage" align="right"
      :style="style.pagination" class="pagination"></b-pagination>
    <b-modal :title="updateDialogTitle" no-close-on-esc scrollable no-close-on-backdrop hide-footer
      :visible="is_update_dialog_open" @close="closeUpdateDialog" @cancel="closeUpdateDialog"
      :title-class="{ style: { fontSize: '50px' } }" centered style="position: relative;">
      <form-datasets :initial_file_info="file_info" :update_key="update_key" :dataset_id="dataset_id"></form-datasets>
      <el-button @click="is_update_dialog_open = false" size="small" class="return-button">取消</el-button>
    </b-modal>
    <b-modal title="数据集" no-close-on-esc no-close-on-backdrop ok-only :visible="is_dialog_open" ok-title="确定"
      @close="closeDialog" @ok="closeDialog" :title-class="{ style: { fontSize: '50px' } }">
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

import { shareData } from "@/utils/share_data"
import FormDatasets from "./form_datasets/index.vue";
import { deleteDatasets } from "../dataset"

export default {
  name: "MyDatasets",
  components: { FormDatasets },
  data() {
    return {
      perPage: 8,
      currentPage: 1,
      fields: [
        {
          key: "dataset_name",
          label: "名称",
          sortable: true,
          class: "text-center",
        },
        {
          key: "is_public",
          label: "公开",
          sortable: true,
          class: "text-center",
        },
        {
          key: "is_annotated",
          label: "标注",
          sortable: true,
          class: "text-center",
        },
        { key: "task", label: "任务", sortable: true, class: "text-center" },
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
      isEditing: false,
      style: {
        pagination: {
          marginTop: "20px",
        },
        submitBtn: {
          marginBottom: "20px",
        },
        methodBtn: {
          marginLeft: "5px",
          marginRight: "5px",
        },
        modal: {
          wordBreak: "break-all",
        },
        down: {
          marginBottom: "20px",
        },
      },
      update_key: "post",
      file_info: {
        task: [],
        dataset_name: "",
        is_public: true,
        is_annotated: true,
        info: "",
      },
      dataset_id: null,
      errors: "",
      is_dialog_open: false,
      dialog_content: "",
      is_update_dialog_open: false,
    };
  },
  computed: {
    ...mapState("dataset", {
      my_datasets: (state) => state.my_datasets,
    }),
    updateDialogTitle: function () {
      if (this.update_key == "put") {
        return "更新数据集";
      }
      if (this.update_key == "post") {
        return "新建数据集";
      }
      return "Error";
    },
  },
  methods: {
    download,
    parseTime,
    convertArray2String,
    cleanForm: function () {
      console.log(this.file, this.file_info);
      this.file_info = {
        task: [],
        dataset_name: "",
        is_public: true,
        is_annotated: true,
        info: "",
      };
      console.log(this.file, this.file_info);
    },
    fillForm: function (item) {
      this.file_info = {
        task: item.task.map((x) => x.id),
        dataset_name: item.dataset_name,
        is_public: item.is_public,
        is_annotated: item.is_annotated,
        info: item.info,
      };
      this.dataset_id = item.id;
    },
    closeDialog,
    closeUpdateDialog,
    setIsUpdateDialogOpen,
    shareData,
    deleteDatasets
  },
  mounted() {
    this.$store.dispatch("dataset/getMyDatasets");
  },
};
</script>

<style scoped lang="less">
.table-method {
  max-width: 8.8rem;
  text-align: left;
}

.add-button {
  font-size: 14px;
  margin-top: 9px;
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
    font-weight: 400;
    border: unset;
    text-align: left !important;
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
        color: #C0C4CC;
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
