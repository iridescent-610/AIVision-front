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
    <b-form>
      <b-row>
        <b-col md="12">
          <b-form-group label="类别：" label-cols-sm="3" label-cols-lg="1" label-align="right">
            <b-form-checkbox
              v-for="item in options.tasks"
              :key="item.id"
              :value="item.id"
              v-model="task_info.tasks"
              button
              button-variant="outline-primary"
              :style="style.checkbox"
            >{{item.name}}</b-form-checkbox>
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group label="名称：" label-cols-sm="3" label-cols-lg="2" label-align="right">
            <b-form-input v-model="task_info.name" type="text" placeholder="请输入任务名称（可选）"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group label="算法：" label-cols-sm="3" label-cols-lg="2" label-align="right">
            <b-form-select v-model="task_info.algorithms">
              <option :value="null" disabled>请选择算法</option>
              <option
                v-for="item in options.algorithms"
                :key="item.id"
                :value="item.id"
              >{{item.alg_name}}</option>
            </b-form-select>
          </b-form-group>
        </b-col>
        <b-col md="12">
          <b-form-group label="数据集：" label-cols-sm="3" label-cols-lg="1" label-align="right">
            <b-form-tags v-model="task_info.datasets" no-outer-focus class="mb-2">
              <template v-slot="{ tags, disabled, addTag, removeTag }">
                <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                  <li v-for="tag in tags" :key="tag" class="list-inline-item">
                    <b-form-tag
                      @remove="removeTag(tag)"
                      :title="tag"
                      :disabled="disabled"
                      variant="primary"
                    >{{ tag }}</b-form-tag>
                  </li>
                </ul>
                <b-dropdown size="sm" variant="outline-secondary" block menu-class="w-100">
                  <template v-slot:button-content>添加数据集</template>
                  <b-dropdown-form @submit.stop.prevent="() => {}">
                    <b-form-group
                      label-for="tag-search-input"
                      label="搜索"
                      label-cols-md="auto"
                      class="mb-0"
                      label-size="sm"
                      :disabled="disabled"
                    >
                      <b-form-input
                        v-model="dataset_search"
                        id="tag-search-input"
                        type="search"
                        size="sm"
                        autocomplete="off"
                      ></b-form-input>
                    </b-form-group>
                  </b-dropdown-form>
                  <b-dropdown-divider></b-dropdown-divider>
                  <b-dropdown-item-button
                    v-for="item in availableItems(dataset_search, task_info.datasets, options.datasets)"
                    :key="item.id"
                    @click="onDatasetClick({ item, addTag })"
                  >{{ item.name }}</b-dropdown-item-button>
                  <b-dropdown-text
                    v-if="availableItems(dataset_search, task_info.datasets, options.datasets).length === 0"
                  >无匹配结果</b-dropdown-text>
                </b-dropdown>
              </template>
            </b-form-tags>
          </b-form-group>
        </b-col>
        <b-col md="12">
          <b-form-group label="教师模型：" label-cols-sm="3" label-cols-lg="1" label-align="right">
            <b-form-tags v-model="task_info.teacher_models" no-outer-focus class="mb-2">
              <template v-slot="{ tags, disabled, addTag, removeTag }">
                <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                  <li v-for="tag in tags" :key="tag" class="list-inline-item">
                    <b-form-tag
                      @remove="removeTag(tag)"
                      :title="tag"
                      :disabled="disabled"
                      variant="primary"
                    >{{ tag }}</b-form-tag>
                  </li>
                </ul>
                <b-dropdown size="sm" variant="outline-secondary" block menu-class="w-100">
                  <template v-slot:button-content>添加教师模型</template>
                  <b-dropdown-form @submit.stop.prevent="() => {}">
                    <b-form-group
                      label-for="tag-search-input"
                      label="搜索"
                      label-cols-md="auto"
                      class="mb-0"
                      label-size="sm"
                      :disabled="disabled"
                    >
                      <b-form-input
                        v-model="teacher_search"
                        id="tag-search-input"
                        type="search"
                        size="sm"
                        autocomplete="off"
                      ></b-form-input>
                    </b-form-group>
                  </b-dropdown-form>
                  <b-dropdown-divider></b-dropdown-divider>
                  <b-dropdown-item-button
                    v-for="item in availableItems(teacher_search, task_info.teacher_models, options.models)"
                    :key="item.id"
                    @click="onTeacherClick({ item, addTag })"
                  >{{ item.name }}</b-dropdown-item-button>
                  <b-dropdown-text
                    v-if="availableItems(teacher_search, task_info.teacher_models, options.models).length === 0"
                  >无匹配结果</b-dropdown-text>
                </b-dropdown>
              </template>
            </b-form-tags>
          </b-form-group>
        </b-col>
        <b-col md="12">
          <b-form-group label="学生模型：" label-cols-sm="3" label-cols-lg="1" label-align="right">
            <b-form-tags v-model="task_info.student_models" no-outer-focus class="mb-2">
              <template v-slot="{ tags, disabled, addTag, removeTag }">
                <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                  <li v-for="tag in tags" :key="tag" class="list-inline-item">
                    <b-form-tag
                      @remove="removeTag(tag)"
                      :title="tag"
                      :disabled="disabled"
                      variant="primary"
                    >{{ tag }}</b-form-tag>
                  </li>
                </ul>
                <b-dropdown size="sm" variant="outline-secondary" block menu-class="w-100">
                  <template v-slot:button-content>添加学生模型</template>
                  <b-dropdown-form @submit.stop.prevent="() => {}">
                    <b-form-group
                      label-for="tag-search-input"
                      label="搜索"
                      label-cols-md="auto"
                      class="mb-0"
                      label-size="sm"
                      :disabled="disabled"
                    >
                      <b-form-input
                        v-model="student_search"
                        id="tag-search-input"
                        type="search"
                        size="sm"
                        autocomplete="off"
                      ></b-form-input>
                    </b-form-group>
                  </b-dropdown-form>
                  <b-dropdown-divider></b-dropdown-divider>
                  <b-dropdown-item-button
                    v-for="item in availableItems(student_search, task_info.student_models, options.models)"
                    :key="item.id"
                    @click="onStudentClick({ item, addTag })"
                  >{{ item.name }}</b-dropdown-item-button>
                  <b-dropdown-text
                    v-if="availableItems(student_search, task_info.student_models, options.models).length === 0"
                  >无匹配结果</b-dropdown-text>
                </b-dropdown>
              </template>
            </b-form-tags>
          </b-form-group>
        </b-col>
        <b-col md="12">
          <b-form-group :label="'备注：'" label-cols-sm="3" label-cols-lg="1" label-align="right">
            <b-form-textarea v-model="task_info.info" placeholder="请键入模型其它信息（可选）" rows="5"></b-form-textarea>
          </b-form-group>
        </b-col>
      </b-row>
      <b-button
        block
        @click="createReorgTasks(task_info)"
        variant="primary"
        :style="style.submitBtn"
      >开始重组</b-button>
    </b-form>

    <b-card title="高级选项" sub-title="选填" bg-variant="light" v-if="currentAlgorithm!=null" fluid>
      <b-form-group
        v-for="field in currentAlgorithm.fields"
        :key="field.field_name"
        label-cols-sm="2"
        :label="field.field_name"
        :description="field.field_note"
        label-align-sm="right"
      >
        <b-form-input v-model="field.field_value"></b-form-input>
      </b-form-group>
    </b-card>

    <b-modal
      title="重组任务"
      no-close-on-esc
      no-close-on-backdrop
      ok-only
      :visible="is_dialog_open"
      ok-title="确定"
      @close="closeDialog"
      @ok="closeDialog"
      :title-class="{style: {fontSize:'50px'}}"
    >
      <div class="text-center">{{dialog_content}}</div>
    </b-modal>
  </div>
</template>


<script>
import { closeDialog } from "@/utils/index";
import { getReorgOptions, createReorgTasks } from "../task";

export default {
  name: "CreateTask",
  data: function () {
    return {
      task_ds: null,
      task_info: {
        tasks: [],
        name: "",
        info: "",
        algorithms: null,
        datasets: [],
        teacher_models: [],
        student_models: [],
      },
      dataset_search: "",
      teacher_search: "",
      student_search: "",
      style: {
        title: {
          fontSize: "20px",
        },
        pagination: {
          marginTop: "20px",
        },
        submitBtn: {
          marginTop: "20px",
          marginBottom: "20px",
        },
        checkbox: {
          marginLeft: "0px",
          marginRight: "10px",
          marginTop: "5px",
          marginBottom: "5px",
        },
        teacher_model_btn: {
          marginRight: "20px",
        },
      },
      options: {},
      errors: "",
      is_dialog_open: false,
      dialog_content: "",
    };
  },
  computed: {
    // Datasets
    availableAlgorithms() {
      return this.options.algorithms.map((a) => a.alg_name);
    },
    currentAlgorithm() {
      return this.options.algorithms.find(
        (alg) => alg.id == this.task_info.algorithms
      );
    },
  },
  methods: {
    closeDialog,
    getReorgOptions,
    createReorgTasks,
    getCriteria(search_list) {
      // Compute the search criteria
      return search_list.trim().toLowerCase();
    },

    onDatasetClick({ item, addTag }) {
      addTag(item.name);
      this.dataset_search = "";
    },
    onTeacherClick({ item, addTag }) {
      addTag(item.name);
      this.teacher_search = "";
    },
    onStudentClick({ item, addTag }) {
      addTag(item.name);
      this.student_search = "";
    },

    availableItems(search, selectedItems, allItems) {
      const criteria = this.getCriteria(search);
      const candidates = allItems.filter(
        (candi) => selectedItems.indexOf(candi.name) === -1
      );
      if (criteria) {
        return candidates.filter(
          (candi) => candi.name.toLowerCase().indexOf(criteria) > -1
        );
      }
      return candidates;
    },
  },
  mounted() {
    this.getReorgOptions();
  },
};
</script>
