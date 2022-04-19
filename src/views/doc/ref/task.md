# 任务

## 复杂单任务设计

### tasks 字段格式

#### 0 prelabel_label_train

```json
[
	{
		"taskStage": "PRE_LABEL",
		"modelId": 10,
		"params": "--epoch=10 --lr=0.01"
	},
	{
		"taskStage": "LABEL_TRAIN",
		"datasetPath": "/nfs/...",
		"modelId": 10,
		"params": ""
	},
	{
		"taskStage": "PREDICT",
		"modelId": 10,
		"params": "--epoch=10 lr=0.01"
	}
]
```

#### 1 label_train

```json
[
	{
		"taskStage": "LABEL_TRAIN",
		"datasetPath": "/nfs/...",
		"modelId": 11,
		"params": ""
	},
	{
		"taskStage": "PREDICT",
		"modelId": 11,
		"params": "--epoch=10 --lr=0.01"
	}
]
```

#### 2 label

```json
[
	{
		"taskStage": "PREDICT",
		"modelId": 11,
		"params": "--epoch=10 --lr=0.01"
	}
]
```

#### 总结

| 类型序号 | prelabel | dataturks-label | train | predict |                               备注                                |
| :------: | :------: | :-------------: | :---: | :-----: | :---------------------------------------------------------------: |
|    0     |    √     |        √        |   √   |    √    |                  暂时不考虑 prelabel，不要这情况                  |
|    1     |          |        √        |   √   |    √    |                   retrain && ! dataset.anno && dataturksCanLabel  |
|    2     |          |                 |       |    √    |                             ! retrain                             |
|    3     |          |                 |   √   |         |         retrain && dataset.hasAnno && dataset.onlyTrain            |
|    4     |          |                 |   √   |    √    | retrain && dataset.hasAnno && ! dataset.onlyTrain |

### API

#### 1. 创建复合任务

地址: /multiple_task [POST]  
请求参数：

```json
{
	"name": "test",
	"datasetPath": "/nfs2/dataset/test",
	"modelId": 12,
	"params": "--xx= --abs",
	"flowchartId": 10,
	"nodeId": "aaa",
	"multipleTaskType": 0
}
```

#### 2. 查询某 flowchart 所有已完成的节点序号

地址：/multiple_task/{flowchartId}/list [GET]  
请求参数:

```json

```

response:

```json
{
	"finished": ["asdf", "aaax"],
	"training": ["dfaa", "qweqwe"]
}
```
