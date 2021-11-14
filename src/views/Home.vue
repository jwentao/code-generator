<template>
  <div class="home">
    <div class="top-container" />
    <div class="main-container">
      <el-scrollbar class="container-left">
        <LeftPanel />
      </el-scrollbar>
      <el-scrollbar class="container-center">
        <draggable
          :group="{ name: DRAG_GROUP.CONTAINER_COMPONENT, put: [DRAG_GROUP.CONTAINER_COMPONENT, DRAG_GROUP.BASE_COMPONENT] }"
          class="layout-board"
          :list="curConfig"
          handle=".drag-btn"
        >
          <DraggableItem
            v-for="(item, index) in curConfig"
            :key="index"
            :config="item"
            :activeid="activeId"
          />
        </draggable>
      </el-scrollbar>
      <el-scrollbar class="container-right">
        <RightPanel
          :active-data="activeData"
        />
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import LeftPanel from '@/components/LeftPanel';
import RightPanel from '@/components/RightPanel';
import DraggableItem from '@/components/DraggableItem';
import draggable from 'vuedraggable';
import { DRAG_GROUP } from '@/constant';
import { saveConfig, getConfig } from '@/api';
import { debounce } from 'throttle-debounce';

const saveConfigDebounce = debounce(300, saveConfig);

export default {
  name: 'Home',
  components: {
    LeftPanel,
    RightPanel,
    DraggableItem,
    draggable
  },
  data: () => ({
    DRAG_GROUP,

    activeId: null,
    activeData: {},
    curConfig: []
  }),
  computed: {
  },
  watch: {
    curConfig: {
      deep: true,
      handler(val) {
        console.log(val);
        saveConfigDebounce(val);
      }
    }
  },
  created() {
    this.initEvents();
    this.curConfig = getConfig();
    if (this.curConfig.length) {
      this.activeItem(this.curConfig[0]);
    }
  },
  methods: {
    initEvents() {
      this.$on('active', (config) => {
        this.activeItem(config);
      });
    },
    activeItem(config) {
      this.activeId = config.__config__.id;
      this.activeData = config;
    }
  }
};
</script>

<style lang="scss">
$topHeight: 50px;
$leftWidth: 280px;
$rightWidth: 350px;

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
    height: 100%;
  }

  .container-center {
    flex: 1;
    overflow: hidden;
    height: 100%;
  }

  .container-right {
    width: $rightWidth;
    flex: 0 0 $rightWidth;
    border-left: 1px solid $borderL1;
    padding: 12px;
    height: 100%;
  }

  .layout-board {
    height: 100%;
    padding: 12px;
  }
}
</style>
