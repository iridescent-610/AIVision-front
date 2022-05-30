<template>
  <vue-flowchart-editor ref="flowChart"
                        class="vue-flowchart-editor">
    <div class="vfe-chart">
      <!-- Top Menu -->
      <div class="vfe-chart-header">
        <editor-toolbar :chart-data="flowChartData"
                        :read-only="readOnly"
                        @load-data="loadChartData" />
      </div>
      <div class="vfe-chart-container">
        <!-- Left Items -->
        <div class="vfe-chart-sidebar">
          <editor-item-panel v-if="!readOnly"
                             :node-items="flowChartNodeItems" />
          <!-- 这里添加预测操作面板 -->
          <predicting-panel v-if="readOnly"
                            :chart-id="chartId"
                            :is-completed="isCompleted" />
        </div>
        <!-- Main Chart -->
        <div class="vfe-chart-main">
          <flow :data="flowChartData"
                :on-click="handleClick"
                :on-node-click="handleNodeClick"
                :on-node-double-click="handleNodeDoubleClick"
                :on-node-mouse-leave="handleNodeMouseLeave"
                :on-after-change="handleAfterChange"
                :on-after-item-selected="handleAfterItemSelected"
                :on-before-change="handleBeforeChange"
                :on-context-menu="handleContextMenu"
                :on-mouse-up="handleMouseUp"
                :graph="graphConfig" />
          <div class="tooltip">
            <template v-for="item in tooltipData">
              <p :key="item.name">{{ item.name }}: {{ item.value }}</p>
            </template>
          </div>
        </div>
        <!-- Right Panel -->

        <!-- <el-collapse>
          <el-collapse-item>
            <template slot="title">
              模型信息
            </template>
            <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
            <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
          </el-collapse-item>
          <el-collapse-item>
            <template slot="title">
              缩略图
            </template>
            <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
            <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
          </el-collapse-item>
        </el-collapse> -->

        <div class="vfe-chart-panel">
          <div class="vfe-chart-panel-detail" v-show="showEditorDetailPanel">
            <editor-detail-panel :read-only="readOnly"
                                 :industry="industry" />
          </div>
          <div class="vfe-chart-panel-minimap">
            <editor-minimap />
          </div>
        </div>
      </div>
    </div>
    <!-- Mouse Right Button Context Menu -->
    <editor-context-menu v-if="!readOnly" />
    <register-edge name="custom-polyline"
                   extend="flow-polyline"
                   :config="customEdgeConfig" />
    <custom-command :load="loadChartData"
                    :save="saveChartData"
                    :download="downloadImage"
                    :upload="uploadServer" />
  </vue-flowchart-editor>
</template>

<script>
import './iconfont'
import { mapState } from 'vuex'
import VueFlowchartEditor, { Flow, RegisterEdge } from 'vue-flowchart-editor'
import EditorToolbar from './components/Toolbar'
import EditorItemPanel from './components/ItemPanel'
import PredictingPanel from './components/PredictingPanel'
import EditorDetailPanel from './components/DetailPanel'
import EditorMinimap from './components/EditorMinimap'
import EditorContextMenu from './components/ContextMenu'
import CustomCommand from './components/CustomCommand'
import { throttle } from 'lodash'
import cloneDeep from 'lodash/cloneDeep'
import { colorDict } from './modelNodeItems'

export default {
  name: 'FlowchartEditor',

  components: {
    VueFlowchartEditor,
    Flow,
    EditorToolbar,
    EditorItemPanel,
    PredictingPanel,
    EditorDetailPanel,
    EditorMinimap,
    EditorContextMenu,
    CustomCommand,
    RegisterEdge,
  },

  props: {
    readOnly: {
      type: Boolean,
      default: false,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    toggleReadOnly: {
      type: Boolean,
      default: true,
    },
    chartId: {
      type: Number,
      default: -1,
    },
    chartData: {
      type: Object,
      default: null,
    },
    chartDataNodeItems: {
      type: Object,
      default: null,
    },
    industry: {
      type: String,
      default: 'general',
    },
    // saveData: {
    //   type: Function,
    //   default: null
    // },
    // loadData: {
    //   type: Function,
    //   default: null
    // }
  },

  data() {
    return {
      flowChartData: this.chartData,
      flowChartNodeItems: this.chartDataNodeItems,
      graphConfig: {
        mode: 'readOnly',
      },
      customEdgeConfig: {
        getActivedStyle(/* item*/) {
          return {
            lineWidth: 3,
          }
        },
        getSelectedStyle(/* item*/) {
          return {
            lineWidth: 3,
          }
        },
      },
      tooltipDom: null,
      tooltipShow: true,
      tooltipData: [],
      colorDict: colorDict,
      showEditorDetailPanel: false,
    }
  },

  computed: {
    ...mapState('flowchart', {
      nodeList: (state) => state.errorNodeList,
      edgeList: (state) => state.errorEdgeList,
    }),
  },
  mounted() {
    this.tooltipDom = document.getElementsByClassName('tooltip')[0]
  },

  // beforeDestroy() {
  //   console.log('beforeDestroy-flowchartEditor')
  // },

  methods: {
    // ...mapMutations('flowchart', [
    //   'updateChartMeta', 'updateChartData', 'updateSource' // 将 `this.updateUploadForm()` 映射为 `this.$store.commit('updateUploadForm')`
    // ]),
    handleClick(e) {
      // console.log(e)
      if (this.readOnly && !e.item) {
        // this.tooltipDom.style.display = 'none'
      }
    },

    handleNodeClick(e) {
      // console.log(e)
    },

    handleContextMenu(e) {
      if (this.readOnly) {
        console.log('right-click')
        return false
      }
    },

    handleNodeDoubleClick(e) {
      // console.log(this.tooltipData)

      if (this.readOnly) {
        // 只读模式下可以双击打开这个节点的单独页面

        const { item } = e

        if (item && item.getModel) {
          const model = item.getModel()

          if (model.kind === 'Algorithm') {
            console.log('流程图id: ' + this.chartId)
            console.log('节点id: ' + model.id)

            let routeUrl = this.$router.resolve({
              name: 'Multiple Task',
              params: { flowchart_id: this.chartId, node_id: model.id },
            })

            window.open(
              routeUrl.href, // 'https://www.baidu.com/',
              '_blank' // <- This is what makes it open in a new window.
            )
          }
        }

        // this.tooltipData = e.item.model.data
        // this.$nextTick(() => {
        //   this.tooltipDom.style.left = e.domX + 'px'
        //   this.tooltipDom.style.top = e.domY + 'px'
        //   this.tooltipDom.style.display = 'block'
        // })
      }
    },

    handleNodeMouseLeave: throttle(
      function () {
        // if (this.readOnly) {
        //   console.log(e)
        //   this.tooltipDom.style.display = 'none'
        // }
      },
      1000,
      {
        leading: false,
        trailing: true,
      }
    ),

    handleBeforeChange(e) {
      // console.log('aaa')
      // return false
    },

    handleAfterChange(e) {
      if (!this.readOnly) {
        const { action, item } = e
        // console.log(action)
        if (item && item.getModel) {
          const model = item.getModel()
          // console.log('发生更改')
          // console.log(model)
        }
        // 可以根据 action 和 model 来决定是否删掉左侧用过的节点
        // 更改过以后马上保存
        // this.updateChartData(this.$refs.flowChart.propsAPI.save())
      }
    },

    handleAfterItemSelected(e) {
      this.showEditorDetailPanel = !!e.item;
      // console.log(e)
      const { executeCommand, update } = this.$refs.flowChart.propsAPI
      const { item } = e
      // 貌似只有在非只读模式下才能被选中
      if (item && item.getModel && !this.readOnly) {
        const model = item.getModel()
        // / 点击后恢复初始颜色
        model.color = this.colorDict[model.kind]
        executeCommand(() => {
          update(item, model)
        })
      }
    },

    handleMouseUp(e) {
      this.showEditorDetailPanel = !!e.item;
    },

    loadChartData(data) {
      this.$refs.flowChart.propsAPI.read(JSON.parse(data))
    },

    saveChartData(data) {
      this.$emit('save-data', data)
    },
    // _downloadImage(data, filename = 'flowchart.png') {
    //   const a = document.createElement('a')
    //   a.href = data
    //   a.download = filename
    //   document.body.appendChild(a)
    //   a.click()
    // },
    downloadImage() {
      const page = this.$refs['flowChart'].propsAPI.editor.getCurrentPage()
      // console.log(page)
      const data = page.saveImage().toDataURL('image/png')
      this.$emit('save-image', data)
      // this._downloadImage(page.saveImage().toDataURL('image/png'))
    },

    uploadServer(data) {
      // console.log('uploadServer')
      // 将所有上次标红的节点恢复到默认颜色
      if (data.nodes) {
        data.nodes.forEach((node) => {
          node.color = this.colorDict[node.kind]
        })
      }

      if (data.edges) {
        data.edges.forEach((edge) => {
          delete edge.color
        })
      }
      this.$refs.flowChart.propsAPI.read(data)
      this.$emit('upload-server', data)
    },

    changeStyle(nodeList = ['e4567062'], edgeList = ['074640ca']) {
      const { find, executeCommand, update } = this.$refs.flowChart.propsAPI
      // 在错误尝试后标红发生错误的节点
      nodeList.concat(edgeList).forEach((id) => {
        const item = find(id)
        const newFormModel = Object.assign({}, item.model)
        newFormModel.color = '#FF0000'

        executeCommand(() => {
          update(item, newFormModel)
        })
      })
    },
  },
}
</script>

<style lang="less">
.vue-flowchart-editor {
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: #fff;
}

.vfe-chart {
  position: relative;
  width: 100%;
  height: 100%;
  //height: 90vh;
  display: flex;
  flex-direction: column;

  .vfe-chart-header {
    position: relative;
    border: 1px solid #e6e9ed;
    padding: 0 0 15px 0;
  }

  .vfe-chart-container {
    position: relative;
    flex: 1;
    display: flex;
    height: 100%;
    // width: 100%;

    .vfe-chart-main {
      // position: relative;
      // width: 100%;
      flex: 1;
      // max-height: ~'calc(100% - 5px)'; // fix scroll show
      //max-height: 100%;
      max-height: 100%;
      .tooltip {
        position: relative;
        display: none;
        top: 0;
        left: 0;
        width: 100px;
        height: auto;
        padding: 15px;
        border-radius: 10px;
        z-index: 999;
        opacity: 0.8;
        color: #ffffff;
        font-size: 12px;
        background-color: #000;

        p {
          margin: 0;
        }
      }
    }

    .vfe-chart-sidebar {
      position: relative;
      // display: flex;
      justify-content: center;
      width: 220px;
      height: 100%; //
      // padding-top: 10px;
      background-color: #fafafa;
      border-right: 1px solid #e6e9ed;
      overflow-y: auto;
    }

    .vfe-chart-panel {
      position: relative;
      width: 320px;
      height: 100%; //
      background-color: #fafafa;
      border-left: 1px solid #e6e9ed;

      .vfe-chart-panel-detail {
        box-sizing: border-box;
        position: relative;
        // top: 20px;
        // bottom: 20px;
        width: 320px;
        // padding: 5px 10px;
        //height: ~'calc(100% - 250px)';
        height: ~'calc(100% - 220px)';
        overflow-y: auto;
      }

      .vfe-chart-panel-minimap {
        position: relative;
        top: 0px;
        bottom: 20px;
        width: 320px;
        height: 200px;
        border-top: 1px solid #e6e9ed;
      }
    }
  }
}
</style>

<style lang="less">
.my-collapse {
  .el-collapse-item__header {
    // color: #000000;
    background-color: #f0f0f0;
    text-indent: 10px;
  }

  .el-collapse-item__content {
    // color: #000000;
    background-color: #fafafa;
    padding: 0 10px;
  }
}
</style>
