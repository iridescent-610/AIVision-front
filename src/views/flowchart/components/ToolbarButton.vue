<template>

  <command :name="command">
    <icon :type="iconType" :title="text" />
    <span v-if="label">{{ label }}</span>
  </command>

</template>

<script>
import { Command } from 'vue-flowchart-editor'
import Icon from './Icon'

export default {
  name: 'EditorToolbarButton',

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
    },
    label: {
      type: String,
      default: ''
    }
  },

  computed: {
    iconType() {
      // console.log(`icon${this.icon || this.command}`)
      return `icon${this.icon || this.command}`
    }
  }
}
</script>
