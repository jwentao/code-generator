<template>
  <div
    class="blockWrap"
    :class="getClasses()"
    @mouseout.stop="mouseover = false;"
    @mouseover.stop="mouseover = true;"
    @click.stop="clickWrap"
  >
    <div v-show="showWrap" class="op-wrap">
      <div class="icon-copy" @click.stop="handleCopy">
        <i class="el-icon-copy-document" />
      </div>
      <div class="icon-del" @click.stop="handleDel">
        <i class="el-icon-delete" />
      </div>
      <div class="op-item drag-btn">
        <Move />
      </div>
    </div>
    <slot />
  </div>
</template>
<script>
import Move from '@/icon/Move';
import emitter from '@/mixins/emitter';

export default {
  name: 'BlockWrap',
  components: {
    Move
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
    z-index: 99;
    padding-left: 4px;

    .op-item, .op-item > svg {
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
      color: $danger1;
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
