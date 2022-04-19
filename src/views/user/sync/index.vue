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
    <b-row align-h="center">
      <b-spinner style="width: 3rem; height: 3rem;" variant="primary"></b-spinner>
    </b-row>
    <b-row align-h="center">
      <div>同步用户数据库中...</div>
    </b-row>
    <b-modal
      title="用户同步"
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
  </b-container>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import { closeDialog } from "@/store/utils";

export default {
  name: "Sync",
  computed: mapState("user", {
    is_dialog_open: state => state.is_dialog_open,
    dialog_content: state => state.dialog_content
  }),
  methods: {
    ...mapMutations("user", ["setIsDialogOpen", "setDialogContent"]),
    ...mapActions("user", ["syncUser"]),
    closeDialog
  },
  mounted() {
    this.$store.dispatch("user/syncUser", this.$route.query.token)
  }
};
</script>