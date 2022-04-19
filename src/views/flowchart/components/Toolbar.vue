<template>
  <toolbar class="toolbar">
    <template v-if="!readOnly">
      <toolbar-button command="undo" text="撤销" />
      <toolbar-button command="redo" text="重做" />
      <toolbar-button command="copy" text="复制" />
      <toolbar-button command="paste" text="粘贴" />
      <div class="split" />
    </template>
    <toolbar-button command="zoomIn" icon="zoom-in" text="放大" />
    <toolbar-button command="zoomOut" icon="zoom-out" text="缩小" />
    <toolbar-button command="autoZoom" icon="fit" text="自适应" />
    <toolbar-button command="resetZoom" icon="actual-size" text="实际尺寸" />
    <template v-if="!readOnly">
      <div class="split" />
      <toolbar-button command="toBack" icon="to-back" text="向下一层" />
      <toolbar-button command="toFront" icon="to-front" text="向上一层" />
      <toolbar-button command="addGroup" icon="group" text="编组" />
      <toolbar-button command="unGroup" icon="ungroup" text="取消编组" />
      <toolbar-button command="selectAll" icon="select-all" text="全选" />
      <toolbar-button command="multiSelect" icon="select" text="框选" />
      <div class="split" />
      <toolbar-button command="delete" text="删除" />
      <toolbar-button command="clear" icon="clear" text="清空画布" />
    </template>
    <!-- right toolbar button -->
    <div class="pull-right">
      <!-- <input id="contentFile" type="file" accept="application/json"> -->
      <!-- <input id="file" type="file" name="file" class="inputfile">
      <el-button plain size="mini" style="margin-top:8px">
        {{ readOnly ? '编辑模式' : '只读模式' }}
      </el-button> -->
      <template v-if="!readOnly">
        <label class="click-upload">
          <icon type="iconload" title="加载参数" />
          <input id="file" type="file" name="file" accept="application/json" @change="loadChartFromFile">
          <span>加载参数</span>
        </label>
      </template>

      <!-- <toolbar-button
        command="loadData"
        icon="load"
        text="加载数据"
        label="加载数据"
      /> -->
      <toolbar-button
        command="generateData"
        icon="json"
        text="下载参数"
        label="下载参数"
      />
      <toolbar-button
        command="downloadImage"
        icon="image"
        text="下载图像"
        label="下载图像"
      />
      <template v-if="!readOnly">
        <toolbar-button
          command="uploadServer"
          icon="upload"
          text="上传"
          label="上传"
        />
      </template>
      <!-- <el-button plain size="mini" style="margin-top:8px" @click.prevent="handleToggleReadOnly">
        {{ readOnly ? '编辑模式' : '只读模式' }}
      </el-button> -->
    </div>
  </toolbar>
</template>

<script>
import { Toolbar } from 'vue-flowchart-editor'
import ToolbarButton from './ToolbarButton'
import Icon from './Icon'

export default {
  name: 'FlowToolbar',

  components: {
    Toolbar,
    ToolbarButton,
    Icon
  },

  props: {
    chartData: {
      type: Object,
      default: null
    },
    toggleReadOnly: {
      type: Boolean,
      default: false
    },
    readOnly: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    loadChartFromFile(ev) {
      const file = ev.target.files[0]
      const reader = new FileReader()

      reader.onload = e => this.$emit('load-data', e.target.result)
      reader.readAsText(file)
    },
    generateData() {
      console.log(JSON.stringify(this.chartData))
    },
    handleToggleReadOnly() {
      // ugly
      this.$parent.$parent.$parent.$parent.$parent.$emit('toggle-read-only')
    }
  }
}
</script>

<style lang="less">

a{text-decoration:none}

/*示例二*/
// .clickUpload2{position:relative;display:inline-block;padding:5px 10px;background:#d0eeff;border:1px solid #99d3f5;border-radius:5px;overflow:hidden;color:#1e88c7;}
// .clickUpload2 input{position:absolute;font-size:100px;right:0;top:0;opacity:0;filter:alpha(opacity=0);cursor:pointer;}
// .clickUpload2:hover{background:#aadffd;border-color:#78c3f3;color:#004974;}

  // .clickUpload2 {
  //   display: flex;
  //   color: #333;

  //   input{position:absolute;font-size:100px;right:0;top:0;opacity:0;filter:alpha(opacity=0);cursor:pointer;}

  //   i {
  //     display: block;
  //     width: 27px;
  //     height: 27px;
  //     margin: 0 6px;
  //     padding-top: 10px;
  //     text-align: center;
  //     border: 1px solid #fff;
  //     cursor: pointer;
  //   }

  //   span {
  //     display: block;
  //     font-size: 12px;
  //     padding-top: 10px;
  //     margin-left: -6px;
  //     padding-right: 6px;
  //     line-height: 20px;
  //     cursor: pointer;
  //   }

  //   &:hover {
  //     color: #1890ff;
  //   }
  // }

</style>

<style lang="less">
.toolbar {
  display: flex;
  align-items: center;
  height: 27px;

  .split {
    width: 10px;
    height: 100%;
    border-right: 1px solid #eee;
    margin-right: 10px;
  }

  .pull-right {
    display: flex;
    align-items: center;
    margin-left: auto;
  }

  .click-upload{
    display: flex;
    color: #333;
    font-weight: normal;
    //     border: 1px solid #ccc;
    // display: inline-block;
    // padding: 6px 12px;
    // cursor: pointer;

    input[type="file"] {
        display: none;
    }

    i {
      display: block;
      width: 27px;
      height: 27px;
      margin: 0 6px;
      padding-top: 10px;
      text-align: center;
      border: 1px solid #fff;
      cursor: pointer;
    }

    span {
      display: block;
      font-size: 12px;
      padding-top: 10px;
      margin-left: -6px;
      padding-right: 6px;
      line-height: 20px;
      cursor: pointer;
    }

    &:hover {
      color: #1890ff;
    }

  }

  .command {
    display: flex;
    color: #333;

    i {
      display: block;
      width: 27px;
      height: 27px;
      margin: 0 6px;
      padding-top: 10px;
      text-align: center;
      border: 1px solid #fff;
      cursor: pointer;
    }

    span {
      display: block;
      font-size: 12px;
      padding-top: 10px;
      margin-left: -6px;
      padding-right: 6px;
      line-height: 20px;
      cursor: pointer;
    }

    &:hover {
      color: #1890ff;
    }
  }

  .disable {
    color: rgba(0, 0, 0, 0.25);
    i {
      cursor: not-allowed;
    }

    span {
      cursor: not-allowed;
    }

    &:hover {
      color: rgba(0, 0, 0, 0.25);
    }
  }
}
</style>
