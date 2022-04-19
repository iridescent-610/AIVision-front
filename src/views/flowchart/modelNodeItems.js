// 元任务配置：

/**
 * Input / Output type
 * -1:  start / end
 * 0:   image
 *
 */

export default {
  /**
   * Algorithm, UserUpload, Dataset, Decision, Endpoint
   * 五种基本模型类节点类型
   *
   */

  // // ****************** 粗略的分类： Basic 基本的元素 *********************
  Basic: [
    // Dataset类型样例
    {
      shape: "flow-circle",
      model: {
        color: "#008000",
        label: "图像数据集",
        description: "选择一个数据集输入",
        key: "Dataset",
        name: "初始的数据集",
        kind: "Dataset",
        note: "",
        params: {
          id: null,
          is_annotated: false,
          only_train: false,
          meta: {
            dataset_type: "Image",
            filter_flag: false,
            category_flag: false,
          }
        }
      }
    },
    {
      shape: "flow-circle",
      model: {
        color: "#008000",
        label: "视频数据集",
        description: "选择一个视频数据集输入",
        key: "Dataset",
        name: "初始的视频数据集",
        kind: "Dataset",
        note: "",
        params: {
          id: null,
          is_annotated: false,
          only_train: false,
          meta: {
            dataset_type: "Video",
            filter_flag: false,
            category_flag: false,
          }
        }
      }
    },
    // 不需要了！！！！！！！！！！！！UserUpload类型样例
    // {
    //   shape: 'flow-rect',
    //   model: {
    //     color: '#4169E1',
    //     label: '自定义代码',
    //     description: '上传自定义代码',
    //     key: 'UserUpload',
    //     name: '初始的自定义代码',
    //     kind: 'UserUpload',
    //     note: '',
    //     params: {
    //       filePath: '',
    //       argsFormat: 'list',
    //       argsString: '--a=1 ',
    //       argsList: [{ name: '', value: '' }] // 手动添加
    //     }
    //   }
    // },
    // Endpoint类型样例
    {
      shape: "flow-circle",
      size: "72*72",
      model: {
        color: "#FF8C00",
        label: "起止点",
        description: "模型的入口",
        key: "Start",
        name: "模型的入口",
        kind: "Endpoint",
        note: "",
        params: {
          type: "start", // switch
          meta: {
            filter_flag: false,
            category_flag: false,
          }
        }
      }
    },
    // Decision类型样例
    {
      size: "80*48",
      shape: "flow-rhombus",
      model: {
        color: "#8E44AD", // '#FF0000',
        label: "条件判断",
        description: "用于加入分支判断和循环等功能",
        key: "If",
        name: "初始的条件判",
        kind: "Decision",
        note: "",
        params: {
          requirement: {
            name: "",
            value: "",
            type: "",
            description: ""
          },// 限制只有一个条件
          meta: {
            filter_flag: false,
            category_flag: false,
          }
        }
      }
    }
    // {
    //   shape: 'flow-circle',
    //   size: '72*72',
    //   model: {
    //     label: '测试节点6',
    //     color: '#FA8C16'
    //   },
    //   src:
    //     'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxjaXJjbGUgaWQ9ImIiIGN4PSIzNiIgY3k9IjM2IiByPSIzNiIvPjxmaWx0ZXIgeD0iLTkuNyUiIHk9Ii02LjklIiB3aWR0aD0iMTE5LjQlIiBoZWlnaHQ9IjExOS40JSIgZmlsdGVyVW5pdHM9Im9iamVjdEJvdW5kaW5nQm94IiBpZD0iYSI+PGZlT2Zmc2V0IGR5PSIyIiBpbj0iU291cmNlQWxwaGEiIHJlc3VsdD0ic2hhZG93T2Zmc2V0T3V0ZXIxIi8+PGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iMiIgaW49InNoYWRvd09mZnNldE91dGVyMSIgcmVzdWx0PSJzaGFkb3dCbHVyT3V0ZXIxIi8+PGZlQ29tcG9zaXRlIGluPSJzaGFkb3dCbHVyT3V0ZXIxIiBpbjI9IlNvdXJjZUFscGhhIiBvcGVyYXRvcj0ib3V0IiByZXN1bHQ9InNoYWRvd0JsdXJPdXRlcjEiLz48ZmVDb2xvck1hdHJpeCB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAuMDQgMCIgaW49InNoYWRvd0JsdXJPdXRlcjEiLz48L2ZpbHRlcj48L2RlZnM+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0IDIpIj48dXNlIGZpbGw9IiMwMDAiIGZpbHRlcj0idXJsKCNhKSIgeGxpbms6aHJlZj0iI2IiLz48dXNlIGZpbGwtb3BhY2l0eT0iLjkyIiBmaWxsPSIjRkZGMkU4IiB4bGluazpocmVmPSIjYiIvPjxjaXJjbGUgc3Ryb2tlPSIjRkZDMDY5IiBjeD0iMzYiIGN5PSIzNiIgcj0iMzUuNSIvPjwvZz48dGV4dCBmb250LWZhbWlseT0iUGluZ0ZhbmdTQy1SZWd1bGFyLCBQaW5nRmFuZyBTQyIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzAwMCIgZmlsbC1vcGFjaXR5PSIuNjUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDQgMikiPjx0c3BhbiB4PSIyMyIgeT0iNDEiPlN0YXJ0PC90c3Bhbj48L3RleHQ+PC9nPjwvc3ZnPg=='
    // }
  ],

  // ****************** 粗略的分类： OCR OCR相关的预置模型节点 *********************
  OCR: [
    // Algorithm类型样例
    {
      shape: "flow-rect",
      model: {
        color: "#1893FF",
        label: "文本检测",
        description: "检测文本",
        key: "TEXT_DETECTION",
        name: "初始的图像对齐",
        kind: "Algorithm",
        note: "",
        params: {
          id: null,
          model_name: "",
          args: [],
          retrain: true,
          belong_to: "",
          categories: "text",
          pretrain_name: "",
          pretrain_path: "",
          source: 0,  //aix
          auto_export: false,  // atlas
          is_public: false,
          requirement: {
            name: "",
            value: "",
            type: "",
            description: ""
          }, // 限制只有一个条件
          meta: {
            atlas_support: false, // 支持的时候auto_export才可以设置为true
            filter_flag: false,
            category_flag: false,
            io_relationship: "ONE_TO_MANY",
            input_type: ["Image"],
            output_type: ["Items.Bbox"]
          }
        }
      }
    },
    {
      shape: "flow-rect",
      model: {
        color: "#1893FF",
        label: "文本识别",
        description: "识别文本",
        key: "TEXT_RECOGNITION",
        name: "初始的图像对齐",
        kind: "Algorithm",
        note: "",
        params: {
          id: null,
          model_name: "",
          args: [],
          retrain: true,
          belong_to: "",
          categories: "",
          pretrain_name: "",
          pretrain_path: "",
          source: 0,  //aix
          auto_export: false,  // atlas
          is_public: false,
          need_merge: false,
          requirement: {
            name: "",
            value: "",
            type: "",
            description: ""
          }, // 限制只有一个条件
          meta: {
            atlas_support: false, // 支持的时候auto_export才可以设置为true
            filter_flag: false,
            category_flag: true,
            io_relationship: "ONE_TO_ONE",
            input_type: ["Image"],
            output_type: ["Text"]
          }
        }
      }
    }
  ],
  Video: [
    // Algorithm类型样例
    {
      shape: "flow-rect",
      model: {
        color: "#1893FF",
        label: "动作检测",
        description: "检测视频中的动作片段",
        key: "ACTION_DETECTION",
        name: "初始的动作检测",
        kind: "Algorithm",
        note: "",
        params: {
          id: null,
          model_name: "",
          args: [],
          retrain: true,
          belong_to: "",
          categories: "",
          pretrain_name: "",
          pretrain_path: "",
          source: 0,  //aix
          auto_export: false,  // atlas
          is_public: false,
          requirement: {
            name: "",
            value: "",
            type: "",
            description: ""
          }, // 限制只有一个条件
          meta: {
            atlas_support: false, // 支持的时候auto_export才可以设置为true
            filter_flag: false,
            category_flag: true,
            io_relationship: "ONE_TO_MANY",
            input_type: ["Image"],
            output_type: ["Items.Bbox", "Items.Category"]
          }
        }
      }
    },
    {
      shape: "flow-rect",
      model: {
        color: "#1893FF",
        label: "动作识别",
        description: "识别视频中的动作",
        key: "ACTION_RECOGNITION",
        name: "初始的动作识别",
        kind: "Algorithm",
        note: "",
        params: {
          id: null,
          model_name: "",
          args: [],
          retrain: true,
          belong_to: "",
          categories: "",
          pretrain_name: "",
          pretrain_path: "",
          source: 0,  //aix
          auto_export: false,  // atlas
          is_public: false,
          requirement: {
            name: "",
            value: "",
            type: "",
            description: ""
          }, // 限制只有一个条件
          meta: {
            atlas_support: false, // 支持的时候auto_export才可以设置为true
            filter_flag: false,
            category_flag: true,
            io_relationship: "ONE_TO_ONE",
            input_type: ["Video"],
            output_type: ["Category"]
          }
        }
      }
    }
  ],
  Other: [
    {
      shape: 'flow-rect',
      model: {
        color: '#1893FF',
        label: '图像增强',
        description: '去褶皱，去阴影，去模糊等',
        key: 'AUGMENTATION',
        name: '初始的图像增强',
        kind: 'Algorithm',
        note: '',
        params: {
          id: null,
          model_name: "",
          args: [],
          retrain: true,
          belong_to: "",
          categories: "",
          pretrain_name: "",
          pretrain_path: "",
          source: 0,  //aix
          auto_export: false,  // atlas
          is_public: false,
          requirement: {
            name: "",
            value: "",
            type: "",
            description: ""
          }, // 限制只有一个条件
          meta: {
            atlas_support: false, // 支持的时候auto_export才可以设置为true
            filter_flag: true,
            filter_values: ['deblur', 'denoise', 'demosaick', 'super_resolution', 'deseal', 'derain', 'dewarp', 'deshadow'],
            category_flag: false,
            io_relationship: 'ONE_TO_ONE',
            input_type: ['Image'],
            output_type: ['Image']
          }
        }
      }
    },
    {
      shape: "flow-rect",
      model: {
        color: "#1893FF",
        label: "目标检测",
        description: "检测物体所在位置以及物体粗类别",
        key: "DETECTION",
        name: "初始的目标检测",
        kind: "Algorithm",
        note: "",
        params: {
          id: null,
          model_name: "",
          args: [],
          retrain: true,
          belong_to: "",
          categories: "knife,scissors,lighter,zippooil,pressure,slingshot,handcuffs,nailpolish,powerbank,firecrackers",
          pretrain_name: "",
          pretrain_path: "",
          source: 0,  //aix
          auto_export: false,  // atlas
          is_public: false,
          requirement: {
            name: "",
            value: "",
            type: "",
            description: ""
          }, // 限制只有一个条件
          meta: {
            atlas_support: false, // 支持的时候auto_export才可以设置为true
            filter_flag: false,
            category_flag: true,
            io_relationship: "ONE_TO_MANY",
            input_type: ["Image"],
            output_type: ["Items.Bbox", "Items.Category"]
          }
        }
      }
    },
    {
      shape: "flow-rect",
      model: {
        color: "#1893FF",
        label: "图像分类",
        description: "分类",
        key: "CLASSIFICATION",
        name: "初始的图像分类",
        kind: "Algorithm",
        note: "",
        params: {
          id: null, // code id
          model_name: "",
          args: [],
          retrain: true,
          belong_to: "",
          categories: "",
          pretrain_name: "",
          pretrain_path: "",
          source: 0,  //aix
          auto_export: false,  // atlas
          is_public: false,
          requirement: {
            name: "",
            value: "",
            type: "",
            description: ""
          }, // 限制只有一个条件
          meta: {
            atlas_support: true, // 支持的时候auto_export才可以设置为true
            filter_flag: false,
            category_flag: true,
            io_relationship: "ONE_TO_ONE",
            input_type: ["Image"],
            output_type: ["Category"]
          }
        }
      }
    },
    {
      shape: "flow-rect",
      model: {
        color: "#1893FF",
        label: "图像分割",
        description: "分割物体所在位置以及物体类别",
        key: "SEGMENTATION",
        name: "初始的图像分割",
        kind: "Algorithm",
        note: "",
        params: {
          id: null,
          model_name: "",
          args: [],
          retrain: true,
          belong_to: "",
          categories: "",
          pretrain_name: "",
          pretrain_path: "",
          source: 0,  //aix
          auto_export: false,  // atlas
          is_public: false,
          requirement: {
            name: "",
            value: "",
            type: "",
            description: ""
          }, // 限制只有一个条件
          meta: {
            atlas_support: false, // 支持的时候auto_export才可以设置为true
            filter_flag: false,
            category_flag: true,
            io_relationship: "ONE_TO_ONE",
            input_type: ["Image"],
            output_type: ["Image"]
          }
        }
      }
    },
    {
      shape: "flow-rect",
      model: {
        color: "#1893FF",
        label: "姿态估计",
        description: "识别图像中的关键点",
        key: "ACTION_RECOGNITION",
        name: "初始的姿态估计",
        kind: "Algorithm",
        note: "",
        params: {
          id: null,
          model_name: "",
          args: [],
          retrain: true,
          belong_to: "",
          categories: "",
          pretrain_name: "",
          pretrain_path: "",
          source: 0,  //aix
          auto_export: false,  // atlas
          is_public: false,
          requirement: {
            name: "",
            value: "",
            type: "",
            description: ""
          }, // 限制只有一个条件
          meta: {
            atlas_support: false, // 支持的时候auto_export才可以设置为true
            filter_flag: false,
            category_flag: true,
            io_relationship: "ONE_TO_ONE",
            input_type: ["Image"],
            output_type: ["Category"]
          }
        }
      }
    }
    // {
    //   shape: 'flow-rect',
    //   model: {
    //     color: '#1893FF',
    //     label: '图像对齐',
    //     description: '如果您的输入图片不是规整的，即存在透视扭曲和旋转等情况，则需要先进行图像对齐',
    //     key: 'ALIGN',
    //     name: '初始的图像对齐',
    //     kind: 'Algorithm',
    //     note: '',
    //     params: {
    //       id: null,
    //       args: [],
    //       meta: {
    //         io_relationship: 'ONE_TO_ONE',
    //         input_type: ['Image'],
    //         output_type: ['Image']
    //       }
    //     }
    //   }
    // },
    // {
    //   shape: 'flow-rect',
    //   model: {
    //     color: '#1893FF',
    //     label: '命名实体识别',
    //     description: '提取关键信息',
    //     key: 'NER',
    //     name: '初始的图像对齐',
    //     kind: 'Algorithm',
    //     note: '',
    //     params: {
    //       id: null,
    //       args: [],
    //       meta: {
    //         io_relationship: 'ONE_TO_MANY',
    //         input_type: ['Text'],
    //         output_type: ['Items.Text', 'Items.Category']
    //       }
    //     }
    //   }
    // },
    // {
    //   shape: 'flow-rect',
    //   model: {
    //     color: '#1893FF',
    //     label: '图像信息提取',
    //     description: '提取关键信息',
    //     key: 'IMAGE_KEY',
    //     name: '初始的图像对齐',
    //     kind: 'Algorithm',
    //     note: '',
    //     params: {
    //       id: null,
    //       args: [],
    //       meta: {
    //         io_relationship: 'MANY_TO_MANY',
    //         input_type: ['Items.Text', 'Items.Bbox', 'Items.Image'],
    //         output_type: ['Items.Category']
    //       }
    //     }
    //   }
    // }
  ]
};

const color = [
  { kind: "Endpoint", color: "#FF8C00" },
  { kind: "Dataset", color: "#008000" },
  { kind: "Decision", color: "#8E44AD" },
  { kind: "Algorithm", color: "#1893FF" },
  { kind: "UserUpload", color: "#4169E1" }
];

export const colorDict = color.reduce((s, cur) => {
  s[cur.kind] = cur.color;
  return s;
}, {});

const key = [
  { key: "SEGMENTATION", task: "segmentation" },
  { key: "CLASSIFICATION", task: "classification" },
  { key: "DETECTION", task: "detection" },
  // { key: '', task: 'depth' },
  // { key: '', task: 'keypoints' },
  { key: "TEXT_DETECTION", task: "text detection" },
  { key: "TEXT_RECOGNITION", task: "text recognition" },
  // { key: "NER", task: "named entity recognition" },
  { key: "AUGMENTATION", task: "augmentation" },
  { key: "ACTION_RECOGNITION", task: "action recognition" },
  { key: "ACTION_DETECTION", task: "action detection" }
];

export const keyDict = key.reduce((s, cur) => {
  s[cur.key] = cur.task;
  return s;
}, {});
