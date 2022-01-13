<template>
  <div class="top-container">
    <div class="logo-bar">logo</div>
    <div class="inner-wrap">
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  name: 'Header',
  mixins: [],
  props: {},
  data: () => ({}),
  watch: {},
  methods: {}
};
</script>
<style lang='scss' scoped>
.top-container {
  height: $headerHeight;
  line-height: $headerHeight;
  border-bottom: 1px solid $borderL1;
  display: flex;

  .logo-bar {
    width: 100px;
    text-align: center;
  }

  .inner-wrap {
    flex: 1;
  }
}
</style>
