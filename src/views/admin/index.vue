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
    <b-col>
      <!-- <div v-show="!is_staff">无管理权限</div>
      <div v-show="is_staff"> -->
        <b-nav tabs>
          <b-nav-item active-class="active" :to="{name: 'ManageServer'}">算力机管理</b-nav-item>
          <b-nav-item active-class="active" :to="{name: 'ManageAlgorithm'}">算法管理</b-nav-item>
          <b-nav-item active-class="active" :to="{name: 'ManageMetrics'}">度量管理</b-nav-item>
        </b-nav>
        <div class="pt-4">
          <router-view></router-view>
        </div>
      <!-- </div> -->
    </b-col>
  </b-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Admin",
  computed: {
    ...mapState({
      is_staff: (state) => state.auth.is_staff,
    }),
  },
};
</script>