<template>
  <div class="TablePanel">
    <el-form-item label="边框">
      <el-switch v-model="activeData.border" />
    </el-form-item>
    <el-form-item label="斑马纹">
      <el-switch v-model="activeData.stripe" />
    </el-form-item>
    <el-form-item label="尺寸">
      <el-radio-group v-model="activeData.size">
        <el-radio-button label="medium">
          中等
        </el-radio-button>
        <el-radio-button label="small">
          较小
        </el-radio-button>
        <el-radio-button label="mini">
          迷你
        </el-radio-button>
      </el-radio-group>
    </el-form-item>
  </div>
</template>
<script>
export default {
  name: 'TablePanel',
  mixins: [],
  props: {
    activeData: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({}),
  watch: {},
  methods: {}
};
</script>
<style lang='scss' scoped>
.TablePanel {
}
</style>
