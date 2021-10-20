<template>
  <div class="container">
    <div class="left-board">
      <div class="logo-wrapper">
        <div class="logo">
          <img :src="logo" alt="logo"> Form Generator
          <a class="github" href="https://github.com/JakHuang/form-generator" target="_blank">
            <img src="https://github.githubassets.com/pinned-octocat.svg" alt>
          </a>
        </div>
      </div>
      <el-scrollbar class="left-scrollbar">
        <div class="components-list">
          <div v-for="(item, listIndex) in leftComponents" :key="listIndex">
            <div class="components-title">
              <svg-icon icon-class="component" />
              {{ item.title }}
            </div>
            <draggable
              class="components-draggable"
              :list="item.list"
              :group="{ name: 'componentsGroup', pull: 'clone', put: false }"
              :clone="cloneComponent"
              draggable=".components-item"
              :sort="false"
              @end="onEnd"
            >
              <div
                v-for="(element, index) in item.list"
                :key="index"
                class="components-item"
                @click="addComponent(element)"
              >
                <div class="components-body">
                  <svg-icon :icon-class="element.__config__.tagIcon" />
                  {{ element.__config__.label }}
                </div>
              </div>
            </draggable>
          </div>
        </div>
      </el-scrollbar>
    </div>

    <div class="center-board">
      <div class="action-bar">
        <el-button icon="el-icon-video-play" type="text" @click="run">
          运行
        </el-button>
        <el-button icon="el-icon-view" type="text" @click="showJson">
          查看json
        </el-button>
        <el-button icon="el-icon-download" type="text" @click="download">
          导出vue文件
        </el-button>
        <el-button class="copy-btn-main" icon="el-icon-document-copy" type="text" @click="copy">
          复制代码
        </el-button>
        <el-button class="delete-btn" icon="el-icon-delete" type="text" @click="empty">
          清空
        </el-button>
      </div>

      <el-scrollbar class="center-scrollbar">
        <el-row class="center-board-row" :gutter="formConf.gutter">
          <el-form
            :size="formConf.size"
            :label-position="formConf.labelPosition"
            :disabled="formConf.disabled"
            :inline="formConf.inline"
            :label-width="formConf.labelWidth + 'px'"
          >
            <draggable class="drawing-board" :list="drawingList" :animation="340" group="componentsGroup">
              <draggable-item
                v-for="(element, index) in drawingList"
                :key="element.renderKey"
                :drawing-list="drawingList"
                :element="element"
                :index="index"
                :active-id="activeId"
                :form-conf="formConf"
                @activeItem="activeFormItem"
                @copyItem="drawingItemCopy"
                @deleteItem="drawingItemDelete"
              />
            </draggable>
            <div v-show="!drawingList.length" class="empty-info">
              从左侧拖入或点选组件进行表单设计
            </div>
          </el-form>
        </el-row>

        <el-row>
          <DragTable
            ref="DragTable"
            :table-conf="tableConf"
            :columns="columns"
            @activeItem="activeTableItem"
          />
        </el-row>
      </el-scrollbar>
    </div>

    <right-panel
      v-show="showPanel === 'form'"
      :active-data="activeData"
      :form-conf="formConf"
      :show-field="!!drawingList.length"
      @tag-change="tagChange"
    />

    <table-right-panel
      v-show="showPanel === 'table'"
      :table-conf="tableConf"
      :active-data="activeTableData"
    />

    <form-drawer
      :visible.sync="drawerVisible"
      :form-data="configData"
      size="100%"
      :generate-conf="generateConf"
    />
    <json-drawer
      size="60%"
      :visible.sync="jsonDrawerVisible"
      :json-str="JSON.stringify(configData)"
      @refresh="refreshJson"
    />
    <code-type-dialog
      :visible.sync="dialogVisible"
      title="选择生成类型"
      :show-file-name="showFileName"
      @confirm="generate"
    />
    <input id="copyNode" type="hidden">
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import { debounce } from 'throttle-debounce';
import { saveAs } from 'file-saver';
import ClipboardJS from 'clipboard';
// import render from '@/components/render/render';
import FormDrawer from './FormDrawer';
import JsonDrawer from '../index/JsonDrawer';
import RightPanel from '../index/RightPanel';
import TableRightPanel from './TableRightPanel';
import {
  inputComponents, selectComponents, layoutComponents, formConf, tableConf
} from '@/components/generator/tableConfig';
import { beautifierConf, titleCase, deepClone
} from '@/utils/index';
import {
  makeUpHtml, vueTemplate, vueScript, cssStyle
} from '@/components/generator/tableHtml';
import { makeUpJs } from '@/components/generator/tableJs';
import { makeUpCss } from '@/components/generator/css';
import drawingDefault from '@/components/generator/drawingDefault';
import logo from '@/assets/logo.png';
import CodeTypeDialog from '../index/CodeTypeDialog';
import DraggableItem from '../index/DraggableItem';
import { getIdGlobal, saveIdGlobal } from '@/utils/db';
import { getTableLocalConfig, saveTableLocalConfig } from '@/utils/tableDB';
import loadBeautifier from '@/utils/loadBeautifier';
import DragTable from '@/views/table/DragTable';

let beautifier;
// const emptyActiveData = { style: {}, autosize: {}};
let oldActiveId;
let tempActiveData;
const idGlobal = getIdGlobal();
const configDataInDB = getTableLocalConfig();

export default {
  components: {
    draggable,
    // render,
    FormDrawer,
    JsonDrawer,
    RightPanel,
    TableRightPanel,
    CodeTypeDialog,
    DraggableItem,
    DragTable
  },
  data() {
    return {
      logo,
      idGlobal,
      formConf,
      tableConf,
      columns: [],
      inputComponents,
      selectComponents,
      layoutComponents,
      showPanel: 'form',
      labelWidth: 100,
      drawingList: drawingDefault,
      drawingData: {},
      activeId: drawingDefault[0].formId,
      drawerVisible: false,
      configData: {},
      dialogVisible: false,
      jsonDrawerVisible: false,
      generateConf: null,
      showFileName: false,
      activeData: drawingDefault[0],
      activeTableData: {},
      saveConfigDataDebounce: debounce(340, saveTableLocalConfig),
      saveIdGlobalDebounce: debounce(340, saveIdGlobal),
      leftComponents: [
        {
          title: '输入型组件',
          list: inputComponents
        },
        {
          title: '选择型组件',
          list: selectComponents
        }
        // {
        //   title: '布局型组件',
        //   list: layoutComponents
        // }
      ]
    };
  },
  computed: {
  },
  watch: {
    // eslint-disable-next-line func-names
    'activeData.__config__.label': function(val, oldVal) {
      if (
        this.activeData.placeholder === undefined ||
        !this.activeData.__config__.tag ||
        oldActiveId !== this.activeId
      ) {
        return;
      }
      this.activeData.placeholder = this.activeData.placeholder.replace(oldVal, '') + val;
    },
    activeId: {
      handler(val) {
        oldActiveId = val;
      },
      immediate: true
    },
    configData: {
      handler(val) {
        this.saveConfigDataDebounce(val);
      },
      deep: true
    },
    idGlobal: {
      handler(val) {
        this.saveIdGlobalDebounce(val);
      },
      immediate: true
    }
  },
  mounted() {
    try {
      if (configDataInDB) {
        this.configData = configDataInDB;
      } else {
        this.setDefaultConfig();
      }
      this.setConfigData();
    } catch (e) {
      this.setDefaultConfig();
      this.setConfigData();
    }
    this.activeFormItem(this.drawingList[0]);
    loadBeautifier(btf => {
      beautifier = btf;
    });
    const clipboard = new ClipboardJS('#copyNode', {
      text: trigger => {
        const codeStr = this.generateCode();
        this.$notify({
          title: '成功',
          message: '代码已复制到剪切板，可粘贴。',
          type: 'success'
        });
        return codeStr;
      }
    });
    clipboard.on('error', e => {
      this.$message.error('代码复制失败');
    });
  },
  methods: {
    setDefaultConfig() {
      this.configData = {
        form: {
          fields: [...drawingDefault],
          __config__: { ...formConf }
        },
        table: {
          columns: [],
          __config__: { ...tableConf }
        }
      };
    },
    setConfigData() {
      this.drawingList = this.configData.form.fields;
      this.formConf = this.configData.form.__config__;
      this.columns = this.configData.table.columns;
      this.tableConf = this.configData.table.__config__;
    },
    activeFormItem(element) {
      this.showPanel = 'form';
      this.activeData = element;
      this.activeId = element.__config__.formId;
    },
    activeTableItem(column) {
      this.showPanel = 'table';
      this.activeTableData = column;
    },
    onEnd(obj) {
      if (obj.from !== obj.to) {
        this.activeData = tempActiveData;
        this.activeId = this.idGlobal;
        this.addTableColumn(tempActiveData);
      }
    },
    addComponent(item) {
      const clone = this.cloneComponent(item);
      this.drawingList.push(clone);
      this.activeFormItem(clone);
      this.addTableColumn(clone);
    },

    addTableColumn(clone) {
      const column = { ...clone };
      this.$refs.DragTable.addTableColumn(column);
    },

    cloneComponent(origin) {
      const clone = deepClone(origin);
      const config = clone.__config__;
      config.span = this.formConf.span; // 生成代码时，会根据span做精简判断
      this.createIdAndKey(clone);
      clone.placeholder !== undefined && (clone.placeholder += config.label);
      tempActiveData = clone;
      return tempActiveData;
    },
    createIdAndKey(item) {
      const config = item.__config__;
      config.formId = ++this.idGlobal;
      config.renderKey = +new Date(); // 改变renderKey后可以实现强制更新组件
      if (config.layout === 'colFormItem') {
        item.__vModel__ = `field${this.idGlobal}`;
      } else if (config.layout === 'rowFormItem') {
        config.componentName = `row${this.idGlobal}`;
        !Array.isArray(config.children) && (config.children = []);
        delete config.label; // rowFormItem无需配置label属性
      }
      if (Array.isArray(config.children)) {
        config.children = config.children.map(childItem => this.createIdAndKey(childItem));
      }
      return item;
    },
    AssembleConfigData() {
      // this.configData = {
      //   form: {
      //     fields: deepClone(this.drawingList),
      //     ...this.formConf
      //   },
      //   table: {
      //     columns: this.$refs.DragTable.getTableHeader()
      //   }
      // };
    },
    generate(data) {
      const func = this[`exec${titleCase(this.operationType)}`];
      this.generateConf = data;
      func && func(data);
    },
    execRun(data) {
      this.AssembleConfigData();
      this.drawerVisible = true;
    },
    execDownload(data) {
      const codeStr = this.generateCode();
      const blob = new Blob([codeStr], { type: 'text/plain;charset=utf-8' });
      saveAs(blob, data.fileName);
    },
    execCopy(data) {
      document.getElementById('copyNode').click();
    },
    empty() {
      this.$confirm('确定要清空所有组件吗？', '提示', { type: 'warning' }).then(
        () => {
          // this.drawingList = [];
          this.setDefaultConfig();
          this.setConfigData();
          this.idGlobal = 100;
        }
      );
    },
    drawingItemCopy(item, parent) {
      let clone = deepClone(item);
      clone = this.createIdAndKey(clone);
      parent.push(clone);
      this.activeFormItem(clone);
    },
    drawingItemDelete(index, parent) {
      parent.splice(index, 1);
      this.$nextTick(() => {
        const len = this.drawingList.length;
        if (len) {
          this.activeFormItem(this.drawingList[len - 1]);
        }
      });
    },
    generateCode() {
      const { type } = this.generateConf;
      this.AssembleConfigData();

      const script = vueScript(makeUpJs(this.configData, type));
      const html = vueTemplate(makeUpHtml(this.configData, type));
      const css = cssStyle(makeUpCss(this.configData));
      return beautifier.html(html + script + css, beautifierConf.html);
    },
    showJson() {
      this.AssembleConfigData();
      this.jsonDrawerVisible = true;
    },
    download() {
      this.dialogVisible = true;
      this.showFileName = true;
      this.operationType = 'download';
    },
    run() {
      this.dialogVisible = true;
      this.showFileName = false;
      this.operationType = 'run';
    },
    copy() {
      this.dialogVisible = true;
      this.showFileName = false;
      this.operationType = 'copy';
    },
    tagChange(newTag) {
      console.log(newTag);
      newTag = this.cloneComponent(newTag);
      const config = newTag.__config__;
      newTag.__vModel__ = this.activeData.__vModel__;
      config.formId = this.activeId;
      config.span = this.activeData.__config__.span;
      this.activeData.__config__.tag = config.tag;
      this.activeData.__config__.tagIcon = config.tagIcon;
      this.activeData.__config__.document = config.document;
      if (typeof this.activeData.__config__.defaultValue === typeof config.defaultValue) {
        config.defaultValue = this.activeData.__config__.defaultValue;
      }
      Object.keys(newTag).forEach(key => {
        if (this.activeData[key] !== undefined) {
          newTag[key] = this.activeData[key];
        }
      });
      this.activeData = newTag;
      this.updateDrawingList(newTag, this.drawingList);
    },
    updateDrawingList(newTag, list) {
      const index = list.findIndex(item => item.__config__.formId === this.activeId);
      if (index > -1) {
        list.splice(index, 1, newTag);
      } else {
        list.forEach(item => {
          if (Array.isArray(item.__config__.children)) this.updateDrawingList(newTag, item.__config__.children);
        });
      }
    },
    refreshJson(data) {
      this.configData = data;
      this.setConfigData();
    }
  }
};
</script>

<style lang='scss' scoped>
@import '@/styles/home';
.center-board-row {
  & > .el-form {
    // 69 = 12+15+42
    height: calc(100vh - 169px);
  }
}
</style>
