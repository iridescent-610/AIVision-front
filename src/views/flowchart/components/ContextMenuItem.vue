<template>
  <command :name="command">
    <div class="item">
      <icon :type="iconType" :title="text" />
      <span>{{ label }}</span>
    </div>
  </command>
</template>

<script>
import { Command } from 'vue-flowchart-editor'
import Icon from './Icon'
import upperFirst from 'lodash/upperFirst'

export default {
  name: 'EditorContextMenuItem',

  components: {
    Command,
    Icon
  },

  props: {
    command: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    }
  },

  computed: {
    iconType() {
      return `icon${this.icon || this.command}`
    },

    label() {
      return this.text || upperFirst(this.command)
    }
  }
}
</script>
