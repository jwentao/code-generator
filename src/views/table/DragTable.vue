<template>
  <div class="w-table" :class="{'w-table_moving': dragState.dragging}">
    <el-table
      class="drag-table"
      v-bind="$attrs"
      :cell-class-name="cellClassName"
      :header-cell-class-name="headerCellClassName"
      v-on="$listeners"
    >
      <el-table-column
        v-for="(item, index) in tableHeader"
        :key="item.__vModel__ + index"
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
            {{ item.__config__.label }}
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
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
        start: -9, // 起始元素的 index
        end: -9, // 移动鼠标时所覆盖的元素 index
        dragging: false, // 是否正在拖动
        direction: undefined // 拖动方向
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
        __vModel__: origin.__vModel__,
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
    headerCellClassName({ column, columnIndex }) {
      const active = columnIndex - 1 === this.dragState.end ? `darg_active_${this.dragState.direction}` : '';
      const start = columnIndex - 1 === this.dragState.start ? `darg_start` : '';
      return `${active} ${start}`;
    },

    cellClassName({ column, columnIndex }) {
      return (columnIndex - 1 === this.dragState.start ? `darg_start` : '');
    },
    renderHeader(createElement, { column }) {
      return createElement(
        'div', {
          'class': ['thead-cell'],
          on: {
            mousedown: ($event) => { this.handleMouseDown($event, column); },
            mousemove: ($event) => { this.handleMouseMove($event, column); }
          }
        }, [
          // 添加 <a> 用于显示表头 label
          createElement('a', column.label),
          // 添加一个空标签用于显示拖动动画
          createElement('span', {
            'class': ['virtual']
          })
        ]);
    },

    handleMouseDown(e, column) {
      this.dragState.dragging = true;
      this.dragState.start = parseInt(column.columnKey);
      // 给拖动时的虚拟容器添加宽高
      const table = document.getElementsByClassName('w-table')[0];
      const virtual = document.getElementsByClassName('virtual');
      for (const item of virtual) {
        item.style.height = table.clientHeight - 1 + 'px';
        item.style.width = item.parentElement.parentElement.clientWidth + 'px';
      }
      document.addEventListener('mouseup', this.handleMouseUp);
    },

    // 鼠标放开结束拖动
    handleMouseUp() {
      this.dragColumn(this.dragState);
      // 初始化拖动状态
      this.dragState = {
        start: -9,
        end: -9,
        dragging: false,
        direction: undefined
      };
      document.removeEventListener('mouseup', this.handleMouseUp);
    },

    // 拖动中
    handleMouseMove(e, column) {
      if (this.dragState.dragging) {
        const index = parseInt(column.columnKey); // 记录起始列
        if (index - this.dragState.start !== 0) {
          this.dragState.direction = index - this.dragState.start < 0 ? 'left' : 'right'; // 判断拖动方向
        } else {
          this.dragState.direction = undefined;
        }
        this.dragState.end = parseInt(column.columnKey);
      } else {
        return false;
      }
    },

    // 拖动易位
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

.w-table {
  .el-table .darg_start {
    background-color: #f3f3f3;
  }

  .el-table th {
    padding: 0;

    .virtual {
      position: fixed;
      display: block;
      width: 0;
      height: 0;
      margin-left: -10px;
      background: none;
      border: none;
    }

    &.darg_active_left {
      .virtual {
        border-left: 2px dotted #666;
        z-index: 99;
      }
    }

    &.darg_active_right {
      .virtual {
        border-right: 2px dotted #666;
        z-index: 99;
      }
    }
  }

  .thead-cell {
    padding: 0;
    display: inline-flex;
    flex-direction: column;
    align-items: left;
    cursor: pointer;
    overflow: initial;

    &:before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
    }
  }

  &.w-table_moving {
    .el-table th .thead-cell {
      cursor: move !important;
    }

    .el-table__fixed {
      cursor: not-allowed;
    }
  }
}
</style>
