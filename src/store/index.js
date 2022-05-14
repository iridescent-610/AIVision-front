/** Copyright 2020 Zhejiang Lab. All Rights Reserved.
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
*/


import Vue from 'vue'
import Vuex from 'vuex'
import metric_graph from './modules/metric_graph'
import model from './modules/model'
import user from './modules/user'
import dataset from './modules/dataset'
import task_detail from './modules/task_detail'
import flowchart from './modules/flowchart'
import permission from './modules/permission'
import router from '@/router'
import { setIsDialogOpen, setDialogContent } from '@/store/utils'
import { getLocalToken, setLocalToken, removeLocalToken } from '@/utils/auth'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    auth: {
      username: '',
      is_staff: false,
      token: getLocalToken(),
    },
    is_dialog_open: false,
    dialog_content: "",
  },
  getters: {
    token: state => {
      return state.auth.token
    },
    is_loggedin: state => {
      if (state.auth.token) {
        return state.auth.token != ''
      }
      return false
    },
    is_staff: state => {
      return state.auth.is_staff
    },

  },
  mutations: {
    // updateAuth (state, token) {
    //   console.log(token)
    //   setLocalToken(token)
    //   state.auth.token = token;
    //   console.log(token)
    //   router.push({ name: 'Welcome' })
    // },
    updateAuth(state, data) {
      let token = data.token
      let username = data.username

      console.log(token)
      setLocalToken(token)
      state.auth.token = token;
      console.log(token)
      if (username === 'aix03') router.push({ name: 'Model' });   // 人工智能专家
      else if (username === 'aix02') router.push({ name: 'Flowchart' });   // 系统开发者
      else router.push({ name: 'Welcome' });   // 普通用户
    },
    removeAuth(state) {
      removeLocalToken()
      state.auth = { username: '', is_staff: false, token: '' };
      router.push({ name: 'Sign In' })
      // router.push({ name: 'Welcome' })
    },
    setIsDialogOpen, setDialogContent,
    setUsername(state, username) {
      state.auth.username = username
    },
    setIsStaff(state, is_staff) {
      state.auth.is_staff = is_staff
    }
  },
  modules: {
    metric_graph,
    model,
    user,
    dataset,
    task_detail,
    permission,
    flowchart
  }
})

export default store
