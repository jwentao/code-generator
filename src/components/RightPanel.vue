<script>
import TablePanel from '@/components/panels/TablePanel';

const panelRender = {
  vModel(h) {
    return (
      <el-form-item label='字段名'>
        <el-input
          value={this.activeData.__vModel__}
          onInput={this.__handleValueUpdate('__vModel__')}
          placeholder='请输入字段名（v-model)' />
      </el-form-item>
    );
  },
  placeholder(h) {
    return (
      <el-form-item label='占位符'>
        <el-input
          value={this.activeData.placeholder}
          onInput={this.__handleValueUpdate('placeholder')}
          placeholder='请输入placeholder' />
      </el-form-item>
    );
  }
};

const renderMap = {
  'el-input': [panelRender.vModel, panelRender.placeholder]
};

export default {
  name: 'RightPanel',
  mixins: [],
  props: {
    activeData: {
      type: Object,
      default: () => ({
        __config__: {}
      })
    }
  },
  data: () => ({}),
  watch: {},
  methods: {
    __handleValueUpdate(key) {
      return (val) => {
        this.activeData[key] = val;
      };
    }
  },
  render(h) {
    if (!this.activeData || !this.activeData.__config__) {
      return (<div/>);
    }
    let child;
    const { type, tag } = this.activeData.__config__;
    if (type === 'container') {
      if (tag === 'el-table') {
        child = <TablePanel activeData={this.activeData} />;
      }
    } else {
      child = ((this.activeData.__config__ && renderMap[this.activeData.__config__.tag]) || []).map(item => item.call(this, h));
    }
    return (
      <div>
        { this.activeData.__config__ && this.activeData.__config__.label }
        <el-form label-width='90px' size='small'>
          {
            child
          }
        </el-form>
      </div>
    );
  }
};
</script>
<style lang='scss' scoped>
.right-panel {
}
</style>
