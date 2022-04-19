import request from '@/utils/request'

export const getUploadOptions = function () {
    request.get(`/api/dataset/upload_options`, {
    })
        .then((response) => {
            console.log("UploadOptions", response);
            this.options = response.data
        })
        .catch((errors) => {
            console.log("error", errors)
            this.options = {}
            this.errors = errors
        })
}

export const getPublicDatasets = function () {
    request.get(`/api/dataset/public_datasets`, {
    })
        .then((response) => {
            const datasets = response.data;
            console.log('get public datasets')
            this.public_datasets = datasets
        })
        .catch((errors) => {
            console.log('error', errors)
            this.public_datasets = []
            this.errors = errors
        })
}

export const postDataset = function ({ file_info, file }) {
    console.log('post dataset', file_info, file)
    if (!file_info.task.length) {
        this.is_dialog_open = true
        this.dialog_content = '任务类型不得为空'
    }
    else if (file_info.dataset_name.length == 0) {
        this.is_dialog_open = true
        this.dialog_content = '数据集名称不得为空'
    }
    else if (file == null) {
        this.is_dialog_open = true
        this.dialog_content = '模型文件不得为空'
    }
    else {
        this.is_loading = true
        const formData = new FormData();
        formData.append('file', file);
        formData.append('file_info', JSON.stringify(file_info));
        console.log('formData', formData)
        request.post(`/api/dataset/datasets`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
            .then((response) => {
                console.log('post ok', response)
                this.is_dialog_open = true
                this.dialog_content = '创建成功'
                this.is_loading = false
                this.$store.dispatch("dataset/getMyDatasets")
            })
            .catch((errors) => {
                console.log('post error', errors)
                this.errors = errors
                this.is_dialog_open = true
                this.dialog_content = '创建失败'
                this.is_loading = false
            })
    }
}
export const updateDataset = function ({ file_info, dataset_id }) {
    console.log('post dataset', file_info)
    if (!file_info.task.length) {
        this.is_dialog_open = true
        this.dialog_content = '任务类型不得为空'
    }
    else if (file_info.dataset_name.length == 0) {
        this.is_dialog_open = true
        this.dialog_content = '数据集名称不得为空'
    }
    else {
        this.is_loading = true
        const formData = new FormData();
        file_info['dataset_id'] = dataset_id
        formData.append('file_info', JSON.stringify(file_info));
        console.log('formData', formData)
        request.put(`/api/dataset/datasets`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
            .then((response) => {
                console.log('put ok', response)
                this.is_dialog_open = true
                this.dialog_content = '更新成功'
                this.is_loading = false
                this.$store.dispatch("dataset/getMyDatasets")
            })
            .catch((errors) => {
                console.log('put error', errors)
                this.errors = errors
                this.is_dialog_open = true
                this.dialog_content = '更新失败'
                this.is_loading = false
            })
    }
}

export const deleteDatasets = function (dataset_ids) {
    console.log('selected', dataset_ids)
    request.delete(`/api/dataset/datasets`, {
        params: {
            dataset_ids: dataset_ids
        }
    })
        .then((response) => {
            console.log('delete success')
            this.is_dialog_open = true
            this.dialog_content = '删除成功'
            this.$store.dispatch("dataset/getMyDatasets")

        })
        .catch((errors) => {
            console.log('delete failure')
            this.is_dialog_open = true
            this.dialog_content = '删除失败'
            this.errors = errors
            this.$store.dispatch("dataset/getMyDatasets")
        })
}

