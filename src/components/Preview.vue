<template>
  <div class="preview">
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
  </div>
</template>
<script>
import { codemirror } from 'vue-codemirror';
import '@/components/common/codemirror';
import '@/components/common/codemirror/codemirror.css';
import Split from '@/components/common/Split';
import Display from '@/components/Display';

export default {
  name: 'Preview',
  components: {
    codemirror,
    Display,
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
    code(val) {
      this.codemirrorCode = val;
      this.$nextTick(() => {
        console.log(this.$refs.codemirror.refresh);
        console.log(this.$refs.codemirror === null);
        this.$refs.codemirror.refresh();
      });
      this.displayCode = val;
    }
  },
  methods: {}
};
</script>
<style lang='scss' scoped>
.preview {
  .split-wrap {
    height: calc(100vh - 50px);
  }
  .render-preview {
    height: 100%;
  }
}
</style>
