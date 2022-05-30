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
    <b-table
      striped
      hover
      responsive
      sort-icon-left
      :items="public_datasets"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      outlined
      sort-by="created_time"
      class="table"
      style="margin-bottom: 0;"
    >
      <template v-slot:cell(is_annotated)="row">{{row.item.is_annotated? "是": "否"}}</template>
      <template v-slot:cell(task)="row">{{row.item.task.map(t=>t.name).reduce(convertArray2String)}}</template>
      <template v-slot:cell(created_time)="row">{{parseTime(row.item.created_time)}}</template>
      <template v-slot:cell(method)="row">
        <div style="white-space: nowrap">
          <!-- <el-button
            size="sm"
            @click="row.toggleDetails"
            type="text"
            class="action-button"
            :style="style.methodBtn"
          >详情</el-button> -->
          <el-button
            size="sm"
            @click="download(row.item.url)"
            type="text"
            class="action-button"
            :style="style.methodBtn"
          >下载</el-button>
        </div>
      </template>
      <template v-slot:row-details="row">
        <b-card>
          <i v-if="!row.item.info">无详细信息</i>
          <span v-else>{{row.item.info}}</span>
        </b-card>
      </template>
    </b-table>
    <b-pagination
      v-model="currentPage"
      :total-rows="public_datasets.length"
      :per-page="perPage"
      align="right"
      :style="style.pagination"
      class="pagination"
    ></b-pagination>
  </div>
</template>

<script>
import { download, convertArray2String, parseTime } from "@/utils/index";
import { getPublicDatasets } from "../dataset";

export default {
  name: "PublicDatasets",
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
          key: "is_annotated",
          label: "标注",
          sortable: true,
          class: "text-center",
        },
        { key: "task", label: "任务", sortable: true, class: "text-center" },
        {
          key: "username",
          label: "拥有者",
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
          marginTop: "8px",
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
      public_datasets: [],
    };
  },
  methods: {
    download,
    convertArray2String,
    parseTime,
    getPublicDatasets,
  },
  mounted() {
    this.getPublicDatasets();
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
