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

// initial state
const state = {
    errors: "",
    my_datasets: [],
}

// getters
const getters = {
}

// actions
const actions = {
    getMyDatasets({ commit, state }) {
        request.get(`/api/dataset/datasets`, {
        })
            .then((response) => {
                const datasets = response.data;
                console.log('get my datasets')
                commit('setMyDatasets', datasets)
            })
            .catch((errors) => {
                console.log("error", errors)
                commit('setMyDatasets', [])
                commit('setErrors', errors)
            })
    },
}

const mutations = {
    setErrors(state, errors) {
        state.errors = errors
    },
    setMyDatasets(state, datasets) {
        state.my_datasets = datasets
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}