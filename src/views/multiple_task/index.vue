<template>
    <div style="padding: 10px;">
        <el-tabs type="border-card">
            <el-tab-pane v-for="(taskDetail,index) in detail.tasks" 
                :label="stringMapping(taskDetail.taskStage)" 
                :key="taskDetail.taskStage"
                :disabled="index >= detail.taskDetails.length">
                <div class="stage-info">{{getStageInfo(taskDetail.taskStage)}}</div>
<!-- <el-button type="primary" @click="jumpToDataturks(detail.taskDetails[index].name)">去dataturks标注</el-button> -->

                <div v-if="index < detail.taskDetails.length && detail.taskDetails[index].status === 'INIT'">
                    <el-button type="primary" @click="jumpToDataturks(detail.taskDetails[index].name)">去dataturks标注</el-button>
                    <el-button type="danger" @click="completeTaskLabel(detail.taskDetails[index].id)">完成标注</el-button>
                </div>
                <div v-if="index < detail.taskDetails.length && detail.taskDetails[index].status != 'INIT'">
                    <p><span class='detail-key'>阶段ID: </span><span class="detail-value">{{detail.taskDetails[index].name}}</span></p>
                    <p><span class='detail-key'>阶段状态: </span><el-tag :type="getStatusType(detail.taskDetails[index].status)">{{stringMapping(detail.taskDetails[index].status)}}</el-tag></p>
                    <p><span class='detail-key'>创建时间: </span>{{detail.taskDetails[index].createdTime}}</p>
                    <el-divider></el-divider>
                    <p><span class='detail-key'>信息: </span></p>
                    <div class="info">{{detail.taskDetails[index].info}}</div>
                    <!-- <el-button 
                        type="primary" 
                        v-for="(val, key) in taskDetails[index].note" 
                        :key="key"
                        @click="showChartDialog(key, val)">
                        {{key}}
                    </el-button> -->
                    <div class="select-list">
                        <div 
                            class="select-list-item"
                            v-for="(val, key) in taskDetails[index].note" 
                            :key="key"
                            :id="'chartLineBox-' + index + '-' + key"
                            style="width: 400px;height: 350px;border: 1px dotted"
                        >
                        </div>
                    </div>

                    <!-- <div :id="'chartLineBox' + index" style="width: 400px;height: 350px;border: 1px dotted"></div> -->
                </div>
            </el-tab-pane>
        </el-tabs>
        <!-- <el-dialog
            :title="'Changes of ' + this.showDetail['key']"
            :visible.sync="dialogVisible" 
            >
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
            <div :id="'chartLineBox'" style="width: 400px;height: 350px;border: 1px dotted"></div>
        </el-dialog> -->
    </div>
</template>

<script>
import { getDetail, getDataturksJumpUrl, completeLabel } from './api'
import store from '@/store'
import echarts from 'echarts'

export default {
    created() {
        this.flowchart_id = this.$route.params.flowchart_id
        this.node_id = this.$route.params.node_id
    },
    mounted() {
        getDetail(this.flowchart_id, this.node_id).then(res => {
            var data = res.data.data
            this.detail = data
            this.taskDetails = []
            for(var idx in this.detail.taskDetails){
                var taskDetail = this.detail.taskDetails[idx]
                if(!taskDetail.note){
                    taskDetail.note = {}
                }else{
                    taskDetail.note = JSON.parse(taskDetail.note)
                }
                
                this.taskDetails.push(taskDetail)
            }
            console.log('this.taskDetails', this.taskDetails)
            this.detailReady = true;
        })
    },
    data() {
        return {
            flowchart_id: null,
            node_id: null,
            detail: {
                tasks: null
            },
            taskDetails: [],
            dialogVisible: false,
            showDetail: {},
            detailReady: false,
            strMap: {
                'LABEL_TRAIN': '标注训练',
                'PREDICT': '预测',
                'FINISHED': '已完成',
                'FAILED': '失败',
                'WAITING': '等待中',
                'TRAIN': '训练'
            },
            stageInfo: {
                'LABEL_TRAIN': '该阶段是包含标注和训练两个流程的阶段，先在dataturks进行样本标注，标注完成后进行训练',
                'PREDICT': '该阶段是使用模型对数据进行预测，获取数据通过模型后的结果',
                'PRELABEL': '使用模型对数据进行预测，获取粗略标注，之后可以将这批标注存入dataturks进行手动标注和微调',
                'TRAIN': '训练阶段，使用初始数据或者上一阶段输出的数据，对模型进行训练'
            }
        }
    },
    watch: {
        dialogVisible: function() {
            this.$nextTick(function() {
                if(!this.dialogVisible) return
                var box = document.getElementById('chartLineBox')
                if(!box) return
                var detail = this.showDetail['data']
                var key = this.showDetail['key']
                console.log(detail)
                this.showSingleChart(box, key, detail)
            })
        },
        detailReady: function() {
            this.$nextTick(function() {
                if(!this.detailReady) return;
                for(var index = 0; index < this.taskDetails.length;index++){
                    // console.log(this.taskDetails[index].note)
                    const note = this.taskDetails[index].note
                    for(var key in note) {
                        var containerId = "chartLineBox-" + index + "-" + key;
                        var container = document.getElementById(containerId);
                        // console.log(containerId, container)
                        this.showSingleChart(container, key, note[key])
                    }
                }
            })
        }
    },
    methods: {
        jumpToDataturks(projectName){
            getDataturksJumpUrl().then(res => {
                var userName = store.state.auth.username
                var url = res.data.data.url + '&userName=' + userName + '&projectName=' + projectName
                console.log(url)
                window.open(url, '_blank');
            }).catch(err => {
                console.log("获取失败！")
            })
        },
        completeTaskLabel(id){
            console.log("complete")
            completeLabel(id).then(res => {
                var data = res.data
                console.log("完成", data)
                this.$router.go(0);
            })
            
        },
        showChartDialog(key, val){
            this.dialogVisible = true
            this.showDetail['key'] = key
            this.showDetail['data'] = val
        },
        showSingleChart(container, key, trainDetail) {
            console.log(trainDetail)

            this.chartLine = echarts.init(container)
            this.chartLine.resize()
            
            var series = []

            
            var data = []
            var min = -Infinity
            var max = Infinity
            for (var iter in trainDetail) {
                data.push([Number(iter), trainDetail[iter]])
                min = Math.min(min, trainDetail[iter])
                max = Math.max(max, trainDetail[iter])
            }

            series.push({
                name: key,
                type: 'line',
                data: data
            })

            
            var option = {
                legend: {
                    data: [key]
                },
                xAxis: {
                name: 'iter',
                nameTextStyle: {
                    color: '#FA6F53',
                    fontSize: 12
                }
                },
                yAxis: {
                    name: 'y',
                    // min: min,
                    // max: max
                },
                dataZoom: [
                    {
                        type: 'inside'
                    }
                ],
                series: series,
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            background: '#6a7985'
                        }
                    }
                }
            }
            this.chartLine.setOption(option)
        },
        getStatusType(status){
            if(status == 'FINISHED'){
                return 'success';
            } else if(status == 'FAILED'){
                return 'danger';
            } else {
                return 'primary';
            }
        },
        stringMapping(str) {
            if(this.strMap.hasOwnProperty(str)){
                return this.strMap[str];
            } else {
                return str;
            }
        },
        getStageInfo(stage) {
            if(this.stageInfo.hasOwnProperty(stage)){
                return this.stageInfo[stage];
            } else {
                return "未知的阶段";
            }
        }
    }
}
</script>

<style lang="less" scoped>
* {
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
p {
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
span.detail-key {
    color: #303133;
    font-weight: 600;
}
div.info {
    margin-bottom: 10px;
    background: #F2F6FC;
    padding: 10px;
    border-radius: 5px;
}
div.stage-info {
    margin-bottom: 10px;
    background: #F2F6FC;
    padding: 10px;
    border-radius: 5px;
    color: #909399;
    font-size: 0.8em;
}

.select-list{
    margin: 20px;

    .select-list-item{
        vertical-align:top; //顶部对齐
        display: inline-block;
        margin-right: 30px;
        margin-bottom: 30px;
        border: 1px solid #000;
    }
}
</style>