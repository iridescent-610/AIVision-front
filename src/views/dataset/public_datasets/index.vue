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
      :items="public_datasets"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      outlined
      sort-by="created_time"
    >
      <template v-slot:cell(is_annotated)="row">{{row.item.is_annotated? "是": "否"}}</template>
      <template v-slot:cell(task)="row">{{row.item.task.map(t=>t.name).reduce(convertArray2String)}}</template>
      <template v-slot:cell(created_time)="row">{{parseTime(row.item.created_time)}}</template>
      <template v-slot:cell(method)="row">
        <div style="white-space: nowrap">
          <b-button
            size="sm"
            @click="row.toggleDetails"
            variant="outline-primary"
            :style="style.methodBtn"
          >详情</b-button>
          <b-button
            size="sm"
            @click="download(row.item.url)"
            variant="outline-primary"
            :style="style.methodBtn"
          >下载</b-button>
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