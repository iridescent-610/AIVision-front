<template>

  <div class="flowchart-overview">
    <el-card shadow="hover" class="flowchart-card">
      <vue-flowchart-editor ref="flowChart">
        <!-- Hidden Main Chart -->
        <div style="display: none;">
          <flow :data="flowChartData"/>
        </div>

        <!-- Displayed Minimap -->
        <div class="flowchart-card-minimap" @click="$emit('click-minimap')">
          <minimap :height="210" :width="278"/>
        </div>
      </vue-flowchart-editor>
      <div class="flowchart-state">
          <span v-if="chartStatus === 0" style="color: #e6a23c; margin-bottom: 1px; margin-right: 5px;"><svg-icon style="width: 20px;height: 20px;"
                                                                                              svg-name="loading_icon"/></span>
        <span v-if="chartStatus === 1" style="color: rgba(67, 160, 71, 1); margin-bottom: 1px; margin-right: 5px;"><svg-icon style="width: 20px;height: 20px;"
                                                                                            svg-name="success_icon"/></span>
        <span v-if="chartStatus === 2" style="color: rgba(183, 28, 28, 1); margin-bottom: 1px; margin-right: 5px;"><svg-icon style="width: 20px;height: 20px;"
                                                                                            svg-name="failed_icon"/></span>
        <span v-if="chartStatus === 3" style="color: rgba(73, 93, 103, 1); margin-bottom: 1px; margin-right: 5px;"><svg-icon style="width: 20px;height: 20px;"
                                                                                            svg-name="loading_icon"/></span>

        <span v-if="chartStatus === 0" style="color: #e6a23c">{{ messageDict[chartStatus] }}</span>
        <span v-if="chartStatus === 1" style="color: rgba(67, 160, 71, 1)">{{ messageDict[chartStatus] }}</span>
        <span v-if="chartStatus === 2" style="color: rgba(183, 28, 28, 1)">{{ messageDict[chartStatus] }}</span>
        <span v-if="chartStatus === 3" style="color: rgba(73, 93, 103, 1)">{{ messageDict[chartStatus] }}</span>

        <div style="margin-left: auto;">
          <el-button class="button" id="button-check" plain @click="$emit('click-minimap')">查看</el-button>
          <el-button class="button" plain :disabled="chartStatus !== 1" @click="handlePredicting">演示</el-button>
        </div>
      </div>
      <!-- 20220102 end -->

    </el-card>

    <div class="flowchart-name">
      <icon type="flowchart"/>
      <span class="flowchart-span">[{{ keyToIndustry[flowChartIndustry].name }}] {{ flowChartName }}</span>
    </div>
  </div>

</template>

<script>
import VueFlowchartEditor, {Flow, Minimap} from 'vue-flowchart-editor'
import Icon from './components/Icon'
import {keyToIndustry} from '../welcome/industries'

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
        0: "训练中",
        1: "已完成",
        2: "训练出错",
        3: "等待训练资源"
      },
    }
  },

  mounted() {
  },

  methods: {
    handlePredicting() {
      let routeUrl = this.$router.resolve({
        name: 'Predicting',
        params: {id: this.chartId},
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

  .flowchart-name {
    margin-top: 8px;
    font-size: 14px;
    height: 20px;
    line-height: 20px;

    .flowchart-span {
      margin-left: 8px;
      font-weight: 500;
    }
  }

  .flowchart-card {
    width: 278px;
    height: 258px;
    background-color: #EEF2F3;
    border-color: #CFD8DC;

    .flowchart-card-minimap {
      position: relative;
      width: 278px;
      height: 210px;
    }

    .flowchart-state {
      font-size: 14px;
      display: flex;
      align-items: center;
      padding: 0 16px;
      height: 48px;

      span {
        margin-right: 4px;
      }
    }
  }

  .button {
    font-size: 14px;
    width: 52px;
    height: 32px;
    position: relative;
    float: right;
    margin-left: 8px;
    border: 1px solid rgba(73, 93, 103, 1);
  }

  .button > span {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  #button-check {
    margin-left: 8px;
    color: rgba(25, 118, 210, 1);
    border: 1px solid rgba(25, 118, 210, 1);
  }
}
</style>
