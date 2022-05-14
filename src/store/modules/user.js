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

import request from '@/utils/request'
import { setIsDialogOpen, setDialogContent } from '@/store/utils'
import { resetRouter } from '@/router'

// initial state
const state = {
    errors: "",
    is_dialog_open: false,
    dialog_content: "",
}

// getters
const getters = {
}

let emailRegex = new RegExp("^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+$");

// actions
const actions = {
    signUp({ dispatch, commit, state, }, user_info) {
        console.log(user_info)
        if (user_info.username == '') {
            commit("setIsDialogOpen", true)
            commit("setDialogContent", "用户名不能为空")
        }
        else if (user_info.email == '') {
            commit("setIsDialogOpen", true)
            commit("setDialogContent", "邮箱不能为空")
        }
        else if (!(emailRegex.test(user_info.email))) {
            console.log('signup email')
            commit("setIsDialogOpen", true)
            commit("setDialogContent", "邮箱格式不正确")
        }
        else if (user_info.password == '') {
            commit("setIsDialogOpen", true)
            commit("setDialogContent", "密码不能为空")
        }
        else if (user_info.password2 == '') {
            commit("setIsDialogOpen", true)
            commit("setDialogContent", "请再次输入密码")
        }
        else if (user_info.password != user_info.password2) {
            console.log('signup password')
            commit("setIsDialogOpen", true)
            commit("setDialogContent", "两次密码不一致")
        }
        else {
            request.post(`/api/user/user`, {
                user_info
            }).then((response) => {
                console.log("signup success", response.data)
                dispatch('signIn', { 'username': user_info.username, 'password': user_info.password })
            }).catch((errors) => {
                console.log("signup error", errors)
                commit('setErrors', errors)
                commit('setIsDialogOpen', true)
                commit('setDialogContent', '注册失败')
            })
        }
    },
    signIn({ commit, state }, user_info) {
        // console.log(user_info)
        // commit('updateAuth', 'I commentated it.', { root: true })
        // commit('setIsStaff', true, { root: true })
        request.post(`/api/user/token_auth`, {
            'username': user_info.username,
            'password': user_info.password,
        }).then((response) => {
            console.log("signin success", response.data)
            // commit('updateAuth', response.data.access, { root: true })
            commit('updateAuth', { 'token': response.data.access, 'username': user_info.username }, { root: true })
        }).catch((errors) => {
            console.log("signin error", errors)
            commit('setErrors', errors)
            commit('setIsDialogOpen', true)
            commit('setDialogContent', '请检查用户名和密码')
        })
    },
    syncUser({ dispatch, commit, state }, token) {
        console.log(token)
        request.put(`/api/user/user`, {
            token
        }).then((response) => {
            console.log("sync: success", response.data)
            let username = response.data.username
            let password = response.data.password
            dispatch('signIn', { 'username': username, 'password': password }).then(() => {
            })
        }).catch((errors) => {
            console.log("sync: signup error", errors)
            commit('setErrors', errors)
            commit('setIsDialogOpen', true)
            commit('setDialogContent', errors)
        })
    },
    getUserInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            request.get(`/api/user/user`).then((response) => {
                if (!response.data.user_info) {
                    reject('Verification failed, please Login again.')
                }
                const { username, is_staff } = response.data.user_info

                commit('setUsername', username, { root: true })
                commit('setIsStaff', is_staff, { root: true })
                resolve(response.data.user_info)
            }).catch((errors) => {
                reject(errors)
            })
        })
    },
    logout({ dispatch, commit }) {
        commit('removeAuth', null, { root: true })
        commit('permission/setRoutes', [], { root: true })
        resetRouter()
    }
}

const mutations = {
    setErrors(state, errors) {
        state.errors = errors
    },
    setIsDialogOpen, setDialogContent
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}