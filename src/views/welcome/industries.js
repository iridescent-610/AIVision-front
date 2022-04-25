
export const industries = [
  {
    id: 0,
    key: "general",
    name: "通用场景",
    desc: "通用的解决方案，定制基于图像进行多样化分析的AI模型，实现图像内容理解分类、图中物体检测定位等，适用于图片内容检索、安防监控、工业质检等场景",
    img: "./assets/general.jpg",
    back: "./assets/general_back.jpg",
    examples: [
      {
        key: "image_classification",
        name: "通用图像分类",
        id: 0,
        img: "./assets/ex-ic.png",
        elements: ['图像分类'],
        desc: "定制基于图像的图像分类模型，适用于猫狗分类等场景"
      },
      {
        key: "object_detection",
        name: "通用物体检测",
        id: 1,
        img: "./assets/ex-od.png",
        elements: ['目标检测'],
        desc: "定制基于图像的目标检测模型，适用于行人检测等场景"
      },
      {
        key: "fine_grained_image_recognition",
        name: "细粒度图像识别",
        id: 2,
        img: "./assets/ex-fgir.png",
        elements: ['目标检测', '图像分类'],
        desc: "定制基于图像的细粒度识别模型，实现图像目标检测、细粒度识别等任务，适用于猫狗分类、行人检测等场景"
      },
      {
        key: "text_spotting",
        name: "多场景文本识别",
        id: 3,
        img: "./assets/ex-ts.png",
        elements: ['文本检测', '文本识别'],
        desc: "定制基于图像的文本识别模型，实现文档、票据、手写、自然场景等多种场景的图像文本识别，适用于OCR、关键信息提取等任务"
      },
      {
        key: "image_segmentation",
        name: "通用图像分割",
        id: 4,
        img: "./assets/ex-is.png",
        elements: ['图像分割'],
        desc: "定制基于图像的图像分割模型，是为场景理解铺平了道路的一种高层任务，可用于自动驾驶、人机交互、计算摄影学、图像搜索引擎、增强现实等场景"
      },
      {
        key: "multi_kind_image_augmentation",
        name: "多功能图像质量增强",
        id: 5,
        img: "./assets/ex-mkia.png",
        elements: ['去模糊', '去印章', '超分辨率', '去阴影', '去褶皱', '去雨', '去噪声', '...'],
        desc: "定制基于图像进行多样化增强的图像到图像AI模型，实现图像去模糊、图像去阴影等增强功能，适用于图片文本内容识别、图像分类、文档关键信息提取等下流任务场景"
      }
    ]
  },
  {
    id: 1,
    key: "information",
    name: "信息服务",
    desc: "在信息处理场景下，提供各种技术接口整合的语音搜索、图像搜索、智能录入、口碑分析、有声阅读、内容审核、内容分类等信息服务解决方案，解放人力，降低成本，提升产品竞争力",
    img: "./assets/information.jpg",
    back: "./assets/information_back.jpg",
    examples: [
      {
        key: "text_spotting",
        name: "智能录入",
        id: 0,
        img: "./assets/info-ts.jpg",
        elements: ['文本检测', '文本识别'],
        desc: "接入语音识别和文字识别技术，丰富信息录入的方式，辅助用户录入信息，极高的识别率让繁琐、低效的业务环节体现更好的用户体验。用户也可依据自己的业务需求制作自定义模板，结构化抽取特定区域的数据"
      },
      {
        key: "empty",   // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        name: "图像搜索",
        id: 1,
        img: "./assets/info-em.jpg",
        elements: [],
        desc: "以图搜图，在指定图库中搜索出相同或相似的图片"
      }
    ]
  },
  {
    id: 2,
    key: "retail",
    name: "智能零售",
    desc: "基于人脸识别、人体分析、图像识别、大数据分析等核心AI技术能力，赋能线下门店、商超、MALL、品牌商各类零售业态，助力会员管理、客流分析、商品结算、货品陈列稽查等业务场景升级，提升商业效率",
    img: "./assets/retail.jpg",
    back: "./assets/retail_back.jpg",
    examples: [
      {
        key: "object_detection",
        name: "货品陈列自动审核",
        id: 0,
        img: "./assets/retail-od.jpg",
        elements: ['目标检测'],
        desc: "采集需要识别的商品样本图片，通过AI+X定制化图像识别平台，训练专属识别模型，检测图像中指定商品的位置、数量，判断陈列是否符合要求"
      },
      {
        key: "empty",   // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        name: "销量预测",
        id: 1,
        img: "./assets/retail-em.jpg",
        elements: [],
        desc: "将商家商品销量数据和天气、位置、用户数据相结合，建立销量预测模型，从而对未来一段时间的产品销量进行预测"
      }
    ]
  },
  {
    id: 3,
    key: "education",
    name: "智能教育",
    desc: "基于语音交互、文字识别、人脸识别、人体识别、AR等多项AI技术，赋能软硬件教学产品，实现更好的人机交互的教学体验，用更低的师资成本获得高质量的教育效果；同时打造智慧校园，实现校园安全、校内考勤、课堂效果监测等关键场景业务升级，提升校园生活体验和安全性，降低管理成本",
    img: "./assets/education.jpg",
    back: "./assets/education_back.jpg",
    examples: [
      {
        key: "text_spotting",
        name: "作业辅导批改",
        id: 0,
        img: "./assets/edu-ts.jpg",
        elements: ['文本检测', '文本识别'],
        desc: "通过应用OCR技术，包括通用文字识别、手写识别、公式识别、数字识别等能力，对作业、答题卡图片进行扫描，智能识别学生考号、姓名等信息来判断学生身份；识别印刷题目和手写答题内容；识别客观题答案实现电子信息化阅卷等"
      },
      {
        key: "empty",   // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        name: "人员通行管理",
        id: 1,
        img: "./assets/edu-em.jpg",
        elements: ['人脸识别', '活体检测'],
        desc: "针对校门口、宿舍、体育馆、重点区域等出入口，安装人脸闸机/门禁，实现刷脸通行，规避非本校人员等尾随入内，提升安全管理效率和便捷性"
      }
    ]
  },
  {
    id: 4,
    key: "factory",
    name: "智能工业",
    desc: "基于人脸、图像等技术，针对工厂质检、仓储物流、智能监控等场景，提供物流安全、生产线质检、园区管理等场景方案，全面提升安全生产管理能力",
    img: "./assets/factory.jpg",
    back: "./assets/factory_back.jpg",
    examples: [
      {
        key: "object_detection",
        name: "智能安检",
        id: 2,
        idx: "security_check",
        img: "./assets/fac-ob.jpg",
        elements: ['目标检测'],
        desc: "基于目标检测技术，X光安检图像智能识别可识别常见的刀具、枪支、烟花爆竹、压力容器罐等违禁品，可应用于大型活动、轨交铁路、机场海关、快递物流等多个领域"
      },
      {
        key: "image_classification",
        name: "生产线质检",
        id: 0,
        img: "./assets/fac-ic.jpg",
        elements: ['图像分类'],
        desc: "基于计算机视觉技术，实现工业产品的外观缺陷检测、零部件装配缺失检测等，提高工业生产效率和产品良品率，使 AI 赋能智能制造"
      },
      {
        key: "empty",   // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        name: "园区管理",
        id: 1,
        img: "./assets/fac-em.jpg",
        elements: ['人脸识别', '车牌识别'],
        desc: "针对园区访客通行的管理，使用人脸识别作为身份核验依据，提升访客通行的安全性和便捷性。通过车牌信息和人脸信息的映射关联，判断指定用户开着指定车辆，减少车辆出入过程中的多项检查，提高业务管理安全性和效率"
      }
    ]
  },
  {
    id: 5,
    key: "healthcare",
    name: "智能医疗",
    desc: "基于计算机视觉能力，构造临床辅助决策系统、眼底影像分析系统、医疗大数据整体解决方案、智能诊前助手、慢病管理平台等产品系列，服务院内院外全场景",
    img: "./assets/healthcare.jpg",
    back: "./assets/healthcare_back.jpg",
    examples: [
      {
        key: "text_spotting",
        name: "医疗文档识别",
        id: 0,
        img: "./assets/health-ts.jpg",
        elements: ['文本检测', '文本识别'],
        desc: "通过应用OCR技术，包括通用文字识别、手写识别、公式识别、数字识别等能力，对医疗文档进行文字识别"
      },
      {
        key: "image_segmentation",
        name: "癌症诊断",
        id: 1,
        img: "./assets/health-is.jpg",
        elements: ['图像分割'],
        desc: "定制基于图像的图像分割模型，可用于医疗图像的癌症辅助诊断"
      },
      {
        key: "empty",   // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        name: "智能诊前助手",
        id: 2,
        img: "./assets/health-em.jpg",
        elements: [],
        desc: "基于专业医疗知识图谱，采用多种算法模型与多轮智能交互理解病人病情，根据病人病情精准匹配就诊科室和专业医生。整体问诊识别率及准确率均超过 95%"
      }
    ]
  },
  {
    id: 6,
    key: "government",
    name: "智能政务",
    desc: "融合语音技术、人脸识别、文字识别等多项AI技术，应用到智慧城市、政府办公、信息管理和公共服务等场景中，助力政务决策、业务流程优化，提升利企便民服务体验",
    img: "./assets/government.jpg",
    back: "./assets/government_back.jpg",
    examples: [
      {
        key: "empty",   // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        name: "智能检索",
        id: 0,
        img: "./assets/gov-em1.jpg",
        elements: ['文本检测', '文本识别', '文本分类'],
        desc: "基于文字、图像识别技术对公文等资料内容进行数据化提取，利用自然语言处理技术获取分类结果，实现智能检索、推荐等场景应用"
      },
      {
        key: "empty",   // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        name: "远程认证",
        id: 1,
        img: "./assets/gov-em2.jpg",
        elements: ['人脸识别', '活体检测'],
        desc: "基于人脸识别技术，通过人证对比，确保当前操作者为真人且为本人，可应用于办理大厅、线上自助验证、工作人员上门验证等，提高核真效率"
      },
      {
        key: "empty",   // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        name: "智慧大厅",
        id: 2,
        img: "./assets/gov-em3.jpg",
        elements: ['人脸识别', '文字识别', '语音识别'],
        desc: "政务自助终端通过接入语音、文字识别、人脸识别等技术，实现办理证照申请等各类政务、便民服务，同时还可进行资料采集、身份认证等操作，大幅提高政务办事效率和便民性"
      }
    ]
  },
  {
    id: 7,
    key: "estate",
    name: "智能园区",
    desc: "基于人脸识别等技术，针对社区、楼宇等地产环境，提供人员/车辆通行管理、安防布控、智慧服务、无人作业车、智慧家居等场景方案，全面提升管理效率与安全等级",
    img: "./assets/estate.jpg",
    back: "./assets/estate_back.jpg",
    examples: [
      {
        key: "empty",   // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        name: "人员通行管理",
        id: 0,
        img: "./assets/estate-em1.jpg",
        elements: ['人脸识别', '活体检测'],
        desc: "针对社区、楼宇人员通行，使用人脸识别作为身份核验依据，提升人员通行的安全性和便捷性"
      },
      {
        key: "empty",   // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        name: "车辆通行管理",
        id: 1,
        img: "./assets/estate-em2.jpg",
        elements: ['人脸识别', '车牌识别'],
        desc: "通过车牌信息和人脸信息的映射关联，判断指定用户开着指定车辆，减少车辆出入过程中的多项检查，提高业务管理安全性和效率"
      }
    ]
  },
  {
    id: 8,
    key: "enterprise",
    name: "企业服务",
    desc: "将人脸识别、文字识别、语音交互等多项AI能力应用于电销、客服、语音质检、协同办公、员工考勤、单据识别等业务场景，提高企业内部管理效率，通过智能化企业服务降低成本，增加竞争力",
    img: "./assets/enterprise.jpg",
    back: "./assets/enterprise_back.jpg",
    examples: [
      {
        key: "empty",   // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        name: "智能员工考勤",
        id: 0,
        img: "./assets/en-em.jpg",
        elements: ['人脸识别', '活体检测'],
        desc: "通过在公司内安装人脸考勤机、人脸闸机等，实现员工刷脸考勤，验证是否为员工本人，杜绝替考勤的现象，加强企业人员管理。更可通过安装人脸抓拍摄像机，在员工自然行走中即可抓拍多人脸，自然而有效地进行考勤管理"
      },
      {
        key: "text_spotting",
        name: "智能单据识别",
        id: 1,
        img: "./assets/en-ts.jpg",
        elements: ['文本检测', '文本识别'],
        desc: "在企业内部的报销、采购等流程中，存在大量纸质单据或图像需要信息录入，通过集成文字识别服务可支持合同页、增值税发票、火车票等多种票据的识别。更可以便捷地制作所需的文字识别模板，让 AI 能力快速满足企业的个性化业务"
      }
    ]
  },
  {
    id: 9,
    key: "financial",
    name: "智慧金融",
    desc: "打造融合、安全、高效、敏捷的金融网络，更快速、灵活地为金融业务应用服务，激发数据价值，实现智慧金融升级",
    img: "./assets/financial.jpg",
    back: "./assets/financial_back.jpg",
    examples: []
  },
  {
    id: 10,
    key: "agriculture",
    name: "智能农业",
    desc: "基于图像识别等产品技术，针对智能农业地块识别、作物模型构建、病虫害识别、无人机植保、智能农机、智能分拣、农产品溯源、智能养殖等场景，提供针对相应场景的能力集合，帮助农业提高数字化、智能化水平，创造更大价值",
    img: "./assets/agriculture.jpg",
    back: "./assets/agriculture_back.jpg",
    examples: []
  }
]

export const keyToIndustry = industries.reduce((s, cur) => {
  s[cur.key] = cur
  return s
}, {})



////////////////////////////

export const realApplication = [
  {
    id: "security_check",
    name: "安检图像识别",
    img: "./assets/fac-ob.png",
    back: "./assets/factory_back.jpg",
    desc: "基于目标检测技术，X光安检图像智能识别可识别常见的刀具、枪支、烟花爆竹、压力容器罐等违禁品，可应用于大型活动、轨交铁路、机场海关、快递物流等多个领域",
    key: "object_detection",
    elements: ['目标检测'],
    industry: "factory",
    demo_type: "IMAGE",
    note: "检测"
  },
  {
    id: "retail_detect",
    name: "香烟零售计数",
    img: "./assets/retail_detect.png",
    back: "./assets/retail_back.jpg",
    desc: "基于目标检测技术，对新零售场景图像中的烟草进行检测和品类分类，可应用于视频中的各品类烟草计数，实现烟草销售量自动统计分析",
    key: "object_detection",
    elements: ['目标检测'],
    industry: "retail",
    demo_type: "IMAGE",
    note: "检测"
  },
  {
    id: "card_recognition",
    name: "卡证文字识别",
    img: "./assets/idcard_rec.png",
    back: "./assets/idcard_back.png",
    desc: "基于文本检测和文本识别技术，丰富身份证信息录入的方式，辅助用户录入信息，极高的识别率让繁琐、低效的业务环节体现更好的用户体验",
    key: "text_spotting",
    elements: ['文本检测', '文本识别'],
    industry: "financial",
    demo_type: "IMAGE",
    note: "识别"
  },
  // {
  //   id: "driver_action_recognition",
  //   name: "列车司机行为识别",
  //   img: "./assets/driver_action_recognition.jpg",
  //   back: "./assets/driver_back.jpg",
  //   desc: "基于视频动作检测和视频动作识别技术，提取列车车厢内司机进行手势动作的时间片段，并识别司机手势的语义，极大降低人工审核的工作量",
  //   key: "spatio_temporal_action_detection",
  //   elements: ['视频动作检测', '视频动作识别'],
  //   industry: "factory",
  //   demo_type: "VIDEO",
  //   note: "识别"
  // },
]

export const typeToDesc = realApplication.reduce((s, cur) => {
  s[cur.id] = cur
  return s
}, {})
