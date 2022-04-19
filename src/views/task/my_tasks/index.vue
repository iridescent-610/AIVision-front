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
      :items="reorg_tasks"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      outlined
      sort-by="started_time"
    >
      <template v-slot:cell(name)="row">
        <i v-if="!row.item.name">空</i>
        <span v-else>{{row.item.name}}</span>
      </template>
      <template v-slot:cell(created_time)="row">{{parseTime(row.item.created_time)}}</template>
      <template v-slot:cell(tasks)="row">{{row.item.tasks.length? row.item.tasks.reduce(convertArray2String): "--"}}</template>
      <template v-slot:cell(datasets)="row">{{row.item.datasets.length? row.item.datasets.reduce(convertArray2String): "--"}}</template>
      <template v-slot:cell(progress)="row">
        <span v-if="is_failed(row.item)">失败</span>
        <span v-else-if="row.item.progress==0">等待</span>
        <b-progress
          v-else
          :style="{marginTop:'7px',marginBottom:'7px', }"
          :animated="Number(row.value)!=1"
          :value="row.value"
          :max="1"
          :precision="2"
          :variant="row.item.runtime_error?'danger':'success'"
          show-progress
        ></b-progress>
      </template>
      <template v-slot:cell(url)="row">
        <div style="white-space: nowrap">
          <b-button
            variant="outline-primary"
            size="sm"
            @click="openDetailPage(row.item.id)"
            :style="style.methodBtn"
          >详情</b-button>
          
          <b-button
            :disabled="!row.value"
            :variant="row.value? 'outline-success': 'outline-secondary'"
            size="sm"
            @click="download(row.value)"
            :style="row.value? style.methodBtn: style.disabledMethodBtn"
          >下载</b-button>
          <b-button
            variant="outline-danger"
            size="sm"
            :style="style.methodBtn"
            @click="deleteReorgTasks([row.item.id])"
          >删除</b-button>
        </div>
      </template>
    </b-table>
    <b-pagination
      v-model="currentPage"
      :total-rows="reorg_tasks.length"
      :per-page="perPage"
      align="right"
      :style="style.pagination"
    ></b-pagination>
    <b-modal
      title="我的任务"
      no-close-on-esc
      no-close-on-backdrop
      ok-only
      :visible="is_dialog_open"
      ok-title="确定"
      @close="closeDialog"
      @ok="closeDialog"
      :title-class="{style: {fontSize:'50px'}}"
    >
      <div class="text-center">{{dialog_content}}</div>
    </b-modal>
  </div>
</template>

<script>
import { download, openDetailPage, parseTime, convertArray2String, closeDialog } from "@/utils/index";
import {getReorgTasks, deleteReorgTasks} from '../task'

export default {
  name: "MyTasks",
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      fields: [
        {
          key: "tasks",
          label: "种类",
          sortable: true,
          class: "text-center",
        },
        {
          key: "name",
          label: "名称",
          sortable: true,
          class: "text-center",
        },
        {
          key: "algorithms.alg_name",
          label: "算法",
          sortable: true,
          class: "text-center",
        },
        {
          key: "datasets",
          label: "数据集",
          sortable: true,
          class: "text-center",
        },
        {
          key: "created_time",
          label: "创建时间",
          sortable: true,
          class: "text-center",
        },
        // {
        //   key: "started_time",
        //   label: "开始时间",
        //   sortable: true,
        //   class: "text-center"
        // },
        // {
        //   key: "completed_time",
        //   label: "完成时间",
        //   sortable: true,
        //   class: "text-center"
        // },
        {
          key: "progress",
          label: "进度",
          class: "text-center",
        },
        {
          key: "url",
          label: "操作",
          class: "text-center table-method",
          stickyColumn: true,
        },
      ],
      style: {
        pagination: {
          marginTop: "20px",
        },
        row: {
          marginTop: "20px",
        },
        methodBtn: {
          marginLeft: "5px",
          marginRight: "5px",
        },
        disabledMethodBtn: {
          marginLeft: "5px",
          marginRight: "5px",
          cursor: "default",
        },
      },
      errors: "",
      reorg_tasks: [],
      is_dialog_open: false,
      dialog_content: "",
    };
  },
  methods: {
    getReorgTasks, deleteReorgTasks, closeDialog,
    is_failed(info) {
      if ("state" in info && info.state == "failed") return true;
      return false;
    },
    openDetailPage,
    download,
    parseTime,
    convertArray2String
  },
  mounted() {
    this.getReorgTasks();
  },
};
</script>