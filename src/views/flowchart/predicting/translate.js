
const statusDescription = [
  { key: 'preprocess', name: '预处理', description: '', buttonText: '', tipText: '' },
  { key: 'detection', name: '文本检测', description: '', buttonText: '', tipText: '' },
  { key: 'recognition', name: '文本识别', description: '', buttonText: '', tipText: '' },
  { key: 'extraction', name: '信息提取', description: '', buttonText: '', tipText: '' },

  { key: 'uploadData', name: '选择训练数据', description: '选择训练或者微调数据集', buttonText: '选择数据', tipText: '我已完成数据上传！' },
  { key: 'align', name: '图像对齐', description: '自动进行，将图像规整化', buttonText: '', tipText: '' },
  { key: 'generateLabel', name: '生成初步标注', description: '自动进行，使用预训练模型生成初步的标注', buttonText: '', tipText: '' },
  { key: 'modifyLabel', name: '校对标注', description: '对初步标注进行校对和修改', buttonText: '前往标注', tipText: '我已完成数据标注！' },
  { key: 'trainModel', name: '训练模型', description: '自动进行，使用标注数据微调或者重训练模型', buttonText: '', tipText: '' },
  { key: 'generateResult', name: '生成结果', description: '自动进行，使用训练好的模型生成结果供下一阶段训练使用', buttonText: '', tipText: '' },
  { key: 'labelByMan', name: '人工标注', description: '对上传的数据进行标注', buttonText: '前往标注', tipText: '我已完成数据标注！' },

  // 参数用
  { key: 'type', name: '模型类型', description: '', buttonText: '', tipText: '' },
  { key: 'general', name: '通用参数', description: '', buttonText: '', tipText: '' },
  { key: 'modelName', name: '模型名称', description: '', buttonText: '', tipText: '' },
  { key: 'returnFormat', name: '返回格式', description: '', buttonText: '', tipText: '' },
  { key: 'detectModel', name: '检测模型', description: '', buttonText: '', tipText: '' },
  { key: 'needFt', name: '是否微调', description: '', buttonText: '', tipText: '' },
  { key: 'recognizeModel', name: '识别模型', description: '', buttonText: '', tipText: '' },
  { key: 'extractModel', name: '提取模型', description: '', buttonText: '', tipText: '' },
  { key: 'needRt', name: '重新训练', description: '', buttonText: '', tipText: '' },
  { key: 'extractKeyTypes', name: '提取字段', description: '', buttonText: '', tipText: '' }

]

export const nameTransDict = statusDescription.reduce((s, cur) => {
  s[cur.key] = cur.name
  return s
}, {})

export const desTransDict = statusDescription.reduce((s, cur) => {
  s[cur.key] = cur.description
  return s
}, {})

export const buttonTransDict = statusDescription.reduce((s, cur) => {
  s[cur.key] = cur.buttonText
  return s
}, {})

export const tipTransDict = statusDescription.reduce((s, cur) => {
  s[cur.key] = cur.tipText
  return s
}, {})

export const fakedata = [{
  id: 0,
  type: 'Contract',
  modelName: '周凌志做的合同模型1',
  datasetName: '',
  stages: [
    {
      id: '0',
      stageName: 'preprocess',
      steps: [
        {
          id: '0-0',
          stepName: 'uploadData',
          error: false
        },
        {
          id: '0-1',
          stepName: 'align'
        }
      ]
    },

    {
      id: '1',
      stageName: 'detection',
      steps: [
        {
          id: '1-0',
          stepName: 'generateLabel'
        },
        {
          id: '1-1',
          stepName: 'modifyLabel'
        },
        {
          id: '1-2',
          stepName: 'trainModel'
        },
        {
          id: '1-3',
          stepName: 'generateResult'
        }
      ]
    },

    {
      id: '2',
      stageName: 'recognition',
      steps: [
        {
          id: '2-0',
          stepName: 'generateLabel'
        },
        {
          id: '2-1',
          stepName: 'modifyLabel'
        },
        {
          id: '2-2',
          stepName: 'trainModel'
        },
        {
          id: '2-3',
          stepName: 'generateResult'
        }
      ]
    }
  ],
  currentStageNo: 2,
  currentStepNo: 1,
  useData: true
}, {
  id: 1,
  type: 'VAT',
  modelName: '周凌志做的增值税发票模型1',
  datasetName: '223',
  stages: [
    {
      id: '0',
      stageName: 'preprocess',
      steps: [
        {
          id: '0-0',
          stepName: 'uploadData'
        },
        {
          id: '0-1',
          stepName: 'align'
        }
      ]
    },

    {
      id: '1',
      stageName: 'detection',
      steps: [
        {
          id: '1-0',
          stepName: 'generateLabel'
        },
        {
          id: '1-1',
          stepName: 'modifyLabel'
        },
        {
          id: '1-2',
          stepName: 'trainModel'
        },
        {
          id: '1-3',
          stepName: 'generateResult'
        }
      ]
    },

    {
      id: '2',
      stageName: 'recognition',
      steps: [
        {
          id: '2-0',
          stepName: 'generateLabel'
        },
        {
          id: '2-1',
          stepName: 'modifyLabel'
        },
        {
          id: '2-2',
          stepName: 'trainModel'
        },
        {
          id: '2-3',
          stepName: 'generateResult'
        }
      ]
    }
  ],
  currentStageNo: 0,
  currentStepNo: 0,
  useData: true
}, {
  id: 2,
  type: 'Contract',
  modelName: '周凌志做的合同模型2',
  datasetName: '',
  stages: [],
  currentStageNo: 100,
  currentStepNo: 100,
  useData: false
}, {
  id: 3,
  type: 'VAT',
  modelName: '周凌志做的增值税发票模型2',
  datasetName: '',
  stages: [
    {
      id: '0',
      stageName: 'preprocess',
      steps: [
        {
          id: '0-0',
          stepName: 'uploadData'
        },
        {
          id: '0-1',
          stepName: 'align'
        }
      ]
    },

    {
      id: '1',
      stageName: 'detection',
      steps: [
        {
          id: '1-0',
          stepName: 'generateLabel'
        },
        {
          id: '1-1',
          stepName: 'modifyLabel'
        },
        {
          id: '1-2',
          stepName: 'trainModel'
        },
        {
          id: '1-3',
          stepName: 'generateResult'
        }
      ]
    },

    {
      id: '2',
      stageName: 'recognition',
      steps: [
        {
          id: '2-0',
          stepName: 'generateLabel'
        },
        {
          id: '2-1',
          stepName: 'modifyLabel'
        },
        {
          id: '2-2',
          stepName: 'trainModel'
        },
        {
          id: '2-3',
          stepName: 'generateResult'
        }
      ]
    }
  ],
  currentStageNo: 100,
  currentStepNo: 100,
  useData: true
}, {
  id: 4,
  type: 'VAT',
  modelName: '周凌志做的增值税发票模型3',
  datasetName: '',
  stages: [
    {
      id: '0',
      stageName: 'preprocess',
      steps: [
        {
          id: '0-0',
          stepName: 'uploadData'
        },
        {
          id: '0-1',
          stepName: 'align'
        }
      ]
    },

    {
      id: '1',
      stageName: 'detection',
      steps: [
        {
          id: '1-0',
          stepName: 'generateLabel'
        },
        {
          id: '1-1',
          stepName: 'modifyLabel'
        },
        {
          id: '1-2',
          stepName: 'trainModel'
        },
        {
          id: '1-3',
          stepName: 'generateResult'
        }
      ]
    },

    {
      id: '2',
      stageName: 'recognition',
      steps: [
        {
          id: '2-0',
          stepName: 'generateResult'
        }
      ]
    }
  ],
  currentStageNo: 1,
  currentStepNo: 2,
  useData: true
}
]

export const fakeparams = {
  'general': {
    'modelName': '\u6d4b\u8bd5\u6a21\u578b\u53c2\u6570',
    'align': true,
    'returnFormat': 'json'
  },
  'detection': {
    'detectModel': 'lstm-crf3',
    'needFt': false
  },
  'recognition': {
    'recognizeModel': 'lstm-crf3',
    'needFt': false
  },
  'extraction': {
    'extractModel': 'lstm-crf2',
    'needFt': true,
    'extractKeyTypes': [
      'aname',
      'bname',
      'amount'
    ]
  }
}
