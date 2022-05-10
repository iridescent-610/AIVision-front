<template>
  <div class="app-container">
    <el-tabs tab-position="left" type="card">
      <el-tab-pane label="单张预测">

        <div style="font-size: 18px; margin-bottom: 20px">
          <el-button
            v-if="isCompleted"
            type="primary"
            style="margin-left: 30px"
            @click="downloadModelZip(flowchartId)"
          >
            下载模型
          </el-button>

          <el-button
            v-if="isCompleted"
            type="success"
            style="margin-left: 30px"
            @click="downloadMirror"
          >
            下载镜像
          </el-button>
        </div>



        <el-card style="margin-left: 30px; color: grey;">
          <div>
            <div style="margin-bottom: 10px">
              <span style="font-weight:bold; ">请求方式：</span>
              POST http://10.214.211.207:20167/aip
              </div>
            <div>
              <span style="font-weight:bold; ">请求参数：</span>
              {"image": base64_str}
            </div>
          </div>
        </el-card>

        <div style="margin: 2px 10px 0 10px">
          <!-- <div style="display: flex">
            <label style="width: 100px; margin-top: 6px; margin-left: 10px">
              <b>请求URL：</b>
            </label>
            <el-input
              placeholder="请输入部署好的服务请求url"
              v-model="demo_url"
            >
              <template slot="prepend">http://</template>
            </el-input>
          </div> -->

          <!-- aaaaa -->
          <div class="demo-block" linknav="true">
            <div class="demo-canvas-container">
              <el-upload
                name="imgUpload"
                class="avatar-uploader"
                action=""
                accept="image/jpeg,image/png,image/bmp"
                :auto-upload="false"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :on-error="handleAvatarError"
                :before-upload="beforeAvatarUpload"
                :on-change="onUploadChange"
              >
                <canvas
                  id="canvas1"
                  ref="canvas1"
                  width="500"
                  height="420"
                  class="el-icon-plus avatar-uploader-icon"
                />
              </el-upload>
              <div class="upload-notice">
                点击上传图片，支持PNG、JPG、JPEG、BMP，图片大小不超过4M。
              </div>
            </div>

            <!-- <div class="demo-result-container">
              <canvas id="canvas2"
                      ref="canvas2"
                      width="500"
                      height="420" />
            </div> -->

            <div class="textarea" style="width: 500px; height: 420px">
              <!-- <pre>{{ JSON.stringify(obj, null, 4)  }}</pre> -->
              <json-viewer
                :value="pred"
                :expand-depth="4"
                copyable
                sort
              ></json-viewer>
            </div>
          </div>
          <div style="text-align: center">
            <el-button
              style="margin-left: 10px"
              type="success"
              @click="submitUpload"
              >预测</el-button
            >
          </div>

          <!-- aaaa -->
        </div>
      </el-tab-pane>
      <el-tab-pane label="批量预测">
        <div style="font-size: 18px; margin-bottom: 20px">
          <el-button
            v-if="isCompleted"
            type="success"
            style="margin-left: 10px"
            @click="showCreateDialog"
          >
            创建预测任务
          </el-button>
          <div v-else style="margin-left: 10px; color: #ff0000">
            <!-- <el-alert
              title="请不要私自乱跳页面！"
              type="error"
              :show-icon="true"
              :closable="false"
            >
            </el-alert> -->
            <el-alert
              title=""
              type="error"
              :show-icon="true"
              :closable="false"
            >
            </el-alert>
          </div>
          <!-- @click="downloadMirror" -->
          <el-button
            v-if="isCompleted"
            type="primary"
            style="margin-left: 30px"
            @click="downloadModelZip(flowchartId)"
          >
            下载模型
          </el-button>
        </div>

        <el-table
          v-loading="listLoading"
          border
          fit
          stripe
          highlight-current-row
          style="width: 100%"
          :data="predictingTaskList"
        >
          <el-table-column label="ID" prop="id" align="left" width="80">
            <template slot-scope="{ row }">
              <span>{{ row.id }}</span>
            </template>
          </el-table-column>

          <el-table-column label="流程图名称" prop="type" align="left">
            <template slot-scope="{ row }">
              <span>{{ row.flowchartName }}</span>
            </template>
          </el-table-column>

          <el-table-column label="数据集名称" align="left">
            <template slot-scope="{ row }">
              <span>{{ row.datasetName }}</span>
            </template>
          </el-table-column>

          <el-table-column label="任务状态" align="left">
            <template slot="header">
              任务状态&nbsp;&nbsp;
              <el-button
                icon="el-icon-refresh"
                type="text"
                circle
                @click="getPredictingTaskList()"
              />
            </template>

            <template slot-scope="{ row }">
              <!-- <el-tag :type="row.status | statusFilter">
            {{ messageDict[row.status] }}
          </el-tag> -->
              <el-tag :type="row.status | statusFilter">
                {{ messageDict[row.status] }}
              </el-tag>
            </template>
          </el-table-column>

          <el-table-column
            label="操作"
            align="left"
            class-name="small-padding fixed-width"
          >
            <template slot-scope="{ row }">
              <el-tooltip
                class="item"
                effect="dark"
                content="下载数据集预测结果"
                placement="bottom"
              >
                <el-button
                  size="mini"
                  type="success"
                  style="margin-left: 0px"
                  icon="el-icon-download"
                  circle
                  :disabled="row.status !== 'Finished'"
                  @click="downloadFile(row.url)"
                />
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

    <el-dialog title="创建预测任务" :visible.sync="dialogFormVisible">
      <el-form
        ref="predictingTaskForm"
        :rules="predictingTaskFormRules"
        :model="predictingTaskForm"
        label-position="left"
        label-width="100px"
        style="margin-left: 50px; margin-right: 50px"
      >
        <el-form-item label="数据集" prop="datasetId">
          <el-select
            v-model="predictingTaskForm.datasetId"
            placeholder="请选择"
          >
            <el-option-group label="我的数据集">
              <el-option
                v-for="item in myDatasets"
                :key="item.id"
                :label="item.dataset_name"
                :value="item.id"
              />
            </el-option-group>
            <el-option-group label="公开数据集">
              <el-option
                v-for="item in publicDatasets"
                :key="item.id"
                :label="item.dataset_name"
                :value="item.id"
              />
            </el-option-group>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelCreatePredictingTask()"> 取消 </el-button>
        <el-button type="primary" @click="confirmCreatePredictingTask()">
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  fetchPredictingTasks,
  getMyDatasets,
  getPublicDatasets,
  createPredictingTask,
  getFlowchartDetails,
  downloadModel,
  //
  detectDemo,
} from "../api";
import JsonViewer from "vue-json-viewer";

import img_src from "./assets/plus.png";

const fakedata = [
  {
    id: 0,
    datasetName: "周凌志做的合同数据集1",
    status: "FINISHED",
    url: "http://grs.zju.edu.cn/attachments/2020-04/01-1587953565-206104.doc",
    flowchartName: "Default",
  },
  {
    id: 1,
    datasetName: "周凌志做的增值税发票数据集1",
    status: "FAILED",
    url: "http://grs.zju.edu.cn/attachments/2020-03/01-1583224849-204648.xls",
    flowchartName: "Default",
  },
  {
    id: 2,
    datasetName: "周凌志做的合同数据集2",
    status: "TRAINING",
    url: "http://file.cc98.org/v2-upload/cqwmxlrn.gif",
    flowchartName: "Default",
  },
  {
    id: 3,
    datasetName: "周凌志做的增值税发票数据集2",
    status: "WAITING",
    url: "http://grs.zju.edu.cn/attachments/2020-03/01-1583224849-204648.xls",
    flowchartName: "Default",
  },
  {
    id: 4,
    datasetName: "周凌志做的增值税发票数据集2",
    status: "INIT",
    url: "http://grs.zju.edu.cn/attachments/2020-03/01-1583224849-204648.xls",
    flowchartName: "Default",
  },
];

export default {
  filters: {
    statusFilter(status) {
      // if (status === "FINISHED") {
      //   return 'success'
      // } else if(status == "FAILED"){
      //   return 'danger'
      // } else if(status == "TRAINING"){
      //   return 'warning'
      // } else {
      //   return 'info'
      // }
      if (status === "Finished") {
        return "success";
      } else {
        return "info";
      }
    },
  },
  components: {
    JsonViewer,
  },
  mounted() {
    this.show_plus();
  },
  data() {
    return {
      flowchartId: parseInt(this.$route.params.id), // undefined,
      listLoading: true,
      predictingTaskList: null,
      dialogFormVisible: false,
      myDatasets: [],
      publicDatasets: [],
      predictingTaskForm: {
        flowchartId: parseInt(this.$route.params.id), // undefined,
        datasetId: null,
        // datasetName: null
      },
      predictingTaskFormRules: {
        datasetId: [
          { required: true, message: "dataset is required", trigger: "change" },
        ],
      },
      messageDict: {
        // INIT: "等待中",
        // WAITING: "等待中",
        // TRAINING: "进行中",
        // FINISHED: "已完成",
        // FAILED: "失败"
        Predicting: "进行中",
        Finished: "已完成",
      },
      isCompleted: false,

      flowchart_id: parseInt(this.$route.params.id),
      demo_url: "",
      demo_base64: "",

      pred: {},
    };
  },
  watch: {
    $route(to, from) {
      getFlowchartDetails({
        flowchart_id: parseInt(this.$route.params.id),
      }).then((res) => {
        this.isCompleted = res.data.data.is_completed;
        this.getPredictingTaskList();
        this.getDatasets();
        this.predictingTaskForm = {
          flowchartId: parseInt(this.$route.params.id),
          datasetId: null,
        };
        this.dialogFormVisible = false;
      });
    },
  },
  created() {
    getFlowchartDetails({ flowchart_id: parseInt(this.$route.params.id) }).then(
      (res) => {
        this.isCompleted = res.data.data.is_completed;
        this.getPredictingTaskList();
        this.getDatasets();
        this.predictingTaskForm = {
          flowchartId: parseInt(this.$route.params.id),
          datasetId: null,
        };
        this.dialogFormVisible = false;
      }
    );

    if (this.flowchart_id == 167) this.demo_url = "10.214.211.205:20167/aip";
    else if (this.flowchart_id == 168)
      this.demo_url = "10.214.211.205:20168/aip";
    else if (this.flowchart_id == 169)
      this.demo_url = "10.214.211.205:20169/aip";
  },
  methods: {
    getDatasets() {
      getMyDatasets()
        .then((res) => {
          this.myDatasets = res.data;

          getPublicDatasets()
            .then((res) => {
              this.publicDatasets = res.data;
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getPredictingTaskList() {
      var params = {
        flowchartId: parseInt(this.$route.params.id),
      };
      console.log(params);
      this.listLoading = true;
      fetchPredictingTasks(params)
        .then((response) => {
          this.predictingTaskList = response.data.data;

          setTimeout(() => {
            this.listLoading = false;
          }, 1.0 * 400);
        })
        .catch((err) => {
          console.log(err);
        });
      // this.listLoading = false
      // this.predictingTaskList = fakedata
    },
    showCreateDialog() {
      console.log(parseInt(this.$route.params.id));
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["predictingTaskForm"].clearValidate();
      });
    },
    cancelCreatePredictingTask() {
      this.dialogFormVisible = false;
    },
    confirmCreatePredictingTask() {
      this.$refs["predictingTaskForm"].validate((valid) => {
        if (valid) {
          const data = Object.assign({}, this.predictingTaskForm);
          console.log(data);

          createPredictingTask(data)
            .then((res) => {
              this.getPredictingTaskList();

              this.dialogFormVisible = false;
              this.$notify({
                title: "Success",
                message: "创建成功",
                type: "success",
                duration: 2000,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    },
    downloadModelZip(id) {
      let params = {
        flowchartId: id,
      };
      const loading = this.$loading({
        lock: true,
        text: "正在打包模型，请勿关闭页面",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });

      downloadModel(params)
        .then((res) => {
          loading.close();
          this.downloadFile(res.data.url, false);
          // var fileURL = window.URL.createObjectURL(new Blob([res.data]))
          // var fileLink = document.createElement('a')
          // fileLink.href = fileURL
          // fileLink.setAttribute('download', id + '.zip')
          // document.body.appendChild(fileLink)
          // fileLink.click()
        })
        .catch((err) => {
          console.log(err);
        });
    },
    downloadMirror(){
      const loading = this.$loading({
        lock: true,
        text: "正在准备下载镜像，请勿关闭页面",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      setTimeout(() => {
        loading.close();
        this.downloadFile("http://10.214.211.208:8002/wrapper/aix-deploy-1.7.tar", false);
      }, 2000);
    },
    async downloadFile(url, new_window = true) {
      if (new_window) {
        window.open(url, "_blank");
      } else {
        window.open(url);
      }

      this.$message({
        title: "Success",
        message: "下载成功",
        type: "success",
        duration: 2000,
      });
      // //下载为json文件
      // var a = document.createElement('a');
      // const e = document.createEvent('MouseEvents')
      // a.download = 'result.json'
      // a.style.display = 'none';
      // // 字符内容转变成blob地址
      // // var blob = new Blob([js]);
      // a.href = url
      // a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
      // e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
      // a.dispatchEvent(e)
    },
    ///////////////////demo
    show_plus() {
      let canvas = this.$refs.canvas1;
      let ctx = canvas.getContext("2d");
      let img = new Image();

      // if(img.complete) { // 如果图片已经存在于浏览器缓存，直接调用回调函数
      //   ctx.drawImage(img, canvas.width / 2 - w / 2, canvas.height / 2 - h / 2, w, h)
      //   return; // 直接返回，不用再处理onload事件
      // }
      img.src = img_src;

      img.onload = function () {
        let w = 0.2 * img.width;
        let h = 0.2 * img.height; //这里的坑 获取图像高度要在加载完图像之后！
        ctx.drawImage(
          img,
          canvas.width / 2 - w / 2,
          canvas.height / 2 - h / 2,
          w,
          h
        );
      };
    },
    handleAvatarError(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      const canvas = document.getElementById("canvas1");
      var ctx = canvas.getContext("2d");
      var img = new Image();

      img.onload = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        var sw = img.width / canvas.width;
        var sh = img.height / canvas.height;
        var hh = img.height;
        var ww = img.width;
        if (sw > sh && sw > 1) {
          hh = img.height / sw;
          ww = canvas.width;
        } else if (sh > sw && sh > 1) {
          ww = img.width / sh;
          hh = canvas.height;
        }
        // var ww = img.width*canvas.height/img.height
        ctx.drawImage(
          img,
          canvas.width / 2 - ww / 2,
          canvas.height / 2 - hh / 2,
          ww,
          hh
        );
      };
      img.src = this.imageUrl;
      // ctx.fillStyle = 'black'
      // ctx.font = '20px Georgia'
      this.$message.error("上传失败!");
    },
    handleAvatarSuccess(res, file) {
      console.log(res.data.aa);
      // this.imageUrl = URL.createObjectURL(file.raw)
      // const canvas = document.getElementById('canvas1')
      // var ctx = canvas.getContext('2d')
      // var img = new Image()

      // img.onload = function () {
      //   ctx.clearRect(0, 0, canvas.width, canvas.height)
      //   var sw = img.width / canvas.width
      //   var sh = img.height / canvas.height
      //   var hh = img.height
      //   var ww = img.width
      //   if (sw > sh && sw > 1) {
      //     hh = img.height / sw
      //     ww = canvas.width
      //   } else if (sh > sw && sh > 1) {
      //     ww = img.width / sh
      //     hh = canvas.height
      //   }
      //   // var ww = img.width*canvas.height/img.height
      //   ctx.drawImage(
      //     img,
      //     canvas.width / 2 - ww / 2,
      //     canvas.height / 2 - hh / 2,
      //     ww,
      //     hh
      //   )
      // }
      // img.src = this.imageUrl
      // ctx.fillStyle = 'black'
      // ctx.font = '20px Georgia'
      this.$message("上传成功!");
    },
    beforeAvatarUpload(file) {
      const isImage =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/bmp";
      const isLt4M = file.size / 1024 / 1024 < 4;

      if (!isImage) {
        this.$message.error("上传格式必须为图片!");
      }
      if (!isLt4M) {
        this.$message.error("上传图片大小不能超过4MB!");
      }
      return isImage && isLt4M;
    },
    onUploadChange(file, fileList) {
      // const isIMAGE = (file.raw.type === 'image/jpeg' || file.raw.type === 'image/png');
      // const isLt1M = file.size / 1024 / 1024 < 1;

      // if (!isIMAGE) {
      //   this.$message.error('Only upload jpg/png picture!');
      //   return false;
      // }
      // if (!isLt1M) {
      //   this.$message.error('Upload file size cannot exceed 1 MB!');
      //   return false;
      // }
      ////
      this.pred = {};

      var This = this;
      var reader = new FileReader();
      reader.readAsDataURL(file.raw);
      reader.onload = function (e) {
        console.log(this.result); //base64 data for pictures
        This.demo_base64 = this.result;
      };
      /////////////////////////////
      this.imageUrl = URL.createObjectURL(file.raw);
      const canvas = document.getElementById("canvas1");
      var ctx = canvas.getContext("2d");
      var img = new Image();

      img.onload = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        var sw = img.width / canvas.width;
        var sh = img.height / canvas.height;
        var hh = img.height;
        var ww = img.width;
        if (sw > sh && sw > 1) {
          hh = img.height / sw;
          ww = canvas.width;
        } else if (sh > sw && sh > 1) {
          ww = img.width / sh;
          hh = canvas.height;
        }
        // var ww = img.width*canvas.height/img.height
        ctx.drawImage(
          img,
          canvas.width / 2 - ww / 2,
          canvas.height / 2 - hh / 2,
          ww,
          hh
        );
      };
      img.src = this.imageUrl;
      //////
      const canvas2 = document.getElementById("canvas2");
      const context2 = canvas2.getContext("2d");
      context2.clearRect(0, 0, canvas2.width, canvas2.height);
    },
    submitUpload() {
      var data = {
        image: this.demo_base64,
      };
      if (!this.demo_url) {
        this.$message.error("请输入请求url!");
        return;
      }
      // detectDemo('http://' + this.demo_url, data).then((res) => {
      //   const pred = res.data.result

      //   const canvas = document.getElementById('canvas2')
      //   var ctx = canvas.getContext('2d')
      //   var img = new Image()

      //   img.onload = function () {
      //     ctx.clearRect(0, 0, canvas.width, canvas.height)
      //     var sw = img.width / canvas.width
      //     var sh = img.height / canvas.height
      //     var hh = img.height
      //     var ww = img.width
      //     if (sw > sh && sw > 1) {
      //       hh = img.height / sw
      //       ww = canvas.width
      //     } else if (sh > sw && sh > 1) {
      //       ww = img.width / sh
      //       hh = canvas.height
      //     }
      //     // var ww = img.width*canvas.height/img.height
      //     ctx.drawImage(
      //       img,
      //       canvas.width / 2 - ww / 2,
      //       canvas.height / 2 - hh / 2,
      //       ww,
      //       hh
      //     )
      //   }
      //   img.src = pred
      // })
      detectDemo("http://" + this.demo_url, data).then((res) => {
        this.pred = res.data;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.app-container {
  margin: 0 50px 0 50px;
}
</style>



<style  scoped>
canvas {
  display: block;
  /* float: left; */
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 500px;
  height: 420px;
  line-height: 420px;
  text-align: center;
}
.avatar {
  width: 500px;
  height: 420px;
  display: block;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.demo-block {
  width: 1120px;
  margin: 30px auto;
  padding-top: 20px;

  display: flex;
  /* text-align: center; */

  margin-bottom: 60px;
}

.demo-canvas-container {
  position: relative;
  width: 500px;
  height: 420px;
  margin-right: 60px;
  background: #a4a4a4;
}
.demo-result-container {
  position: relative;
  width: 500px;
  height: 420px;
  background: #f7f6f6;
  margin-left: 60px;

  outline: 2px solid #000000;
  /* border-style: solid;
  border-width: 2px;
  border-color: #000000; */
}
.upload-notice {
  margin-top: 8px;
  color: #000;
  font-size: 16px;
  text-align: center;
}

.textarea {
  width: 100%;
  min-height: 20px;
  /* 	max-height: 300px; */
  _height: 120px;
  margin-left: auto;
  margin-right: auto;
  padding: 3px;
  outline: 0;
  border: 1px solid #a0b3d6;
  font-size: 12px;
  line-height: 24px;
  padding: 2px;
  word-wrap: break-word;
  overflow-x: hidden;
  overflow-y: auto;
  border-color: rgba(82, 168, 236, 0.8);
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1),
    0 0 8px rgba(82, 168, 236, 0.6);
}
</style>

