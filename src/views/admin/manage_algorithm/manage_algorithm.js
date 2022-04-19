import request from '@/utils/request'

export const postAlgorithm = function (algorithm_info) {
    console.log("algorithm info", algorithm_info)
    if (algorithm_info.alg_name == "") {
        this.is_dialog_open = true
        this.dialog_content = "算法名称不得为空"
    }
    else {
        let names = new Set()
        for (let f of algorithm_info.fields) {
            if (f.field_name == "") {
                this.is_dialog_open = true
                this.dialog_content = "字段名称不得为空"
                return
            }
            if (names.has(f.field_name)) {
                this.is_dialog_open = true
                this.dialog_content = "字段名称不得重复"
                return
            }
            names.add(f.field_name)
        }
        request.post(`/api/task/algorithm_info`, algorithm_info)
            .then((response) => {
                console.log("post ok", response)
                this.is_dialog_open = true
                this.dialog_content = '新建成功'
                this.getAlgorithms()
                this.getAlgorithms()
            }).catch((errors) => {
                console.log("post error", errors)
                this.errors = errors
                this.is_dialog_open = true
                this.dialog_content = '新建失败'
            })
    }
}

export const putAlgorithm = function (algorithm_info) {
    console.log("algorithm info", algorithm_info)
    if (algorithm_info.alg_name == "") {
        this.is_dialog_open = true
        this.dialog_content = "算法名称不得为空"
    }
    else {
        let names = new Set()
        for (let f of algorithm_info.fields) {
            if (f.field_name == "") {
                this.is_dialog_open = true
                this.dialog_content = "字段名称不得为空"
                return
            }
            if (names.has(f.field_name)) {
                this.is_dialog_open = true
                this.dialog_content = "字段名称不得重复"
                return
            }
            names.add(f.field_name)
        }
        request.put(`/api/task/algorithm_info`, algorithm_info)
            .then((response) => {
                console.log("put ok", response)
                this.is_dialog_open = true
                this.dialog_content = '更新成功'
                this.getAlgorithms()
            }).catch((errors) => {
                console.log("put error", errors)
                this.errors = errors
                this.is_dialog_open = true
                this.dialog_content = '更新失败'
            })
    }
}
export const getAlgorithms = function () {
    request.get(`/api/task/algorithm_info`, {
    })
        .then((response) => {
            let algorithms = response.data.algorithms;
            console.log('getalgorithms')
            this.algorithms = algorithms
        })
        .catch((errors) => {
            console.log("error", errors)
            this.algorithms = []
            this.errors = errors
        })
}

export const deleteAlgorithms = function (algorithm_ids) {
    console.log('selected', algorithm_ids)
    request.delete(`/api/task/algorithm_info`, {
        params: {
            algorithm_ids: algorithm_ids
        }
    })
        .then((response) => {
            console.log('delete success')
            this.is_dialog_open = true
            this.dialog_content = '删除成功'
            this.getAlgorithms()
        })
        .catch((errors) => {
            console.log('delete failure')
            this.errors = errors
            this.is_dialog_open = true
            this.dialog_content = '删除失败'
            this.getAlgorithms()
        })
}