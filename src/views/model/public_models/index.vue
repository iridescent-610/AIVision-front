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
    <b-table striped hover responsive :items="public_models" :fields="fields" :current-page="currentPage"
      :per-page="perPage" outlined sort-by="created_time" class="table">
      <template v-slot:cell(model_type)="row">{{
          modelToType.hasOwnProperty(row.item.model_name) ? modelToType[row.item.model_name] : 'squeezenet'
      }}</template>
      <template v-slot:cell(task)="row">{{ row.item.task.map(t => t.name).reduce(convertArray2String) }}</template>
      <template v-slot:cell(created_time)="row">{{ parseTime(row.item.created_time) }}</template>
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
        </div>
      </template>
      <template v-slot:row-details="row">
        <model-detail :row="row"></model-detail>
      </template>
    </b-table>
    <b-pagination v-model="currentPage" :total-rows="public_models.length" :per-page="perPage" align="right"
      :style="style.pagination" class="pagination"></b-pagination>
  </div>
</template>

<script>
import { download, parseTime, convertArray2String } from "@/utils/index";
import { getPublicModels } from "../model"
import ModelDetail from "../model_detail";

import { modelToType } from "../modelType";

export default {
  name: "PublicModels",
  components: { ModelDetail },
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
          key: "username",
          label: "拥有者",
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
      },
      errors: "",
      public_models: [],
    };
  },
  methods: {
    download,
    parseTime,
    convertArray2String, getPublicModels,
    vis_structure(name) {
      console.log(name);

      // localhost:15000
      let routeUrl = "/aivision/netron/?modelFile=" + name;
      // let routeUrl = this.$router.resolve({
      //   name: 'Multiple Task',
      //   params: { flowchart_id: this.chartId, node_id: model.id },
      // })

      window.open(
        routeUrl,   // routeUrl.href, // 'https://www.baidu.com/',
        '_blank' // <- This is what makes it open in a new window.
      )

    }
  },
  mounted() {
    this.getPublicModels();
  },
};
</script>
<style lang="less" scoped>
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
</style>
