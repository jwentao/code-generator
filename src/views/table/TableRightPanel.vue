<template>
  <div class="TableRightPanel">
    <el-form size="small" label-width="90px">
      <el-form-item label="prop">
        <el-input v-model="config.prop" placeholder="请输入字段名（prop）" />
      </el-form-item>
      <el-form-item label="label">
        <el-input v-model="config.label" placeholder="请输入表头标题（label）" />
      </el-form-item>
      <el-form-item label="宽度">
        <el-input v-model="config.width" placeholder="宽度" />
      </el-form-item>
      <el-form-item label="最小宽度">
        <el-input v-model="config['min-width']" :disabled="!!config.width" placeholder="最小宽度" />
      </el-form-item>
      <el-form-item label="对齐方式">
        <el-select v-model="config.align">
          <el-option value="left" label="left" />
          <el-option value="center" label="center" />
          <el-option value="right" label="right" />
        </el-select>
      </el-form-item>
      <el-form-item label="固定列">
        <el-select v-model="config.fixed">
          <el-option value="left" label="left" />
          <el-option value="right" label="right" />
          <el-option :value="undefined" label="不固定" />
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'TableRightPanel',
  mixins: [],
  props: {
    activeData: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({}),
  computed: {
    config() {
      return this.activeData.__config__ || {};
    }
  },
  watch: {
    activeData: {
      deep: true,
      handler(val) {
        console.log(val);
      }
    }
  },
  methods: {}
};
</script>
<style lang='scss' scoped>
.TableRightPanel {
  width: 350px;
  position: absolute;
  right: 0;
  top: 0;
  padding-top: 3px;
  .field-box {
    position: relative;
    height: calc(100vh - 42px);
    box-sizing: border-box;
    overflow: hidden;
  }
  .el-scrollbar {
    height: 100%;
  }
}
</style>
