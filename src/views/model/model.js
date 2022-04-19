import request from '@/utils/request'

export const getUploadOptions = function () {
    request.get(`/api/model/upload_options`, {
    })
        .then((response) => {
            console.log('UploadOptions', response);
            this.options = response.data
        })
        .catch((errors) => {
            console.log('error', errors)
            this.options = {}
            this.errors = errors
        })
}

export const getPublicModels = function () {
    request.get(`/api/model/public_models`, {
    })
        .then((response) => {
            const models = response.data;
            console.log('get public models')
            this.public_models = models
        })
        .catch((errors) => {
            console.log('error', errors)
            this.public_models = []
            this.errors = errors
        })
}

const checkFileInfo = function(file_info) {
    if (!file_info.task.length) {
        this.is_dialog_open = true
        this.dialog_content = '任务类型不得为空'
        return false
    }
    if (file_info.model_name.length == 0) {
        this.is_dialog_open = true
        this.dialog_content = '模型名称不得为空'
        return false
    }
    if (file_info.dataset_name.length == 0) {
        this.is_dialog_open = true
        this.dialog_content = '数据集名称不得为空'
        return false
    }
    let names = new Set()
    for (let f of file_info.args) {
        if (f.name == "") {
            this.is_dialog_open = true
            this.dialog_content = "度量名称不得为空"
            return false
        }
        if (names.has(f.name)) {
            this.is_dialog_open = true
            this.dialog_content = "参数名称不得重复"
            return false
        }
        names.add(f.name)
    }

    names = new Set()
    for (let f of file_info.metrics) {
        if (f.name == "") {
            this.is_dialog_open = true
            this.dialog_content = "度量名称不得为空"
            return false
        }
        if (names.has(f.name)) {
            this.is_dialog_open = true
            this.dialog_content = "参数名称不得重复"
            return false
        }
        names.add(f.name)
    }
    return true
}

export const postModel = function ({ file_info, file }) {
    console.log('post model', file_info, file)
    if (file == null) {
        this.is_dialog_open = true
        this.dialog_content = '模型文件不得为空'
        return
    }
    if (!checkFileInfo.bind(this)(file_info)) {
        return
    }

    this.is_loading = true
    const formData = new FormData();
    formData.append('file', file);
    formData.append('file_info', JSON.stringify(file_info));
    console.log('formData', formData)
    request.post(`/api/model/models`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
        .then((response) => {
            console.log('post ok', response)
            this.is_dialog_open = true
            this.dialog_content = '上传成功'
            this.is_loading = false
            this.$store.dispatch('model/getMyModels')
        })
        .catch((errors) => {
            console.log('post error', errors)
            this.errors = errors
            this.is_dialog_open = true
            this.dialog_content = `上传失败：${errors.response.data}`
            this.is_loading = false
        })
}
export const updateModel = function ({ file_info, model_id }) {
    if (!checkFileInfo.bind(this)(file_info)) {
        return
    }

    this.is_loading = true
    const formData = new FormData();
    file_info['model_id'] = model_id
    console.log('update model', file_info)
    formData.append('file_info', JSON.stringify(file_info));
    console.log('formData', formData)
    request.put(`/api/model/models`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
        .then((response) => {
            console.log('update ok', response)
            this.is_dialog_open = true
            this.dialog_content = '更新成功'
            this.is_loading = false
            this.$store.dispatch('model/getMyModels')
        })
        .catch((errors) => {
            console.log('update error', errors)
            this.errors = errors
            this.is_dialog_open = true
            this.dialog_content = `更新失败：${errors.response.data}`
            this.is_loading = false
        })
}
export const deleteModels = function (model_ids) {
    console.log('selected', model_ids)
    request.delete(`/api/model/models`, {
        params: {
            model_ids: model_ids
        }
    })
        .then((response) => {
            console.log('delete success')
            this.is_dialog_open = true
            this.dialog_content = '删除成功'
            this.$store.dispatch('model/getMyModels')
        })
        .catch((errors) => {
            console.log('delete failure')
            this.errors = errors
            this.is_dialog_open = true
            this.dialog_content = '删除失败'
            this.$store.dispatch('model/getMyModels')
        })
}