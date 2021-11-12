<script>

const sizeList = [{ label: '中等', value: 'medium' }, { label: '小', value: 'small' }, { label: '迷你', value: 'mini' }];
const alignList = [{ label: '左', value: 'left' }, { label: '中', value: 'center' }, { label: '右', value: 'right' }];
const fixedList = [{ label: '左', value: 'left' }, { label: '右', value: 'right' }, { label: '不固定', value: false }];

const panelRender = {
  // v-model
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
  // prop
  prop(h) {
    return (
      <el-form-item label='字段名'>
        <el-input
          value={this.activeData.prop}
          onInput={this.__handleValueUpdate('prop')}
          placeholder='请输入字段名（prop)' />
      </el-form-item>
    );
  },
  // label
  label(h) {
    return (
      <el-form-item label='标签名'>
        <el-input
          value={this.activeData.label}
          onInput={this.__handleValueUpdate('label')}
          placeholder='请输入标签名（label)' />
      </el-form-item>
    );
  },
  // placeholder
  placeholder(h) {
    return (
      <el-form-item label='占位符'>
        <el-input
          value={this.activeData.placeholder}
          onInput={this.__handleValueUpdate('placeholder')}
          placeholder='请输入placeholder' />
      </el-form-item>
    );
  },
  // border
  border(h) {
    return (
      <el-form-item label='边框'>
        <el-switch
          value={this.activeData.border}
          onInput={this.__handleValueUpdate('border')}/>
      </el-form-item>
    );
  },
  // 斑马纹
  stripe(h) {
    return (
      <el-form-item label='斑马纹'>
        <el-switch
          value={this.activeData.stripe}
          onInput={this.__handleValueUpdate('stripe')}/>
      </el-form-item>
    );
  },
  // 尺寸
  size(h) {
    return (
      <el-form-item label='尺寸'>
        <el-radio-group
          value={this.activeData.size}
          onInput={this.__handleValueUpdate('size')}>
          { sizeList.map(item => (
            <el-radio-button label={ item.value }>
              { item.label }
            </el-radio-button>
          )) }
        </el-radio-group>
      </el-form-item>
    );
  },
  // 对齐方式
  align(h) {
    return (
      <el-form-item label='对齐方式'>
        <el-radio-group
          value={this.activeData.align}
          onInput={this.__handleValueUpdate('align')}>
          { alignList.map(item => (
            <el-radio-button label={ item.value }>
              { item.label }
            </el-radio-button>
          )) }
        </el-radio-group>
      </el-form-item>
    );
  },
  // 固定位置
  fixed(h) {
    return (
      <el-form-item label='固定位置'>
        <el-radio-group
          value={this.activeData.fixed}
          onInput={this.__handleValueUpdate('fixed')}>
          { fixedList.map(item => (
            <el-radio-button label={ item.value }>
              { item.label }
            </el-radio-button>
          )) }
        </el-radio-group>
      </el-form-item>
    );
  },
  // 宽度
  width(h) {
    return (
      <el-form-item label='宽度'>
        <el-input
          value={this.activeData.width}
          onInput={this.__handleValueUpdate('width')}
          placeholder='列宽度' />
      </el-form-item>
    );
  },
  // 宽度
  'min-width'(h) {
    return (
      <el-form-item label='最小宽度'>
        <el-input
          value={this.activeData['min-width']}
          onInput={this.__handleValueUpdate('min-width')}
          placeholder='最小宽度' />
      </el-form-item>
    );
  }
};

const renderMap = {
  'el-input': [panelRender.vModel, panelRender.placeholder],
  'el-table': [panelRender.border, panelRender.stripe, panelRender.size],
  'el-table-column': [panelRender.prop, panelRender.label, panelRender.width, panelRender['min-width'], panelRender.align, panelRender.fixed]
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
    return (
      <div>
        { this.activeData.__config__ && this.activeData.__config__.label }
        <el-form label-width='90px' size='small'>
          {
            ((this.activeData.__config__ && renderMap[this.activeData.__config__.tag]) || []).map(item => item.call(this, h))
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
