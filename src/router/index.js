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
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import HeaderLayout from '@/layout/headerLayout.vue'
import MenuLayout from '@/layout/menuLayout.vue'

import Sync from '@/views/user/sync/index.vue'
import SignIn from "@/views/user/signin/index.vue"
import SignUp from "@/views/user/signup/index.vue"

import Welcome from "@/views/welcome/index.vue"
import Industry from "@/views/welcome/industry.vue"
import IndustryDemo from "@/views/welcome/industry_demo.vue"
// import Doc from "@/views/doc/index.vue"

import VisGraph from "@/views/metric_graph/vis_graph/index.vue"
import ModelZoo from '@/views/metric_graph/modelzoo/index.vue'

import Dataset from "@/views/dataset/index.vue"

import Model from "@/views/model/index.vue"
import MyModels from "@/views/model/my_models/index.vue"
import PublicModels from "@/views/model/public_models/index.vue"

import ShareLink from "@/components/share_link.vue"

import Admin from "@/views/admin/index.vue"
import ManageServer from "@/views/admin/manage_server/index.vue"
import ManageAlgorithm from "@/views/admin/manage_algorithm/index.vue"
import ManageMetrics from "@/views/admin/manage_metrics/index.vue"

import Container from "@/views/container/index.vue"
import ContainerOverview from "@/views/container/overview/index.vue"
import ManageDevice from "@/views/container/device/index.vue"
import ContainerTask from "@/views/container/task/index.vue"
import ContainerLog from "@/views/container/client-logs/index.vue"
import ContainerList from "@/views/container/clients/index.vue"
import PackageSource from "@/views/container/source/index.vue"
import AptSource from "@/views/container/source/apt_source/index.vue"
import PipSource from "@/views/container/source/pip_source/index.vue"
import ErrorManage from "@/views/container/known_error/index.vue"

import ContainerUser from "@/views/container_user/index.vue"
import ManageDeviceUser from "@/views/container_user/device/index.vue"
import ContainerTaskUser from "@/views/container_user/task/index.vue"
import ContainerLogUser from "@/views/container_user/client-logs/index.vue"
import ContainerListUser from "@/views/container_user/clients/index.vue"


import AIXAdmin from "@/views/aix_admin/index.vue"
import ManageFlowchart from "@/views/aix_admin/manage_flowchart/index.vue"


import Flowchart from "@/views/flowchart/index.vue"
import MyFlowcharts from "@/views/flowchart/my_flowcharts/index.vue"
import Flowcharting from "@/views/flowchart/flowcharting/index.vue"
import Inspecting from "@/views/flowchart/inspecting/index.vue"
import Predicting from "@/views/flowchart/predicting/index.vue"



import MultipleTask from "@/views/multiple_task/index.vue"

const Task = () => import(/* webpackChunkName: "task" */ '@/views/task/index.vue')
const CreateTask = () => import(/* webpackChunkName: "task" */ '@/views/task/create_task/index.vue')
const MyTasks = () => import(/* webpackChunkName: "task" */ '@/views/task/my_tasks/index.vue')

const TaskDetail = () => import(/* webpackChunkName: "task" */ '@/views/task_detail/index.vue')
const BasicTaskInfo = () => import(/* webpackChunkName: "task" */ "@/views/task_detail/basic_task_info/index.vue")
const VisScalars = () => import(/* webpackChunkName: "task" */ '@/views/task_detail/vis_scalars/index.vue')
const VisImages = () => import(/* webpackChunkName: "task" */ '@/views/task_detail/vis_images/index.vue')
const VisStages = () => import(/* webpackChunkName: "task" */ '@/views/task_detail/vis_stages/index.vue')
const TrainingLog = () => import(/* webpackChunkName: "task" */ '@/views/task_detail/training_log/index.vue')

export const constantRoutes = [
  { path: '/', name: 'Home', redirect: { name: 'Welcome' }, show: false },
  {
    path: '/',
    name: 'Welcome',
    redirect: "/welcome",
    component: HeaderLayout,
    children: [
      {
        path: '/welcome',
        component: () => import('@/views/welcome/index.vue'),
        meta: {
          title: "平台介绍",
        },
      },
      {
        path: '/dashboard',
        component: MenuLayout,
        redirect: "/dashboard/modelZoo",
        children: [
          {
            path: '/dashboard/modelZoo',
            name: 'Model Zoo',
            component: ModelZoo,
            meta: {
              title: "图谱列表",
            },
          },
          /* {
             path: '/dashboard/visgraph',
             name: 'Visualize Graph',
             component: VisGraph,
             meta: {
               title: "图谱可视化",
             },
           },*/
          {
            path: '/dashboard/dataset',
            name: 'Dataset',
            component: Dataset,
            show: true,
            meta: {
              title: "数据集"
            },
          },
          {
            path: '/dashboard/model',
            name: 'Model',
            component: Model,
            redirect: { name: 'My Models' },
            meta: {
              title: "模型"
            },
            children: [
              { path: 'my_models', name: 'My Models', component: MyModels, meta: { title: "我的模型" } },
              { path: 'public_models', name: 'Public Models', component: PublicModels, meta: { title: "公开模型" } },
            ]
          },
          {
            path: '/dashboard/flowchart',
            name: 'Flowchart',
            component: Flowchart,
            redirect: { name: 'My Flowcharts' },
            show: true,
            meta: {
              title: "流程图"
            },
            children: [
              { path: 'my_flowcharts', name: 'My Flowcharts', component: MyFlowcharts, meta: { title: "我的流程图" } },
              { path: 'flowcharting', name: 'Flowcharting', component: Flowcharting, meta: { title: "创建流程图" } },
              // { path: 'flowcharting/:task/:industry', name: 'Flowcharting', component: Flowcharting, meta: { title: "创建流程图" } },
              { path: 'inspecting/:id', name: 'Inspecting', component: Inspecting, meta: { title: "流程图状态" } },
              { path: 'predicting/:id', name: 'Predicting', component: Predicting, meta: { title: "流程图预测" } }
            ]
          },
          {
            path: '/dashboard/container',
            name: 'Container',
            component: Container,
            redirect: { name: 'ContainerList' },
            meta: {
              title: "容器管理",
              roles: ["staff"],
            },
            children: [
              {
                path: 'detail/:token',
                component: () => import('@/views/container/cli-detail/cli-detail')
              },
              { path: '/dashboard/container/container_list', name: 'ContainerList', component: ContainerList, meta: { title: "容器列表" } },
              { path: '/dashboard/container/manage_device', name: 'ManageDevice', component: ManageDevice, meta: { title: "设备管理" } },
              { path: '/dashboard/container/container_task', name: 'ContainerTask', component: ContainerTask, meta: { title: "任务管理" } },
              { path: '/dashboard/container/container_log', name: 'ContainerLog', component: ContainerLog, meta: { title: "容器日志" } },
              {
                path: '/dashboard/container/package_source', name: 'PackageSource', component: PackageSource, meta: { title: "源管理" }, children: [
                  { path: 'apt', name: 'AptSource', component: AptSource, meta: { title: "Apt源" } },
                  { path: 'pip', name: 'PipSource', component: PipSource, meta: { title: "Pip源" } },
                ]
              },
              { path: '/dashboard/container/manage_error', name: 'ErrorManage', component: ErrorManage, meta: { title: "错误修复" } },
              // {
              //   path: 'http://10.214.211.205:5601/',
              //   meta: { title: '平台日志管理', icon: 'link' }
              // }
            ]
          },
        ]
      },
      {
        path: '/signin',
        name: 'Sign In',
        component: SignIn,
        show: false,
        meta: {
          title: "登录"
        },
      },
      {
        path: '/signup',
        name: 'Sign Up',
        component: SignUp,
        show: false,
        meta: {
          title: "注册"
        },
      },
      {
        path: '/industry/:industry',
        name: 'Industry',
        component: Industry,
        show: false,
        meta: {
          title: "行业应用",
        },
      },
      {
        path: '/industry_demo/:type',
        name: 'IndustryDemo',
        component: IndustryDemo,
        show: false,
        meta: {
          title: "行业演示",
        },
      },
    ]
  },
  {
    path: '/industry/:industry',
    name: 'Industry',
    component: Industry,
    show: false,
    meta: {
      title: "行业应用",
    },
  },
  {
    path: '/industry_demo/:type',
    name: 'IndustryDemo',
    component: IndustryDemo,
    show: false,
    meta: {
      title: "行业演示",
    },
  },
  // {
  //   path: '/doc',
  //   name: 'Doc',
  //   component: Doc,
  //   show: false,
  //   meta: {
  //     title: "技术文档",
  //   },
  // },
  {
    path: '/login/:token?',
    name: 'Sync',
    component: Sync,
    show: false, meta: { title: "天枢登录" }
  },
  {
    path: '/visgraph',
    name: 'Visualize Graph',
    component: VisGraph,
    meta: {
      title: "图谱可视化",
    },
  },
  {
    path: '/modelzoo',
    name: 'Model Zoo',
    component: ModelZoo,
    meta: {
      title: "图谱列表",
    },
  },
  {
    path: '/task',
    name: 'Task',
    component: Task,
    redirect: { name: 'Create Task' },
    meta: {
      title: "任务"
    },
    children: [
      { path: 'create_task', name: 'Create Task', component: CreateTask, meta: { title: "新建任务" } },
      { path: 'my_tasks', name: 'My Tasks', component: MyTasks, meta: { title: "我的任务" } }
    ]
  },
  {
    path: '/task_detail/:task_id',
    name: 'Task Detail',
    component: TaskDetail,
    redirect: { name: 'Basic Task Info' },
    show: false,
    meta: {
      title: "任务详情"
    },
    children: [
      { path: 'basic_task_info', name: "Basic Task Info", component: BasicTaskInfo, meta: { title: "任务信息" } },
      { path: 'training_log', name: "Training Log", component: TrainingLog, meta: { title: "日志" } },
      { path: 'vis_scalars', name: "Vis Scalars", component: VisScalars, meta: { title: "曲线图" } },
      { path: 'vis_images', name: "Vis Images", component: VisImages, meta: { title: "预览" } },
      { path: 'vis_stages', name: "Vis Stages", component: VisStages, meta: { title: "训练流程" } },
    ]
  },
  {
    path: '/model',
    name: 'Model',
    component: Model,
    meta: {
      title: "模型"
    },
    children: [
      { path: 'my_models', name: 'My Models', component: MyModels, meta: { title: "我的模型" } },
      { path: 'public_models', name: 'Public Models', component: PublicModels, meta: { title: "公开模型" } },
    ]
  },
  {
    path: '/share/:file_type/:share_link',
    name: 'Share Link',
    component: ShareLink,
    show: false,
    meta: {
      title: "分享"
    }
  },
  {
    path: '/dataset',
    name: 'Dataset',
    component: Dataset,
    redirect: { name: 'My Datasets' },
    show: true,
    meta: {
      title: "数据集"
    },
  },
  // flowchart
  {
    path: '/flowchart',
    name: 'Flowchart',
    component: Flowchart,
    redirect: { name: 'My Flowcharts' },
    show: true,
    meta: {
      title: "流程图"
    },
    children: [
      { path: 'my_flowcharts', name: 'My Flowcharts', component: MyFlowcharts, meta: { title: "我的流程图" } },
      { path: 'flowcharting', name: 'Flowcharting', component: Flowcharting, meta: { title: "创建流程图" } },
      // { path: 'flowcharting/:task/:industry', name: 'Flowcharting', component: Flowcharting, meta: { title: "创建流程图" } },
      { path: 'inspecting/:id', name: 'Inspecting', component: Inspecting, meta: { title: "流程图状态" } },
      { path: 'predicting/:id', name: 'Predicting', component: Predicting, meta: { title: "流程图预测" } }
    ]
  },
  // multiple_task
  {
    path: '/multiple_task/:flowchart_id/:node_id',
    name: 'Multiple Task',
    component: MultipleTask,
    show: false,
    meta: {
      title: "流程图任务"
    }
  },
]

// 管理员
export const asyncRoutes = [
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    redirect: { name: 'ManageServer' },
    meta: {
      title: "Atlas管理",
      roles: ["staff"],
    },
    children: [
      { path: 'manage_server', name: 'ManageServer', component: ManageServer, meta: { title: "算力机管理" } },
      { path: 'manage_algorithm', name: 'ManageAlgorithm', component: ManageAlgorithm, meta: { title: "算法管理" } },
      { path: 'manage_metrics', name: 'ManageMetrics', component: ManageMetrics, meta: { title: "度量管理" } }
    ]
  },
  {
    path: '/dashboard/container',
    name: 'Container',
    component: Container,
    redirect: { name: 'ContainerOverview' },
    meta: {
      title: "容器管理",
      roles: ["staff"],
    },
    children: [
      {
        path: 'detail/:token',
        component: () => import('@/views/container/cli-detail/cli-detail')
      },

      { path: 'container_overview', name: 'ContainerOverview', component: ContainerOverview, meta: { title: "总览" } },
      { path: 'manage_device', name: 'ManageDevice', component: ManageDevice, meta: { title: "设备管理" } },
      { path: 'container_list', name: 'ContainerList', component: ContainerList, meta: { title: "容器列表" } },
      { path: 'container_task', name: 'ContainerTask', component: ContainerTask, meta: { title: "任务管理" } },
      { path: 'container_log', name: 'ContainerLog', component: ContainerLog, meta: { title: "容器日志" } },
      {
        path: 'package_source', name: 'PackageSource', component: PackageSource, meta: { title: "源管理" }, children: [
          { path: 'apt', name: 'AptSource', component: AptSource, meta: { title: "Apt源" } },
          { path: 'pip', name: 'PipSource', component: PipSource, meta: { title: "Pip源" } },
        ]
      },
      { path: 'manage_error', name: 'ErrorManage', component: ErrorManage, meta: { title: "错误修复" } },
      // {
      //   path: 'http://10.214.211.205:5601/',
      //   meta: { title: '平台日志管理', icon: 'link' }
      // }
    ]
  },
  // {
  //   path: '/aix_admin',
  //   name: 'AIXAdmin',
  //   component: AIXAdmin,
  //   redirect: { name: 'ManageFlowchart' },
  //   meta: {
  //     title: "流程图管理",
  //     roles: ["staff"],
  //   },
  //   children: [
  //     { path: 'manage_flowchart', name: 'ManageFlowchart', component: ManageFlowchart, meta: { title: "流程图统一管理" } }
  //   ]
  // },

]

// 普通用户
export const userRoutes = [
  {
    path: '/container_user',
    name: 'ContainerUser',
    component: ContainerUser,
    redirect: { name: 'ContainerListUser' },
    meta: {
      title: "容器",
    },
    children: [
      {
        path: 'detail_user/:token',
        component: () => import('@/views/container_user/cli-detail/cli-detail')
      },

      { path: 'manage_device_user', name: 'ManageDeviceUser', component: ManageDeviceUser, meta: { title: "设备信息" } },
      { path: 'container_list_user', name: 'ContainerListUser', component: ContainerListUser, meta: { title: "容器信息" } },
      { path: 'container_task_user', name: 'ContainerTaskUser', component: ContainerTaskUser, meta: { title: "任务信息" } },
      { path: 'container_log_user', name: 'ContainerLogUser', component: ContainerLogUser, meta: { title: "容器日志" } },
    ]
  },

]

const createRouter = () => new VueRouter({
  routes: constantRoutes
})


const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
