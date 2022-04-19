import request from "@/utils/aix_request.js"

export function completeLabel(task_id) {
    return request.post('/task/' + task_id + "/label_finish")
}

export function getDetail(flowchart_id, node_id){
    return request.get('/multiple_task/detail/' + flowchart_id + '/' + node_id)
}

export function getDataturksJumpUrl() {
    return request.get('/user/dataturks')
}