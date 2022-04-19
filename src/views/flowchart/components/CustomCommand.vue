<template>
  <div>
    <register-command
      name="loadData"
      :config="loadDataCommandConfig"
      extend="copy"
    />
    <register-command
      name="generateData"
      :config="generateDataCommandConfig"
      extend="copy"
    />
    <register-command
      name="downloadImage"
      :config="downloadImageCommandConfig"
      extend="copy"
    />
    <register-command
      name="uploadServer"
      :config="uploadServerCommandConfig"
      extend="copy"
    />
  </div>
</template>

<script>
import { RegisterCommand } from 'vue-flowchart-editor'

export default {
  name: 'CustomCommand',

  components: {
    RegisterCommand
  },

  inject: ['root'],

  props: {
    load: {
      type: Function,
      default: null
    },
    save: {
      type: Function,
      default: null
    },
    download: {
      type: Function,
      default: null
    },
    upload: {
      type: Function,
      default: null
    }
  },

  data() {
    const { propsAPI } = this.root
    const { save, download, load, upload } = this
    return {
      generateDataCommandConfig: {
        queue: false, // 是否进入列队，默认为 true
        enable(/* editor */) {
          // 命令是否可用
          return true
        },
        execute(/* editor */) {
          // 正向命令逻辑
          // console.log('执行正向命令')
          const data = propsAPI.save()
          // console.log(data)
          // console.log(JSON.stringify(data))
          save(data)
          // alert(JSON.stringify(data))
        },
        back(/* editor */) {
          // 反向命令逻辑
          // console.log('执行反向命令')
        }
      },
      downloadImageCommandConfig: {
        queue: false,
        enable() {
          return true
        },
        execute() {
          download()
        },
        back() {}
      },
      loadDataCommandConfig: {
        queue: false,
        enable() {
          return true
        },
        execute() {
          load()
        },
        back() {}
      },
      uploadServerCommandConfig: {
        queue: false,
        enable() {
          return true
        },
        execute() {
          const data = propsAPI.save()
          upload(data)
        },
        back() {}
      }
    }
  }
}
</script>
