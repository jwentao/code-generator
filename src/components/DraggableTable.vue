<template>
  <el-table
    class="drag-table"
    :class="getTableClass"
    :data="tableData"
    border
    v-on="$listeners"
    @header-dragend="headerWidthChange"
  >
    <el-table-column
      v-for="(item, index) in columns"
      :key="item.renderKey"
      v-bind="item.__config__"
      :column-key="index.toString()"
    >
      <template slot="header">
        <div
          class="table-header"
          :class="getHeaderClasses(index)"
          @click="activeColumn(item, index)"
        >
          <div
            class="inner-wrap"
          >
            {{ item.prop }}
          </div>
          <div class="op-wrap">
            <span class="op-copy" @click.stop="handleCopy(item)"><i class="el-icon-copy-document" /></span>
            <span class="op-del" @click.stop="handleDel(index)"><i class="el-icon-delete" /></span>
          </div>
        </div>
      </template>
      <template slot-scope="{row}">
        {{ row[item.__config__.prop] }}
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import Sortable from 'sortablejs';
import { generateId } from '@/utils';

const DEFAULT_COLUMNS_CONFIG = {
  align: 'left',
  width: undefined,
  'min-width': 100,
  fixed: undefined
};

export default {
  name: 'DragTable',
  components: {
  },
  mixins: [],
  props: {
    config: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      tableData: [{}],
      dragState: {
        start: -9, // start index
        end: -9, // end index
        dragging: false,
        direction: undefined
      },
      activeIndex: -1,
      columns: []
    };
  },
  computed: {
  },
  watch: {
  },
  mounted() {
    this.initDrag();
    this.columns = this.config.children.map(item => ({
      ...item,
      renderKey: generateId()
    }));
    console.log(this.columns);
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
      this.columns.push(column);
    },

    initDrag() {
      const tHeader = document.querySelector(`.drag_${this.config.__config__.id} .el-table__header-wrapper tr`);
      this.sortable = Sortable.create(tHeader, {
        animation: 180,
        /** 延迟 */
        // delay: 1,
        filter: '.disabled',
        onEnd: (evt) => {
          const oldItem = this.columns[evt.oldIndex];
          this.columns.splice(evt.oldIndex, 1);
          this.columns.splice(evt.newIndex, 0, oldItem);
        }
      });
    },

    activeColumn(item, index) {
      this.activeIndex = index;
      this.$emit('activeItem', item);
    },

    generateMockData(header) {
      if (!header || !header.length) {
        this.tableData = [];
      }
      const temp = {};
      header.forEach(item => {
        temp[item.__config__.prop] = item.__config__.prop;
      });
      this.tableData = [temp];
    },

    headerWidthChange(newW, oldW, col, event) {
      this.$set(this.columns[col.columnKey].__config__, 'width', newW);
    },

    getTableClass() {
      return `header-active`;
      // return `drag_${this.config.id}`;
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
      if (index === this.activeIndex) {
        result.push('header-active');
      }
      return result.join(' ');
    },

    handleCopy(item) {
      this.columns.push({
        ...item,
        renderKey: generateId()
      });
    },

    handleDel(index) {
      this.columns.splice(index, 1);
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
        display: inline-block;
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
      text-align: center;
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

  .header-active {
    background-color: #f6f7ff;
  }
}
</style>
