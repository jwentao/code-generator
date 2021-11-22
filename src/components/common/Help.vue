<template>
  <el-tooltip v-if="content" effect="light" :content="content" placement="top-start">
    <i class="el-icon-question" />
  </el-tooltip>
</template>
<script>
export default {
  name: 'Help',
  mixins: [],
  props: {
    content: {
      type: String,
      default: ''
    }
  },
  data: () => ({}),
  watch: {},
  methods: {}
};
</script>
<style lang='scss' scoped>
.el-icon-question {
  cursor: pointer;
}
</style>
