<template>
  <el-drawer
    title="我是标题"
    class="preview"
    :visible.sync="editDrawer"
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
        <span ref="copyBtn" class="bar-btn copy-btn">
          <i class="el-icon-document-copy" />
          复制代码
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
    <Split
      direction="row"
      :min="0"
      :max="100"
      class="split-wrap"
      :pane-length-percent.sync="paneLengthPercent"
    >
      <template v-slot:one>
        <el-scrollbar class="render-preview">
          <codemirror
            ref="codemirror"
            v-model="codemirrorCode"
            :options="cmOptions"
          />
        </el-scrollbar>
      </template>

      <template v-slot:two>
        <el-scrollbar class="render-preview">
          <Display :code="displayCode" />
        </el-scrollbar>
      </template>

    </Split>
  </el-drawer>
</template>
<script>
import { codemirror } from 'vue-codemirror';
import '@/components/common/codemirror';
import '@/components/common/codemirror/codemirror.css';
import Split from '@/components/common/Split';
import Display from '@/components/Display';
import Header from '@/components/common/Header';
import ClipboardJS from 'clipboard';

export default {
  name: 'Preview',
  components: {
    codemirror,
    Display,
    Header,
    Split
  },
  mixins: [],
  props: {
    code: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    editDrawer: false,

    codemirrorCode: '',
    displayCode: '',

    paneLengthPercent: 50,

    cmOptions: {
      mode: 'htmlmixed',
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
  watch: {
    // code(val) {
    //   this.codemirrorCode = val;
    //   this.$nextTick(() => {
    //     this.$refs.codemirror.refresh();
    //   });
    //   this.displayCode = val;
    // }
  },

  mounted() {
    this.clipboard = new ClipboardJS('.copy-btn', {
      text: trigger => {
        this.$notify({
          title: '成功',
          message: '代码已复制到剪切板，可粘贴。',
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
    runCode() {
      this.displayCode = this.codemirrorCode;
    },

    reset() {
      this.codemirrorCode = this.originCode;
      this.displayCode = this.originCode;
    },

    cancel() {
      this.editDrawer = false;
    },

    show(code) {
      this.displayCode = ''; // 强制刷新
      this.codemirrorCode = code;
      this.originCode = code; // 用于重置
      this.editDrawer = true;
      this.$nextTick(() => {
        this.displayCode = code;
        this.$refs.codemirror.refresh();
      });
    }
  }
};
</script>
<style lang='scss' scoped>
.preview {
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

  .split-wrap {
    height: calc(100vh - #{$headerHeight});
  }
  .render-preview {
    height: 100%;
  }
}
</style>
