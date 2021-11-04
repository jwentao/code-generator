<template>
  <div class="left-panel">
    <div class="component-block">
      <div
        class="component-item"
        v-for="(item, index) in layoutItems"
        :key="index"
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
  created () {
    console.log(layoutItems);
  },
  data: () => ({
    layoutItems
  }),
  watch: {},
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
