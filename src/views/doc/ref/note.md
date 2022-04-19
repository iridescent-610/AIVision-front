# 命令

```bash
合并前端
10.214.211.207:10086
207:/nfs/cy/AI-Platform-frontend/
npm install --registry=https://registry.npm.taobao.org   --save
npm run dev
合并后端
10.214.211.208:8002
python manage.py runserver 0:8002
训练代码
207:/nfs/cy/AI-Platform-training/
容器
docker exec -it c1 /bin/bash
ctrl+d
大妈机代码位置
/nfs2/aix/models/
代码上传
cp -r /nfs/cy/AI-Platform-training/* ./
数据位置
/nfs/xs/docker/vipaturks/
Atlas模型位置
/nfs/IOCR_AIX_Atlas/file/model/


-i https://pypi.douban.com/simple/

--registry https://registry.npm.taobao.org

http://10.214.211.208:8002/wrapper/output/1_23_913_974.mp4


```

## 本地调试指令

```bash
source /home/aix/anaconda3/bin/activate aix-task && cd /nfs2/aix/models/training/modelRepository/segmentation/mmsegmentation && python main.py  --scale_h=512 --scale_w=512 --crop_h=512 --crop_w=512 --max_iters=1000 --batch_size=2 --lr=0.005 --optimizer=SGD --AIX_path=/nfs/xs/docker/vipaturks/uploads/params/147.json --AIX_nodeId=d3115ce4 --input_dir=/nfs/xs/docker/vipaturks/uploads/147/d3115ce4/input --output_dir=/nfs/xs/docker/vipaturks/uploads/147/d3115ce4/output --weights_dir=/nfs/xs/docker/vipaturks/uploads/147/d3115ce4/weight --log_dir=/nfs/xs/docker/vipaturks/uploads/147/d3115ce4/log --alldata_path=/nfs/xs/docker/vipaturks/uploads/147/d3115ce4/data.pkl --model=deeplabv3plus_r50-d8 --category_str=cat,dog --pretrained=true --pretrain_path=weights/segmentation/mmsegmentation/pretrained/deeplabv3plus/deeplabv3plus_r50-d8_512x512_40k_voc12aug_20200613_161759-e1b43aa9.pth --id=227 --stage_type=LABEL_TRAIN --device_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxIn0.2u5kQ5lHBZrmWQCkH92x-x_tOWb0rlPgaiTrEAVuFhw

source /home/aix/anaconda3/bin/activate aix-task && cd /nfs2/aix/models/training/modelRepository/segmentation/mmsegmentation && python main.py  --scale_h=512 --scale_w=512 --crop_h=512 --crop_w=512 --max_iters=40000 --batch_size=2 --lr=0.005 --optimizer=SGD --AIX_path=/nfs/xs/docker/vipaturks/uploads/params/147.json --AIX_nodeId=d3115ce4 --input_dir=/nfs/xs/docker/vipaturks/uploads/147/d3115ce4/input --output_dir=/nfs/xs/docker/vipaturks/uploads/147/d3115ce4/output --weights_dir=/nfs/xs/docker/vipaturks/uploads/147/d3115ce4/weight --log_dir=/nfs/xs/docker/vipaturks/uploads/147/d3115ce4/log --alldata_path=/nfs/xs/docker/vipaturks/uploads/147/d3115ce4/data.pkl --model=deeplabv3plus_r50-d8 --category_str=cat,dog --pretrained=true --pretrain_path=weights/segmentation/mmsegmentation/pretrained/deeplabv3plus/deeplabv3plus_r50-d8_512x512_40k_voc12aug_20200613_161759-e1b43aa9.pth --id=275 --stage_type=PREDICT --device_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxIn0.2u5kQ5lHBZrmWQCkH92x-x_tOWb0rlPgaiTrEAVuFhw
```
