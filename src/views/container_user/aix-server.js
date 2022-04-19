import request from '@/utils/aix_request'

const base_url = '/aix/server'

export function serverLogInit() {
  return request({
    url: base_url + '/log/start',
    method: 'get'
  })
}

export function serverLogStop() {
  return request({
    url: base_url + '/log/stop',
    method: 'get'
  })
}

export function serverLogReadLine() {
  return request({
    url: base_url + '/log/line',
    method: 'get'
  })
}

