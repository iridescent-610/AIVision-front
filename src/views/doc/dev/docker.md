# 1.AIX 容器客户端及服务端

## 1.1 容器镜像构建

Dockerfile：(参考`/nfs2/aix-container/client/Dockerfile`)

```shell
FROM nvidia/cuda:10.2-cudnn7-runtime-ubuntu16.04

# Your AI-X token
ARG TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiIxMTExMTExMTExMTExMTExMTExMTEifQ.it6iBaBmEkYIkJ49_2dCUL6nSqH7SHTJJ2IpoM8-nAs
# Miniconda download path
ARG CONDA_INSTALLER_PATH=/home/aix/Anaconda3.sh
# Metricbeat install path
# ARG MERTICBEAT_PATH=/home/aix/metricbeat-7.9.3
# Mount nfs dir
ARG UID=1113

RUN echo "deb https://mirrors.ustc.edu.cn/ubuntu/ xenial main restricted universe multiverse \
deb https://mirrors.ustc.edu.cn/ubuntu/ xenial-updates main restricted universe multiverse \
deb https://mirrors.ustc.edu.cn/ubuntu/ xenial-backports main restricted universe multiverse \
deb https://mirrors.ustc.edu.cn/ubuntu/ xenial-security main restricted universe multiverse" \
> /etc/apt/sources.list \
&& rm /etc/apt/sources.list.d/cuda.list && rm /etc/apt/sources.list.d/nvidia-ml.list \
&& chmod 666 /etc/apt/sources.list \
&& apt-get update

RUN apt-get install -y aptitude \
&& mkdir -p /etc/apt/preferences.d \
&& aptitude install -y build-essential openjdk-8-jre unzip sudo expect  \
&& mkdir -p /home/aix/models \
&& useradd -u $UID -s /bin/bash -d /home/aix  aix \
&& chown aix:aix /home/aix \
&& mkdir -p /log/aixlog \
&& chown -R aix:aix /log

#复制metricbeat文件
COPY ./metricbeat-7.9.3-linux-x86_64.tar.gz /home/aix/metricbeat-7.9.3-linux-x86_64.tar.gz
#复制conda安装文件
COPY ./Anaconda3-2020.07-Linux-x86_64.sh $CONDA_INSTALLER_PATH

RUN tar xzvf /home/aix/metricbeat-7.9.3-linux-x86_64.tar.gz -C /home/aix

COPY ./metricbeat.yml /home/aix/metricbeat-7.9.3-linux-x86_64/metricbeat.yml

RUN chmod go-w /home/aix/metricbeat-7.9.3-linux-x86_64/metricbeat.yml \
&& chown -R aix:aix /home/aix/metricbeat-7.9.3-linux-x86_64 \
&& echo "aix  ALL=(root) NOPASSWD:/bin/mv" >> /etc/sudoers  \
&& echo "aix  ALL=(root) NOPASSWD:/usr/bin/apt-get" >> /etc/sudoers  \
&& echo "aix  ALL=(root) NOPASSWD:/bin/rm" >> /etc/sudoers  \
&& echo "aix  ALL=(root) NOPASSWD:/usr/bin/apt-key" >> /etc/sudoers  \
&& echo "aix  ALL=(root) NOPASSWD:/bin/mkdir" >> /etc/sudoers  \
&& echo "aix  ALL=(root) NOPASSWD:/usr/bin/aptitude" >> /etc/sudoers  \
&& echo "root:209010" |  chpasswd

#指定用户，为了使用挂载在nfs的pip和conda源共享文件夹，故设置用户为aix
USER aix

RUN echo -e "\n yes" | sh $CONDA_INSTALLER_PATH \
&& rm -f $CONDA_INSTALLER_PATH \
&& echo  "channels: \n\
  - defaults \n\
show_channel_urls: true \n\
default_channels: \n\
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main \n\
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free \n\
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/r \n\
custom_channels: \n\
  conda-forge: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud \n\
  msys2: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud \n\
  bioconda: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud \n\
  menpo: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud \n\
  pytorch: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud \n\
  simpleitk: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud" \
  > /home/aix/.condarc \
&& echo "export PATH="/home/aix/anaconda3/bin:$PATH"" >> /home/aix/.bashrc \
&& echo $TOKEN > /home/aix/token

#在非交互式非登录shell中获取环境变量PATH，以保证找到conda命令
ENV BASH_ENV=/home/aix/.bashrc

CMD ["java", "-jar", "-Duser.timezone=GMT+08","/home/aix/Client.jar"]
```

在 Dockerfile 文件目录下运行`docker build -t aix:yyyyMMdd-001 .`构建自己的镜像。

## 1.2 容器使用手册

### 1.2.1 环境准备

- 登录可访问 nfs2 的 VIPA 内网服务器 (如 205,206,207 等)
- 服务器上已安装 docker 和 CUDA (如 205,206,207 等）
- 已在 AIX 平台上注册自己的容器(device),并获得 token

### 1.2.2 环境配置

添加 PATH 环境变量`export PATH=$PATH:/nfs2/aix-container/client/bin/`至你的`home`目录的`.bashrc`中(或者你自己的 shell 的初始化脚本中)

### 1.2.3 开始使用

#### 1.2.3.1 启动容器

使用以下命令启动一个训练容器,并自动向 AIX 平台抢训练任务执行.
`aix-start client_name client_token`
若需要指定本地代码位置,请将`code_path`替换为代码根目录的绝对路径:
`aix-start client_name client_token code_path`
本地代码会被复制到容器中执行

开发过程中常在 206 服务器上执行下面的命令启动测试容器：

```shell
stax c1 eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxIn0.2u5kQ5lHBZrmWQCkH92x-x_tOWb0rlPgaiTrEAVuFhw /nfs2/aix/models/training &&
stax c2 eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyIn0.Nl0Z_CeZb1k9j1HQ7iI09FbgmmmXNrTBE6V0gvuPLWI /nfs2/aix/models/training &&
stax c3 eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzIn0.UvvyRHNda0atKtmvfDaj4FjfT6nUjg4E1rd-e9eBmpA /nfs2/aix/models/training
```

#### 1.2.3.2 暂停容器

注意暂停容器并不会暂停训练进度,重新启动后未保存的训练进度会丢失!
`aix-stop client_name`

#### 1.2.3.3 删除容器

永久删除容器
`aix-delete client_name`

#### 1.2.3.4 查看容器日志

支持部分 tail 语法格式
`aix-log client_name`
查看最近 50 行日志
`aix-log -n50 client_name`

### 1.2.4 命令简化

`aix-start`可写为`stax`
`aix-stop`可写为`stox`
`aix-delete`可写为`delx`
`aix-log`可写为`lx`

### 1.2.5 容器部署

相关文件在`/nfs2/aix-container/client/deployment/deploy/`

#### 1.2.5.1 下载通用部署 Docker 镜像

在 AIX 平台`流程图-表格一览`页面下载 AIP 通用镜像，并解压。

#### 1.2.5.2 启动容器

在解压后的目录中运行`./deploy.sh /path/to/code port`

- `/path/to/code`为下载的模型解压后的文件夹绝对路径
- `port`为本机可用 Socket 端口号

如执行`./deploy.sh /home/127 80`
待服务启动后即可通过宿主机`80`端口访问服务.

#### 1.2.5.3 使用服务

向<http://127.0.0.1:10086/aip发送POST> 请求即可获得结果

POST 请求格式

```
request
{
    image: base64_str
}
```

#### 1.2.5.4 删除服务

使用`docker rm -f aix-deployment-port`将正在运行的容器删除即可停止服务
如执行`docker rm -f aix-deployment-80`即可删除在 80 端口部署的服务

## 1.3 容器客户端和服务端项目

代码地址<https://github.com/Eric-Ma-C/AIXContainer/tree/vipa_master>

注意分支名为 vipa_master

### 1.3.1 简介

The management project of docker containers running machine learning algorithms from zju-vipa AI+X platform

AIXContainer 项目分为四部分:

- **Client** 容器客户端
- **ManagementCenter** 平台管理服务器
- **Common** 公共模块
- **dubbo-api** Dubbo 接口定义

**Client**
容器客户端,常驻容器中(ContainerManager)

- 入口为`Client`类

- `NettyTcpClient`负责主动建立网络连接

- `ShellProcess`封装了在容器中执行 shell 命令的功能

- `ClientTaskController`为总的调度器,负责容器所有功能的调度

**ManagementCenter**
平台管理中心,是一个 TCP server,监视管理所有容器

- `ManagementCenter`为程序入口

- `AixDbManager`负责从 AIX mysql 数据库存取数据

- `NettyTcpServer`负责启动服务器的 socket 监听,为所有容器提供服务

- `SocketHandler`负责单个 socket 请求的处理,目前使用短连接模式,socket 请求处理完成后即断开连接

**Common**  
公共模块,如数据格式,统一接口等

- `Message`规范了容器和平台通信的数据格式
- `Intent`定义了 Message 的类型
- `NetworkConfig`定义了网络参数,如平台服务器`ip`和`端口号`
- `Utils`包定义了**Client**和**ManagementCenter**工程通用的工具类

### 1.3.2 部署

通过修改`common.properties`中的配置，选择测试配置部署到 205 服务器，或选择正式环境部署到 207 服务器，Maven 的 package 编译结束后会自动上传客户端和服务端的`jar`包到服务器对应的目录下（如`wagon.upload.client.path`定义）

```java
#### 207部署配置
log4j.appender.fileLog.File.path =/nfs2/aix-container/server/log/debug.log4j
zk.server.url=zookeeper://120.79.221.129:2181
dubbo.server.port=20880
dubbo.provider.application.name=AIX-Provider
dubbo.provider.group=beta_group
server.ip=10.214.211.207
server.download.ip=10.214.211.207
wagon.upload.client.path=scpexe://10.214.211.207/nfs2/aix-container/client
wagon.upload.server.path=scpexe://10.214.211.207/nfs2/aix-container/server
mysql.atlas.url=jdbc:mysql://10.214.211.208:3306/atlas?useSSL=false&useUnicode=true&characterEncoding=utf8&serverTimezone=Asia/Shanghai
mysql.atlas.user=atlas
mysql.atlas.password=atlas
mysql.aix.url=jdbc:mysql://10.214.211.205:3346/aix?useSSL=false&useUnicode=true&characterEncoding=utf8&serverTimezone=Asia/Shanghai
mysql.aix.user=root
mysql.aix.password=aix

#### 205测试部署配置

#log4j.appender.fileLog.File.path =/nfs/aix-container/server/log/debug.log4j
#zk.server.url=zookeeper://120.79.221.129:2181
#dubbo.server.port=20880
#dubbo.provider.application.name=AIX-Provider-Test
#dubbo.provider.group=alpha_group
#server.ip=10.214.211.205
#server.download.ip=10.214.211.205
#wagon.upload.client.path=scpexe://10.214.211.205/nfs/aix-container/client
#wagon.upload.server.path=scpexe://10.214.211.205/nfs/aix-container/server
#mysql.atlas.url=jdbc:mysql://10.214.211.205:3326/atlas?useSSL=false&useUnicode=true&characterEncoding=utf8&serverTimezone=Asia/Shanghai
#mysql.atlas.user=root
#mysql.atlas.password=atlas
#mysql.aix.url=jdbc:mysql://10.214.211.205:3336/aix?useSSL=false&useUnicode=true&characterEncoding=utf8&serverTimezone=Asia/Shanghai
#mysql.aix.user=root
#mysql.aix.password=aix
```

## 1.4 容器监控管理平台项目

### ~~1.4.1 前端【已废弃，整合到平台中】~~

~~<https://github.com/Eric-Ma-C/aix-container-frontend>~~
~~部署方式参见代码根目录`HELP.md`~~

### 1.4.2 后端

<https://github.com/Eric-Ma-C/AIXContainer-Web>
部署方式参见代码根目录`README.md`

# 2.Dataturks

## 2.1Active Learning 状态添加

代码地址<https://github.com/Eric-Ma-C/dataturks-al>

## 2.2 部署

在 205 服务器运行：

```shell
docker run -itd --restart=always \
--name dataturks-deploy \
-v /home/project/uploads:/home/dataturks/bazaar/uploads  \
-p 5055:3000 -p 3316:3306 \
dataturks:2021
```

仅供参考
