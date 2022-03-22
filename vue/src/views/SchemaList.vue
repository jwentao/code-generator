<template>
  <div class="SchemaList">
    <el-table
      :data="tableData"
    >
      <el-table-column
        prop="createUser"
        label="创建人"
        min-width="180"
      />

      <el-table-column
        prop="createTime"
        label="创建日期"
        min-width="180"
      >
        <template slot-scope="{ row }">
          {{ row.createTime | formatTime }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getSchemaList } from '@/api';
import { formatTimeStamp } from '@/utils';

export default {
  name: 'SchemaList',
  filters: {
    formatTime(val) {
      return formatTimeStamp(val, 'yyyy-MM-dd hh:mm:ss');
    }
  },
  mixins: [],
  props: {},
  data: () => ({
    tableData: [{}],
    pageParams: {
      pageSize: 20,
      pageNum: 1
    }
  }),
  watch: {},

  created() {
    this.getSchemaList();
  },

  methods: {
    async getSchemaList() {
      const [err, data] = await getSchemaList({
        ...this.pageParams
      });
      if (!err) {
        this.tableData = data.list;
      }
    }
  }
};
</script>
<style lang='scss' scoped>
.SchemaList {
}
</style>
