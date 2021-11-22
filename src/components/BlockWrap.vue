<template>
  <div
    class="blockWrap"
    :class="getClasses()"
    :style="getStyle()"
    @mouseout.stop="mouseover = false;"
    @mouseover.stop="mouseover = true;"
    @click.stop="clickWrap"
  >
    <div v-show="showWrap" class="op-wrap">
      <el-tooltip effect="light" content="复制" placement="top-start">
        <div class="icon-copy" @click.stop="handleCopy">
          <i class="el-icon-copy-document" />
        </div>
      </el-tooltip>
      <el-tooltip effect="light" content="删除" placement="top-start">
        <div class="op-item icon-del" @click.stop="handleDel">
          <Delete />
        </div>
      </el-tooltip>
      <el-tooltip effect="light" content="拖拽移动" placement="top-start">
        <div class="op-item drag-btn">
          <Move />
        </div>
      </el-tooltip>
    </div>
    <slot />
  </div>
</template>
<script>
import Move from '@/icon/Move';
import Delete from '@/icon/Delete';
import emitter from '@/mixins/emitter';

export default {
  name: 'BlockWrap',
  components: {
    Move,
    Delete
  },
  mixins: [
    emitter
  ],
  props: {
    activeId: {
      default: null,
      type: [String, Number, null]
    },
    config: {
      default: () => ({}),
      type: Object
    },
    showBorder: {
      default: false,
      type: Boolean
    }
  },
  data: () => ({
    mouseover: false
  }),
  computed: {
    showWrap() {
      return this.config.__config__.id === this.activeId;
    }
  },
  watch: {},
  methods: {
    handleCopy() {
      this.dispatch('Home', 'copy', this.config);
    },

    handleDel() {
      this.dispatch('Home', 'delete', this.config);
    },
    clickWrap() {
      this.dispatch('Home', 'active', this.config);
    },

    getClasses() {
      let className = `drag_${this.config.__config__.id}`;
      if (this.showWrap) {
        className += ' wrap_active';
      } else if (this.mouseover) {
        className += ' wrap_hover';
      }
      if (this.showBorder) {
        className += ' component-wrap';
      }
      return className;
    },

    getStyle() {
      const styles = [];
      if (this.config.style?.width) {
        styles.push(`width: ${this.config.style.width}`);
      } else if (this.config.__config__.type === 'container') {
        styles.push('width: 100%');
      }

      if (this.config.__config__.wrapStyle) {
        Object.keys(this.config.__config__.wrapStyle).forEach(key => {
          styles.push(`${key}:${this.config.__config__.wrapStyle[key]}`);
        });
      }
      return styles.join(';');
    }
  }
};
</script>

<style lang='scss' scoped>
$height: 20px;

.blockWrap {
  position: relative;

  .op-wrap {
    position: absolute;
    background-color: $brandColor2;
    right: 0;
    top: -$height;
    height: $height;
    display: flex;
    align-items: center;
    z-index: 99;
    padding-left: 4px;

    .op-item {
      line-height: $height;
      width: $height;
      height: $height;
    }

    .op-item > svg {
      width: $height;
      height: $height;
    }

    .icon-copy, .icon-del {
      cursor: pointer;
    }

    .icon-copy {
      margin-right: 4px;
      color: #FFFFFF;
    }

    .icon-del {
    }
  }
}

.wrap_hover {
    border: 1px dashed $brandColor2;
}

.wrap_active {
  border: 1px solid $brandColor2;
}
</style>
