<template>
  <div class="overview">

    <el-tabs class="el-tab" v-model="editableTabsValue"
             editable
             @edit="handleTabsEdit">
      <!-- 总览页面 -->
      <el-tab-pane name="-1"
                   label="我的流程图"
                   :closable="false">
        <!-- <div class="overview-head">模型列表</div> -->
        <div class="overview-list">
          <div v-for="(item, index) in allFlowChartData"
               :key="index"
               class="overview-list-item">
            <flowchart-overview :key="item.reRender"
                                :chart-data="item.content"
                                :chart-name="item.name"
                                :chart-industry="item.industry"
                                :chart-status="item.status"
                                :chart-id="item.id"
                                @click-minimap="handleOpenExisting(item.id)"/>
          </div>
          <div style="position: absolute; left: 50%;top: 40%; transform: translate(-50%, -50%); text-align: center">
            <div class="overview-button">
              <el-button
                  class="add-button"
                  icon="el-icon-plus"
                  type="primary"
                  size="small"
                  @click="handleCreateNew"
              >新建流程图
              </el-button>
            </div>
            <div class="overview-tip">流程图绘制不支持本地缓存功能，请注意保存。</div>
          </div>

        </div>
      </el-tab-pane>

      <!-- 列表页面 -->
      <el-tab-pane name="0"
                   label="表格一览"
                   :closable="false">
        <div style="margin-bottom:20px; margin-top:27px">
          <!-- @click="downloadMirror" -->
          <el-button type="primary"
                     size="small"
                     style="font-size: 14px"
                     @click="downloadAIPMirror">
            下载AIP通用镜像
          </el-button>
          <span style="margin-left: 20px; font-size: 14px;">下载一次镜像，可用于本平台所有模型的本地部署</span>
        </div>

        <el-table
            style="width: auto"
            fit
            stripe
            highlight-current-row
            class="table"
            :data="allFlowChartData">

          <el-table-column label="ID"
                           prop="id"
                           align="left"
                           width="80">
          </el-table-column>

          <el-table-column label="流程图名称"
                           prop="name"
                           align="left">
          </el-table-column>

          <el-table-column label="行业方向"
                           prop="type"
                           align="left">
            <template slot-scope="{row}">
              <span>{{ keyToIndustry[row.industry].name }}</span>
            </template>
          </el-table-column>

          <el-table-column label="流程图状态"
                           align="left">
            <template slot="header">
              流程图状态&nbsp;&nbsp;
              <el-button icon="el-icon-refresh"
                         type="text"
                         style="padding: 0 12px"
                         circle
                         @click="getMyFlowcharts()"/>
            </template>

            <template slot-scope="{row}">
              <!-- <el-tag :type="row.status | statusFilter">
            {{ messageDict[row.status] }}
          </el-tag> -->
              <!--              <el-tag :type="row.is_completed | statusFilter">-->
              <!--                {{messageDict[row.is_completed]}}-->
              <!--              </el-tag>-->
              <el-tag :type="row.status | statusFilter">
                {{ messageDict[row.status + ""] }}
              </el-tag>
            </template>
          </el-table-column>

          <el-table-column label="操作"
                           align="left"
                           class-name="small-padding fixed-width">
            <template slot-scope="{row}">

              <el-tooltip class="item"
                          effect="dark"
                          content="打开流程图"
                          placement="bottom">
                <el-button size="medium"
                           type="warning"
                           style="margin-left:0px"
                           icon="el-icon-view"
                           circle
                           @click="handleOpenExisting(row.id)"/>
              </el-tooltip>

              <el-tooltip class="item"
                          effect="dark"
                          content="下载流程模型"
                          placement="bottom">
                <el-button size="medium"
                           type="success"
                           style="margin-left:15px"
                           icon="el-icon-download"
                           circle
                           :disabled="!row.is_completed"
                           @click="downloadModelZip(row.id)"/>
              </el-tooltip>

              <el-tooltip class="item"
                          effect="dark"
                          content="删除流程图"
                          placement="bottom">

                <el-popconfirm confirm-button-text='好的'
                               cancel-button-text='不用了'
                               icon="el-icon-info"
                               icon-color="red"
                               title="确定删除吗？"
                               @onConfirm="handleDeleteFlowchart(row.id)">
                  <el-button slot="reference"
                             size="medium"
                             type="danger"
                             style="margin-left:15px"
                             icon="el-icon-delete"
                             circle/>
                </el-popconfirm>

              </el-tooltip>

            </template>
          </el-table-column>

        </el-table>

      </el-tab-pane>

    </el-tabs>

    <el-dialog title="新的流程图名"
               :visible.sync="dialogVisible"
               class="add-modal"
               width="30%">

      <el-form ref="form"
               :model="newFlowchartForm"
               label-width="80px">
        <el-form-item label="流程图名">
          <el-input v-model="newFlowchartForm.name"
                    size="small"
                    placeholder="请输入名称，2-20个字符"></el-input>
        </el-form-item>
        <el-form-item label="行业方向">
          <el-select v-model="newFlowchartForm.industry"
                     size="small"
                     style="width: 100%;"
                     placeholder="选择行业应用方向">
            <el-option v-for="item in industries"
                       :key="item.key"
                       :label="item.name"
                       :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="预置模板">
          <el-select v-model="newFlowchartForm.task"
                     style="width: 100%;"
                     size="small"
                     placeholder="流程图模板">
            <el-option v-for="(value, key) in flowchartTemplates"
                       :key="key"
                       :label="value.name"
                       :value="key">
            </el-option>
          </el-select>
        </el-form-item>

      </el-form>

      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false"
                   size="small">取 消</el-button>
        <el-button type="primary"
                   @click="createNewChart"
                   size="small">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import {mapState, mapActions, mapMutations} from 'vuex'
import FlowchartOverview from '../flowchartOverview'
import {downloadMirror, downloadModel, deleteFlowchart} from '../api'
import flowchartTemplates from '../flowchart_template'
import {industries, keyToIndustry} from '../../welcome/industries'
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
      flowchartTemplates: flowchartTemplates,
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
      this.$store.dispatch('flowchart/getMyFlowcharts')
    },
    handleOpenExisting(id) {
      var index = this.allFlowChartData.findIndex((x) => {
        return x.id === id
      })

      let routeUrl = this.$router.resolve({
        name: 'Inspecting',
        params: {id: id},
      })
      //  console.log({ id: id, name: this.allFlowChartData[index].name })
      window.open(routeUrl.href, '_blank')
    },

    // 删除
    handleDeleteFlowchart(id) {
      deleteFlowchart({flowchartId: id}).then((res) => {
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
      // 打开对话框输入流程图名
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
    display: flex;
    flex-direction: column;
  }

  /deep/ .el-tabs__content {
    flex: 1;
  }

  /deep/ .el-tab-pane {
    height: 100%;
    position: relative;
  }


  /deep/ .el-tabs__header {
    margin: 0 0;
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
  margin: 20px 20px 60px 20px;

  .overview-list-item {
    display: inline-block;
    margin-right: 20px;
    margin-bottom: 20px;
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
  margin-bottom: 12px;
  font-size: 14px;
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

  /deep/ thead {
    line-height: 14px;
  }

  /deep/ th {
    background-color: rgba(248, 249, 249, 1) !important;
    color: rgba(38, 50, 56, 1);
    font-size: 14px;
    font-weight: 400;
    border: unset;
    padding: 10px 12px;
    border-bottom: 1px solid rgba(238, 242, 243, 1);

    .cell {
      line-height: 20px;
    }
  }

  /deep/ tbody td {
    height: 40px;
    line-height: 40px;
    padding: 0;
    color: rgba(73, 93, 103, 1);
    font-size: 14px;
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
}
</style>
