<template>
  <div class="home">
    <Header>
      <div class="header-inner-wrap">
        <div class="action-bar">
          <span ref="copyBtn" class="bar-btn home-copy-btn">
            <i class="el-icon-document-copy" />
            复制代码
          </span>
          <span class="bar-btn" @click="saveSchema">
            <svg-icon icon-class="code" />保存
          </span>
          <span class="bar-btn" @click="saveAndDeploy">
            <svg-icon icon-class="code" />发布
          </span>
          <span class="bar-btn" @click="editCode">
            <svg-icon icon-class="code" />编辑代码
          </span>
          <span class="bar-btn" @click="editJSON">
            <svg-icon icon-class="json" />编辑JSON
          </span>
          <span class="bar-btn delete-btn" @click="clearCode">
            <i class="el-icon-circle-close" />
            清空
          </span>
        </div>
        <div class="config-bar">
          显示边界<Help content="每个组件会增加一边框以及6px的内边距，用来辅助拖拽，不会生成在代码中。" /><el-switch v-model="showBorder" />
          预览<el-switch v-model="preview" @change="handlePreviewChange" />
        </div>
      </div>
    </Header>
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
    <input id="copyCode" type="hidden">
    <CodeView ref="CodeView" />
    <JSONView ref="JSONView" @on-run="handleJsonChange" />
  </div>
</template>

<script>
import ClipboardJS from 'clipboard';
import LeftPanel from '@/components/LeftPanel';
import RightPanel from '@/components/RightPanel';
import Display from '@/components/Display';
import CodeView from '@/components/CodeView';
import JSONView from '@/components/JSONView';
import DraggableItem from '@/components/DraggableItem';
import Help from '@/components/common/Help';
import Header from '@/components/common/Header';
import draggable from 'vuedraggable';
import { DRAG_GROUP } from '@/constant';
import { saveConfig, getConfig } from '@/api';
import { debounce } from 'throttle-debounce';
import { clearFormExtraConfig, beautifierConf, deepClone, generateId } from '@/utils';
import { makeUpTemplate, vueTemplate, vueScript, vueStyle } from '@/generator/template';
import { makeupScript } from '@/generator/script';
import loadBeautifier from '@/utils/loadBeautifier';
import { createSchema, createDeploy } from '@/api';

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

function checkVars(config, vars, dupVars) {
  config.forEach(item => {
    const { type, tag } = item.__config__;
    const { children } = item;
    if (type === 'base') {
      let vModel = item.__vModel__;
      if (item.__config__.parent?.__config__.tag === 'el-form') {
        vModel = `${item.__config__.parent.formModel}.${vModel}`;
      }
      if (vars.has(vModel)) {
        dupVars.add(vModel);
      }
      vars.add(vModel);
    } else if (tag === 'el-form') {
      if (vars.has(item.formModel)) {
        dupVars.add(item.formModel);
      }
      vars.add(item.formModel);
      if (Array.isArray(children)) {
        checkVars(children, vars, dupVars);
      }
    }
  });
}

export default {
  name: 'Home',
  components: {
    Display,
    LeftPanel,
    RightPanel,
    DraggableItem,
    Help,
    Header,
    draggable,
    CodeView,
    JSONView
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
    this.clipboard = new ClipboardJS('.home-copy-btn', {
      text: () => {
        const [result, str] = this.generateCode();
        if (!result) {
          this.$notify({
            title: '复制成功',
            message: '代码已复制到剪切板',
            type: 'success'
          });
        }
        return str;
      }
    });
    this.clipboard.on('error', e => {
      this.$message.error('复制失败');
    });
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
      if (!config) {
        this.activeId = null;
        this.activeData = {};
        return;
      }
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

    checkVar() {
      const vars = new Set();
      const dupVars = new Set();
      checkVars(this.curConfig, vars, dupVars);
      return Array.from(dupVars);
    },

    generateCode() {
      // todo 检测变量重复 throw error
      const dups = this.checkVar();

      const template = vueTemplate(makeUpTemplate(this.curConfig));
      const script = vueScript(makeupScript(this.curConfig));
      const style = vueStyle('');
      const vueCode = beautifier.html(template + script + style, beautifierConf.html);
      if (dups.length) {
        this.$notify({
          title: '警告',
          message: `代码复制成功，但存在同名变量，这可能会导致程序运行出错，请检查，变量名为${dups.join(',')}`,
          type: 'warning'
        });
      }
      return [!!dups.length, vueCode];
    },

    editCode() {
      const [, generatedCode] = this.generateCode();
      this.$refs.CodeView.show(generatedCode);
    },

    async saveSchema() {
      const [err] = await createSchema({
        config: deepClone(this.curConfig)
      });
      if (!err) {
        this.$message.success('保存成功');
      }
    },

    async saveAndDeploy() {
      const [, generatedCode] = this.generateCode();
      const [err] = await createDeploy({
        mircoId: 'newFile2',
        config: deepClone(this.curConfig),
        code: generatedCode
      });
      if (!err) {
        this.$message.success('提交成功');
      }
    },

    editJSON() {
      this.$refs.JSONView.show(deepClone(this.curConfig));
    },

    handleJsonChange(newConfig) {
      this.curConfig = newConfig;
      this.activeItem(this.curConfig[0]);
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
        const [, generatedCode] = this.generateCode();
        this.generatedCode = generatedCode;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
$leftWidth: 280px;
$rightWidth: 350px;

.home {
  height: 100%;

  .header-inner-wrap {
    display: flex;
    justify-content: right;

    .action-bar {
      text-align: right;

      .delete-btn{
        color: #F56C6C;
      }
    }

    .config-bar {
      padding: 0 24px;
      display: flex;
      align-items: center;
    }
  }

  .main-container {
    height: calc(100vh - #{$headerHeight});
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
