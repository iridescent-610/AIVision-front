import request from '@/utils/request'

export const postMetric = function ({ metric_info, file }) {
    console.log("metric info", metric_info)
    console.log("file", file)
    if (metric_info.name == "") {
        this.is_dialog_open = true
        this.dialog_content = "度量名称不得为空"
    }
    else if (file == null) {
        this.is_dialog_open = true
        this.dialog_content = "请上传度量文件"
    }
    else {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('metric_info', JSON.stringify(metric_info));
        request.post(`/api/visualization/metrics`, formData)
            .then((response) => {
                console.log("post ok", response)
                this.is_dialog_open = true
                this.dialog_content = '新建成功'
                this.getMetrics()
            }).catch((errors) => {
                console.log("post error", errors)
                this.errors = errors
                this.is_dialog_open = true
                this.dialog_content = '新建失败'
            })
    }
}
export const getMetrics = function () {
    request.get(`/api/visualization/metrics`, {
    })
        .then((response) => {
            let metrics = response.data.metrics;
            console.log('getMetrics')
            this.metrics = metrics
        })
        .catch((errors) => {
            console.log("error", errors)
            this.metrics = []
            this.errors = errors
        })

}
export const putMetric = function ({ metric_info, file }) {
    const formData = new FormData();
    formData.append('metric_info', JSON.stringify(metric_info));
    console.log("metric info", metric_info)
    if (file != null) {
        formData.append('file', file);
    }
    else {
        formData.append('file', null);
    }
    if (metric_info.name == "") {
        this.is_dialog_open = true
        this.dialog_content = "度量名称不得为空"
    }
    else {
        request.put(`/api/visualization/metrics`, formData)
            .then((response) => {
                console.log("put ok", response)
                this.is_dialog_open = true
                this.dialog_content = '更新成功'
                this.getMetrics()
            }).catch((errors) => {
                console.log("put error", errors)
                this.errors = errors
                this.is_dialog_open = true
                this.dialog_content = '更新失败'
            })
    }
}
export const deleteMetric = function (metric_id) {
    console.log('selected', metric_id)
    request.delete(`/api/visualization/metrics`, {
        params: {
            metric_id: metric_id
        }
    })
        .then((response) => {
            console.log('delete success')
            this.is_dialog_open = true
            this.dialog_content = '删除成功'
            this.getMetrics()
        })
        .catch((errors) => {
            console.log('delete failure')
            this.errors = errors
            this.is_dialog_open = true
            this.dialog_content = '删除失败'
            this.getMetrics()
        })
}