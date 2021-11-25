<script>
import { isNumberStr } from '@/utils';
import IconsDialog from '@/components/IconsDialog';
import panelRender, { dateTimeFormat } from './config/rightPannel';
import emitter from '@/mixins/emitter';

const renderMap = {
  'el-input': [panelRender.vModel, panelRender.placeholder, panelRender.defaultValue, panelRender.componentWidth, panelRender.prepend, panelRender.append, panelRender['prefix-icon'], panelRender['suffix-icon'], panelRender.maxlength, panelRender['show-word-limit'], panelRender.clearable, panelRender.disabled, panelRender.readonly],
  'el-input-textarea': [panelRender.vModel, panelRender.placeholder, panelRender.defaultValue, panelRender.componentWidth, panelRender.minRows, panelRender.maxRows, panelRender.maxlength, panelRender['show-word-limit'], panelRender.disabled, panelRender.readonly],
  'el-input-number': [panelRender.vModel, panelRender.placeholder, panelRender.defaultValue, panelRender.min, panelRender.max, panelRender.step, panelRender.precision, panelRender['controls-position'], panelRender['step-strictly'], panelRender.disabled],
  'el-select': [panelRender.vModel, panelRender.placeholder, panelRender.defaultValue, panelRender.componentWidth, panelRender.clearable, panelRender.disabled, panelRender.filterable, panelRender.multiple, panelRender.options],
  'el-radio-group': [panelRender.vModel, panelRender.defaultValue, panelRender.options, panelRender.optionType, panelRender.size('optionType', 'button'), panelRender.border, panelRender.disabled],
  'el-checkbox-group': [panelRender.vModel, panelRender.defaultValue, panelRender.minLimit, panelRender.maxLimit, panelRender.options, panelRender.optionType, panelRender.size('optionType', 'button'), panelRender.disabled],
  'el-switch': [panelRender.vModel, panelRender.defaultValue, panelRender['active-text'], panelRender['inactive-text'], panelRender['active-value'], panelRender['inactive-value'], panelRender['active-color'], panelRender['inactive-color'], panelRender.disabled],
  'el-slider': [panelRender.vModel, panelRender.defaultValue, panelRender.min, panelRender.max, panelRender.step, panelRender['show-stops'], panelRender.range, panelRender.disabled],
  'el-rate': [panelRender.vModel, panelRender.defaultValue, panelRender.max, panelRender['allow-half'], panelRender['show-text'], panelRender['show-score'], panelRender.disabled],
  'el-color-picker': [panelRender.vModel, panelRender.defaultValue, panelRender['color-format'], panelRender.size(), panelRender.disabled],
  'el-time-picker': [panelRender.vModel, panelRender.placeholder, panelRender.defaultValue, panelRender.componentWidth, panelRender.selectableRange, panelRender.timeFormat, panelRender.clearable, panelRender.disabled],
  'el-time-picker-range': [panelRender.vModel, panelRender['start-placeholder'], panelRender['end-placeholder'], panelRender.defaultValue, panelRender.componentWidth, panelRender['range-separator'], panelRender.timeFormat, panelRender.clearable, panelRender.disabled],
  'el-date-picker': [panelRender.vModel, panelRender.placeholder, panelRender.defaultValue, panelRender.componentWidth, panelRender.dateType('date'), panelRender.timeFormat, panelRender.clearable, panelRender.readonly, panelRender.disabled],
  'el-date-picker-range': [panelRender.vModel, panelRender['start-placeholder'], panelRender['end-placeholder'], panelRender.defaultValue, panelRender.componentWidth, panelRender.dateType('deterange'), panelRender['range-separator'], panelRender.timeFormat, panelRender.clearable, panelRender.readonly, panelRender.disabled],

  'el-upload': [panelRender.vModel, panelRender.defaultValue, panelRender.fileName, panelRender.fileAccept, panelRender.fileSize, panelRender.fileAction, panelRender.fileList, panelRender.fileButtonText, panelRender.fileShowTip, panelRender.fileMultiple, panelRender.autoUpload, panelRender.disabled],

  'empty': [panelRender.componentWidth],
  'el-table': [panelRender.border, panelRender.stripe, panelRender.size(), panelRender.componentWidth, panelRender.addColumn],
  'el-form': [panelRender.formRef, panelRender.formModel, panelRender.formRules, panelRender.componentWidth, panelRender.labelWidth(), panelRender.labelPosition, panelRender.size(), panelRender.inline, panelRender.disabled, panelRender.formBtn],
  'el-table-column': [panelRender.prop, panelRender.label(), panelRender.width, panelRender['min-width'], panelRender.align, panelRender.fixed]
};

const formExtraRender = [panelRender.label('__config__'), panelRender.labelWidth('__config__'), panelRender.showLabel, panelRender.required, panelRender.reg];

export default {
  name: 'RightPanel',
  mixins: [emitter],
  props: {
    activeData: {
      type: Object,
      default: () => ({
        __config__: {}
      })
    },

    allConfig: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    iconsVisible: false
  }),
  watch: {},
  methods: {
    __onValueInput(key, target) {
      return (val) => {
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
    },

    __setTimeValue(val, type) {
      const valueFormat = type === 'week' ? dateTimeFormat.date : val;
      this.$set(this.activeData.__config__, 'defaultValue', null);
      this.$set(this.activeData, 'value-format', valueFormat);
      this.$set(this.activeData, 'format', val);
    }
  },
  render(h) {
    if (!this.activeData || !this.activeData.__config__) {
      return (<div/>);
    }
    let extra = <div/>;
    if (this.activeData.__config__.parent) {
      extra = (<div>
        <el-divider/>
        { formExtraRender.map(item => item.call(this, h)) }
      </div>);
    }
    // const slots = {
    //   default: props => {
    //     const { node, data } = props;
    //     return (
    //       <span class='node-label'>
    //         <svg-icon class='node-icon' icon-class={data.__config__ ? data.__config__.tagIcon : data.tagIcon} />
    //         { node.label }
    //       </span>
    //     );
    //   },
    //   props: {
    //     label(data, node) {
    //       const config = data.__config__;
    //       return data.componentName || `${config.showName}: ${data.__vModel__}`;
    //     }
    //   }
    // };
    return (
      <div>
        { this.activeData.__config__.showName }
        <el-form label-width='90px' size='small'>
          {
            (renderMap[this.activeData.__config__?.key || this.activeData.__config__?.tag] || []).map(item => item.call(this, h))
          }
          {
            extra
          }
        </el-form>
        <el-divider>布局树</el-divider>
        {
          <el-tree
            data={this.allConfig}
            render-content={(h, { data }) => {
              return (
                <span class='node-label' onClick={() => {
                  this.dispatch('Home', 'active', data);
                }}>
                  <svg-icon icon-class={data.__config__?.tagIcon || data.tagIcon || ''} />
                  <span>{ data.__config__.showName }</span>
                </span>
              );
            }}
          >
          </el-tree>
        }
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
