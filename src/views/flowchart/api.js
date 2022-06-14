// import request from '@/utils/aix_request'
import request from "@/utils/request";

export function uploadFlowchart(data) {
  return request.post(`http://183.129.217.214:20182/8002/models/checkModel`, data);
}

// export function getDatasetsList() {
//     return request.get(`/dataset/list`)
// }

export function getPublicDatasets() {
  return request.get(`/api/dataset/public_datasets`);
}

export function getMyDatasets() {
  return request.get(`/api/dataset/datasets`);
}

export function getAvailableModels(params) {
  return request.get(`http://183.129.217.214:20182/8002/getInfo/getInfoByTaskType`, {
    params
  });
}
// export function getAvailableModels(params) {
//     return request.get(`/api/model/available_models`, {params})
// }

export function getAvailablePretrain(params) {
  return request.get(`/api/model/pretrained_weights`, { params });
}

export function getFlowchartDetails(params) {
  // return request.get(`/api/task/flowchart_details`, { params });
  return request.get(`http://183.129.217.214:20182/8002/flowchart/queryById`, { params });

}

export function getFlowchartProcess(flowchartId) {
  return request.get(
    `http://183.129.217.214:20182/8080/multiple_task/` + flowchartId + `/list`
  );
}


export function fetchPredictingTasks(params) {
  return request.post(
    `http://183.129.217.214:20182/8002/predict/queryPredictTaskByFlowchartId`,
    params
  );
}

export function createPredictingTask(data) {
  return request.post(
    `http://183.129.217.214:20182/8002/predict/createAixTaskForPredict`,
    data
  );
}

// todo
// export function downloadModel (params) {
//   let responseType = 'blob'

//   return request.get(`http://10.214.211.208:8002/download/wrapper`, { responseType, params });
// }
export function downloadModel(params) {

  return request.get(`http://183.129.217.214:20182/8002/download/wrapper`, { params });
}

export function downloadMirror(params) {
  return request.get(`http://183.129.217.214:20182/8002/predict/createAixTaskForPredict`, { params });
}

export function deleteFlowchart(data) {
  return request.post(`http://183.129.217.214:20182/8002/flowchart/delete`, data);
}


///// demo

export function detectDemo(url, data) {
  return request.post(
    url,
    data
  );
}