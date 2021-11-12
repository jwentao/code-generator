<template>
  <el-table
    v-if="refreshKey"
    class="drag-table"
    :class="getTableClass"
    :data="tableData"
    :border="config.border"
    :stripe="config.stripe"
    :size="config.size"
    v-on="$listeners"
    @header-dragend="headerWidthChange"
  >
    <el-table-column
      v-for="(item, index) in columns"
      :key="item.__config__.id"
      v-bind="item"
      :column-key="index.toString()"
    >
      <template slot="header">
        <div
          class="table-header"
          :class="getHeaderClasses(item.__config__.id)"
          @click.stop="activeColumn(item, index)"
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
import { generateId, deepClone } from '@/utils';
import emitter from '@/mixins/emitter';

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
  mixins: [emitter],
  props: {
    activeid: {
      type: [String, Number, null],
      default: null
    },
    config: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      tableData: [{}],
      refreshKey: true,
      columns: []
    };
  },
  computed: {
  },
  watch: {
  },
  mounted() {
    this.initDrag();
    this.columns = this.config.children;
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
      console.log('active click');
      this.dispatch('Home', 'active', item);
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
      this.$set(this.columns[col.columnKey], 'width', newW);
    },

    getTableClass() {
      return `header-active`;
      // return `drag_${this.config.id}`;
    },

    getHeaderClasses(id) { // todo fix 执行但未写入
      const result = [];
      if (id === this.activeid) {
        result.push('header-active');
      }
      return result.join(' ');
    },

    handleCopy(item) {
      const itemCopy = deepClone(item);
      itemCopy.__config__.id = generateId();
      this.columns.push(itemCopy);
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
