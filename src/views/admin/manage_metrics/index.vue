<template>
  <div>
    <b-row align-h="start" :style="style.down">
      <b-col lg="2" cols="3">
        <b-button
          block
          variant="primary"
          @click="updateKey='post'; cleanForm(); setIsUpdateDialogOpen(true)"
        >新建</b-button>
      </b-col>
      <b-col lg="2" cols="3" v-show="!isEditing">
        <b-button block @click="isEditing=true;" variant="primary">编辑</b-button>
      </b-col>
      <b-col lg="2" cols="3" v-show="isEditing">
        <b-button block @click="isEditing=false">取消</b-button>
      </b-col>
    </b-row>
    <b-modal
      title="度量管理"
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

    <b-modal
      :title="updateDialogTitle"
      no-close-on-esc
      no-close-on-backdrop
      scrollable
      :visible="is_update_dialog_open"
      ok-title="确定"
      cancel-title="取消"
      @close="closeUpdateDialog"
      @ok="closeUpdateDialog();updateMethod({metric_info, file})"
      @cancel="closeUpdateDialog"
      :title-class="{style: {fontSize:'50px'}}"
    >
      <b-form>
        <b-row>
          <b-col cols="12">
            <b-form-group label="度量名称：" label-cols-md="3" label-align="right">
              <b-form-input
                v-model="metric_info.name"
                type="text"
                placeholder="请输入度量名称"
                :state="metric_info.name.length>0?true:false"
              ></b-form-input>
              <b-form-invalid-feedback>度量名称不得为空</b-form-invalid-feedback>
              <b-form-input
                v-model="metric_info.description"
                type="text"
                placeholder="请输入度量说明（可选）"
                :style="style.up"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group label="度量图文件：" label-cols-md="3" label-align="right">
              <b-form-file
                v-model="file"
                placeholder="请选择或拖动文件"
                drop-placeholder="请拖动至此处"
                browse-text="浏览"
              ></b-form-file>
            </b-form-group>
          </b-col>
        </b-row>
      </b-form>
    </b-modal>

    <b-card
      v-for="metric in metrics.slice(currentPage*perPage-perPage, currentPage*perPage)"
      :key="metric.name"
      :title="metric.name"
      class="mb-4 shadow-sm"
    >
      <b-row>
        <b-col>度量说明：{{metric.description}}</b-col>
      </b-row>
      <b-row>
        <b-col>
          度量图文件:
          <b-button
            size="sm"
            @click="download(metric.url)"
            variant="outline-primary"
            :style="style.methodBtn"
          >下载</b-button>
        </b-col>
      </b-row>
      <b-row v-show="isEditing" align-h="end" :style="style.up">
        <b-col lg="2" cols="3">
          <b-button
            block
            variant="outline-primary"
            @click="metric_info=JSON.parse(JSON.stringify(metric)); updateKey='put'; file=null; setIsUpdateDialogOpen(true)"
          >更新</b-button>
        </b-col>
        <b-col lg="2" cols="3">
          <b-button block variant="outline-danger" @click="deleteMetric([metric.id])">删除</b-button>
        </b-col>
      </b-row>
    </b-card>
    <b-pagination
      v-model="currentPage"
      :total-rows="metrics.length"
      :per-page="perPage"
      align="right"
      :style="style.pagination"
    ></b-pagination>
  </div>
</template>

<script>
import { download } from "@/utils/index";
import {
  closeDialog,
  closeUpdateDialog,
  setIsUpdateDialogOpen,
} from "@/utils/index";
import {
  postMetric,
  putMetric,
  getMetrics,
  deleteMetric,
} from "./manage_metrics";

export default {
  name: "ManageMetrics",
  data() {
    return {
      metric_info: {
        name: "",
        description: "",
      },
      file: null,
      perPage: 8,
      currentPage: 1,
      updateKey: "post",
      isEditing: false,
      style: {
        pagination: {
          marginTop: "20px",
        },
        down: {
          marginBottom: "20px",
        },
        up: {
          marginTop: "20px",
        },
        field_btn: {
          marginTop: "20px",
          marginRight: "10px",
        },
      },
      errors: "",
      metrics: [],
      is_dialog_open: false,
      dialog_content: "",
      is_update_dialog_open: false,
    };
  },
  computed: {
    updateDialogTitle: function () {
      if (this.updateKey == "put") {
        return "更新度量";
      }
      if (this.updateKey == "post") {
        return "新建度量";
      }
      return "Error";
    },
    updateMethod: function () {
      if (this.updateKey == "put") {
        return this.putMetric;
      }
      if (this.updateKey == "post") {
        return this.postMetric;
      }
      return "Error";
    },
  },
  methods: {
    postMetric,
    putMetric,
    getMetrics,
    deleteMetric,
    cleanForm: function () {
      this.metric_info = {
        name: "",
        description: "",
      };
      this.file = null;
    },
    closeDialog,
    closeUpdateDialog,
    setIsUpdateDialogOpen,

    download,
  },
  mounted() {
    console.log("mounte metrics");
    this.getMetrics();
  },
};
</script>