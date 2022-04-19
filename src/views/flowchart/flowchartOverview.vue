<template>

  <div class="flowchart-overview">
    <el-card shadow="hover"
             class="flowchart-card">
      <vue-flowchart-editor ref="flowChart">
        <!-- Hidden Main Chart -->
        <div style="display: none;">
          <flow :data="flowChartData" />
        </div>

        <!-- Displayed Minimap -->
        <div class="flowchart-card-minimap"
             @click="$emit('click-minimap')">
          <minimap :height="200"
                   :width="320" />
        </div>
      </vue-flowchart-editor>

      <!-- 20220101 start -->
      <div style="margin-top: 2px; margin-bottom: 2px">
        <span style="font-size:10px; margin-left: 10px; margin-right: 2px; color: grey; font-weight:bold">训练状态</span>
        <el-divider direction="vertical"></el-divider>
        <span style="font-size:10px; margin-left: 2px">
          <span v-if="chartStatus===0" style="color: #e6a23c">{{ messageDict[chartStatus] }}</span>
          <span v-if="chartStatus===1" style="color: #67c23a">{{ messageDict[chartStatus] }}</span>
          <span v-if="chartStatus===2" style="color: #f56c6c">{{ messageDict[chartStatus] }}</span>
          <span v-if="chartStatus===3" style="color: #909399">{{ messageDict[chartStatus] }}</span>
        </span>
        
        <el-button class="button" type="primary" size="mini" plain
          @click="$emit('click-minimap')">查看</el-button>
        <el-button class="button" size="mini" plain :disabled="chartStatus!==1"
         @click="handlePredicting">演示</el-button>
      </div>
      <!-- 20220102 end -->

    </el-card>
    
    <div class="flowchart-name">
      <icon type="flowchart" />
      [{{ keyToIndustry[flowChartIndustry].name }}] {{ flowChartName }}
    </div>
  </div>

</template>

<script>
import VueFlowchartEditor, { Flow, Minimap } from 'vue-flowchart-editor'
import Icon from './components/Icon'
import { keyToIndustry } from '../welcome/industries'

export default {
  name: 'FlowchartOverview',

  components: {
    VueFlowchartEditor,
    Flow,
    Minimap,
    Icon,
  },

  props: {
    chartData: {
      type: Object,
      default: null,
    },
    chartName: {
      type: String,
      default: '未命名模型图',
    },
    chartIndustry: {
      type: String,
      default: '通用场景',
    },
    chartStatus: {
      type: Number,
      default: 0
    },
    chartId: {
      type: Number
    }
  },

  data() {
    return {
      keyToIndustry: keyToIndustry,
      flowChartData: this.chartData,
      flowChartName: this.chartName,
      flowChartIndustry: this.chartIndustry,
      messageDict: {
        true: '已完成',
        false: '训练中',
        0:"训练中",
        1:"已完成",
        2:"训练出错",
        3:"等待训练资源"
      },
    }
  },

  mounted() {},

  methods: {
    handlePredicting() {
      let routeUrl = this.$router.resolve({
        name: 'Predicting',
        params: { id: this.chartId },
      })
      // console.log(this.chartId)
      window.open(routeUrl.href, '_blank')
    },
  },
}
</script>

<style lang="less">
.flowchart-overview {
  .el-card__body {
    padding: 0 0;
  }

  .g6-editor-minimap-control-layer[style] {
    cursor: default !important;
  }

  .flowchart-card {
    width: 322px;
    height: 230px;

    background-color: #fafafa;
    // padding: 0 0;
    // border-left: 1px solid #e6e9ed;

    .flowchart-card-minimap {
      position: relative;
      // top: 5px;
      // bottom: 5px;
      width: 320px;
      height: 200px;
      // border-top: 1px solid #e6e9ed;
    }
  }

  .flowchart-name {
    margin-top: 5px;
    text-indent: 8px;
    font-size: 16px;

    font-family: Apple System, 'SF Pro SC', 'SF Pro Display', 'Helvetica Neue',
      Arial, 'PingFang SC', 'Hiragino Sans GB', STHeiti, 'Microsoft YaHei',
      'Microsoft JhengHei', 'Source Han Sans SC', 'Noto Sans CJK SC',
      'Source Han Sans CN', sans-serif;
    -webkit-font-smoothing: antialiased;
    color: #444;

    .svg-icon {
      font-size: 20px;
    }
  }

  .button{
    padding: 4px 4px;
    float: right;
    margin: 2px 3px 0 3px;
  }
}
</style>
