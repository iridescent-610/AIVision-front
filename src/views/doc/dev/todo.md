# Todo List

## 2021-06-11

### 待解决

- [ ] 容器管理后端解决跨域
- [ ] 容器内部频繁因为网络原因配置环境失败

- [ ] 处理 Mac OS 解压缩情况
- [ ] 动作识别流程完善：解压数据集，创建任务
- [ ] 打包流程替换

- [x] 普通用户可以看到部分的容器信息
- [ ] 管理员页面增加流程图的管理功能：查看所有用户流程图，重启任务等

### 新功能

- 在线演示界面支持展示 JSON 结果
- AI+X 平台集成容器管理功能，需要管理员账号
- 模型打包加密

## 2021-01-08

- [ ] Atlas 对接有关 API
- [ ] 数据集格式转化
- [ ] 无标注的数据集就不用 txt 来存放所有路径了，直接搜索数据集里所有 jpg png 等格式图片
- [ ] 我们的模型打包下载流程修改

  ```python
      1. 将该fid对应的训练过程目录（如/nfs/xs/docker/vipaturks/uploads/90/）下的所有【节点id/weight/model_final.pth】 比如glob(*/weight/model_final.pth)
      拷贝到/AID/resources/目录下，最后形成的目录结构应为：
      - /AID/
          - resources/    重要！ 需要的内容用!!!标出
              - params.json   !!!原流程图配置参数文件
              - 38ecc679/weight/model_final.pth   !!!原模型参数，里面原有的input/ output/
              - 38ecc679/log/
              - 9108e542/weight/model_final.pth   !!!同上
              - 9108e542/log/
              - 20b95ac0/weight/model_final.pth   !!!同上
              - 20b95ac0/log/
          - KamalEngine/
          - modelRepository/
          - main.py
          - app.py
          - environment.yml   环境文件
          - pre_cmd.sh        完成环境文件配置后执行的脚本
          - ...
  ```

## 2020-12-31

- Atlas 对接

  1. 创建流程图单独训练分类模型，其支持自动导出，训练完成后发送请求让 zlz 保存自动导出的 atlas 模型到 models 表
  2. 在 Atlas 的任务界面创建算法任务，让 Atlas 在任务完成最后发送给 zlz 请求，zlz 将该 Atlas model 压缩包解压，`.pth`放到 weights 目录下，`hubconf.py`目录放到对应的 code 目录下，并添加数据库记录（对应的 umodels 表添加`source`字段，表示属于基础的结构还是来源于 Atlas 的结构）
  3. 在新的流程图创建过程中，选择模型时就可以直接选择上一步产生的来源于**Atlas**的模型结构

- [x] 训练过程可视化优化

- 容器环境（检测分割）

  - 马超

- 有标注数据集（公开数据集）的上传和使用

  - 类型：视频；图像
  - 上传目录结构；转化
  - 标注：有；无
  - 用途：仅训练；过程数据

- 视频文本识别

- 鸡蛋检测
  - 谢东霖

## 2020-10-19

- 标注系统（需求？）

  - dataturks 标注能力有限，而且格式不统一，任何两个任务间格式需要转化（从 data->生成 dataturks 格式的标注文件）

- Atlas（Todo）

  - 不考虑针对 2 个及以上节点的算法，单个节点的只需加上参数指定算法，在训练完之后交由 atlas 优化，交互逻辑待定

- ~~更多模型（Todo）~~

  - ~~收集代码，均要实现 label/train/predict/online predict 四个接口，主要是读写， 以及过程状态信息保存~~

- ~~新场景：文本检测-文本识别~~

  - ~~流程~~
