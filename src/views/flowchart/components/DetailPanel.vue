<template>
  <detail-panel class="detail-panel">
    <template v-slot="{ status }">
      <node-panel :status="status">
        <detail-form type="node"
                     :read-only="readOnly"
                     :industry="industry" />
      </node-panel>
      <edge-panel :status="status">
        <detail-form type="edge"
                     :read-only="readOnly" />
      </edge-panel>
      <group-panel :status="status">
        <detail-form type="group"
                     :read-only="readOnly" />
      </group-panel>
      <multi-panel :status="status" />
      <canvas-panel :status="status" />
    </template>
  </detail-panel>
</template>

<script>
import {
  NodePanel,
  EdgePanel,
  GroupPanel,
  MultiPanel,
  CanvasPanel,
  DetailPanel,
} from 'vue-flowchart-editor'
import DetailForm from './DetailForm'

export default {
  name: 'EditorDetailPanel',
  components: {
    NodePanel,
    EdgePanel,
    GroupPanel,
    MultiPanel,
    CanvasPanel,
    DetailPanel,
    DetailForm,
  },

  props: {
    readOnly: {
      type: Boolean,
      default: true,
    },
    industry: {
      type: String,
      default: 'general',
    },
  },
}
</script>

// <style lang="less">
// .detail-panel {
//   box-sizing: border-box;
//   position: relative;
//   // top: 45px;
//   // bottom: 0;
//   // left: 0;
//   // width: 150px;
//   padding: 10px;
//   text-align: center;
//   overflow-y: auto;

//   .item {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     font-size: 12px;
//     margin-left: auto;
//     margin-right: auto;
//     margin-bottom: 10px;
//     user-select: none;

//     &.item-flow-rect {
//       width: 100px;
//       height: 50px;
//       border: 1px solid rgb(24, 144, 255);
//       background-color: rgba(24, 144, 255, 0.2);
//     }

//     &.item-flow-circle {
//       width: 70px;
//       height: 70px;
//       border-radius: 60px;
//       border: 1px solid rgb(250, 140, 22);
//       background-color: rgba(250, 140, 22, 0.2);
//     }

//     &.item-flow-rhombus {
//       width: 70px;
//       height: 70px;
//       margin: 25px auto;
//       border: 1px solid rgb(19, 194, 194);
//       background-color: rgba(19, 194, 194, 0.2);
//       transform: rotate(45deg);

//       span {
//         transform: rotate(-45deg);
//       }
//     }

//     &.item-img {
//       max-width: 100px;
//     }
//   }
// }
//
</style>
