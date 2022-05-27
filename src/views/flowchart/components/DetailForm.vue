<template>
  <div>
    <!-- 选模型的对话框 -->
    <el-dialog title="可选模型列表" :visible.sync="modelDialogVisible" width="80%">
      <div v-if="formModel.params.meta.filter_flag" style="margin-bottom: 10px; margin-left: 10px">
        筛选
        <el-radio-group v-model="filter_value" style="margin-left: 15px; margin-top: 8px">
          <el-radio v-for="op in formModel.params.meta.filter_values" :label="op" :key="op">
            {{ op }}</el-radio>
        </el-radio-group>
      </div>
      <div class="select-list">
        <div v-for="item in filter(modelOptions)" :key="item.id" @click="handleConfirmModel(item.model_name)"
          class="select-list-item">
          <el-card shadow="hover" style="width: 450px">
            <div slot="header" class="clearfix">
              <span style="text-align: center">
                <h6>{{ item.model_name }}</h6>
              </span>
            </div>

            <el-form>
              <el-form-item label="任务">
                <el-tag type="info" size="mini"> {{ item.task }} </el-tag>
              </el-form-item>
              <el-form-item label="来源">
                {{ item.source === 1 ? "Atlas" : "AI+X" }}
              </el-form-item>
              <el-form-item label="预训练模型">
                {{ item.pretrain_info.length > 0 ? "有" : "无" }}
              </el-form-item>
              <el-form-item label="可训练">
                {{ item.trainable === 1 ? "支持" : "不支持" }}
              </el-form-item>
              <el-form-item label="推荐尺寸">
                {{ item.input_size }}
              </el-form-item>
              <el-form-item label="简介">
                {{ item.info || "此模型还没有介绍" }}
              </el-form-item>
            </el-form>
          </el-card>
        </div>
      </div>
    </el-dialog>

    <!-- 选预训练的对话框 -->
    <el-dialog title="可选预训练模型列表" :visible.sync="pretrainDialogVisible" width="80%">
      <div v-if="pretrainOptions.length > 0" class="select-list">
        <div v-for="(item, index) in pretrainOptions" :key="item.id" @click="handleConfirmPretrain(index)"
          class="select-list-item">
          <el-card shadow="hover" style="width: 450px">
            <div slot="header" class="clearfix">
              <span style="text-align: center">
                <h6>{{ item.pretrain_name }}</h6>
              </span>
            </div>

            <el-form>
              <el-form-item label="简介">
                {{ item.info || "此预训练模型还没有介绍" }}
              </el-form-item>
              <el-form-item label="行业方向">
                {{ keyToIndustry[item.industry].name }}
              </el-form-item>
              <el-form-item label="数据集">
                {{ item.dataset }}
              </el-form-item>
              <el-form-item v-show="item.categories" label="类别">
                {{ item.categories }}
              </el-form-item>
              <el-form-item label="配置">
                <el-tag v-for="(value, name) in item.config" type="info" size="mini" :key="name"
                  style="margin-left: 5px">
                  {{ name + ": " + value }}
                </el-tag>
              </el-form-item>
              <el-form-item label="指标">
                <el-tag v-for="(value, name) in item.metric" type="info" size="mini" :key="name"
                  style="margin-left: 5px">
                  {{ name + ": " + value }}
                </el-tag>
              </el-form-item>
              <el-form-item label="公开">
                {{ item.is_public ? "是" : "否" }}
              </el-form-item>
              <el-form-item label="所属用户">
                {{ item.username }}
              </el-form-item>
              <el-form-item label="创建时间">
                {{ item.created_time }}
              </el-form-item>
            </el-form>
          </el-card>
        </div>
      </div>

      <div v-else class="select-list" style="margin-bottom: 20px">
        当前行业场景下，该网络结构没有可以使用的预训练模型
      </div>

      <el-alert title="在选择重新训练模型时，预训练模型只用作初始化参数，输出类别仍然可以自定义；在作为已训练完成的模型直接使用时，输出类别将固定不可更改" type="info" :closable="false"
        show-icon>
      </el-alert>

      <div style="text-align: right; margin-top: 10px">
        <el-button v-if="formModel.params.retrain" type="primary" size="medium" plain
          @click.prevent="handleNotUsePretrain">不使用</el-button>
      </div>
    </el-dialog>

    <!-- 选数据集的对话框 -->
    <el-dialog title="可选数据集列表" :visible.sync="datasetDialogVisible" width="80%">

      <!-- 20220105 start -->
      <div style="margin-bottom: 20px; margin-top: -10px">
        <!-- color: #FF6347;  -->
        <span style="font-weight: bold; margin-right: 10px">找不到您的数据集？</span>
        <el-button type="info" size="mini" plain @click.prevent="newGotoUpload"> 前往上传 </el-button>
        <span style="margin-left: 10px; margin-right: 7px">或者</span>
        <el-button type="info" size="mini" plain @click="newFreshDataset"> 刷新列表 </el-button>
      </div>
      <!-- 20220105 end -->

      <div class="select-head-text">我的数据集</div>
      <div class="select-list">
        <div v-for="item in myDatasets" :key="item.id" @click="handleConfirmDataset(item)" class="select-list-item">
          <el-card shadow="hover" style="width: 450px">
            <div slot="header" class="clearfix">
              <span style="text-align: center">
                <h6>{{ item.dataset_name }}</h6>
              </span>
            </div>

            <el-form>
              <el-form-item label="预览"> 无 </el-form-item>
              <el-form-item label="标签">
                <el-tag v-for="task in item.task" :key="task.id" type="info" size="mini">
                  {{ task.id }}
                </el-tag>
              </el-form-item>
              <el-form-item label="公开">
                {{ item.is_public ? "是" : "否" }}
              </el-form-item>
              <el-form-item label="标注">
                {{ item.is_annotated ? "有" : "无" }}
              </el-form-item>
              <el-form-item label="简介">
                {{ item.info || "此数据集还没有介绍" }}
              </el-form-item>
            </el-form>
          </el-card>
        </div>
      </div>

      <div class="select-head-text">公开数据集</div>
      <div class="select-list">
        <div v-for="item in publicDatasets" :key="item.id" @click="handleConfirmDataset(item)" class="select-list-item">
          <el-card shadow="hover" style="width: 450px">
            <div slot="header" class="clearfix">
              <span style="text-align: center">
                <h6>{{ item.dataset_name }}</h6>
              </span>
            </div>

            <el-form>
              <el-form-item label="预览"> 无 </el-form-item>
              <el-form-item label="标签">
                <el-tag v-for="task in item.task" :key="task.id" type="info" size="mini" style="margin-right: 5px">
                  {{ task.id }}
                </el-tag>
              </el-form-item>
              <el-form-item label="公开">
                {{ item.is_public ? "是" : "否" }}
              </el-form-item>
              <el-form-item label="标注">
                {{ item.is_annotated ? "有" : "无" }}
              </el-form-item>
              <el-form-item label="简介">
                {{ item.info || "此数据集还没有介绍" }}
              </el-form-item>
            </el-form>
          </el-card>
        </div>
      </div>
    </el-dialog>

    <!-- 模型节点各种参数的配置 -->
    <el-dialog v-if="formModel.kind === 'Algorithm'" title="模型节点配置" :visible.sync="configDialogVisible" width="80%">
      <el-form ref="form" :model="formModel" label-width="150px" class="detail-form" style="margin: 0 120px 0 0">
        <el-form-item label="模型">
          <el-input placeholder="请选择模型" v-model="formModel.params.model_name" size="small" class="input-with-select"
            style="width: 400px" @focus="handleSelectModel()">
            <el-button slot="append" icon="el-icon-more" @click="handleSelectModel()"></el-button>
          </el-input>
        </el-form-item>

        <el-form-item v-if="formModel.params.id" label="分支">
          <el-radio-group v-model="formModel.params.retrain" size="mini" @change="handleChangeRetrain">
            <el-radio :label="true" :disabled="!modelTrainable">重新训练</el-radio>
            <el-radio :label="false" :disabled="pretrainOptions.length === 0">使用已有的模型</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item v-if="formModel.params.id" label="参数">
          <!-- 参数的修改 -->
          <div v-if="formModel.params.args.length > 0">
            <div v-for="arg in formModel.params.args" :key="arg.name">
              <template v-if="
                formModel.params.retrain ||
                (!formModel.params.retrain && !arg.for_train_only)
              ">
                <span style="width: 120px; text-align: left; display: inline-block">
                  <el-tag size="small" type="info">{{ arg.name }}</el-tag>
                </span>
                <el-input v-if="!arg.choices" v-model="arg.value" size="mini" placeholder="" style="width: 180px">
                </el-input>
                <el-select v-else v-model="arg.value" placeholder="请选择" size="mini" style="width: 180px">
                  <el-option v-for="choice in arg.choices" :key="choice" :label="choice" :value="choice">
                  </el-option>
                </el-select>
                <el-tooltip class="item" effect="dark" :content="arg.description" placement="bottom"
                  style="margin-left: 20px">
                  <i class="el-icon-warning-outline" />
                </el-tooltip>
              </template>
            </div>
            <div style="margin-left: 30px">
              <el-button type="info" size="mini" plain @click="restoreDefault">还原默认参数</el-button>
            </div>
          </div>
          <div v-else>该模型无需设置参数</div>
        </el-form-item>

        <el-form-item v-if="formModel.params.id" label="预训练">
          <el-input placeholder="请选择已有的权重参数" v-model="formModel.params.pretrain_name" size="mini"
            class="input-with-select" style="width: 300px" @focus="handleSelectPretrain()">
            <el-button slot="append" icon="el-icon-more" @click="handleSelectPretrain()"></el-button>
          </el-input>
        </el-form-item>

        <!-- <el-form-item v-if="formModel.key === 'TEXT_RECOGNITION'" label="成段">
          <el-switch v-model="formModel.params.need_merge" active-color="#13ce66" inactive-color="#ff4949" />
        </el-form-item> -->

        <!-- <el-form-item
          v-if="formModel.params.id && formModel.params.meta.category_flag"
          label="所属粗类别"
        >
          <el-input
            placeholder="所属的粗类别，如细类别cat1、cat2都属于粗类别cat，只用于细粒度识别任务"
            v-model="formModel.params.belong_to"
            size="mini"
            :clearable="true"
          >
          </el-input>
        </el-form-item> -->

        <el-form-item v-if="formModel.params.id && formModel.params.meta.category_flag" label="细类别">
          <el-input v-model="formModel.params.categories" type="textarea" :disabled="
            !formModel.params.retrain && formModel.params.source === 0
          " placeholder='输入所有类别并以逗号分隔（不要有无关空格），如"cat,dog,horse"，如果同属于一个粗类别，则在所属粗类别中指出' size="mini" :rows="5" />
        </el-form-item>

        <el-form-item v-if="formModel.params.id && formModel.params.retrain" label="条件">
          <!-- v-if="metricOptions.length>0" -->
          <el-input v-model="formModel.params.requirement.value" placeholder="条件值" class="input-with-select" size="mini"
            style="width: 180px">
            <el-select slot="prepend" v-model="formModel.params.requirement.name" placeholder="条件" style="width: 90px"
              @change="handleMetricOptionChange">
              <el-option v-for="item in metricOptions" :key="item.name" :label="item.name" :value="item.name" />
            </el-select>
          </el-input>

          <el-tooltip v-if="formModel.params.requirement.type === 'good'" class="item" effect="dark"
            :content="formModel.params.requirement.description" placement="bottom">
            <i class="el-icon-top" style="color: green; font-size: 1.3em" />
          </el-tooltip>
          <el-tooltip v-else-if="formModel.params.requirement.type === 'bad'" class="item" effect="dark"
            :content="formModel.params.requirement.description" placement="bottom">
            <i class="el-icon-bottom" style="color: red; font-size: 1.3em" />
          </el-tooltip>
        </el-form-item>

        <!-- **************** 最后的备注 **************** -->
        <el-form-item label="备注">
          <el-input v-model="formModel.note" type="textarea" placeholder="备注内容" maxlength="30" show-word-limit
            size="mini" />
        </el-form-item>

        <el-form-item v-if="
          formModel.params.id &&
          formModel.params.retrain &&
          formModel.params.meta.atlas_support &&
          formModel.params.source === 0
        " label="导出">
          <el-switch v-model="formModel.params.auto_export" active-color="#13ce66" inactive-color="#ff4949" />
          <span style="margin-left: 10px">自动导出可以下载的模型，仅支持基于本流程图训练的模型</span>
        </el-form-item>

        <el-form-item v-if="formModel.params.id && formModel.params.retrain" label="公开">
          <el-switch v-model="formModel.params.is_public" active-color="#13ce66" inactive-color="#ff4949" />
          <span style="margin-left: 10px">公开后别人可以使用你训练好的模型</span>
        </el-form-item>

        <el-form-item style="margin-top: 10px">
          <el-button v-if="!readOnly" type="primary" size="medium" plain @click.prevent="handleSubmit">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 其他一些类型的节点的配置 -->
    <el-form ref="form" :model="formModel" label-width="80px" class="detail-form">
      <!-- 如果是节点类型 -->
      <div v-if="type === 'node'" class="my-collapse">
        <el-collapse value="model">
          <el-collapse-item name="model">
            <template slot="title">
              <b>节点属性</b>
            </template>
            <!--  模型属性  -->
            <el-form-item label="id">
              {{ formModel.id }}
            </el-form-item>
            <el-form-item label="类型">
              <b>{{ formModel.label }}</b>
            </el-form-item>
            <el-form-item v-if="formModel.kind === 'Algorithm'" label="模型">
              <b>{{ formModel.params.model_name || "当前还未配置模型" }}</b>
            </el-form-item>
            <!-- <el-form-item label="名称">
              <el-input v-model="formModel.name" size="mini" />
            </el-form-item> -->

            <el-form-item v-if="formModel.kind === 'Algorithm'" label="配置">
              <el-button type="primary" size="small" @click="configDialogVisible = true">打开模型配置页面</el-button>
            </el-form-item>

            <!-- *********************** 节点类型的Dataset *********************** -->
            <el-form-item v-if="formModel.kind === 'Dataset'" label="选择">
              <el-input placeholder="请选择已有的数据集" v-model="datasetLabel" size="mini" class="input-with-select"
                style="width: 220px" @focus="handleSelectDataset()">
                <el-button slot="append" icon="el-icon-more" @click="handleSelectDataset()"></el-button>
              </el-input>
            </el-form-item>

            <el-form-item v-if="formModel.kind === 'Dataset'" label="类型">
              {{ formModel.params.meta.dataset_type }}
            </el-form-item>

            <el-form-item v-if="formModel.kind === 'Dataset'" label="标注">
              {{ formModel.params.is_annotated ? "有" : "无" }}
            </el-form-item>

            <el-form-item v-if="formModel.kind === 'Dataset'" label="用途">
              <el-switch v-model="formModel.params.only_train" active-text="仅辅助训练" inactive-text="流程数据">
              </el-switch>
            </el-form-item>
            <!-- *********************** 节点类型的Decision *********************** -->
            <el-form-item v-if="formModel.kind === 'Decision'" label="条件">
              <!-- v-if="metricOptions.length>0" -->
              <el-input v-model="formModel.params.requirement.value" placeholder="条件值" class="input-with-select"
                size="mini" style="width: 180px">
                <el-select slot="prepend" v-model="formModel.params.requirement.name" placeholder="条件"
                  style="width: 90px" @change="handleMetricOptionChange">
                  <el-option v-for="item in metricOptions" :key="item.name" :label="item.name" :value="item.name" />
                </el-select>
              </el-input>
              <!-- <span v-else style="color: red">上一模型无度量指标或者未连接模型节点，请删除该节点</span> -->

              <el-tooltip v-if="formModel.params.requirement.type === 'good'" class="item" effect="dark"
                :content="formModel.params.requirement.description" placement="bottom">
                <i class="el-icon-top" style="color: green; font-size: 1.3em" />
              </el-tooltip>
              <el-tooltip v-else-if="formModel.params.requirement.type === 'bad'" class="item" effect="dark"
                :content="formModel.params.requirement.description" placement="bottom">
                <i class="el-icon-bottom" style="color: red; font-size: 1.3em" />
              </el-tooltip>
            </el-form-item>
            <!-- *********************** 节点类型的Endpoint *********************** -->
            <el-form-item v-if="formModel.kind === 'Endpoint'" label="类型">
              <el-radio-group v-model="formModel.params.type" size="mini">
                <el-radio label="start">开始</el-radio>
                <el-radio label="end">结束</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-collapse-item>

          <el-collapse-item name="shape">
            <template slot="title">
              <b>外观属性</b>
            </template>
            <!--  外观属性  -->
            <el-form-item label="颜色">
              <el-input v-model="formModel.color" size="mini" :disabled="true" />
            </el-form-item>
            <el-form-item label="形状">
              <el-select v-model="formModel.shape" placeholder="请选择节点的形状" size="mini" :disabled="true">
                <el-option key="flow-rect" label="rect" value="flow-rect" />
                <el-option key="flow-circle" label="circle" value="flow-circle" />
                <el-option key="flow-rhombus" label="rhombus" value="flow-rhombus" />
                <el-option key="flow-capsule" label="capsule" value="flow-capsule" />
              </el-select>
            </el-form-item>
            <el-form-item label="尺寸">
              <el-input v-model="formModel.size" size="mini" :disabled="true" />
            </el-form-item>
          </el-collapse-item>
        </el-collapse>

        <!-- <el-divider /> -->
        <!-- <hr style="margin: 10px 0"> -->
      </div>

      <!-- **********如果是边类型************* -->
      <div v-else-if="type === 'edge'" class="my-collapse">
        <el-collapse :value="['shape', 'model']">
          <el-collapse-item name="model">
            <template slot="title">
              <b>节点属性</b>
            </template>
            <!--  节点属性  -->
            <el-form-item label="id">
              {{ formModel.id }}
            </el-form-item>
            <el-form-item v-if="fromDecision" label="分支">
              <el-radio-group v-model="formModel.cond" size="mini">
                <el-radio label="Y">Y</el-radio>
                <el-radio label="N">N</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item v-if="!fromDecision" label="标签">
              <el-input v-model="formModel.label" size="mini" />
            </el-form-item>
          </el-collapse-item>

          <el-collapse-item name="shape">
            <template slot="title">
              <b>外观属性</b>
            </template>
            <el-form-item label="形状">
              <el-select v-model="formModel.shape" placeholder="请选择边的形状" size="mini">
                <el-option key="flow-smooth" label="Smooth" value="flow-smooth" />
                <el-option key="flow-polyline" label="Polyline" value="flow-polyline" />
                <el-option key="flow-polyline-round" label="Polyline Round" value="flow-polyline-round" />
                <!-- <el-option key="custom-polyline" label="Custom Polyline" value="custom-polyline" /> -->
              </el-select>
            </el-form-item>

            <!-- <el-form-item v-for="item in formModel.params" :key="item.name" :label="item.name">
              <el-input v-model="item.value" size="mini" />
            </el-form-item> -->
          </el-collapse-item>
        </el-collapse>
      </div>
      <!-- **********如果是其他类型************* -->
      <div v-else-if="type === 'group'">
        <input v-model="formModel.label" @blur.prevent="handleSubmit" />
      </div>

      <el-form-item style="margin-top: 10px">
        <el-button v-if="!readOnly && formModel.kind !== 'Algorithm'" type="primary" size="medium" plain
          @click.prevent="handleSubmit">保存属性
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState } from "vuex";
// import { getDatasetsList } from '../api'
import { getPublicDatasets, getMyDatasets, getAvailableModels } from "../api";
import { keyDict } from "../modelNodeItems";
import { keyToIndustry } from "../../welcome/industries";

import _ from "lodash";

export default {
  name: "EditorDetailForm",

  inject: ["root"],

  props: {
    type: {
      type: String,
      default: "",
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
    industry: {
      type: String,
      default: "general",
    },
  },

  data() {
    return {
      filter_value: "",

      keyToIndustry: keyToIndustry,

      modelOptions: [],
      modelDialogVisible: false,
      modelTrainable: false,

      publicDatasets: [],
      myDatasets: [],
      datasetLabel: "",
      datasetDialogVisible: false,

      pretrainDialogVisible: false,

      configDialogVisible: false,
      argOptions: [],
      metricOptions: [],
      pretrainOptions: [],

      formModel: {},

      maxNodeWidth: 200, // fit long label
      defaultNodeWidth: 80,
      defaultNodeHeight: 48,
      fontSize: 12,
      fromDecision: false,
    };
  },

  created() {
    const formModel = this.root.propsAPI.getSelected()[0].getModel();
    this.formModel = Object.assign(
      {},
      { shape: "flow-smooth" },
      _.cloneDeep(formModel) // 防止误编辑
    );
    // 当元素为模型节点
    if (this.type === "node") {
      if (this.formModel.kind && this.formModel.kind === "Algorithm") {
        // 普通模型
        // this.modelOptions = this.modelOptions[this.formModel.key]
        console.log(this.industry);
        let params = {
          task_type: keyDict[this.formModel.key], // this.formModel.key.toLowerCase()
          industry: this.industry,
        };
        getAvailableModels(params).then((res) => {
          // console.log(res.data)
          this.modelOptions = res.data.data;

          var index = this.modelOptions.findIndex((x) => {
            return x.model_name === this.formModel.params.model_name;
          });
          if (index >= 0) {
            this.argOptions = _.cloneDeep(
              this.modelOptions[index].code_info.args
            );
            this.metricOptions = _.cloneDeep(
              this.modelOptions[index].code_info.metrics
            );
            this.pretrainOptions = _.cloneDeep(
              this.modelOptions[index].pretrain_info
            );
            // this.formModel.params.retrain =
            //   this.modelOptions[index].trainable === 1 ? true : false
            this.modelTrainable =
              this.modelOptions[index].trainable === 1 &&
              this.modelOptions[index].source === 0;
          } else {
            this.argOptions = [];
            this.pretrainOptions = [];
            this.metricOptions = [];
          }
        });
      } else if (this.formModel.kind && this.formModel.kind === "Decision") {
        // 条件判断
        var decisionID = this.formModel.id;
        var allData = this.root.propsAPI.save();
        var allEdges = allData.edges || [];
        var edgeIndex = allEdges.findIndex((x) => {
          return x.target === decisionID;
        });
        if (edgeIndex >= 0) {
          var previousModelID = allEdges[edgeIndex].source;
          var previousModel = this.root.propsAPI.find(previousModelID).model;
          // console.log(previousModel)
          let params = {
            task_type: keyDict[previousModel.key], // previousModel.key.toLowerCase()
          };
          getAvailableModels(params).then((res) => {
            // console.log(res.data)
            this.modelOptions = res.data.data;

            var index = this.modelOptions.findIndex((x) => {
              return x.id === previousModel.params.id;
            });
            // console.log(index)
            if (index >= 0) {
              this.metricOptions = _.cloneDeep(
                this.modelOptions[index].metrics
              );
            } else {
              this.metricOptions = [];
            }
          });
        } else {
          this.metricOptions = [];
          // 换过模型以后重置
          this.formModel.params.requirement = Object.assign(
            this.formModel.params.requirement,
            {
              name: "",
              value: "",
              type: "",
              description: "",
            }
          );

          var item = this.root.propsAPI.getSelected()[0];
          this.root.propsAPI.executeCommand(() => {
            this.root.propsAPI.update(item, this.formModel);
          });
        }
      } else if (this.formModel.kind && this.formModel.kind === "Dataset") {
        // 数据集
        // getDatasetsList().then(res => {
        //   if(res.data.meta.status === 200){
        //     this.datasetOptions = res.data.data
        //     console.log(this.datasetOptions)
        //   }
        // }).catch(err => {
        // console.log(err)
        // })
        getPublicDatasets()
          .then((res) => {
            this.publicDatasets = res.data;

            getMyDatasets()
              .then((res) => {
                this.myDatasets = res.data;

                // 去除公开数据集中自己上传的
                let a = _.remove(this.publicDatasets, function (dataset) {
                  let index = res.data.findIndex((item) => {
                    return item.id === dataset.id;
                  });
                  // console.log(index)
                  return index >= 0;
                });
                // console.log(a)
                var index = this.publicDatasets.findIndex((item) => {
                  return item.id === this.formModel.params.id;
                });
                if (index >= 0) {
                  this.datasetLabel = this.publicDatasets[index].dataset_name;
                } else {
                  index = this.myDatasets.findIndex((item) => {
                    return item.id === this.formModel.params.id;
                  });
                  if (index >= 0) {
                    this.datasetLabel = this.myDatasets[index].dataset_name;
                  }
                }
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else if (this.type === "edge") {
      // 当元素为边节点
      const sourceModel = this.root.propsAPI.find(this.formModel.source).model;
      // console.log(sourceModel)
      if (
        sourceModel &&
        sourceModel.type === "node" &&
        sourceModel.kind === "Decision"
      ) {
        this.fromDecision = true;
      }
    }
  },

  computed: {
    ...mapState("dataset", {
      my_datasets: (state) => state.my_datasets,
    }),
    // filterOptions: function () {
    //   // `this` 指向 vm 实例
    //   return this.message.split('').reverse().join('')
    // }
  },

  methods: {
    newGotoUpload() {
      let routeUrl = this.$router.resolve({
        name: 'Dataset',
        // query: { task: task, industry: industry },
      })
      window.open(routeUrl.href, '_blank')
    },
    newFreshDataset() {
      getPublicDatasets()
        .then((res) => {
          this.publicDatasets = res.data;

          getMyDatasets()
            .then((res) => {
              this.myDatasets = res.data;

              // 去除公开数据集中自己上传的
              let a = _.remove(this.publicDatasets, function (dataset) {
                let index = res.data.findIndex((item) => {
                  return item.id === dataset.id;
                });
                // console.log(index)
                return index >= 0;
              });
              // console.log(a)
              var index = this.publicDatasets.findIndex((item) => {
                return item.id === this.formModel.params.id;
              });
              if (index >= 0) {
                this.datasetLabel = this.publicDatasets[index].dataset_name;
              } else {
                index = this.myDatasets.findIndex((item) => {
                  return item.id === this.formModel.params.id;
                });
                if (index >= 0) {
                  this.datasetLabel = this.myDatasets[index].dataset_name;
                }
              }
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    ////
    filter(modelOptions) {
      if (!this.formModel.params.meta.filter_flag) return modelOptions;
      // else {
      //   let newOptions = []
      //   modelOptions.forEach((op) => {
      //     if (_.endsWith(op.task, this.filter_value)) newOptions.push(op)
      //   })
      //   return newOptions
      // }
      return modelOptions.filter((op) => op.task.includes(this.filter_value));
    },
    // 对话框
    handleSelectModel() {
      this.modelDialogVisible = true;
    },
    handleSelectDataset() {
      this.datasetDialogVisible = true;
    },
    handleSelectPretrain() {
      this.pretrainDialogVisible = true;
    },
    handleChangeRetrain(val) {
      this.formModel.params.pretrain_name = "";
      this.formModel.params.pretrain_path = "";
      this.formModel.params.categories = "knife,scissors,lighter,zippooil,pressure,slingshot,handcuffs,nailpolish,powerbank,firecrackers";
      this.formModel.params.belong_to = "";
    },
    handleConfirmModel(model_name) {
      var index = this.modelOptions.findIndex((x) => {
        return x.model_name === model_name;
      });

      let model = this.modelOptions[index];
      this.formModel.params.id = model.code_id;
      this.formModel.params.model_name = model.model_name;
      this.formModel.params.source = model.source;
      this.formModel.params.retrain =
        model.trainable === 1 && model.source === 0;
      this.modelTrainable = model.trainable === 1 && model.source === 0;
      // console.log(this.modelTrainable)
      this.formModel.params.pretrain_name = "";
      this.formModel.params.pretrain_path = "";
      // this.formModel.params.belong_to = ""

      this.argOptions = _.cloneDeep(model.code_info.args);
      this.metricOptions = _.cloneDeep(model.code_info.metrics);
      this.formModel.params.args = _.cloneDeep(this.argOptions);
      this.pretrainOptions = _.cloneDeep(model.pretrain_info);
      this.modelDialogVisible = false;
    },
    handleConfirmPretrain(index) {
      let pretrain = this.pretrainOptions[index];
      this.formModel.params.pretrain_name = pretrain.pretrain_name;
      this.formModel.params.pretrain_path = pretrain.file;

      if (!this.formModel.params.retrain)
        this.formModel.params.categories = this.pretrainOptions[
          index
        ].categories;

      // 补丁 文本识别
      if (this.formModel.key === "TEXT_DETECTION")
        this.formModel.params.categories = "text";

      this.pretrainDialogVisible = false;
    },
    handleNotUsePretrain() {
      this.formModel.params.pretrain_name = "";
      this.formModel.params.pretrain_path = "";
      // this.formModel.params.belong_to = ""

      // 补丁 文本识别
      if (this.formModel.key === "TEXT_DETECTION")
        this.formModel.params.categories = "text";
      // else this.formModel.params.categories = ""

      this.pretrainDialogVisible = false;
    },
    handleConfirmDataset(item) {
      this.formModel.params.id = item.id;
      this.formModel.params.is_annotated = item.is_annotated;
      this.datasetLabel = item.dataset_name;

      this.datasetDialogVisible = false;
    },
    // 条件判断类型用的
    handleMetricOptionChange(name) {
      var index = this.metricOptions.findIndex((x) => {
        return x.name === name;
      });
      // console.log(index)
      if (index >= 0) {
        this.formModel.params.requirement = Object.assign(
          this.formModel.params.requirement,
          this.metricOptions[index]
        );
      }
    },
    // 其他
    // handleModelChange(id) {
    //   var index = this.modelOptions.findIndex(x => {
    //     return x.id === id
    //   })
    //   // console.log(index)
    //   if (index >= 0) { this.argOptions = _.cloneDeep(this.modelOptions[index].args) } else { this.argOptions = [] }
    //   this.formModel.params.args = _.cloneDeep(this.argOptions)
    // },
    restoreDefault() {
      // console.log(this.argOptions)
      this.formModel.params.args = _.cloneDeep(this.argOptions);
    },
    handleSubmit(e) {
      const { getSelected, executeCommand, update } = this.root.propsAPI;
      const { formModel } = this;

      if (this.type === "node") {
        // 调试用id ////////////////////////////
        // formModel.label = formModel.id
      } else if (this.type === "edge" && this.fromDecision) {
        formModel.label = formModel.cond;
      }

      //

      setTimeout(() => {
        const item = getSelected()[0];
        if (!item) return;

        // 自动调整尺寸
        const adjustSize = (model) => {
          if (model.type !== "node" || model.shape !== "flow-rect") {
            return model;
          }
          const canvas = document.createElement("canvas");
          const canvasContext = canvas.getContext("2d");
          canvasContext.font = this.fontSize + "px System";
          const maxWidth = this.maxNodeWidth;
          const label = model.label.replace("\n", "");
          const sourceWidth = this.defaultNodeWidth;
          const sourceHeight = this.defaultNodeHeight;
          const spacing = 10;
          model.size = `${sourceWidth}*${sourceHeight}`; // 先恢复默认尺寸

          if (
            canvasContext.measureText(label).width + spacing <= sourceWidth ||
            sourceWidth >= maxWidth
          ) {
            return model;
          }

          // 自动撑宽
          if (canvasContext.measureText(label).width + spacing <= maxWidth) {
            return {
              ...model,
              size: `${canvasContext.measureText(label).width + spacing
                }*${sourceHeight}`,
            };
          }

          // 自动折行
          let multilineText = "";
          let multilineCount = 1;
          let multilineTextWidth = 0;

          for (const char of label) {
            const { width } = canvasContext.measureText(char);

            if (multilineTextWidth + width + spacing >= maxWidth) {
              multilineText += "\n";
              multilineTextWidth = 0;
              multilineCount++;
            }

            multilineText += char;
            multilineTextWidth += width;
          }

          return {
            ...model,
            label: multilineText,
            size: `${maxWidth}*${Math.max(
              sourceHeight,
              this.fontSize * multilineCount * 1.2 + spacing
            )}`,
          };
        };

        const newFormModel = adjustSize(formModel);

        // console.log(newFormModel)

        executeCommand(() => {
          // console.log(item)
          // console.log(newFormModel)
          update(item, newFormModel);
        });
        this.configDialogVisible = false;

        // 换过模型以后重置
        if (this.type === "node" && formModel.kind === "Algorithm") {
          // 条件判断
          let algorithmID = this.formModel.id;
          let allData = this.root.propsAPI.save();
          let allEdges = allData.edges || [];
          let edgeIndex = allEdges.findIndex((x) => {
            return x.source === algorithmID;
          });
          if (edgeIndex >= 0) {
            let nextModelID = allEdges[edgeIndex].target;
            let nextItem = this.root.propsAPI.find(nextModelID);
            let nextModel = nextItem.model;
            // console.log(nextModel)
            if (nextModel.kind === "Decision") {
              nextModel.params.requirement = Object.assign(
                nextModel.params.requirement,
                {
                  name: "",
                  value: "",
                  type: "",
                  description: "",
                }
              );
              executeCommand(() => {
                update(nextItem, nextModel);
              });
            }
          }
        } else if (this.type === "edge") {
          // 条件判断
          let edgeID = this.formModel.id;
          let allData = this.root.propsAPI.save();
          let allNodes = allData.nodes || [];
          let nodeIndex = allNodes.findIndex((x) => {
            return x.id === this.formModel.target;
          });
          if (nodeIndex >= 0) {
            let targetModelID = allNodes[nodeIndex].id;
            let targetItem = this.root.propsAPI.find(targetModelID);
            let targetModel = targetItem.model;

            if (targetModel.kind === "Decision") {
              targetModel.params.requirement = Object.assign(
                targetModel.params.requirement,
                {
                  name: "",
                  value: "",
                  type: "",
                  description: "",
                }
              );
              executeCommand(() => {
                update(targetItem, targetModel);
              });
            }
          }
        }
        this.$message.success('保存成功')
      }, 0);
    },
  },
};
</script>

<style lang="less" scoped>
.select-head-text {
  margin-bottom: 20px;
  font-size: 16px;
}

.select-list {
  margin: 0 10px;

  .select-list-item {
    vertical-align: top;
    display: inline-block;
    margin-right: 20px;
    margin-bottom: 20px;
    cursor: pointer;

    /deep/ .el-card__header {
      background-color: #f4f4f4;
      padding: 10px 16px;
    }

    /deep/ .el-form-item {
      margin: 0 0;

      .el-form-item__label {
        line-height: 25px;
      }

      .el-form-item__content {
        line-height: 25px;
        margin-left: 40px;
      }
    }
  }
}

.detail-form {
  font-size: 14px;

  // margin: 0 120px 0 0;
  /deep/ .el-collapse-item__wrap {
    background-color: #fafafa;
  }

  .el-form-item {
    margin: 6px 0 6px 0;

    .el-input {
      margin: 2px 0 2px 0;
    }

    .el-radio {
      margin: 0 5px 0 5px;
    }

    .el-select {
      // margin: 3px 0 3px 0;
    }

    .el-switch {
      margin: 0 0 3px 0;
    }
  }

  .el-divider {
    margin: 0 0;
  }
}
</style>

<style scoped>
.el-select .el-input {
  width: 130px;
}

.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>
