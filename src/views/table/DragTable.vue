<template>
  <el-table
    class="drag-table"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <el-table-column
      v-for="(item, index) in tableHeader"
      :key="item.__config__.prop + index"
      v-bind="item.__config__"
      :column-key="index.toString()"
    >
      <template slot="header" slot-scope="{ column }">
        <div
          class="table-header"
          :class="getHeaderClasses(index)"
          @mousedown="handleMouseDown($event, column)"
          @mousemove="handleMouseMove($event, column)"
        >
          <div class="op-wrap">
            <span class="op-copy" @click.stop="handleCopy(item)"><i class="el-icon-copy-document" /></span>
            <span class="op-del" @click.stop="handleDel(index)"><i class="el-icon-delete" /></span>
          </div>
          {{ item.__config__.label }}
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import { getTableColumns, saveTableColumns } from '@/utils/db';
const columnsInDB = getTableColumns();

const DEFAULT_COLUMNS_CONFIG = {
  align: 'center',
  minWidth: 100
};

export default {
  name: 'DragTable',
  components: {
  },
  mixins: [],
  data() {
    return {
      tableHeader: [],
      dragState: {
        start: -9, // start index
        end: -9, // end index
        dragging: false,
        direction: undefined
      }
    };
  },
  mounted() {
    if (Array.isArray(columnsInDB) && columnsInDB.length > 0) {
      this.tableHeader = columnsInDB;
    } else {
      this.tableHeader = [];
    }
  },
  methods: {
    addTableColumn(origin) {
      const column = {
        __config__: {
          prop: origin.__vModel__,
          label: origin.__config__.label,
          ...DEFAULT_COLUMNS_CONFIG
        }
      };
      this.tableHeader.push(column);
      saveTableColumns(this.tableHeader);
    },

    getHeaderClasses(index) {
      const result = [];
      if (index === this.dragState.start) {
        result.push('holder');
      }
      if (index === this.dragState.end) {
        if (this.dragState.direction === 'left') {
          result.push('target-left');
        } else if (this.dragState.direction === 'right') {
          result.push('target-right');
        }
      }
      return result.join(' ');
    },

    handleCopy(column) {
      this.tableHeader.push(column);
      saveTableColumns(this.tableHeader);
    },

    handleDel(index) {
      this.tableHeader.splice(index, 1);
    },

    handleMouseDown(e, column) {
      this.dragState.dragging = true;
      this.dragState.start = parseInt(column.columnKey);
      document.addEventListener('mouseup', this.handleMouseUp);
    },

    handleMouseUp() {
      this.dragColumn(this.dragState);
      this.dragState = {
        start: -9,
        end: -9,
        dragging: false,
        direction: undefined
      };
      document.removeEventListener('mouseup', this.handleMouseUp);
    },

    handleMouseMove(e, column) {
      if (this.dragState.dragging) {
        const index = parseInt(column.columnKey);
        if (index - this.dragState.start !== 0) {
          this.dragState.direction = index - this.dragState.start < 0 ? 'left' : 'right';
        } else {
          this.dragState.direction = undefined;
        }
        this.dragState.end = parseInt(column.columnKey);
      } else {
        return false;
      }
    },

    dragColumn({ start, end, direction }) {
      const tempData = [];
      const left = direction === 'left';
      const min = left ? end : start - 1;
      const max = left ? start + 1 : end;
      for (let i = 0; i < this.tableHeader.length; i++) {
        if (i === end) {
          tempData.push(this.tableHeader[start]);
        } else if (i > min && i < max) {
          tempData.push(this.tableHeader[ left ? i - 1 : i + 1 ]);
        } else {
          tempData.push(this.tableHeader[i]);
        }
      }
      this.tableHeader = tempData;
      saveTableColumns(this.tableHeader);
    }
  }
};
</script>
<style lang='scss' scoped>
$lighterBlue: #409EFF;

.drag-table {
  ::v-deep .el-table__header {
    th {
      padding: 0;
    }

    .cell {
      padding: 0;
    }
  }

  .table-header {
    padding: 12px 10px;
    position: relative;
    &:hover {
      & > .op-wrap {
        display: initial;
      }
    }

    .op-wrap {
      display: none;
      position: absolute;
      top: 0;
      right: 0;
      z-index: 9999;
    }

    .op-copy, .op-del {
      display: inline-block;
      background: #fff;
      border-radius: 50%;
      width: 22px;
      height: 22px;
      border: 1px solid;
      cursor: pointer;
    }
    .op-copy {
      border-color: $lighterBlue;
      color: $lighterBlue;

      &:hover{
        background: $lighterBlue;
        color: #fff;
      }
    }

    .op-del {
      border-color: #F56C6C;
      color: #F56C6C;
      margin-left: 4px;

      &:hover{
        background: #F56C6C;
        color: #fff;
      }
    }
  }

  .holder {
    background-color: #f6f7ff;
  }

  .target-left {
    border-left: 1px dashed #787be8;
  }

  .target-right {
    border-right: 1px dashed #787be8;
  }
}
</style>
