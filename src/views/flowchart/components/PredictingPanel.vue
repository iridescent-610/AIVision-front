<template>
  <item-panel class="item-panel">
    <el-alert v-if="isCompleted" title="该流程图任务已经训练完毕，可以创建预测任务或导出镜像" type="success" :center="false" :closable="false"
      show-icon>
    </el-alert>
    <el-alert v-else title="该流程图仍未训练完毕，暂不能创建预测任务或导出镜像" type="warning" :center="false" :closable="false" show-icon>
    </el-alert>
    <div v-if="isCompleted" class="info">
      <el-button type="primary" @click="handlePredicting">使用模型</el-button>
    </div>
    <!-- <div v-else  
         class="info">
      <el-button type="primary"
                 @click="handleLabeling">去dataturks标注</el-button>
    </div> -->

    <!-- </item-panel></template> -->
  </item-panel>
</template>

<script>
import { ItemPanel } from 'vue-flowchart-editor'
import _ from 'lodash'

export default {
  name: 'PredictingPanel',
  components: { ItemPanel },
  props: {
    chartId: {
      type: Number,
      default: -1,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {}
  },
  methods: {
    handlePredicting() {
      let routeUrl = this.$router.resolve({
        name: 'Predicting',
        params: { id: this.chartId },
      })
      //  console.log({ id: id, name: this.allFlowChartData[index].name })
      window.open(routeUrl.href, '_blank')
    },
    handleLabeling() {
      window.open("http://10.214.211.205/autologin.html?id=e1n0Y5UlnM5bRJIOJeOBJcZu4GyC&token=72ZmXIzApZARUFOLBE4uNp7GLDngidV18zvhrhAePcpABb38eAQFo4h0XHoty2wT", '_blank')
    }
  },
}
</script>

<style lang="less">
.item-panel {
  box-sizing: border-box;
  position: relative;
  // display: flex;
  // width: 100%;
  // top: 45px;
  // bottom: 0;
  // left: 0;
  // width: 150px;
  // padding: 10px;
  text-align: center;
  // overflow: scroll;
  // overflow-y: auto;

  .info {
    margin-top: 20px;
  }
}
</style>
