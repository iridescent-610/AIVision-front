export default [
  {
    id: 0,
    name: '文档关键信息提取样例',
    data: {"nodes":[{"type":"node","size":"72*72","shape":"flow-circle","color":"#FF8C00","label":"起止点","description":"模型的入口","key":"Start","name":"模型的入口","kind":"Endpoint","note":"","params":{"type":"start"},"x":336,"y":90,"id":"24f8494a","index":0},{"type":"node","size":"80*48","shape":"flow-rect","color":"#1893FF","label":"文本检测","description":"检测文本","key":"TEXT_DETECTION","name":"初始的图像对齐","kind":"Algorithm","note":"","params":{"id":47,"args":[{"name":"batch size","value":"0.1","description":"学习率"}],"meta":{"io_relationship":"ONE_TO_MANY","input_type":["Image"],"output_type":["Items.Bbox"]}},"x":336,"y":296,"id":"a987565f","index":1},{"type":"node","size":"80*48","shape":"flow-rect","color":"#1893FF","label":"图像对齐","description":"如果您的输入图片不是规整的，即存在透视扭曲和旋转等情况，则需要先进行图像对齐","key":"ALIGN","name":"初始的图像对齐","kind":"Algorithm","note":"","params":{"id":23,"args":[],"meta":{"io_relationship":"ONE_TO_ONE","input_type":["Image"],"output_type":["Image"]}},"x":329.5,"y":205,"id":"763b85ce","index":2},{"type":"node","size":"80*48","shape":"flow-circle","color":"#008000","label":"图像数据集","description":"选择一个数据集输入","key":"Dataset","name":"初始的数据集","kind":"Dataset","note":"","params":{"id":33,"meta":{"dataset_type":"Image"}},"x":181,"y":210,"id":"685f0a04","index":3},{"type":"node","size":"80*48","shape":"flow-rhombus","color":"#8E44AD","label":"条件判断","description":"用于加入分支判断和循环等功能","key":"If","name":"初始的条件判","kind":"Decision","note":"","params":{"requirement":{"name":"度量1","value":"0.85","type":"good","description":"越高越好"}},"x":329,"y":399,"id":"7b2ee2e2","index":7},{"type":"node","size":"80*48","shape":"flow-rect","color":"#1893FF","label":"文本识别","description":"识别文本","key":"TEXT_RECOGNITION","name":"初始的图像对齐","kind":"Algorithm","note":"","params":{"id":48,"args":[],"need_merge":true,"meta":{"io_relationship":"ONE_TO_ONE","input_type":["Image"],"output_type":["Text"]}},"x":329,"y":497,"id":"5e9002dd","index":10},{"type":"node","size":"82*48","shape":"flow-rect","color":"#1893FF","label":"命名实体识别","description":"提取关键信息","key":"NER","name":"初始的图像对齐","kind":"Algorithm","note":"","params":{"id":47,"args":[{"name":"batch size","value":"0.1","description":"学习率"}],"meta":{"io_relationship":"ONE_TO_MANY","input_type":["Text"],"output_type":["Items.Text","Items.Category"]}},"x":333,"y":594,"id":"6a57ffc3","index":12},{"type":"node","size":"72*72","shape":"flow-circle","color":"#FF8C00","label":"起止点","description":"模型的入口","key":"Start","name":"模型的入口","kind":"Endpoint","note":"","params":{"type":"end"},"x":493,"y":586,"id":"d435eb9c","index":14}],"edges":[{"source":"24f8494a","sourceAnchor":2,"target":"763b85ce","targetAnchor":0,"id":"4a8d6860","index":4},{"source":"685f0a04","sourceAnchor":1,"target":"763b85ce","targetAnchor":3,"id":"c2d1ff59","index":5},{"source":"763b85ce","sourceAnchor":2,"target":"a987565f","targetAnchor":0,"id":"1bd3e89d","index":6},{"source":"a987565f","sourceAnchor":2,"target":"7b2ee2e2","targetAnchor":0,"id":"6fe24be5","index":8},{"source":"7b2ee2e2","sourceAnchor":3,"target":"a987565f","targetAnchor":3,"id":"f426bae7","index":9,"shape":"flow-smooth","cond":"N","label":"N"},{"source":"7b2ee2e2","sourceAnchor":2,"target":"5e9002dd","targetAnchor":0,"id":"89b068c0","index":11,"shape":"flow-smooth","cond":"Y","label":"Y"},{"source":"5e9002dd","sourceAnchor":2,"target":"6a57ffc3","targetAnchor":0,"id":"c6db80eb","index":13},{"source":"6a57ffc3","sourceAnchor":1,"target":"d435eb9c","targetAnchor":3,"id":"26533b45","index":15}]}
  },

  {
    id: 1,
    name: '图象关键信息提取实例',
    data: {"nodes":[{"type":"node","size":"72*72","shape":"flow-circle","color":"#FF8C00","label":"起止点","description":"模型的入口","key":"Start","name":"模型的入口","kind":"Endpoint","note":"","params":{"type":"start"},"x":387.5,"y":32,"id":"16c2da62","index":0},{"type":"node","size":"80*48","shape":"flow-rect","color":"#1893FF","label":"图像对齐","description":"如果您的输入图片不是规整的，即存在透视扭曲和旋转等情况，则需要先进行图像对齐","key":"ALIGN","name":"初始的图像对齐","kind":"Algorithm","note":"","params":{"model":"lstm-crf3","args":[],"meta":{"io_relationship":"ONE_TO_ONE","input_type":["Image"],"output_type":["Image"]},"id":48},"x":383,"y":173.5,"id":"0a1d3d4b","index":1},{"type":"node","size":"80*48","shape":"flow-rect","color":"#1893FF","label":"文本检测","description":"检测文本","key":"TEXT_DETECTION","name":"初始的图像对齐","kind":"Algorithm","note":"","params":{"model":"lstm-crf5","args":[{"name":"batch size","value":"0.1","description":"学习率"}],"meta":{"io_relationship":"ONE_TO_MANY","input_type":["Image"],"output_type":["Items.Bbox"]},"id":47},"x":382.5,"y":272.5,"id":"a9601d75","index":2},{"type":"node","size":"80*48","shape":"flow-circle","color":"#008000","label":"数据集","description":"上传一个有标注或者没有标注的数据集（zip或者rar格式）","key":"Dataset","name":"初始的数据集","kind":"Dataset","note":"","params":{"origin":"existing","datasetName":"图像数据集1","meta":{"dataset_type":"Image"},"id":33},"x":214,"y":173,"id":"868a7130","index":3},{"type":"node","size":"82*48","shape":"flow-rect","color":"#1893FF","label":"图像信息提取","description":"提取关键信息","key":"IMAGE_KEY","name":"初始的图像对齐","kind":"Algorithm","note":"","params":{"model":"","args":[{"name":"batch size","value":"0.1","description":"学习率"}],"meta":{"io_relationship":"MANY_TO_MANY","input_type":["Items.Text","Items.Bbox","Items.Image"],"output_type":["Items.Category"]},"id":47},"x":384,"y":577,"id":"3b06f4d8","index":9},{"type":"node","size":"72*72","shape":"flow-circle","color":"#FF8C00","label":"起止点","description":"模型的入口","key":"Start","name":"模型的入口","kind":"Endpoint","note":"","params":{"type":"end"},"x":600.5,"y":569.5,"id":"262ea3fa","index":12},{"type":"node","size":"80*48","shape":"flow-rect","color":"#1893FF","label":"文本识别","description":"识别文本","key":"TEXT_RECOGNITION","name":"初始的图像对齐","kind":"Algorithm","note":"","params":{"model":"lstm-crf4","args":[{"name":"batch size","value":"0.1","description":"学习率"}],"need_merge":false,"meta":{"io_relationship":"ONE_TO_ONE","input_type":["Image"],"output_type":["Text"]},"id":47},"x":383,"y":493,"id":"484380f4","index":13},{"type":"node","size":"80*48","shape":"flow-rhombus","color":"#8E44AD","label":"条件判断","description":"用于加入分支判断和循环等功能","key":"If","name":"初始的条件判","kind":"Decision","note":"","params":{"requirement":{"name":"度量1","value":"0.85","type":"good","description":"越高越好"}},"x":382,"y":401,"id":"2a82f31a","index":14}],"edges":[{"source":"868a7130","sourceAnchor":1,"target":"0a1d3d4b","targetAnchor":3,"id":"6eaa46c7","index":4},{"source":"0a1d3d4b","sourceAnchor":2,"target":"a9601d75","targetAnchor":0,"id":"4169af6a","index":5},{"source":"2a82f31a","sourceAnchor":2,"target":"484380f4","targetAnchor":0,"id":"569f8216","index":6,"shape":"flow-smooth","cond":"Y","label":"Y"},{"source":"2a82f31a","sourceAnchor":3,"target":"a9601d75","targetAnchor":3,"id":"0e19ad5b","index":7,"shape":"flow-smooth","cond":"N","label":"N"},{"source":"16c2da62","sourceAnchor":2,"target":"0a1d3d4b","targetAnchor":0,"id":"8093aba4","index":8},{"source":"484380f4","sourceAnchor":2,"target":"3b06f4d8","targetAnchor":0,"id":"5fe5fbdb","index":10},{"source":"3b06f4d8","sourceAnchor":1,"target":"262ea3fa","targetAnchor":3,"id":"691e28a9","index":11},{"source":"a9601d75","sourceAnchor":2,"target":"2a82f31a","targetAnchor":0,"id":"3005f0ac","shape":"flow-smooth","index":15}]}
  },

  {
    id: 2,
    name: '任务图2',
    data: {}
  },

  {
    id: 3,
    name: '任务图3',
    data: {}
  },

  {
    id: 4,
    name: '任务图4',
    data: {}
  },

  {
    id: 5,
    name: '任务图5',
    data: {}
  },

  {
    id: 6,
    name: '任务图6',
    data: {}
  },

  {
    id: 7,
    name: '任务图7',
    data: {}
  },

  {
    id: 8,
    name: '任务图8',
    data: {}
  },

  {
    id: 9,
    name: '任务图9',
    data: {}
  },

  {
    id: 10,
    name: '任务图10',
    data: {}
  }
]
