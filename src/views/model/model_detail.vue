<template >
  <b-card>
    <i v-if="!row.item.info && row.item.metrics.length == 0 && row.item.args.length == 0">无详细信息</i>
    <template>
      <b-badge
        v-for="item in row.item.metrics"
        :style="style.badge"
        :key="item.name"
        pill
        variant="primary"
      >{{item.name}}: {{item.value? item.value: "--"}}</b-badge>
    </template>
    <template>
      <b-badge
        v-for="item in row.item.args"
        :style="style.badge"
        :key="item.name"
        pill
        variant="primary"
      >{{item.name}}: {{item.value? item.value: "--"}}</b-badge>
    </template>
    <div v-if="row.item.info">{{row.item.info}}</div>
  </b-card>
</template>

<script>
export default {
  name: "ModelDetail",
  props: ["row"],
  data() {
    return {
      style: {
        badge: {
          marginLeft: "2px",
          marginRight: "2px",
        },
      },
    };
  },
};
</script>