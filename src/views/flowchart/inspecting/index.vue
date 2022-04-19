<template>

  <div v-if="flowChartData"
       class="vue-flowchart-editor-container">

    <div style="margin-top: -15px; margin-bottom:5px; margin-left: 10px">

      <label :style="'width:' + (50+strLen(flowChartName)*8) + 'px;font-weight: 600;font-size: 20px;' "> {{flowChartName}} </label>

      <el-tag style="margin-left:10px;font-size: 15px"> {{ keyToIndustry[flowChartIndustry].name }} </el-tag>
    </div>

    <flowchart-editor :key="reRender"
                      ref="flowchart"
                      :read-only="true"
                      :is-completed="isCompleted"
                      :chart-id="flowChartId"
                      :chart-data="flowChartData"
                      :industry="flowChartIndustry"
                      :chart-data-node-items="flowChartNodeItems"
                      @save-data="saveData"
                      @save-image="saveImage" />
  </div>

</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import FlowchartEditor from '../flowchartEditor'
import modelNodeItems from '../modelNodeItems'
import _ from 'lodash'
import { getFlowchartDetails, getFlowchartProcess } from '../api'
import { keyToIndustry } from '../../welcome/industries'

export default {
  name: 'Inspecting',
  components: {
    FlowchartEditor,
  },
  data() {
    return {
      flowChartId: parseInt(this.$route.params.id),
      flowChartName: null,
      flowChartData: null,
      flowChartIndustry: null,
      keyToIndustry: keyToIndustry,
      isCompleted: false,
      flowChartNodeItems: modelNodeItems,
      reRender: +new Date(),
    }
  },
  created() {
    // this.$on('toggle-read-only', () => {
    //   this.readOnly = !this.readOnly
    //   this.$nextTick(() => {
    //     console.log(this.readOnly)
    //     this.reRender = +new Date() // 重新渲染组件
    //   })
    // })
    // this.$store.dispatch("flowchart/getMyFlowcharts")

    // 之后要修改的，获取到这一id的流程图信息和已完成节点信息后 进行展示 （新的changeStyle函数在flowchartEditor中）//////

    getFlowchartDetails({ flowchart_id: parseInt(this.$route.params.id) }).then(
      (res) => {
        // console.log(res)
        // console.log(res.data)
        let flowChartData = res.data.data.content
        this.isCompleted = res.data.data.is_completed
        this.flowChartName = res.data.data.name
        this.flowChartIndustry = res.data.data.industry

        getFlowchartProcess(this.$route.params.id).then((res) => {
          let finished_id_list = res.data.data.finished
          let training_id_list = res.data.data.training

          // 标记正在训练的和已经完成的节点
          finished_id_list.forEach((id) => {
            var index = flowChartData.nodes.findIndex((x) => {
              return x.id === id
            })
            flowChartData.nodes[index].color = '#00FF00'
          })

          training_id_list.forEach((id) => {
            var index = flowChartData.nodes.findIndex((x) => {
              return x.id === id
            })
            flowChartData.nodes[index].color = '#FF0000'
          })

          console.log(flowChartData)
          this.$nextTick(() => {
            this.flowChartData = flowChartData
          })
        })
      }
    )
  },

  computed: {
    // ...mapState("flowchart", {
    //   allFlowChartData: (state) => state.my_flowcharts,
    // }),
    // flowChartData: function(){
    //   var index = this.allFlowChartData.findIndex(x => {
    //     return x.id === parseInt(this.$route.params.id)
    //   })
    //   if(index >= 0){
    //     return _.cloneDeep(this.allFlowChartData[index].data)
    //   }else {
    //     return null
    //   }
    // }
  },

  methods: {
    saveData(data) {
      // 在这里写数据保存逻辑
      this.flowChartData = _.cloneDeep(data)

      const jsonData = JSON.stringify(this.flowChartData)
      const blob = new Blob([jsonData], { type: 'text/plain' })
      const e = document.createEvent('MouseEvents')
      const a = document.createElement('a')
      a.download = this.flowChartName + '.json'
      a.href = window.URL.createObjectURL(blob)
      a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
      e.initEvent(
        'click',
        true,
        false,
        window,
        0,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null
      )
      a.dispatchEvent(e)
    },
    saveImage(data) {
      const a = document.createElement('a')
      a.href = data
      a.download = this.flowChartName + '.png'
      document.body.appendChild(a)
      a.click()
    },
    strLen(str) {
      var count = 0
      for (var i = 0, len = str.length; i < len; i++) {
        count += str.charCodeAt(i) < 256 ? 1 : 2.5
      }
      return count
    },
  },
}
</script>

<style lang="less" scoped>
/* .flowchart-head{
  margin: 0 20px 0 20px;
} */

.vue-flowchart-editor-container {
  height: 88vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0 20px 0 20px;

  .label {
    // width: 130px;
    overflow: hidden;
    display: inline-block;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>