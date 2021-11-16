<script>
import draggable from 'vuedraggable';
import { isNumberStr } from '@/utils';

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
          onInput={this.__onValueInput('__vModel__')}
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
          onInput={this.__onValueInput('prop')}
          placeholder='请输入字段名（prop)' />
      </el-form-item>
    );
  },
  // placeholder
  placeholder(h) {
    return (
      <el-form-item label='占位符'>
        <el-input
          value={this.activeData.placeholder}
          onInput={this.__onValueInput('placeholder')}
          placeholder='请输入placeholder' />
      </el-form-item>
    );
  },
  // 默认值
  defaultValue(h) {
    return (
      <el-form-item label='默认值'>
        <el-input
          value={this.__setDefaultValue(this.activeData.__config__.defaultValue)}
          placeholder='请输入默认值'
          onInput={this.__onDefaultValueInput}
        />
      </el-form-item>
    );
  },
  // border
  border(h) {
    return (
      <el-form-item label='边框'>
        <el-switch
          value={this.activeData.border}
          onInput={this.__onValueInput('border')}/>
      </el-form-item>
    );
  },
  // 能否清空
  clearable(h) {
    return (
      <el-form-item label='能否清空'>
        <el-switch
          value={this.activeData.clearable}
          onInput={this.__onValueInput('clearable')}/>
      </el-form-item>
    );
  },
  // 能否搜索
  filterable(h) {
    return (
      <el-form-item label='能否搜索'>
        <el-switch
          value={this.activeData.filterable}
          onInput={this.__onValueInput('filterable')}/>
      </el-form-item>
    );
  },
  // 能否多选
  multiple(h) {
    return (
      <el-form-item label='能否多选'>
        <el-switch
          value={this.activeData.multiple}
          onInput={(val) => {
            this.__onValueInput('multiple')(val);
            this.activeData.__config__.defaultValue = val ? [] : '';
          }}/>
      </el-form-item>
    );
  },
  // 斑马纹
  stripe(h) {
    return (
      <el-form-item label='斑马纹'>
        <el-switch
          value={this.activeData.stripe}
          onInput={this.__onValueInput('stripe')}/>
      </el-form-item>
    );
  },
  // 尺寸
  size(h) {
    return (
      <el-form-item label='尺寸'>
        <el-radio-group
          value={this.activeData.size}
          onInput={this.__onValueInput('size')}>
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
          onInput={this.__onValueInput('align')}>
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
          onInput={this.__onValueInput('fixed')}>
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
          onInput={this.__onValueInput('width')}
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
          onInput={this.__onValueInput('min-width')}
          placeholder='最小宽度' />
      </el-form-item>
    );
  },
  // 选项
  options(h) {
    return (
      <div>
        <el-divider>选项</el-divider>
        <draggable
          list={this.activeData.__slot__.options}
          animation={340}
          group='selectItem'
          handle='.option-drag'
        >
          {
            this.activeData.__slot__.options.map((item, index) => (
              <div class='option-item'>
                <div class='select-line-icon option-drag'>
                  <i class='el-icon-s-operation'/>
                </div>
                <el-input
                  value={item.label}
                  onInput={this.__onValueInput('label', item)}
                  size='small'
                  placeholder='选项名' />
                <el-input
                  placeholder='选项值'
                  size='small'
                  value={item.value}
                  onInput={this.__onValueInput('value', item)}
                />
                <div class='close-btn select-line-icon' onClick={() => {
                  this.activeData.__slot__.options.splice(index, 1);
                }}>
                  <i class='el-icon-remove-outline' />
                </div>
              </div>
            ))
          }
        </draggable>
        <div style='margin-left: 20px;'>
          <el-button
            style='padding-bottom: 0'
            icon='el-icon-circle-plus-outline'
            type='text'
            onClick={() => {
              this.activeData.__slot__.options.push({
                label: '',
                value: ''
              });
            }}
          >
          添加选项
          </el-button>
        </div>
        <el-divider />
      </div>
    );
  },
  formLabel(h) {
    return (
      <el-form-item label='标签名'>
        <el-input
          value={this.activeData.__config__.label}
          onInput={this.__onValueInput('label', this.activeData.__config__)}
          placeholder='标签名' />
      </el-form-item>
    );
  },
  // label宽度,form和基础组件共用
  labelWidth(key) {
    return function(h) {
      const target = key ? this.activeData[key] : this.activeData;
      return (
        <el-form-item label='label宽度'>
          <el-input
            value={target.labelWidth}
            onInput={this.__onValueInput('labelWidth', target)}
            placeholder='label宽度' />
        </el-form-item>
      );
    };
  },
  // label
  label(key) {
    return function(h) {
      const target = key ? this.activeData[key] : this.activeData;
      return (
        <el-form-item label='标签名'>
          <el-input
            value={target.label}
            onInput={this.__onValueInput('label', target)}
            placeholder='请输入标签名（label)'/>
        </el-form-item>
      );
    };
  },
  // 显示标签
  showLabel(h) {
    return (
      <el-form-item label='显示标签'>
        <el-switch
          value={this.activeData.__config__.showLabel}
          onInput={this.__onValueInput('showLabel', this.activeData.__config__)}/>
      </el-form-item>
    );
  },
  // 行内
  inline(h) {
    return (
      <el-form-item label='行内'>
        <el-switch
          value={this.activeData.inline}
          onInput={this.__onValueInput('inline')}/>
      </el-form-item>
    );
  }
};

const renderMap = {
  'el-input': [panelRender.vModel, panelRender.placeholder, panelRender.defaultValue],
  'el-select': [panelRender.vModel, panelRender.placeholder, panelRender.defaultValue, panelRender.clearable, panelRender.filterable, panelRender.multiple, panelRender.options],
  'el-table': [panelRender.border, panelRender.stripe, panelRender.size],
  'el-form': [panelRender.labelWidth(), panelRender.size, panelRender.inline],
  'el-table-column': [panelRender.prop, panelRender.label(), panelRender.width, panelRender['min-width'], panelRender.align, panelRender.fixed]
};

const formExtraRender = [panelRender.label('__config__'), panelRender.labelWidth('__config__'), panelRender.showLabel];

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
    __onValueInput(key, target) {
      return (val) => {
        console.log(val);
        target = target || this.activeData;
        target[key] = isNumberStr(val) ? +val : val;
        // this.$set(target, key, isNumberStr(val) ? +val : val);
      };
    },

    __onDefaultValueInput(str) {
      if (Array.isArray(this.activeData.__config__.defaultValue)) {
        // 数组
        this.$set(
          this.activeData.__config__,
          'defaultValue',
          str.split(',').map(val => (isNumberStr(val) ? +val : val))
        );
      } else if (['true', 'false'].indexOf(str) > -1) {
        // 布尔
        this.$set(this.activeData.__config__, 'defaultValue', JSON.parse(str));
      } else {
        // 字符串和数字
        this.$set(
          this.activeData.__config__,
          'defaultValue',
          isNumberStr(str) ? +str : str
        );
      }
    },

    __setDefaultValue(val) {
      if (Array.isArray(val)) {
        return val.join(',');
      }
      // if (['string', 'number'].indexOf(typeof val) > -1) {
      //   return val
      // }
      if (typeof val === 'boolean') {
        return `${val}`;
      }
      return val;
    }
  },
  render(h) {
    if (!this.activeData || !this.activeData.__config__) {
      return (<div/>);
    }
    let extra = <div/>;
    if (this.activeData.__config__.parent) {
      extra = formExtraRender.map(item => item.call(this, h));
    }
    return (
      <div>
        <el-form label-width='90px' size='small'>
          {
            ((this.activeData.__config__ && renderMap[this.activeData.__config__.tag]) || []).map(item => item.call(this, h))
          }
          <el-divider/>
          {
            extra
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
.option-item {
  display: flex;

  &:not(:last-child) {
    margin-bottom: 3px;
  }

  .option-drag {
    cursor: move;
  }

  .select-line-icon {
    line-height: 32px;
    font-size: 22px;
    padding: 0 4px;
    color: #777;
  }

  & .close-btn {
    cursor: pointer;
    color: #f56c6c;
  }
}
</style>
