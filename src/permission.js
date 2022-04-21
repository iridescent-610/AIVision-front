import router from './router'
import store from './store'
import getPageTitle from '@/utils/page_title'

const whiteList = ['Sign In', 'Sign Up', 'Sync', 'Welcome', 'Doc']
const oriList = ['Sign In', 'Sign Up', 'Sync']

router.beforeEach((to, from, next) => {
    console.log(to.matched)
    document.title = getPageTitle(to.meta.title)
    if (!store.getters.is_loggedin) {
        // 未登录
        next()
        // if (whiteList.indexOf(to.name) !== -1) {
        //     next()
        // }
        // else {
        //     next({ name: 'Sign In' })
        // }
    }
    else if (store.getters.is_loggedin) {
        if (!store.state.auth.username) {
            store.dispatch('user/getUserInfo').then((res) => {
                const is_staff = res.is_staff
                store.dispatch('permission/generateRoutes', is_staff).then((available_routers) => {
                    router.addRoutes(available_routers)
                    next({ ...to, replace: true })
                    // next('/')
                })
            }).catch((errors) => {
                console.log(errors)
            })
        }
        if (oriList.indexOf(to.name) !== -1) {
            next({ name: 'Welcome' })
        }
        else {
            next()
        }
    }
})
