<template>
  <el-drawer
    class="json-view"
    :visible.sync="jsonDrawer"
    direction="ttb"
    :show-close="false"
    size="100%"
    :close-on-press-escape="false"
    :with-header="false"
  >
    <Header>
      <div class="op-wrap">
        <span class="bar-btn" @click="runCode">
          <i class="el-icon-video-play" />
          运行
        </span>
        <span ref="copyBtn" class="bar-btn json-copy-btn">
          <i class="el-icon-document-copy" />
          复制
        </span>
        <span class="bar-btn" @click="reset">
          <i class="el-icon-refresh-left" />
          重置
        </span>
        <span class="bar-btn delete-btn" @click="cancel">
          <i class="el-icon-circle-close" />
          退出
        </span>
      </div>
    </Header>
    <el-scrollbar class="code-bar">
      <codemirror
        ref="codemirror"
        v-model="jsonCode"
        :options="cmOptions"
      />
    </el-scrollbar>
  </el-drawer>
</template>
<script>
import { codemirror } from 'vue-codemirror';
import '@/components/common/codemirror/json';
import '@/components/common/codemirror/codemirror.css';
import Header from '@/components/common/Header';
import ClipboardJS from 'clipboard';

export default {
  name: 'JSONView',
  components: {
    codemirror,
    Header
  },
  mixins: [],
  props: {},
  data: () => ({
    jsonDrawer: false,
    jsonCode: '',

    cmOptions: {
      mode: 'application/ld+json',
      lineNumbers: true, // 行号
      // scrollbarStyle: "simple",
      autoCloseBrackets: true, // 自动补全括号
      matchBrackets: true, // 匹配括号
      showCursorWhenSelecting: true, // select显示光标
      autoCloseTags: true,
      tabSize: 2,
      foldGutter: true, // 可折叠的块
      gutters: [
        'CodeMirror-linenumbers',
        'CodeMirror-foldgutter',
        'CodeMirror-lint-markers'
      ],
      autofocus: true,
      styleActiveLine: true,
      hintOptions: {
        completeSingle: false
      },
      keyMap: 'sublime',
      extraKeys: {
        'Ctrl-Q': 'autocomplete'
      }
    }
  }),
  watch: {},

  mounted() {
    this.clipboard = new ClipboardJS('.json-copy-btn', {
      text: trigger => {
        this.$notify({
          title: '成功',
          message: 'JSON已复制到剪切板，可粘贴。',
          type: 'success'
        });
        return this.codemirrorCode;
      }
    });
  },

  beforeDestroy() {
    this.clipboard && this.clipboard.destroy();
  },

  methods: {
    show(json) {
      this.jsonCode = JSON.stringify(json, null, 2);
      this.originCode = this.jsonCode; // 用于还原
      this.jsonDrawer = true;
      this.$nextTick(() => {
        this.$refs.codemirror.refresh();
      });
    },

    runCode() {
      try {
        const config = JSON.parse(this.jsonCode);
        this.$emit('on-run', config);
        this.jsonDrawer = false;
      } catch (e) {
        this.$message.error('json解析失败，请检查');
      }
    },

    reset() {
      this.jsonCode = this.originCode;
    },

    cancel() {
      this.jsonDrawer = false;
    }
  }
};
</script>
<style lang='scss' scoped>
.json-view {
  .bar-btn {
    display: inline-block;
    padding: 0 6px;
    line-height: 32px;
    color: $textL1;
    cursor: pointer;
    font-size: 14px;
    user-select: none;
    & i {
      font-size: 20px;
    }
    &:hover {
      color: $brandColor2;
    }
  }
  .bar-btn + .bar-btn {
    margin-left: 8px;
  }
  .delete-btn {
    color: $danger1;
    &:hover {
      color: #ea0b30;
    }
  }

  .code-bar {
    height: calc(100vh - #{$headerHeight});
  }
}
</style>
