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
    <b-col align-self="center">
      <div v-bind:style="style.title">{{$route.params.file_type}}  {{$route.params.share_link}}</div>
    </b-col>
    <b-modal
      title="分享"
      no-close-on-esc
      no-close-on-backdrop
      ok-only
      :visible="is_dialog_open"
      ok-title="确定"
      @close="closeDialog"
      @ok="closeDialog"
      :title-class="{style: {fontSize:'50px'}}"
    >
      <div>{{dialog_content}}</div>
    </b-modal>
  </b-container>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import { closeDialog,
   } from "@/utils/index";
import {getPrivilege} from "@/utils/share_data";

export default {
  name: "ShareLink",
  data: function() {
    return {
      style: {
        title: {
          fontSize: "20px"
        }
      },
      errors: "",
      is_dialog_open: false,
      dialog_content: "",
    };
  },
  methods: {
    closeDialog, getPrivilege,
  },
  beforeRouteUpdate(to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    this.getPrivilege({file_type: to.params.file_type, share_link: to.params.share_link});
    next();
  },
  mounted() {
    this.getPrivilege({file_type: this.$route.params.file_type, share_link: this.$route.params.share_link});
  }
};
</script>