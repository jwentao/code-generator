<template>
  <div class="home">
    <div class="top-container">
      <div class="logo-bar">logo</div>
      <div class="action-bar">
        <el-button type="primary" size="small" @click="generateCode">生成代码(测试)</el-button>
        <el-button type="danger" size="small" @click="clearCode">清空</el-button>
      </div>
      <div class="config-bar">
        显示边界<Help content="每个组件会增加一边框以及6px的内边距，用来辅助拖拽，不会生成在代码中。" /><el-switch v-model="showBorder" />
        预览<el-switch v-model="preview" @change="handlePreviewChange" />
      </div>
    </div>
    <Display v-show="preview" :code="generatedCode" />
    <div v-show="!preview" class="main-container">
      <el-scrollbar class="container-left">
        <LeftPanel />
      </el-scrollbar>
      <el-scrollbar class="container-center">
        <draggable
          :group="{ name: DRAG_GROUP.CONTAINER_COMPONENT, put: [DRAG_GROUP.CONTAINER_COMPONENT, DRAG_GROUP.BASE_COMPONENT] }"
          class="layout-board"
          :list="curConfig"
          handle=".drag-btn"
          @add="handleWrapAdd"
        >
          <DraggableItem
            v-for="(item, index) in curConfig"
            :key="index"
            :config="item"
            :active-id="activeId"
            :show-border="showBorder"
          />
        </draggable>
      </el-scrollbar>
      <el-scrollbar class="container-right">
        <RightPanel
          class="right-inner"
          :active-data="activeData"
          :all-config="curConfig"
        />
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import LeftPanel from '@/components/LeftPanel';
import RightPanel from '@/components/RightPanel';
import Display from '@/components/Display';
import DraggableItem from '@/components/DraggableItem';
import Help from '@/components/common/Help';
import draggable from 'vuedraggable';
import { DRAG_GROUP } from '@/constant';
import { saveConfig, getConfig } from '@/api';
import { debounce } from 'throttle-debounce';
import { clearFormExtraConfig, beautifierConf, deepClone, generateId } from '@/utils';
import { makeUpTemplate, vueTemplate, vueScript, vueStyle } from '@/generator/template';
import { makeupScript } from '@/generator/script';
import loadBeautifier from '@/utils/loadBeautifier';

const saveConfigDebounce = debounce(300, saveConfig);

let beautifier;

function updateOnlyValue(item) { // copy嵌套组件时迭代更新id和renderKey
  item.__config__.id = generateId();
  item.__config__.renderKey = generateId();
  if (Array.isArray(item.children)) {
    item.children.forEach(child => {
      updateOnlyValue(child);
    });
  }
}

function findParentAndIdx(parent, target) {
  for (let i = 0; i < parent.length; i++) {
    const item = parent[i];
    if (item === target) {
      return [parent, i];
    }
    if (Array.isArray(item.children)) {
      const [resParent, resIdx] = findParentAndIdx(item.children, target);
      if (resParent) {
        return [resParent, resIdx];
      }
    }
  }
  return [null];
}

export default {
  name: 'Home',
  components: {
    LeftPanel,
    RightPanel,
    DraggableItem,
    Help,
    draggable,
    Display
  },
  data: () => ({
    DRAG_GROUP,

    showBorder: true,
    preview: false,

    activeId: null,
    activeData: {},
    curConfig: [],

    generatedCode: ''
  }),
  computed: {
  },
  watch: {
    curConfig: {
      deep: true,
      handler(val) {
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

  mounted() {
    loadBeautifier(btf => {
      beautifier = btf;
    });
  },

  methods: {
    initEvents() {
      this.$on('active', config => {
        this.activeItem(config);
      });
      this.$on('delete', config => {
        this.removeItem(config);
      });
      this.$on('copy', config => {
        this.copyItem(config);
      });
    },
    activeItem(config) {
      this.activeId = config.__config__.id;
      this.activeData = config;
      console.log('active', config);
    },

    removeItem(config) {
      const [parent, idx] = findParentAndIdx(this.curConfig, config);
      parent.splice(idx, 1);
    },

    copyItem(config) {
      const [parent, idx] = findParentAndIdx(this.curConfig, config);
      const copyItem = deepClone(parent[idx]);
      updateOnlyValue(copyItem);
      parent.splice(idx, 0, copyItem);
    },

    handleWrapAdd(el) {
      clearFormExtraConfig(this.curConfig[el.newDraggableIndex]);
      this.activeItem(this.curConfig[el.newDraggableIndex]);
    },
    generateCode() {
      // todo 检测变量重复 throw error
      const template = vueTemplate(makeUpTemplate(this.curConfig));
      const script = vueScript(makeupScript(this.curConfig));
      const style = vueStyle('');
      const vueCode = beautifier.html(template + script + style, beautifierConf.html);
      console.log(vueCode);
      return vueCode;
    },
    clearCode() {
      this.$alert('确定要清空当前配置吗', '确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        showCancelButton: true,
        callback: action => {
          if (action === 'confirm') {
            this.curConfig = [];
            this.activeData = {};
            this.activeId = null;
          }
        }
      });
    },
    handlePreviewChange(val) {
      if (val) {
        this.generatedCode = this.generateCode();
      }
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
    line-height: $topHeight;
    border-bottom: 1px solid $borderL1;
    display: flex;

    .action-bar {
      flex: 1;
      text-align: right;
    }

    .config-bar {
      padding: 0 24px;
    }
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

    .layout-board {
      min-height: calc(100vh - 65px);
      padding: 24px 12px 12px;
      box-sizing: border-box;
    }
  }

  .container-right {
    width: $rightWidth;
    flex: 0 0 $rightWidth;
    border-left: 1px solid $borderL1;
    height: 100%;

    .right-inner {
      padding: 12px;
    }
  }
}
</style>
