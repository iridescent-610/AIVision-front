<template>

  <div class="vue-flowchart-editor-container">
    <div style="margin-top: -15px; margin-bottom:5px; margin-left: 10px">
      <input v-if="nameEditing"
             v-model="flowChartName"
             @blur="handleNameEditing"
             @keyup.enter="handleNameEditing"
             :style="'width:' + (70+strLen(flowChartName)*8) + 'px;font-weight: 600;font-size: 20px;max-width: 800px' "
             v-focus>

      <label v-else
             @click="nameEditing = true;"
             :style="'width:' + (50+strLen(flowChartName)*8) + 'px;font-weight: 600;font-size: 20px;' "> {{ flowChartName}} </label>

      <!-- <el-input v-model="flowChartName"
                :style="'width:' + (80+flowChartName.length*10) + 'px' "></el-input> -->
      <el-tag style="margin-left:10px;font-size: 15px"> {{ keyToIndustry[industry].name }} </el-tag>
    </div>

    <flowchart-editor :key="reRender"
                      ref="flowchart"
                      :chart-data="flowChartData"
                      :industry="industry"
                      :read-only="readOnly"
                      :chart-data-node-items="flowChartNodeItems"
                      @save-data="saveData"
                      @save-image="saveImage"
                      @upload-server="uploadServer" />
  </div>

</template>

<script>
import { mapMutations } from 'vuex'
import FlowchartEditor from '../flowchartEditor'
import modelNodeItems from '../modelNodeItems'
import _ from 'lodash'
import { uploadFlowchart } from '../api'
import '../iconfont'

import flowchartTemplates from '../flowchart_template'
import { keyToIndustry } from '../../welcome/industries'

export default {
  name: 'Flowcharting',
  components: {
    FlowchartEditor,
  },
  data() {
    return {
      task: this.$route.query.task,
      industry: this.$route.query.industry,
      flowChartName: this.$route.query.name || '未命名流程图',
      nameEditing: false,
      keyToIndustry: keyToIndustry,
      flowChartNodeItems: modelNodeItems,
      flowChartData: {},
      reRender: +new Date(),
      readOnly: false,
      flowchartTemplates: flowchartTemplates,
    }
  },

  created() {
    this.flowChartData = flowchartTemplates[this.task].data
  },

  directives: {
    focus: {
      inserted(el) {
        el.focus()
      },
    },
  },

  // watch: {
  //   flowChartName: function (val) {
  //     if (!this.flowChartName) this.flowChartName = '未命名流程图'
  //   },
  // },

  methods: {
    ...mapMutations('flowchart', ['updateErrorList']),

    // ////////////////
    saveData(data) {
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
    uploadServer(data) {
      // 验证非空
      // console.log(data)
      var nodeList = []
      if (data.nodes) {
        for (let node of data.nodes) {
          if (node.kind === 'Algorithm' || node.kind === 'Dataset') {
            if (!node.params.id) {
              nodeList.push(node.id)
            }
          } else if (node.kind === 'Decision') {
            // console.log(node.params.requirement)
            if (
              !node.params.requirement.name ||
              node.params.requirement.name === '' ||
              !node.params.requirement.value ||
              node.params.requirement.value === ''
            ) {
              nodeList.push(node.id)
            }
          }
        }
        if (nodeList.length > 0) {
          this.$refs.flowchart.changeStyle(nodeList, [])
          // this.updateErrorList({ nodeList: nodeList, edgeList: [] })
          this.$message({
            message: '请填写所有节点所必须的信息',
            type: 'error',
            duration: 4000,
          })
          return
        }
      } else {
        this.$message({
          message: '请添加至少一个任务节点',
          type: 'error',
          duration: 4000,
        })
        return
      }

      // 无误后上传
      const uploadData = {
        name: this.flowChartName,
        data: data,
        industry: this.industry,
      }

      uploadFlowchart(uploadData)
        .then((res) => {
          res = res.data
          // console.log(res)
          const { valid, nodeList, edgeList } = res.data
          if (!valid) {
            this.$message({
              message: res.message,
              type: 'error',
              duration: 5000,
            })
            this.$refs.flowchart.changeStyle(nodeList, edgeList)
          } else {
            this.$message({
              message: '保存成功，请至模型管理界面查看模型状态',
              type: 'success',
              duration: 4000,
            })

            ///!!!!!!!!!!!成功上传后变成自动开始的任务
            this.$router.push({
              name: 'Inspecting',
              params: { id: res.data.id },
            })
            // this.readOnly = true  // !this.readOnly
            // this.$nextTick(() => {
            //   this.reRender = +new Date() // 重新渲染组件
            // })
          }

          // this.updateErrorList({ nodeList: nodeList, edgeList: edgeList })
        })
        .catch((err) => {
          console.log(err)
        })
    },
    strLen(str) {
      var count = 0
      for (var i = 0, len = str.length; i < len; i++) {
        count += str.charCodeAt(i) < 256 ? 1 : 2.5
      }
      return count
    },
    handleNameEditing() {
      this.nameEditing = false
      if (!this.flowChartName) this.flowChartName = '未命名流程图'
    },
  },
}
</script>



<style lang="less" scoped>
/* .flowchart-head{
  margin: 0 20px 0 20px;
} */

.vue-flowchart-editor-container {
  height: 85vh;
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
