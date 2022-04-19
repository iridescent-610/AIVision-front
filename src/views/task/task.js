import request from '@/utils/request'

import { hasDuplicates } from "@/utils/index"

export const getReorgOptions = function () {
    request.get(`/api/task/reorg_task_options`, {
    })
        .then((response) => {
            console.log("reorgOptions", response);
            this.options = response.data
        })
        .catch((errors) => {
            console.log("error", errors)
            this.options = {}
            this.errors = errors
        })
}
export const createReorgTasks = function (task_info) {
    console.log("task_info", task_info)
    let new_task_info = Object.assign({}, task_info)

    console.log("datasets", this.options.datasets)
    console.log("all_models", this.options.models)

    // Datasets Name to ID
    new_task_info.datasets = new_task_info.datasets.map(
        function (selected_dataset_name) {
            return this.options.datasets.find(dataset => (dataset.name == selected_dataset_name)).id
        }.bind(this));
    // Model Name to ID
    console.log(this.options)
    new_task_info.teacher_models = new_task_info.teacher_models.map(
        function (selected_model_name) {
            return this.options.models.find(model => (model.name == selected_model_name)).id
        }.bind(this));
    new_task_info.student_models = new_task_info.student_models.map(
        function (selected_model_name) {
            return this.options.models.find(model => (model.name == selected_model_name)).id
        }.bind(this));
    // Alg name to ID
    new_task_info.algorithms = this.options.algorithms.find(alg => (alg.id) == new_task_info.algorithms)

    if (!new_task_info.tasks.length) {
        this.is_dialog_open = true
        this.dialog_content = "任务类型不得为空"
    }
    else if (new_task_info.algorithms == null) {
        this.is_dialog_open = true
        this.dialog_content = "算法不得为空"
    }
    else if (hasDuplicates(new_task_info.teacher_models)) {
        this.is_dialog_open = true
        this.dialog_content = "教师模型重复"
    }
    else if (new_task_info.teacher_models.indexOf(null) != -1) {
        this.is_dialog_open = true
        this.dialog_content = "选择教师模型或删除该选项"
    }
    else if (new_task_info.teacher_models.length < 1) {
        this.is_dialog_open = true
        this.dialog_content = "请至少选择一个教师模型"
    }
    else {
        console.log("the created task", new_task_info)
        request.post(`/api/task/reorg_tasks`, {
            task_info: new_task_info
        })
            .then((response) => {
                console.log("create ReorgTasks", response);
                this.is_dialog_open = true
                this.dialog_content = "创建成功"
            })
            .catch((errors) => {
                console.log("error", errors)
                this.errors = errors
                this.is_dialog_open = true
                this.dialog_content = "创建失败! " + errors
            })
    }
}
export const getReorgTasks = function () {
    request.get(`/api/task/reorg_tasks`, {
    })
        .then((response) => {
            console.log("ReorgTasks", response.data);
            let tasks = response.data;
            for (let t of tasks) {
                console.log("task", t)
            }
            this.reorg_tasks = tasks
        })
        .catch((errors) => {
            console.log("error", errors)
            this.reorg_tasks = []
            this.errors = errors
        })
}
export const deleteReorgTasks = function (task_ids) {
    console.log("tasks", task_ids)
    request.delete(`/api/task/reorg_tasks`, {
        params: { task_ids: task_ids }
    })
        .then((response) => {
            console.log("delete success")
            this.is_dialog_open = true
            this.dialog_content = "删除成功"
            this.getReorgTasks()
        })
        .catch((errors) => {
            console.log("delete failure")
            this.errors = errors
            this.is_dialog_open = true
            this.dialog_content = "删除失败"
            this.getReorgTasks()

        })
}