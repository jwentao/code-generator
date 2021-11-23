<script>
import draggable from 'vuedraggable';
import { deepClone, generateId, isNumberStr } from '@/utils';
import { columnDefault } from '@/components/config';
import IconsDialog from '@/components/IconsDialog';

const sizeList = [{ label: '中等', value: 'medium' }, { label: '小', value: 'small' }, { label: '迷你', value: 'mini' }];
const alignList = [{ label: '左', value: 'left' }, { label: '中', value: 'center' }, { label: '右', value: 'right' }];
const positionList = [{ label: '左对齐', value: 'left' }, { label: '顶部对齐', value: 'top' }, { label: '右对齐', value: 'right' }];
const fixedList = [{ label: '左', value: 'left' }, { label: '右', value: 'right' }, { label: '不固定', value: false }];
const optionTypeList = [{ label: '默认', value: 'default' }, { label: '按钮', value: 'button' }];

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
  // 是否禁用
  disabled(h) {
    return (
      <el-form-item label='是否禁用'>
        <el-switch
          value={this.activeData.disabled}
          onInput={this.__onValueInput('disabled')}/>
      </el-form-item>
    );
  },
  // 前缀
  prepend(h) {
    return (
      <el-form-item label='前缀'>
        <el-input
          value={this.activeData.__slot__.prepend}
          onInput={this.__onValueInput('prepend', this.activeData.__slot__)}
          placeholder='请输入前缀' />
      </el-form-item>
    );
  },
  // 后缀
  append(h) {
    return (
      <el-form-item label='后缀'>
        <el-input
          value={this.activeData.__slot__.append}
          onInput={this.__onValueInput('append', this.activeData.__slot__)}
          placeholder='请输入后缀' />
      </el-form-item>
    );
  },
  // 前图标
  'prefix-icon'(h) {
    return (
      <el-form-item label='前图标'>
        <el-input
          value={this.activeData['prefix-icon']}
          onInput={this.__onValueInput('prefix-icon')}
          placeholder='请输入前图标'>
          <el-button slot='append' icon='el-icon-thumb' onClick={() => {
            this.__openIconsDialog('prefix-icon');
          }}>
          选择
          </el-button>
        </el-input>
      </el-form-item>
    );
  },
  // 后图标
  'suffix-icon'(h) {
    return (
      <el-form-item label='后图标'>
        <el-input
          value={this.activeData['suffix-icon']}
          onInput={this.__onValueInput('suffix-icon')}
          placeholder='请输入后图标'>
          <el-button slot='append' icon='el-icon-thumb' onClick={() => {
            this.__openIconsDialog('suffix-icon');
          }}>
          选择
          </el-button>
        </el-input>
      </el-form-item>
    );
  },
  // 是否只读
  readonly(h) {
    return (
      <el-form-item label='是否只读'>
        <el-switch
          value={this.activeData.readonly}
          onInput={this.__onValueInput('readonly')}/>
      </el-form-item>
    );
  },
  // 输入最大长度
  maxlength(h) {
    return (
      <el-form-item label='最多输入'>
        <el-input
          value={this.activeData.maxlength}
          onInput={this.__onValueInput('maxlength')}
          placeholder='输入后可限制最大长度'>
          <template slot='append'>
            个字符
          </template>
        </el-input>
      </el-form-item>
    );
  },
  // 至少应选
  minLimit(h) {
    return (
      <el-form-item label='至少应选'>
        <el-input-number
          value={this.activeData.min}
          min={0}
          onInput={(val) => {
            this.activeData.min = val || undefined;
          }}
          placeholder='至少应选' />
      </el-form-item>
    );
  },
  // 至多能选
  maxLimit(h) {
    return (
      <el-form-item label='至多能选'>
        <el-input-number
          value={this.activeData.max}
          min={0}
          onInput={(val) => {
            this.activeData.max = val || undefined;
          }}
          placeholder='至多能选' />
      </el-form-item>
    );
  },
  // 最小行数
  minRows(h) {
    return (
      <el-form-item label='最小行数'>
        <el-input-number
          value={this.activeData.autosize.minRows}
          min={1}
          onInput={this.__onValueInput('minRows', this.activeData.autosize)}
          placeholder='最小行数' />
      </el-form-item>
    );
  },
  // 最大行数
  maxRows(h) {
    return (
      <el-form-item label='最大行数'>
        <el-input-number
          value={this.activeData.autosize.maxRows}
          min={1}
          onInput={this.__onValueInput('maxRows', this.activeData.autosize)}
          placeholder='最大行数' />
      </el-form-item>
    );
  },
  // 输入统计
  'show-word-limit'(h) {
    return (
      <el-form-item label='输入统计'>
        <el-switch
          value={this.activeData['show-word-limit']}
          onInput={this.__onValueInput('show-word-limit')}/>
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
  // 开启提示
  'active-text'(h) {
    return (
      <el-form-item label='开启提示'>
        <el-input
          value={this.activeData['active-text']}
          onInput={this.__onValueInput('active-text')}
          placeholder='请输入开启提示' />
      </el-form-item>
    );
  },
  // 关闭提示
  'inactive-text'(h) {
    return (
      <el-form-item label='关闭提示'>
        <el-input
          value={this.activeData['inactive-text']}
          onInput={this.__onValueInput('inactive-text')}
          placeholder='请输入关闭提示' />
      </el-form-item>
    );
  },
  // 开启颜色
  'active-color'(h) {
    return (
      <el-form-item label='开启颜色'>
        <el-color-picker
          value={this.activeData['active-color']}
          onInput={this.__onValueInput('active-color')} />
      </el-form-item>
    );
  },
  // 关闭颜色
  'inactive-color'(h) {
    return (
      <el-form-item label='关闭颜色'>
        <el-color-picker
          value={this.activeData['inactive-color']}
          onInput={this.__onValueInput('inactive-color')} />
      </el-form-item>
    );
  },
  // 开启值
  'active-value'(h) {
    return (
      <el-form-item label='开启值'>
        <el-input
          value={this.__setDefaultValue(this.activeData['active-value'])}
          placeholder='请输入开启值'
          onInput={this.__onSwitchValueInput('active-value')}
        />
      </el-form-item>
    );
  },
  // 开启值
  'inactive-value'(h) {
    return (
      <el-form-item label='关闭值'>
        <el-input
          value={this.__setDefaultValue(this.activeData['inactive-value'])}
          placeholder='请输入关闭值'
          onInput={this.__onSwitchValueInput('inactive-value')}
        />
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
  size(key, value) {
    return function(h) {
      if (key && value && this.activeData.__config__?.[key] !== value) {
        return null;
      }
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
    };
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
  // 选项样式
  optionType(h) {
    return (
      <el-form-item label='选项样式'>
        <el-radio-group
          value={this.activeData.__config__.optionType}
          onInput={this.__onValueInput('optionType', this.activeData.__config__)}>
          { optionTypeList.map(item => (
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
  // 组件宽度
  componentWidth(h) {
    return (
      <el-form-item label='组件宽度'>
        <el-input
          value={this.activeData.style.width}
          onInput={this.__onValueInput('width', this.activeData.style)}
          placeholder='组件宽度' />
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
  // label宽度,form和基础组件共用
  labelWidth(key) {
    return function(h) {
      const target = key ? this.activeData[key] : this.activeData;
      return (
        <el-form-item label='标签宽度'>
          <el-input
            value={target.labelWidth}
            onInput={this.__onValueInput('labelWidth', target)}
            placeholder='标签宽度' />
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
  // 是否必填
  required(h) {
    return (
      <el-form-item label='是否必填'>
        <el-switch
          value={this.activeData.__config__.required}
          onInput={this.__onValueInput('required', this.activeData.__config__)}/>
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
  },
  // 行内
  formBtn(h) {
    return (
      <el-form-item label='表单按钮'>
        <el-switch
          value={this.activeData.formBtn}
          onInput={this.__onValueInput('formBtn')}/>
      </el-form-item>
    );
  },
  // 表单ref
  formRef(h) {
    return (
      <el-form-item label='表单ref'>
        <el-input
          value={this.activeData.formRef}
          onInput={this.__onValueInput('formRef')}
          placeholder='表单ref' />
      </el-form-item>
    );
  },
  // 表单model
  formModel(h) {
    return (
      <el-form-item label='表单model'>
        <el-input
          value={this.activeData.formModel}
          onInput={this.__onValueInput('formModel')}
          placeholder='绑定至model' />
      </el-form-item>
    );
  },
  // 表单规则
  formRules(h) {
    return (
      <el-form-item label='表单规则'>
        <el-input
          value={this.activeData.formRules}
          onInput={this.__onValueInput('formRules')}
          placeholder='绑定至rules' />
      </el-form-item>
    );
  },
  reg(h) {
    if (!Array.isArray(this.activeData.__config__.regList)) {
      return null;
    }
    return (
      <div>
        <el-divider>正则校验</el-divider>
        { this.activeData.__config__.regList.map((item, index) => (
          <div class='reg-item'>
            <span class='close-btn' onClick={() => {
              this.activeData.__config__.regList.splice(index, 1);
            }}>
              <i class='el-icon-close' />
            </span>
            <el-form-item label='表达式'>
              <el-input value={item.pattern} onInput={this.__onValueInput('pattern', item)} placeholder='请输入正则' />
            </el-form-item>
            <el-form-item label='错误提示' style='margin-bottom:0'>
              <el-input value={item.message} onInput={this.__onValueInput('message', item)} placeholder='请输入错误提示' />
            </el-form-item>
          </div>
        ))}
        <div style='margin-left: 20px'>
          <el-button icon='el-icon-circle-plus-outline' type='text' onClick={() => {
            this.activeData.__config__.regList.push({
              pattern: '',
              message: ''
            });
          }}>
          添加规则
          </el-button>
        </div>
      </div>
    );
  },
  // 标签对齐
  labelPosition(h) {
    return (
      <el-form-item label='标签对齐'>
        <el-radio-group
          value={this.activeData.labelPosition}
          onInput={this.__onValueInput('labelPosition')}>
          { positionList.map(item => (
            <el-radio-button label={ item.value }>
              { item.label }
            </el-radio-button>
          )) }
        </el-radio-group>
      </el-form-item>
    );
  },
  // 增加列
  addColumn(h) {
    return (
      <el-form-item label=''>
        <el-button
          size='small'
          type='primary'
          onClick={() => {
            this.activeData.children.push(deepClone({
              ...columnDefault,
              __config__: {
                ...columnDefault.__config__,
                id: generateId()
              }
            }));
          }}>增加一列</el-button>
      </el-form-item>
    );
  }
};

const renderMap = {
  'el-input': [panelRender.vModel, panelRender.placeholder, panelRender.defaultValue, panelRender.componentWidth, panelRender.prepend, panelRender.append, panelRender['prefix-icon'], panelRender['suffix-icon'], panelRender.maxlength, panelRender['show-word-limit'], panelRender.clearable, panelRender.disabled, panelRender.readonly],
  'el-input-textarea': [panelRender.vModel, panelRender.placeholder, panelRender.defaultValue, panelRender.componentWidth, panelRender.minRows, panelRender.maxRows, panelRender.maxlength, panelRender['show-word-limit'], panelRender.disabled, panelRender.readonly],
  'el-select': [panelRender.vModel, panelRender.placeholder, panelRender.defaultValue, panelRender.componentWidth, panelRender.clearable, panelRender.disabled, panelRender.filterable, panelRender.multiple, panelRender.options],
  'el-radio-group': [panelRender.vModel, panelRender.defaultValue, panelRender.options, panelRender.optionType, panelRender.size('optionType', 'button'), panelRender.border, panelRender.disabled],
  'el-checkbox-group': [panelRender.vModel, panelRender.defaultValue, panelRender.minLimit, panelRender.maxLimit, panelRender.options, panelRender.optionType, panelRender.size('optionType', 'button'), panelRender.disabled],
  'el-switch': [panelRender.vModel, panelRender.defaultValue, panelRender['active-text'], panelRender['inactive-text'], panelRender['active-value'], panelRender['inactive-value'], panelRender['active-color'], panelRender['inactive-color'], panelRender.disabled],
  'empty': [panelRender.componentWidth],
  'el-table': [panelRender.border, panelRender.stripe, panelRender.size(), panelRender.componentWidth, panelRender.addColumn],
  'el-form': [panelRender.formRef, panelRender.formModel, panelRender.formRules, panelRender.componentWidth, panelRender.labelWidth(), panelRender.labelPosition, panelRender.size(), panelRender.inline, panelRender.disabled, panelRender.formBtn],
  'el-table-column': [panelRender.prop, panelRender.label(), panelRender.width, panelRender['min-width'], panelRender.align, panelRender.fixed]
};

const formExtraRender = [panelRender.label('__config__'), panelRender.labelWidth('__config__'), panelRender.showLabel, panelRender.required, panelRender.reg];

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
  data: () => ({
    iconsVisible: false
  }),
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
    },

    __onSwitchValueInput(name) {
      return (val) => {
        if (['true', 'false'].indexOf(val) > -1) {
          this.$set(this.activeData, name, JSON.parse(val));
        } else {
          this.$set(this.activeData, name, isNumberStr(val) ? +val : val);
        }
      };
    },

    __openIconsDialog(model) {
      this.iconsVisible = true;
      this.currentIconModel = model;
    },

    __setIcon(val) {
      this.activeData[this.currentIconModel] = val;
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
        { this.activeData.__config__.showName }
        <el-form label-width='90px' size='small'>
          {
            (renderMap[this.activeData.__config__?.tag] || []).map(item => item.call(this, h))
          }
          <el-divider/>
          {
            extra
          }
        </el-form>
        <IconsDialog
          visible={this.iconsVisible}
          current={this.activeData[this.currentIconModel]}
          on={{ 'update:visible': (val) => { this.iconsVisible = val; }, select: this.__setIcon }}
        />
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

.reg-item{
  padding: 12px 6px;
  background: #f8f8f8;
  position: relative;
  border-radius: 4px;
  .close-btn{
    position: absolute;
    right: -6px;
    top: -6px;
    display: block;
    width: 16px;
    height: 16px;
    line-height: 16px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 50%;
    color: #fff;
    text-align: center;
    z-index: 1;
    cursor: pointer;
    font-size: 12px;
    &:hover{
      background: rgba(210, 23, 23, 0.5)
    }
  }
  & + .reg-item{
    margin-top: 18px;
  }
}
</style>
