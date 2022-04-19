import request from '@/utils/request'
import { parseTime, addSelectField } from '@/utils/index'

export const postServer = function (server_info) {
    if (server_info.username == '') {
        this.is_dialog_open = true
        this.dialog_content = '服务器名不得为空'
    }
    else if (server_info.password == '') {
        this.is_dialog_open = true
        this.dialog_content = '密码不得为空'
    }
    else if (server_info.password != server_info.password2) {
        this.is_dialog_open = true
        this.dialog_content = '两次密码不一致'
    }
    else {
        request.post(`/api/admin/servers`, {
            server_info,
        })
            .then((response) => {
                console.log('post ok', response)
                this.is_dialog_open = true
                this.dialog_content = '新建成功'
                this.getServers()
            })
            .catch((errors) => {
                console.log('post error', errors)
                this.errors = errors
                this.is_dialog_open = true
                this.dialog_content = '新建失败'
            })
    }
}
export const getServers = function () {
    request.get(`/api/admin/servers`, {
    })
        .then((response) => {
            let servers = response.data.servers;
            for (let s of servers) {
                s.last_login = parseTime(s.last_login);
            }
            servers = servers.map(addSelectField)
            console.log('getservers')
            this.servers = servers
        })
        .catch((errors) => {
            console.log('error', errors)
            this.servers = []
            this.errors = errors
        })
}
export const deleteServers = function () {
    let server_ids = []
    this.servers.forEach(server => { if (server.selected) { server_ids.push(server.id) } });
    console.log('selected', server_ids)
    request.delete(`/api/admin/servers`, {
        params: {
            server_ids: server_ids
        }
    })
        .then((response) => {
            console.log('delete success')
            this.is_dialog_open = true
            this.dialog_content = '删除成功'
            this.getServers()
        })
        .catch((errors) => {
            console.log('delete failure')
            this.errors = errors
            this.is_dialog_open = true
            this.dialog_content = '删除失败'
            this.getServers()
        })
}