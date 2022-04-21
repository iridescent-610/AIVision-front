<!-- svg组件 -->
<template>
  <svg class="svg-icon" :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    // svg 的名称
    svgName: {
      type: String,
      required: true
    }
  },
  computed: {
    iconName () {
      return `#icon-${this.svgName}`
    },
    svgClass () {
      if (this.svgName) {
        return 'svg-icon' + this.svgName
      } else {
        return 'svg-icon'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.svg-icon {
  fill: currentColor;
  overflow: hidden;
}
</style>
