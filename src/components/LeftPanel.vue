<template>
  <div class="left-panel">
    <div class="component-block">
      <div
        v-for="(item, index) in layoutItems"
        :key="index"
        class="component-item"
      >
        {{ item.label }}
      </div>
    </div>
  </div>
</template>
<script>
import { layoutItems } from './config';

export default {
  name: 'LeftPanel',
  mixins: [],
  props: {},
  data: () => ({
    layoutItems
  }),
  watch: {},
  created () {
    console.log(layoutItems);
  },
  methods: {}
};
</script>
<style lang='scss' scoped>
.left-panel {
  .component-item {
    cursor: move;
  }
}
</style>
