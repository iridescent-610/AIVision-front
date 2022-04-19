# frontend

## Flowchart Demo

<http://10.214.211.207:10088>

## 前端工具

-   vue（包括 vuex 状态管理，vue-router 官方路由）
-   bootstrap-vue（基于 bootstrap，移除了与 vue 冲突的部分）
-   d3
-   element-ui（可能会与 bootstrap-vue 有冲突，后续再说）

## 文件结构

```
frontend/src/
    - components/ 基本组件
    - router/ 注册所有路由
    - store/
        - modules/ 模块的状态与方法，统一使用命名空间
        - index.js 模块注册，用户验证信息（当前用户名、token等）
    - views/ 页面组件
    - custom.scss 设置基础样式
    - settings.js 设置标题
```

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build

docker run -p 10088:10088 -d --name aix-cy --restart=always \
-v /nfs/cy/AI-Platform-frontend/dist/:/usr/share/nginx/html/ \
-v /nfs/cy/AI-Platform-frontend/nginx.conf:/etc/nginx/nginx.conf  \
nginx:latest
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## 注意

npm 安装新的包时，使用`--save`选项以保存依赖到`package.json`
