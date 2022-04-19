import { asyncRoutes, userRoutes, constantRoutes } from '@/router'

const state = {
    routes: constantRoutes,
    addRoutes: []
}

const mutations = {
    setRoutes: (state, routes) => {
        state.addRoutes = routes
        state.routes = constantRoutes.concat(routes)
    }
}

const actions = {
    generateRoutes({ commit }, is_staff) {
        return new Promise(resolve => {
            let accessedRoutes = []
            if (is_staff) {
                accessedRoutes = asyncRoutes || []
            }
            else {
                accessedRoutes = userRoutes || []
            }
            commit('setRoutes', accessedRoutes)
            resolve(accessedRoutes)
        })
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}