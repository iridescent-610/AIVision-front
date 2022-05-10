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
 <div class="vis-container">
   <div id="graphdiv" class="graphdiv" style="z-index: -100" >
     <!-- 只贴出item部分 -->
     <div class="chartTooltip">
       <strong class="name"></strong>
     </div>
   </div>
   <b-row style="margin-left: 10px">
     <el-select v-model="item_value" @change="handler()" placeholder="请选择属性图">
       <el-option
           v-for="item in metric_names"
           :key="item"
           :label="item"
           :value="item">
       </el-option>
     </el-select>
   </b-row>
 </div>
</template>

<script>
  import { mapState, mapActions, mapMutations } from "vuex";
  import * as d3 from 'd3';
  // import jsonData from '../assets/json/test_graph.json';
  export default {
    name: "VisGraph",
    computed: {
      ...mapState("metric_graph", {
        errors: state => state.errors,
        metric_names: state => state.metric_names,
        graphs: state => state.graphs,
      })
    },
    data:function(){
      return {
        list_items:[],
        item_value:[]
      };
    },
    watch:{
      metric_names:function(newVal,oldVal){
         //alert("metric_names的数据改变了")
         let params = []
         params.push(newVal[0])
         this.$store.dispatch("metric_graph/getGraphs",params)
      },
      graphs:function(newVal,oldVal){
        var graph_data = this.parseGraph( newVal )

        //var graph_data = newVal
        var graphDiv = document.getElementById("graphdiv");
        d3.select("svg").remove();
        var svg = d3.select(graphDiv).append("svg");
        var width = graphDiv.clientWidth;
        var height = graphDiv.clientHeight;
        svg
          .attr("width", width)
          .attr("height", height)

        let colorScale = d3.scaleOrdinal(d3.schemeCategory10)
        let marge = { top: 160, bottom: 60, left: 160, right: 60 }
        let g = svg.append('g')
        svg.call(
                d3.zoom()
                        .scaleExtent([.1, 4]) // eslint-disable-line
                        .on('zoom', function () {
                          g.attr('transform', d3.event.transform) })
        )

        let forceSimulation = d3.forceSimulation()
                .force('link', d3.forceLink())
                .force('charge', d3.forceManyBody().strength(-200))
                .force('center', d3.forceCenter(width/2, height/2-50))

        forceSimulation.nodes(graph_data.nodes).on("tick", ticked);
        forceSimulation
                .force('link')
                .links(graph_data.edges)
                .distance(function(d) {
                  //每一边的长度
                  return height/4 * d.distance+20;
                })

        let links = g.append('g')
                .selectAll('line')
                .data(graph_data.edges)
                .enter()
                .append('line')
                .attr('stroke', function(d, i) {
                  return "#12558444" //colorScale(1)
                })
                .attr('stroke-width', 2)
                .on("mouseover", d => {
                    // 从d3.event获取鼠标的位置
                    var transform = d3.event;
                    var yPosition = transform.offsetY + 20;
                    var xPosition = transform.offsetX + 20;
                    // 将浮层位置设置为鼠标位置
                    var chartTooltip = d3
                            .select(".chartTooltip")
                            .style("left", xPosition + "px")
                            .style("top", yPosition + "px");
                    // 更新浮层内容
                    chartTooltip.select(".name").html("<span style='color: firebrick'>source: "+ d.source.tags.name+"</span><br /><span style='color: forestgreen'>target: "+d.target.tags.name+"</span><br /><span style='color: deepskyblue'>distance: "+d.distance+"</span>");
                    // 移除浮层hidden样式，展示浮层
                    chartTooltip.classed("hidden", false);
                })
                .on("mouseout", () => {
                    // 添加浮层hidden样式，隐藏浮层
                    d3.select(".chartTooltip").classed("hidden", true);
                })
        let gs = g
                .selectAll('.circleText')
                .data(graph_data.nodes)
                .enter()
                .append('g')
                .attr('transform', function(d, i) {
                  var cirX = d.x
                  var cirY = d.y
                  return 'translate(' + cirX + ',' + cirY + ')'
                })
                .call(
                    d3.drag()
                      .on('start',  dragStart)
                      .on('drag',   drag)
                      .on('end',    dragEnd)
                )
         let node = gs.append('circle')
                .attr('r', function(d){
                  return d.tags.num_params/10000000 + 10;
                })
                .attr('fill', function(d, i) {
                  return "#4188B3cc";
                })
                .on("mouseover", d => {
                  // 从d3.event获取鼠标的位置
                  var transform = d3.event;
                  var yPosition = transform.offsetY + 20;
                  var xPosition = transform.offsetX + 20;
                  // 将浮层位置设置为鼠标位置
                  var chartTooltip = d3
                          .select(".chartTooltip")
                          .style("left", xPosition + "px")
                          .style("top", yPosition + "px");

                  // 更新浮层内容
                    var content = "<span style='color: #4466aa'>id: "+d.tags.id+"</span><br>"
                    content+="<span style='color: #4466aa'>name: "+d.tags.name+"</span><br>"
                    for ( const prop in d.tags){
                      if (prop=='id' || prop=='name' || prop=='readme') continue;
                      content=content+"<span style='color: #44aabb'>"+prop+": "+d.tags[prop]+"</span><br>"
                    }
                  chartTooltip.select(".name").html(content);
                  // 移除浮层hidden样式，展示浮层
                  chartTooltip.classed("hidden", false);
                })
                .on("mouseout", () => {
                  // 添加浮层hidden样式，隐藏浮层
                  d3.select(".chartTooltip").classed("hidden", true);
                }).on("click", nodeClick);

        function nodeClick(snode) {
          d3.select(this).transition()
              .duration(750)
              .style("fill", function(){
                let selected = this

                if (snode.highlighted==null)
                    snode.highlighted = false

                links.style("stroke", function(l,i){
                      if (l.highlighted==null)
                        l.highlighted=0
                      if(l.source.index==snode.index || l.target.index ==snode.index ){//当与连接点连接时变粗
                          if (snode.highlighted==false){
                            l.highlighted+=1;
                          }
                          else{
                            l.highlighted-=1;
                          }
                      }

                      if (l.highlighted>0)
                          return "#125584ff"
                      else
                          return "#12558444"
                });

                if (snode.highlighted==false){
                  snode.highlighted=true;
                  return "#225588"
                }
                else{
                  snode.highlighted=false;
                  return "#4188B3cc"
                }
              });
        }

      d3.select("svg").on("dblclick.zoom", null)
      svg.on("contextmenu", () => {
          d3.event.preventDefault();
          node.transition().duration(750).style('fill', function(n){
            n.highlighted=false;
            return "#4188B3cc"
          });
          links.style('stroke', function(l, i){
            l.highlighted=0;
            return "#12558444";
          });

      });

        gs.append('text')
                .attr('x', 0)
                .attr('y', -10)
                .attr('dy', 0)
                .text(function(d) {
                  return d.tags.name;
                }).attr('font-size',function(d){
                  return d.tags.num_params/10000000 + 10
                })
                .style('font-family', 'Arial')
                .style('pointer-events', 'none') // to prevent mouseover/drag capture
                .style('opacity', '60%')

        function ticked() {
          links
                  .attr('x1', function(d) {
                    return d.source.x
                  })
                  .attr('y1', function(d) {
                    return d.source.y
                  })
                  .attr('x2', function(d) {
                    return d.target.x
                  })
                  .attr('y2', function(d) {
                    return d.target.y
                  })
            gs.attr('transform', d => {
                return 'translate(' + d.x + ',' + d.y + ')'
            })
        }
        function dragStart(d) {
          if (!d3.event.active) {
            //设置衰减系数，对节点位置移动过程的模拟，数值越高移动越快，数值范围[0，1]
            forceSimulation.alphaTarget(0.3).restart()
          }
          d.fx = d.x
          d.fy = d.y
        }
        function drag(d) {
          d.fx = d3.event.x
          d.fy = d3.event.y
        }
        function dragEnd(d) {
          if (!d3.event.active) {
            forceSimulation.alphaTarget(0)
          }
          d.fx = null
          d.fy = null
        }
      }
    },
    methods: {
      ...mapActions("metric_graph", ["getMetricNames", "getGraphs"]),
      //定义一个边排序的函数 输入一个边信息对象的集合，输出经过topk排序之后的边信息对象集合。
      parseGraph(graph){
        //1.将边集合中的边信息对象整理成很多组，
        graph.edges = graph.edges.map( function(e){
          return {
            "source": graph.nodes[e[0]],
            "target": graph.nodes[e[1]],
            "distance": e[2],
          }
        })
        return graph
      },
      circleColor (d) {
        if (d.sex === 'M') {
          return 'blue'
        } else {
          return 'pink'
        }
      },
      linkColor (d) {
        if (d.type === 'A') {
          return 'green'
        } else {
          return 'red'
        }
      },
      handler(){
        // d3.select("svg").selectAll("g").remove()
        let params = []
        params.push(this.$refs.select.value)
        this.$store.dispatch("metric_graph/getGraphs",params)
      }
    },
    created(){
      this.$store.dispatch("metric_graph/getMetricNames")
    },
    mounted() {
      let params = []
      params.push(this.metric_names[0])
  }
  };
</script>
<style scoped>
  svg{
    margin: 0;
    padding: 0;

  }
</style>
<style>
  .chartTooltip {
    position: absolute;
    width: 400px;
    height: auto;
    padding-left: 10px;
    padding-top: -10px;
    padding-bottom: -10px;
    box-sizing: border-box;
    background-color: white;
    border-radius: 5px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.4);
    pointer-events: none;
  }
  .chartTooltip.hidden {
    display: none;
  }
  .chartTooltip p {
    margin: 0;
    font-size: 14px;
    text-align: left;
  }

  .links line {
    stroke: #999;
    stroke-opacity: 0.6;
  }
  .nodes circle {
    stroke: #fff;
    stroke-width: 1.5px;
  }

  .vis-container {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .graphdiv {
        position: absolute;
        width: 100%;
        height: 100%;
      }
</style>
