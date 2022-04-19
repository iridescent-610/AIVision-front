<template>
  <item-panel class="item-panel">
    <div class="my-collapse">
      <el-collapse>
        <el-collapse-item v-for="(value, key) in nodeItems" :key="key">
          <template slot="title">
            <b> {{ transDict[key] || key }} </b>
          </template>

          <div class="module-list">
            <div
              v-for="(item, index) in value"
              :key="index"
              class="module-list-item"
            >
              <item
                :key="index"
                :type="item.type || 'node'"
                :size="item.size || '80*48'"
                :shape="item.shape || 'flow-rect'"
                :model="{
                  // must have model property
                  color: item.model.color || '#1890FF',
                  label: item.model.label || '节点',
                  ...item.model,
                }"
              >
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="item.model.description"
                  placement="bottom-end"
                >
                  <template v-if="item.src">
                    <div class="item item-img">
                      <img :src="item.src" :alt="item.model.label" />
                    </div>
                  </template>
                  <template v-else>
                    <div
                      :class="
                        'item item-' +
                        (item.model.kind.toLowerCase() || 'algorithm')
                      "
                    >
                      <span>{{ item.model.label || "节点" }}</span>
                    </div>
                  </template>
                </el-tooltip>
              </item>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>

    <!-- </item-panel></template> -->
  </item-panel>
</template>

<script>
import { Item, ItemPanel } from "vue-flowchart-editor";
import _ from "lodash";
import { transDict } from "../translate";

export default {
  name: "EditorItemPanel",
  components: { ItemPanel, Item },
  props: {
    // all nodes for drag to generate flowchart
    nodeItems: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      transDict: transDict,
      drawer: false,
      direction: "ltr",
    };
  },
  methods: {
    handleClick(event) {
      //
    },
    chunkedNodeItems(nodeItems) {
      return _.chunk(nodeItems, 2);
    },
  },
};
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

  .module-list {
    // overflow-y: scroll;
    padding-top: 13px;
    width: 100%;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    float: left;
  }
  .module-list-item {
    display: inline-block;
    // float: left;
    // margin-right: 10px;
    margin-bottom: 5px;
    padding-right: 7px;
    padding-left: 7px;
  }

  .item {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 10px;
    user-select: none;

    &.item-algorithm {
      width: 84px;
      height: 42px;
      margin-top: 10px;
      border: 1px solid rgb(24, 144, 255);
      background-color: rgba(24, 144, 255, 0.2);
    }

    &.item-userupload {
      width: 84px;
      height: 42px;
      margin-top: 10px;
      border: 1px solid rgb(65, 105, 225);
      background-color: rgba(65, 105, 225, 0.2);
    }

    &.item-dataset {
      width: 84px;
      height: 42px;
      margin-top: 10px;
      // border-radius: 60px;
      border-radius: 60px~ "/" 30px;
      border: 1px solid rgb(0, 128, 0);
      background-color: rgba(0, 128, 0, 0.2);
    }

    &.item-endpoint {
      width: 64px;
      height: 64px;
      border-radius: 60px;
      border: 1px solid rgb(255, 140, 0);
      background-color: rgba(255, 140, 0, 0.2);
    }

    &.item-decision {
      width: 64px;
      height: 64px;
      margin: auto;
      border: 1px solid rgb(142, 68, 173); //rgb(255, 0, 0);
      background-color: rgba(142, 68, 173, 0.2); //rgba(255, 0, 0, 0.2);
      transform: scaleY(0.5) rotate(45deg);

      span {
        transform: rotate(-45deg) scaleY(2);
      }
    }

    //   &.item-flow-rhombus {
    //     width: 70px;
    //     height: 40px;
    //     border: 1px solid rgb(255, 0, 194);
    //     background-color: rgba(19, 194, 194, 0.2);
    // /* Rotate */
    //     -webkit-transform: rotate(-45deg);
    //     -moz-transform: rotate(-45deg);
    //     -ms-transform: rotate(-45deg);
    //     -o-transform: rotate(-45deg);
    //     transform: rotate(-45deg);
    // /* Rotate Origin */
    //     -webkit-transform-origin: 0 100%;
    //     -moz-transform-origin: 0 100%;
    //     -ms-transform-origin: 0 100%;
    //     -o-transform-origin: 0 100%;
    //     transform-origin: 0 100%;
    //     margin: 25px auto;

    //     span {
    //       transform: rotate(45deg);
    //     }

    //   }

    &.item-img {
      max-width: 100px;
    }
  }
}
</style>

<style>
.collapsible {
  background-color: #777;
  color: white;
  cursor: pointer;
  padding: 18px;
  width: 100%;
  border: none;
  text-align: left;
  outline: none;
  font-size: 15px;
}

.active,
.collapsible:hover {
  background-color: #555;
}

.content {
  padding: 0 18px;
  display: none;
  overflow: hidden;
  background-color: #f1f1f1;
}
</style>
