import { deepClone, generateId } from '@/utils';
import { columnDefault } from '@/components/config/index';

const sizeList = [{ label: '中等', value: 'medium' }, { label: '小', value: 'small' }, { label: '迷你', value: 'mini' }];
const alignList = [{ label: '左', value: 'left' }, { label: '中', value: 'center' }, { label: '右', value: 'right' }];
const positionList = [{ label: '左对齐', value: 'left' }, { label: '顶部对齐', value: 'top' }, { label: '右对齐', value: 'right' }];
const fixedList = [{ label: '左', value: 'left' }, { label: '右', value: 'right' }, { label: '不固定', value: false }];
const optionTypeList = [{ label: '默认', value: 'default' }, { label: '按钮', value: 'button' }];
const numberBtnLocList = [{ label: '默认', value: '' }, { label: '右侧', value: 'right' }];
const colorFormatOptions = [{ label: 'hex', value: 'hex' }, { label: 'rgb', value: 'rgb' }, { label: 'rgba', value: 'rgba' }, { label: 'hsv', value: 'hsv' }, { label: 'hsl', value: 'hsl' }];

export const dateTimeFormat = {
  date: 'yyyy-MM-dd',
  week: 'yyyy 第 WW 周',
  month: 'yyyy-MM',
  year: 'yyyy',
  datetime: 'yyyy-MM-dd HH:mm:ss',
  daterange: 'yyyy-MM-dd',
  monthrange: 'yyyy-MM',
  datetimerange: 'yyyy-MM-dd HH:mm:ss'
};

export default {
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
  // 显示间断点
  'show-stops'(h) {
    return (
      <el-form-item label='显示间断点'>
        <el-switch
          value={this.activeData['show-stops']}
          onInput={this.__onValueInput('show-stops')}/>
      </el-form-item>
    );
  },
  // 范围选择
  range(h) {
    return (
      <el-form-item label='范围选择'>
        <el-switch
          value={this.activeData.range}
          onInput={(val) => {
            this.__onValueInput('range')(val);
            this.$set(
              this.activeData.__config__,
              'defaultValue',
              val ? [this.activeData.min, this.activeData.max] : this.activeData.min
            );
          }}/>
      </el-form-item>
    );
  },
  // 允许半选
  'allow-half'(h) {
    return (
      <el-form-item label='允许半选'>
        <el-switch
          value={this.activeData['allow-half']}
          onInput={this.__onValueInput('allow-half')}/>
      </el-form-item>
    );
  },
  // 辅助文字
  'show-text'(h) {
    return (
      <el-form-item label='辅助文字'>
        <el-switch
          value={this.activeData['show-text']}
          onInput={this.__onValueInput('show-text')}/>
      </el-form-item>
    );
  },
  // 显示分数
  'show-score'(h) {
    return (
      <el-form-item label='显示分数'>
        <el-switch
          value={this.activeData['show-score']}
          onInput={this.__onValueInput('show-score')}/>
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
  // 最小值
  min(h) {
    return (
      <el-form-item label='最小值'>
        <el-input-number
          value={this.activeData.min}
          onInput={this.__onValueInput('min')}
          placeholder='最小值' />
      </el-form-item>
    );
  },
  // 最大值
  max(h) {
    return (
      <el-form-item label='最大值'>
        <el-input-number
          value={this.activeData.max}
          onInput={this.__onValueInput('max')}
          placeholder='最大值' />
      </el-form-item>
    );
  },
  // 步长
  step(h) {
    return (
      <el-form-item label='步长'>
        <el-input-number
          value={this.activeData.step}
          onInput={this.__onValueInput('step')}
          placeholder='步长' />
      </el-form-item>
    );
  },
  // 精度
  precision(h) {
    return (
      <el-form-item label='精度'>
        <el-input-number
          value={this.activeData.precision}
          min={0}
          onInput={this.__onValueInput('precision')}
          placeholder='精度' />
      </el-form-item>
    );
  },
  // 严格步数
  'step-strictly'(h) {
    return (
      <el-form-item label='严格步数'>
        <el-switch
          value={this.activeData['step-strictly']}
          onInput={this.__onValueInput('step-strictly')}/>
      </el-form-item>
    );
  },
  // 按钮位置
  'controls-position'(h) {
    return (
      <el-form-item label='按钮位置'>
        <el-radio-group
          value={this.activeData['controls-position']}
          onInput={this.__onValueInput('controls-position')}>
          { numberBtnLocList.map(item => (
            <el-radio-button label={ item.value }>
              { item.label }
            </el-radio-button>
          )) }
        </el-radio-group>
      </el-form-item>
    );
  },
  // 颜色格式
  'color-format'(h) {
    return (
      <el-form-item label='颜色格式'>
        <el-select
          value={this.activeData['color-format']}
          onInput={(val) => {
            this.__onValueInput('color-format')(val);
            this.activeData.__config__.defaultValue = null;
            this.activeData['show-alpha'] = val.indexOf('a') > -1;
            this.activeData.__config__.renderKey = +new Date(); // 更新renderKey,重新渲染该组件
          }}>
          { colorFormatOptions.map(item => (
            <el-option label={ item.label } value={ item.value } />
          )) }
        </el-select>
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
  // 时间段
  selectableRange(h) {
    return (
      <el-form-item label='时间段'>
        <el-input
          value={this.activeData['picker-options'].selectableRange}
          onInput={this.__onValueInput('selectableRange', this.activeData['picker-options'])}
          placeholder='请输入时间段' />
      </el-form-item>
    );
  },
  // 时间格式
  timeFormat(h) {
    return (
      <el-form-item label='时间格式'>
        <el-input
          value={this.activeData.format}
          onInput={this.__setTimeValue}
          placeholder='请输入时间格式' />
      </el-form-item>
    );
  },
  // 开始占位符(时间范围组件)
  'start-placeholder'(h) {
    return (
      <el-form-item label='开始占位符'>
        <el-input
          value={this.activeData['start-placeholder']}
          onInput={this.__onValueInput('start-placeholder')}
          placeholder='开始占位符' />
      </el-form-item>
    );
  },
  // 时间组件分隔符
  'range-separator'(h) {
    return (
      <el-form-item label='分隔符'>
        <el-input
          value={this.activeData['range-separator']}
          onInput={this.__onValueInput('range-separator')}
          placeholder='分隔符' />
      </el-form-item>
    );
  },
  // 开始占位符(时间范围组件)
  'end-placeholder'(h) {
    return (
      <el-form-item label='结束占位符'>
        <el-input
          value={this.activeData['end-placeholder']}
          onInput={this.__onValueInput('end-placeholder')}
          placeholder='结束占位符' />
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
      if (key && value && this.activeData.__config__?.[key] !== value) { // 根据条件控制隐藏
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
