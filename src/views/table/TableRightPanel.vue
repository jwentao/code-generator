<template>
  <div class="TableRightPanel">
    <el-tabs v-model="currentTab" class="center-tabs">
      <el-tab-pane label="列属性" name="column" />
      <el-tab-pane label="表格属性" name="table" />
    </el-tabs>
    <el-form v-show="currentTab === 'column'" size="small" label-width="90px">
      <el-form-item label="prop">
        <el-input v-model="column.prop" placeholder="请输入字段名（prop）" />
      </el-form-item>
      <el-form-item label="label">
        <el-input v-model="column.label" placeholder="请输入表头标题（label）" />
      </el-form-item>
      <el-form-item label="宽度">
        <el-input v-model="column.width" placeholder="宽度" />
      </el-form-item>
      <el-form-item label="最小宽度">
        <el-input v-model="column['min-width']" :disabled="!!column.width" placeholder="最小宽度" />
      </el-form-item>
      <el-form-item label="对齐方式">
        <el-select v-model="column.align">
          <el-option value="left" label="left" />
          <el-option value="center" label="center" />
          <el-option value="right" label="right" />
        </el-select>
      </el-form-item>
      <el-form-item label="固定列">
        <el-select v-model="column.fixed">
          <el-option value="left" label="left" />
          <el-option value="right" label="right" />
          <el-option :value="undefined" label="不固定" />
        </el-select>
      </el-form-item>
    </el-form>
    <el-form v-show="currentTab === 'table'" size="small" label-width="90px">
      <el-form-item label="边框">
        <el-select v-model="tableConf.stripe">
          <el-option :value="false" label="否" />
          <el-option :value="true" label="是" />
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
    },
    tableConf: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    currentTab: 'column'
  }),
  computed: {
    column() {
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
