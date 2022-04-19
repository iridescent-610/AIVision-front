## 账号
- 管理员（有容器管理权限）
```
atlas
atlas
```
- 开发用户
```
iocr
123456
```
- 演示用户（有许多成功演示用例）
```
Aller
12345
```

## 数据

代码

/nfs2/aix/models/

模型

/nfs/xs/docker/vipaturks/weights/

## 启动207 AI+X前端服务

```shell
# 登入cy账户

cd /nfs/cy/AI-Platform-frontend/
screen -S frontend

# 1. 开发
npm run serve
# 或者 
# 2.1 部署
npm run build
docker run -p 10086:10086 -d --name aix-frontend --restart=always \
-v /nfs/cy/AI-Platform-frontend/dist/:/usr/share/nginx/html/ \
-v /nfs/cy/AI-Platform-frontend/nginx.conf:/etc/nginx/nginx.conf  \
nginx:latest
# 2.2 文档
docsify serve ./src/views/doc -p 10087

# stop a container
# docker stop ID 

#! Ctrl + A + D 退出
```

## 启动207 模型结构可视化后端服务
```shell
# 登入cy账户

cd /nfs/cy/netron-flask-main/
screen -S netron

conda activate netron
python app.py

#! Ctrl + A + D 退出
```

## 启动208 流程图解析后端服务

```shell
# 登入cy账户

cd /home/cy/projects/aix-web/app/backend/
screen -S backend

conda activate iocr
python manage.py runserver 0:8002

#! Ctrl + A + D 退出
```

## 启动205 单阶段任务训练后端服务
代码在cy@10.214.211.205:/disk2/cy/AIX-master
打包的jar在/nfs2/sontal/AIX_Server/
```shell
cd /nfs2/sontal/AIX_Server/

screen -S aix

nohup java -jar center-0.0.1-SNAPSHOT.jar > center.log 2>&1 &

#! Ctrl + A + D 退出
```

## zlz准备的快速启动各个服务脚本（未成功）
cy@10.214.211.208:/home/cy/test.sh
```shell
#!/usr/bin/expect -f

set timeout 30
set jyx_pw jyx123
set cy_pw cy123
# su -jyx 与 su jyx是有区别的，区别在于切换用户后的当前目录不一样，su jyx还是留在当前目录。
spawn su - jyx
expect "*"
send "$jyx_pw\r"
expect "*○*"
#send "echo hello\r"
#expect "hello"

#spawn pwd


# 链接数据库文件
send "ln -s /var/run/mysqld/mysqld.sock /tmp/mysql.sock"


#部署后端
send "source activate atlas"
send "cd ~/Atlas/app/backend"
send "uwsgi --ini uwsgi.ini"
expect "*"

# 部署算力机
spawn screen -S atlas_distributer

send "cd ~/Atlas\r"
send "source activate atlas\r"
send "env PYTHONPATH=./ python app/task_management/run_task_distributer.py \
    --server_address=10.214.211.208    \
    --server_port=5002          \
    --db_address=localhost      \
    --db_user=atlas              \
    --db_passwd=atlas           \
    --db_name=atlas             \
    --logger_filepath=/nfs/jyx/atlas_workspace/run_task_distributer.log \
    --logger_level=INFO 
	"*Error*"
		{
			send "source deactivate\r"
			send "source activate atlas\r"
			send "env PYTHONPATH=./ python app/task_management/run_task_distributer.py \
				--server_address=10.214.211.208    \
				--server_port=5002          \
				--db_address=localhost      \
				--db_user=atlas              \
				--db_passwd=atlas           \
				--db_name=atlas             \
				--logger_filepath=/nfs/jyx/atlas_workspace/run_task_distributer.log \
				--logger_level=INFO &\r"
			expect "*"
			spawn screen -d atlas_distributer
			expect "*"
			exp_continue
		}
	"*321*"
	{
			spawn screen -d atlas_distributer
			expect "*"
	}
}

# 部署任务执行程序
spawn screen -S atlas_worker
send "cd ~/Atlas\r"
send "source activate atlas\r"
send "env PYTHONPATH=./:../KamalEngine python app/task_management/run_task_worker.py \
    --logger_filepath=/nfs/jyx/atlas_workspace/run_task_worker.log \
    --server_address=10.214.211.208 \
    --server_port=5002 \
    --server_http_port=9000 \
    --db_username=atlas \
    --db_passwd=atlas \
    --db_name=atlas \
    --db_address=localhost \
    --worker_username=test \
    --worker_password=test \
    --workspace=/nfs/jyx/atlas_workspace \
    --logger_level=INFO & \r"
expect {
			"*Error*"
			  {
				send "source deactivate\r"
				send "source activate atlas\r"
				send "env PYTHONPATH=./:../KamalEngine python app/task_management/run_task_worker.py \
						--logger_filepath=/nfs/jyx/atlas_workspace/run_task_worker.log \
						--server_address=10.214.211.208 \
						--server_port=5002 \
						--server_http_port=9000 \
						--db_username=atlas \
						--db_passwd=atlas \
						--db_name=atlas \
						--db_address=localhost \
						--worker_username=test \
						--worker_password=test \
						--workspace=/nfs/jyx/atlas_workspace \
						--logger_level=INFO &"
				expect "*"
				spawn screen -d atlas_worker
				expect "*"
				exp_continue
			  }
			"*321*"
			{
				spawn screen -d atlas_worker
				expect "*"
			}

	   }

spawn su - cy
expect "*asswor*"
send "$cy_pw\r"
expect "*"
#send "echo 'hello cy'\r"

# 开启sontal服务，已经开启了同组用户executing权限
send "nohub java -jar /nfs2/sontal/AIX_Server/center-0.0.1-SNAPSHOT.jar >/nfs2/sontal/AIX_Server/center.log & \r"
expect "*"

#开启本地服务
spawn screen -S iocr
expect "*"
send "conda activate iocr \r"
expect "*"
send "python /home/cy/projects/iocr-web/app/backend/manage.py runserver 0:8002 \r"
expect "*"
spawn screen -d iocr
 

interact
```