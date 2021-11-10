<template>
  <div class="home">
    <div class="top-container" />
    <div class="main-container">
      <div class="container-left">
        <LeftPanel />
      </div>
      <div class="container-center">
        <draggable
          :group="{name: DRAG_GROUP.containerComponent}"
          class="layout-board"
          :list="curConfig"
          handle=".drag-btn"
        >
          <DraggableItem
            v-for="(item, index) in curConfig"
            :key="index"
            :config="item"
            :activeid="activeId"
            @activeItem="activeItem"
          />
        </draggable>
      </div>
      <div class="container-right" />
    </div>
  </div>
</template>

<script>
import LeftPanel from '@/components/LeftPanel';
import DraggableItem from '@/components/DraggableItem';
import draggable from 'vuedraggable';
import { DRAG_GROUP } from '@/constant';

export default {
  name: 'Home',
  components: {
    LeftPanel,
    DraggableItem,
    draggable
  },
  data: () => ({
    DRAG_GROUP,

    activeId: null,
    curConfig: []
  }),
  computed: {
  },
  watch: {
    curConfig: {
      deep: true,
      handler(val) {
        console.log(val);
      }
    }
  },
  created() {
    this.initEvents();
  },
  methods: {
    initEvents() {
      this.$on('active', ({ id }) => {
        this.activeId = id;
      });
    },
    activeItem(config) {
      this.activeId = config.id;
    }
  }
};
</script>

<style lang="scss">
$topHeight: 50px;
$leftWidth: 280px;
$rightWidth: 220px;

.home {
  height: 100%;

  .top-container {
    height: $topHeight;
    border-bottom: 1px solid $borderL1;
  }

  .main-container {
    height: calc(100vh - #{$topHeight});
    display: flex;
  }

  .container-left {
    width: $leftWidth;
    flex: 0 0 $leftWidth;
    border-right: 1px solid $borderL1;
  }

  .container-center {
    flex: 1;
  }

  .container-right {
    width: $rightWidth;
    flex: 0 0 $rightWidth;
    border-left: 1px solid $borderL1;
  }

  .layout-board {
    height: 100%;
    padding: 12px;
  }
}
</style>
