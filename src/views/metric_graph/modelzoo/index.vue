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
  <b-container>
    <div class="input-group mb-3">
      <!-- <b-form-group class="mb-3"> -->
      <div class="input-group-prepend">
        <span class="input-group-text" id="basic-addon1">
          <i class="fa fa-search"></i>
        </span>
      </div>
      <b-form-input
        type="text"
        v-model="model_search"
        class="form-control"
        placeholder="搜索"
        aria-label="搜索"
        aria-describedby="basic-addon1"
      />
    </div>
    <!-- </b-form-group> -->
    <hr class="divider" />

    <div v-if="Object.keys(graphs).length>0" class="row">
      <div
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
              <!-- text-align:center -->
              <div style="margin-top: 8px; margin-bottom: 2px; margin-left: 25px">  
                 <el-button size="mini" plain @click="vis_structure(item.tags.name)">查看模型结构</el-button>
              </div>
            </b-list-group>
          </b-popover>
        </div>
      </div>
    </div>
  </b-container>
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
    metric_names: function(newVal, oldVal) {
      let params = [];
      params.push(newVal[0]);
      this.$store.dispatch("metric_graph/getGraphs", params);
    }
  },
  data: function() {
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
    vis_structure(name){
      console.log(name);

      let routeUrl = "http://10.214.211.207:15000/?modelFile=" + name;
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