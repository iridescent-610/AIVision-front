<template>
  <div class="overview">

    <el-tabs class="el-tab" v-model="editableTabsValue">
      <!-- 总览页面 -->
      <el-tab-pane name="-1" label="我的流程图" :closable="false">
        <div>
          <div class="overview-button">
            <el-button class="add-button" icon="el-icon-plus" type="primary" size="small" @click="handleCreateNew">新建流程图
            </el-button>
          </div>
          <!-- <div class="overview-tip">流程图绘制不支持本地缓存功能，请注意保存。</div> -->
        </div>
        <div class="overview-list">
          <div v-for="(item, index) in allFlowChartData" :key="index" class="overview-list-item">
            <flowchart-overview :key="item.reRender" :chart-data="item.content" :chart-name="item.name"
              :chart-industry="item.industry" :chart-status="item.status" :chart-id="item.id"
              @click-minimap="handleOpenExisting(item.id)" />
          </div>
        </div>
      </el-tab-pane>



      <!-- 列表页面 -->
      <el-tab-pane name="0" label="表格一览" :closable="false">
        <!-- <div style="margin-bottom:20px; margin-top:27px">
          <el-button type="primary" size="small" style="font-size: 14px" @click="downloadAIPMirror">
            下载AIP通用镜像
          </el-button>
          <span style="margin-left: 20px; font-size: 14px;">下载一次镜像，可用于本平台所有模型的本地部署</span>
        </div> -->

        <el-table v-loading="listLoading" style="width: auto" fit stripe highlight-current-row class="table"
          :data="allFlowChartData.slice((currentPage - 1) * perPage, currentPage * perPage)" :current-page="currentPage"
          :per-page="perPage">
          <el-table-column label="ID" prop="id" align="left" width="80">
          </el-table-column>

          <el-table-column label="流程图名称" prop="name" align="left">
          </el-table-column>

          <el-table-column label="行业方向" prop="type" align="left">
            <template slot-scope="{row}">
              <span>{{ keyToIndustry[row.industry].name }}</span>
            </template>
          </el-table-column>

          <el-table-column label="流程图状态" align="left">
            <template slot="header">
              流程图状态&nbsp;&nbsp;
              <el-button icon="el-icon-refresh" type="text" style="padding: 0 12px" circle @click="getMyFlowcharts()" />
            </template>

            <template slot-scope="{row}">
              <div style="display: flex; align-items: center;">
                <span v-if="row.status === 0" style="color: #e6a23c; margin-right: 8px;">
                  <svg-icon style="width: 20px;height: 20px;" svg-name="loading_icon" />
                </span>
                <span v-if="row.status === 1" style="color: rgba(67, 160, 71, 1); margin-right: 8px;">
                  <svg-icon style="width: 20px;height: 20px;" svg-name="success_icon" />
                </span>
                <span v-if="row.status === 2" style="color: rgba(183, 28, 28, 1); margin-right: 8px;">
                  <svg-icon style="width: 20px;height: 20px;" svg-name="failed_icon" />
                </span>
                <span v-if="row.status === 3" style="color: rgba(73, 93, 103, 1); margin-right: 8px;">
                  <svg-icon style="width: 20px;height: 20px;" svg-name="loading_icon" />
                </span>

                <span v-if="row.status === 0" style="color: #495D67">{{ messageDict[row.status] }}</span>
                <span v-if="row.status === 1" style="color: #495D67">{{ messageDict[row.status] }}</span>
                <span v-if="row.status === 2" style="color: #495D67">{{ messageDict[row.status] }}</span>
                <span v-if="row.status === 3" style="color: #495D67">{{ messageDict[row.status] }}</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="操作" align="left" class-name="small-padding fixed-width">
            <template slot-scope="{row}">

              <el-button size="sm" type="text" class="action-button" @click="handleOpenExisting(row.id)">查看
              </el-button>
              <el-button size="sm" type="text" class="action-button" :disabled="!row.is_completed"
                @click="downloadModelZip(row.id)">下载
              </el-button>
              <el-button size="sm" type="text" style="color: rgba(183, 28, 28, 1)" class="action-button"
                slot="reference" @click="handleDeleteFlowchart(row.id)">
                删除</el-button>

              <!-- <el-tooltip class="item" effect="dark" content="打开流程图" placement="bottom">
                  <el-button size="medium" type="warning" style="margin-left:0px" icon="el-icon-view" circle
                    @click="handleOpenExisting(row.id)" />
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="下载流程模型" placement="bottom">
                  <el-button size="medium" type="success" style="margin-left:15px" icon="el-icon-download" circle
                    :disabled="!row.is_completed" @click="downloadModelZip(row.id)" />
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="删除流程图" placement="bottom">
                  <el-popconfirm confirm-button-text='好的' cancel-button-text='不用了' icon="el-icon-info" icon-color="red"
                    title="确定删除吗？" @onConfirm="handleDeleteFlowchart(row.id)">
                    <el-button slot="reference" size="medium" type="danger" style="margin-left:15px"
                      icon="el-icon-delete" circle />
                  </el-popconfirm>
                </el-tooltip> -->
            </template>
          </el-table-column>
        </el-table>
        <b-pagination v-model="currentPage" :total-rows="allFlowChartData.length" :per-page="perPage" align="right"
          :style="style.pagination" class="pagination"></b-pagination>
      </el-tab-pane>
    </el-tabs>

    <el-dialog title="新的流程图名" :visible.sync="dialogVisible" class="add-modal">

      <el-form ref="form" :model="newFlowchartForm">
        <el-form-item label="流程图名">
          <el-input v-model="newFlowchartForm.name" size="small" placeholder="请输入名称，2-20个字符"></el-input>
        </el-form-item>
        <el-form-item label="行业方向">
          <el-select v-model="newFlowchartForm.industry" size="small" style="width: 100%;" placeholder="选择行业应用方向">
            <el-option v-for="item in industries" :key="item.key" :label="item.name" :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="预置模板">
          <el-select v-model="newFlowchartForm.task" style="width: 100%;" size="small" placeholder="流程图模板">
            <el-option v-for="(value, key) in flowchartTemplates" :key="key" :label="value.name" :value="key">
            </el-option>
          </el-select>
        </el-form-item>

      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="createNewChart" size="small">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import FlowchartOverview from '../flowchartOverview'
import { downloadMirror, downloadModel, deleteFlowchart } from '../api'
import flowchartTemplates from '../flowchart_template'
import { industries, keyToIndustry } from '../../welcome/industries'
import _ from 'lodash'

export default {
  name: 'MyFlowcharts',
  components: {
    FlowchartOverview,
  },
  filters: {
    statusFilter(status) {
      // 0 未完成，1已经完成，2 有错误发生
      if (status === 1) {
        return 'success'
      } else if (status === 0) {
        return 'info'
      } else if (status === 2) {
        return "danger"
      } else if (status === 3) {
        return "warning"
      }
    },
  },
  data() {
    return {
      perPage: 8,
      currentPage: 1,
      style: {
        pagination: {
          marginTop: "20px",
        },
      },
      flowchartTemplates: flowchartTemplates,
      listLoading: false,
      industries: industries,
      keyToIndustry: keyToIndustry,
      newFlowchartForm: {
        task: 'empty',
        industry: 'general',
        name: '',
      },
      dialogVisible: false,
      editableTabsValue: '-1',
      messageDict: {
        true: '已完成',
        false: '训练中',
        0: "训练中",
        1: "已完成",
        2: "训练出错",
        3: "等待训练资源"
      },
    }
  },

  mounted() {
    this.$store.dispatch('flowchart/getMyFlowcharts')
  },

  computed: {
    ...mapState('flowchart', {
      allFlowChartData: (state) => state.my_flowcharts,
    }),
  },

  methods: {
    downloadAIPMirror() {
      // downloadMirror
    },
    downloadModelZip(id) {
      let params = {
        flowchartId: id,
      }
      const loading = this.$loading({
        lock: true,
        text: '正在打包模型，请勿关闭页面',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })

      downloadModel(params)
        .then((res) => {
          loading.close()
          this.downloadFile(res.data.url)
          // var fileURL = window.URL.createObjectURL(new Blob([res.data]))
          // var fileLink = document.createElement('a')
          // fileLink.href = fileURL
          // fileLink.setAttribute('download', id + '.zip')
          // document.body.appendChild(fileLink)
          // fileLink.click()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    async downloadFile(url) {
      window.open(url)
      this.$message({
        title: 'Success',
        message: '下载成功',
        type: 'success',
        duration: 2000,
      })
    },
    getMyFlowcharts() {
      this.listLoading = true;
      this.$store.dispatch('flowchart/getMyFlowcharts');
      setTimeout(() => {
        this.listLoading = false;
      }, 1.0 * 400);
    },
    handleOpenExisting(id) {
      var index = this.allFlowChartData.findIndex((x) => {
        return x.id === id
      })

      let routeUrl = this.$router.resolve({
        name: 'Inspecting',
        params: { id: id },
      })
      //  console.log({ id: id, name: this.allFlowChartData[index].name })
      window.open(routeUrl.href, '_blank')
    },

    // 删除
    handleDeleteFlowchart(id) {
      deleteFlowchart({ flowchartId: id }).then((res) => {
        this.$message({
          title: 'Success',
          message: '删除成功',
          type: 'success',
          duration: 2000,
        })
      })
      this.getMyFlowcharts()
    },

    // 生成id
    genID(length) {
      return Number(
        Math.random().toString().substr(3, length) + Date.now()
      ).toString(36)
    },
    createNewChart() {
      if (
        this.newFlowchartForm.name &&
        this.newFlowchartForm.name.length >= 2 &&
        this.newFlowchartForm.name.length <= 20
      ) {
        this.dialogVisible = false
        this.$router.push({
          name: 'Flowcharting',
          query: this.newFlowchartForm,
        })
      } else {
        this.$message({
          message: '名称不符合要求，长度须在2-20之间',
          type: 'error',
          duration: 2000,
        })
      }
    },
    handleCreateNew() {
      // 新建流程图弹窗
      this.dialogVisible = true
    },
    handleTabsEdit(targetName, action) {
      if (action === 'add') {
        this.handleCreateNew()
      }
    },
  },
}
</script>

<style lang="less" scoped>
.overview {
  height: 100%;

  /deep/ .el-tabs {
    height: 100%;
    // display: flex;
    // flex-direction: column;
  }

  /deep/ .el-tabs__content {
    flex: 1;
  }

  /deep/ .el-tab-pane {
    height: 100%;
    position: relative;
  }


  /deep/ .el-tabs__header {
    margin: 0 0 24px;
  }

  /deep/ #tab--1 .el-icon-close {
    display: none;
  }

  /deep/ #tab-0 .el-icon-close {
    display: none;
  }

  /deep/ .el-dialog__body {
    padding: 10px 20px;
  }
}

.overview-list {
  margin-top: 24px;

  .overview-list-item {
    display: inline-block;
    margin-right: 24px;
    margin-bottom: 24px;
  }
}

.overview-head {
  color: #aaa;
  font-weight: bold;
  margin: 0 0 20px 0;
}

.flowchart-col {
  min-width: 340px;
}

.overview-tip {
  color: grey;
  font-size: 12px;
  color: rgba(69, 90, 100, 0.65);
}

.add-button {
  font-size: 14px;
  border: unset;
}

.table {
  border: 1px solid rgba(207, 216, 220, 1);
  border-radius: 4px;

  &:before {
    content: unset;
  }

  &:after {
    content: unset;
  }

  /deep/ table {
    border: unset !important;
  }

  /deep/ th {
    vertical-align: middle;
    background-color: rgba(248, 249, 249, 1) !important;
    color: rgba(38, 50, 56, 1);
    font-size: 14px;
    font-weight: 500;
    padding: 8px 12px;
    border-bottom: 1px solid rgba(238, 242, 243, 1);

    .cell {
      line-height: 20px;
      padding: 0;
    }
  }

  /deep/ td {
    vertical-align: middle;
    background-color: white !important;
    color: rgba(73, 93, 103, 1);
    font-size: 14px;
    font-weight: 400;
    padding: 1px 12px;
    border-bottom: 1px solid rgba(238, 242, 243, 1);

    .cell {
      line-height: 20px;
      padding: 0;
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
  }
}

.el-tab {
  /deep/ .el-tabs__item {
    font-size: 18px;
    color: rgba(69, 90, 100, 0.65);
    font-weight: 400;

    &.is-active {
      color: rgba(25, 118, 210, 1);
    }
  }
}

.add-modal {
  /deep/ .el-form-item {
    margin-bottom: 0;
  }

  /deep/ .el-dialog {
    width: 556px;
    border-radius: 8px;
  }

  /deep/ .el-dialog__header {
    padding: 24px;
  }

  /deep/ .el-dialog__headerbtn {
    display: none;
  }

  /deep/ .el-dialog__title {
    font-size: 20px;
    color: black;
  }

  /deep/ .el-dialog__body {
    padding: 0 24px;
  }

  /deep/ .el-form-item .el-form-item__content {
    display: inline-block;
    line-height: 32px;
    margin-bottom: 24px;
    // color: black;
  }

  /deep/ .el-form-item__label {
    color: rgba(38, 50, 56, 1);
    padding: 0;
    line-height: 32px;
    margin: 0;
    width: 58px;
    text-align: left;
  }

  /deep/ .el-form-item__content {
    color: rgba(73, 93, 103, 1);
    margin-left: 24px;
    width: 426px;
  }

  /deep/ .el-dialog__footer {
    height: 72px;
    padding: 0 24px 24px;
    position: relative;
  }

  /deep/ .el-button {
    text-align: center;
    width: 52px;
    height: 32px;
    padding: 6px 12px;

    .span {
      width: 28px;
      height: 20px;
    }
  }

  /deep/ .el-button--default {
    position: absolute;
    bottom: 24px;
    right: 84px;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(207, 216, 220, 1);

    .span {
      color: rgba(69, 90, 100, 1);
    }
  }

  /deep/ .el-button--primary {
    position: absolute;
    bottom: 24px;
    right: 24px;
    background: rgba(25, 118, 210, 1);

    .span {
      color: white;
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
</style>
