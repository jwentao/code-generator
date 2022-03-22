<template>
  <div class="SchemaList">
    <el-table
      :data="tableData"
    >
      <el-table-column
        prop="createUser"
        label="日期"
        width="180">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'SchemaList',
  mixins: [],
  props: {},
  data: () => ({
    tableData: [{}]
  }),
  watch: {},
  methods: {}
};
</script>
<style lang='scss' scoped>
.SchemaList {
}
</style>
