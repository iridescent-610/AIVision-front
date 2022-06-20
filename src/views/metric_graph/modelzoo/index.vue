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
    <el-input v-model="model_search" class="input-container" placeholder="搜索">
      <template slot="prepend">
        <svg-icon class="menu-icon" svg-name="search_icon" />
      </template>
      <el-button class="search-button" slot="append" type="primary" @click="get_model">搜索</el-button>
    </el-input>
    <el-row :gutter="20" class="card-list">
      <el-col :span="8" v-for="(item, index) in get_model(model_search)" :key="item.tags.name">
        <div class="card-container">
          <div class="title">{{ item.tags.name }}</div>
          <div class="desc">{{ item.tags.readme }}</div>
          <div class="tag-list">
            <div class="tag" v-for="(attr, index) in get_attr(item.tags)" :key="index + attr">{{ attr }}:
              {{ get_value(item.tags, attr) }}</div>
          </div>
          <b-button class="detail-button" :id="'b_' + index" variant="outline-secondary">详情</b-button>
        </div>
        <b-popover :target="'b_' + index" title="Model Properties" triggers="focus" :placement="judge_position(index)">
          <b-list-group>
            <div v-for="attr in get_attr(item.tags)" :key="item + attr">

              <span v-if="attr != 'readme'">{{ attr }}
                : {{ get_value(item.tags, attr) }}</span>
            </div>
            <div>
              <span>URL: </span>
              <a target="_blank" :href="item.tags.url">homepage</a>
            </div>
            &lt;!&ndash; text-align:center &ndash;&gt;
            <div style="margin-top: 8px; margin-bottom: 2px; margin-left: 25px">
              <el-button size="mini" plain @click="vis_structure(item.tags.name)">查看模型结构</el-button>
            </div>
          </b-list-group>
        </b-popover>
      </el-col>
    </el-row>
    <div class="card-list">
      <!--      <div
        v-for="(item, index) in get_model(model_search)"
        :key="index"
        :value="item.tags.id"
        class="col-md-6"
      >
        <div class="card mb-4 shadow-sm">
          <div class="card-body text-center">
            <h5 class="card-title">
              <b>{{item.tags.name}}</b>
            </h5>
            <hr class="divider" />
            <p v-if="item.tags.readme" class="card-text">{{item.tags.readme}}</p>

            <b-badge
              v-for="attr in get_attr(item.tags)"
              pill
              variant="primary"
              :key="index+attr"
              style="marginRight: 2px"
            >
              <div
                v-if="attr==='task'||attr==='dataset'||attr==='num_params'"
              >{{attr}}: {{get_value(item.tags, attr)}}</div>
            </b-badge>

          </div>
          <b-button :id="'b_'+index" variant="outline-secondary">详情</b-button>
          <b-popover
            :target="'b_'+index"
            title="Model Properties"
            triggers="focus"
            :placement="judge_position(index)"
          >
            <b-list-group>
              <div v-for="attr in get_attr(item.tags)" :key="item+attr">

                <b v-if="attr!='readme'">{{attr}}
                : {{get_value(item.tags, attr)}}</b>
              </div>
              <div>
                <b>URL: </b>
                <a target="_blank" :href="item.tags.url">homepage</a>
              </div>
              &lt;!&ndash; text-align:center &ndash;&gt;
              <div style="margin-top: 8px; margin-bottom: 2px; margin-left: 25px">
                 <el-button size="mini" plain @click="vis_structure(item.tags.name)">查看模型结构</el-button>
              </div>
            </b-list-group>
          </b-popover>
        </div>
      </div>-->
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  name: "modelzoo",
  computed: {
    ...mapState("metric_graph", {
      errors: state => state.errors,
      metric_names: state => state.metric_names,
      graphs: state => state.graphs
    })
  },
  created() {
    this.$store.dispatch("metric_graph/getMetricNames");
    this.$store.dispatch("metric_graph/getGraphs", [this.metric_names[0]]);
  },
  watch: {
    metric_names: function (newVal, oldVal) {
      let params = [];
      params.push(newVal[0]);
      this.$store.dispatch("metric_graph/getGraphs", params);
    }
  },
  data: function () {
    return {
      model_search: ""
    };
  },
  methods: {
    ...mapActions("metric_graph", ["getMetricNames", "getGraphs"]),
    get_model(model_search) {
      // Compute the search criteria
      if (model_search === "") {
        return this.graphs.nodes;
      } else {
        const criteria = this.getCriteria(model_search);
        const candidates = this.graphs.nodes.filter(
          candi => candi.tags.name.indexOf(model_search) != -1
        );
        return candidates;
      }
    },
    getCriteria(search) {
      // Compute the search criteria
      return search.trim().toLowerCase();
    },
    get_attr(item) {
      // Compute the search criteria
      return Object.keys(item).filter(k => k != "id" && k != "url");
    },
    get_value(item, attr) {
      return item[attr];
    },
    judge_position(index) {
      if (index % 2 === 0) {
        return "lefttop";
      }
      return "righttop";
    },
    vis_structure(name) {
      console.log(name);

      // localhost:15000
      let routeUrl = "/aivision/netron/?modelFile=" + name;
      // let routeUrl = this.$router.resolve({
      //   name: 'Multiple Task',
      //   params: { flowchart_id: this.chartId, node_id: model.id },
      // })

      window.open(
        routeUrl,   // routeUrl.href, // 'https://www.baidu.com/',
        '_blank' // <- This is what makes it open in a new window.
      )

    }
  }
};
</script>
<style lang="scss" scoped>
.input-container {
  margin-bottom: 24px;
  border: 1px solid rgba(207, 216, 220, 1);
  border-radius: 4px;
  width: 100%;
  height: 32px;

  ::v-deep input {
    border: unset;
    font-size: 14px;
    padding-left: 0;
    width: 100%;
    height: 32px;
  }

  .menu-icon {
    height: 20px;
    width: 20px;
  }

  ::v-deep .el-input-group__prepend {
    background-color: unset;
    border: unset;
    padding: 0 8px 0 12px;
  }

  ::v-deep .el-input-group__append {
    background-color: unset;
    border: unset;
  }

  .search-button {
    color: #fff;
    background-color: rgba(25, 118, 210, 1);
    height: 34px;
    line-height: 32px;
    padding: 0 12px;
    width: 52px;
    position: relative;
    top: -1px;
    right: -1px;
    border-radius: unset;
    border-bottom-right-radius: 4px;
    border-top-right-radius: 4px;
  }
}

.card-list {
  .card-container {
    height: 258px;
    border: 1px solid rgba(207, 216, 220, 1);
    border-radius: 4px;
    margin-bottom: 20px;

    .title {
      padding: 0 24px;
      height: 31px;
      background: rgba(207, 216, 220, 0.35);
      line-height: 31px;
      color: rgba(73, 93, 103, 1);
    }

    .desc {
      padding: 18px 24px;
      color: rgba(73, 93, 103, 1);
      line-height: 24px;
      height: 98px;
    }

    .tag-list {
      display: flex;
      flex-wrap: wrap;
      height: 66px;
      overflow: hidden;
      padding: 0 24px;
    }

    .tag {
      height: 25px;
      background: rgba(73, 93, 103, 0.1);
      padding: 0 12px;
      border-radius: 2px;
      margin-right: 8px;
      margin-bottom: 8px;
      line-height: 25px;
      color: rgba(69, 90, 100, 0.65);
      font-size: 12px;
    }

    .detail-button {
      margin-left: 24px;
      color: rgba(25, 118, 210, 1);
      border: 1px solid rgba(25, 118, 210, 1);
      height: 32px;
      line-height: 32px;
      padding: 0 12px;
      margin-top: 8px;
      border-radius: 2px;
      font-weight: normal;

      &:hover {
        background-color: rgba(25, 118, 210, 1);
        color: #fff;
      }
    }
  }
}
</style>
