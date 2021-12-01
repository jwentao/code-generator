<template>
  <div ref="splitPane" class="split-pane" :class="direction" :style="{ flexDirection: direction }">
    <div class="pane pane-one" :style="lengthType + ':' + paneLengthValue">
      <slot name="one" />
    </div>

    <div
      class="pane-trigger"
      @mousedown="handleMouseDown"
    >
      <div class="icon-wrap">
        <svg-icon icon-class="split" />
        <svg-icon icon-class="split" />
        <svg-icon icon-class="split" />
        <svg-icon icon-class="split" />
        <svg-icon icon-class="split" />
        <svg-icon icon-class="split" />
      </div>
    </div>

    <div class="pane pane-two">
      <slot name="two" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    direction: {
      type: String,
      default: 'row'
    },

    min: {
      type: Number,
      default: 10
    },

    max: {
      type: Number,
      default: 90
    },

    paneLengthPercent: {
      type: Number,
      default: 50
    }
  },
  data() {
    return {
      triggerLeftOffset: 0 // 鼠标距滑动器左(顶)侧偏移量
    };
  },
  computed: {
    lengthType() {
      return this.direction === 'row' ? 'width' : 'height';
    },

    paneLengthValue() {
      return `calc(${this.paneLengthPercent}% - ${6 / 2 + 'px'})`;
    }
  },

  methods: {
    // 按下滑动器
    handleMouseDown(e) {
      document.addEventListener('mousemove', this.handleMouseMove);
      document.addEventListener('mouseup', this.handleMouseUp);

      if (this.direction === 'row') {
        this.triggerLeftOffset = e.pageX - e.srcElement.getBoundingClientRect().left;
      } else {
        this.triggerLeftOffset = e.pageY - e.srcElement.getBoundingClientRect().top;
      }
    },

    // 按下滑动器后移动鼠标
    handleMouseMove(e) {
      const clientRect = this.$refs.splitPane.getBoundingClientRect();
      let paneLengthPercent = 0;

      if (this.direction === 'row') {
        const offset = e.pageX - clientRect.left - this.triggerLeftOffset + 6 / 2;
        paneLengthPercent = (offset / clientRect.width) * 100;
      } else {
        const offset = e.pageY - clientRect.top - this.triggerLeftOffset + 6 / 2;
        paneLengthPercent = (offset / clientRect.height) * 100;
      }

      if (paneLengthPercent < this.min) {
        paneLengthPercent = this.min;
      }
      if (paneLengthPercent > this.max) {
        paneLengthPercent = this.max;
      }

      this.$emit('update:paneLengthPercent', paneLengthPercent);
    },

    // 松开滑动器
    handleMouseUp() {
      document.removeEventListener('mousemove', this.handleMouseMove);
    }
  }
};
</script>

<style scoped lang="scss">
.split-pane {
  height: 100%;
  display: flex;

  .pane-trigger {
    position: relative;
    border: 1px solid #dcdee2;

    .icon-wrap {
      position: absolute;
      top: 50%;
      left: 50%;
    }
  }
  &.row {
    .pane {
      height: 100%;
    }
    .pane-trigger {
      width: 6px;
      cursor: col-resize;
      border-top: none;
      border-bottom: none;

      .icon-wrap {
        height: 6px;
        transform: translateX(-50%);

        .svg-icon {
          width: 6px;
          height: 6px;
          display: block;
        }
      }
    }
  }
  &.column {
    .pane {
      width: 100%;
    }
    .pane-trigger {
      height: 6px;
      width: 100%;
      cursor: row-resize;
      border-left: none;
      border-right: none;

      .icon-wrap {
        height: 6px;
        transform: rotate(90deg) translateX(-50%);

        .svg-icon {
          width: 6px;
          height: 6px;
          display: block;
        }
      }
    }
  }
  .pane-one {
  }
  .pane-trigger {
    user-select: none;
    background: #f8f8f9;
  }
  .pane-two {
    flex: 1;
  }
}
</style>
