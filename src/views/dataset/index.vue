<!--  Copyright 2020 Zhejiang Lab. All Rights Reserved.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================
-->

<template>
  <div>
    <el-tabs class="el-tab" v-model="activeName" @tab-click="handleTabClick">
      <el-tab-pane label="我的数据集" name="first">
        <my-datasets />
      </el-tab-pane>
      <el-tab-pane label="公开数据集" name="second">
        <public-datasets />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import MyDatasets from "@/views/dataset/my_datasets/index.vue"
import PublicDatasets from "@/views/dataset/public_datasets/index.vue"
export default {
  name: "Dataset",
  components: {
    MyDatasets,
    PublicDatasets
  },
  data() {
    return {
      activeName: 'first'
    }
  },
  methods: {
    handleTabClick() { }
  }
};
</script>
<style lang="less" scoped>
.el-tab {
  /deep/ .el-tabs__item {
    font-size: 18px;
    color: rgba(69, 90, 100, 0.65);
    font-weight: 400;

    &.is-active {
      color: rgba(25, 118, 210, 1);
    }
  }
}

/deep/ .el-tabs__header {
  margin-bottom: 24px;
}
</style>
