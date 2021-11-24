// 容器
export const containerItems = [
  {
    __config__: {
      showName: '空容器',
      type: 'container',
      tag: 'empty',
      wrapStyle: {
        display: 'block' // 仅用于面板render
      }
    },
    style: { width: '100%' },
    children: []
  },
  {
    __config__: {
      showName: '表单',
      type: 'container',
      tag: 'el-form',
      wrapStyle: {
        display: 'block'
      }
    },
    formRef: 'elForm',
    formModel: 'formData',
    style: { width: '100%' },
    size: 'medium',
    labelPosition: 'right',
    labelWidth: 100,
    formRules: 'rules',
    disabled: false,
    inline: false,
    formBtn: true,
    children: []
  },
  {
    __config__: {
      showName: '表格',
      type: 'container',
      tag: 'el-table',
      ref: 'table',
      tableData: 'tableData',
      wrapStyle: {
        display: 'block'
      }
    },
    children: [],
    style: { width: '100%' },
    __vModel__: 'tableData',
    stripe: false,
    border: true,
    size: 'medium'
  }
];

// 基础组件map
const baseItemMap = {
  input: {
    // 组件的自定义配置
    __config__: {
      type: 'base',
      showName: '单行文本',
      changeTag: true,
      tag: 'el-input',
      tagIcon: 'input',
      defaultValue: undefined,
      document: 'https://element.eleme.cn/#/zh-CN/component/input',
      wrapStyle: {
        display: 'inline-block'
      }
    },
    // 组件的插槽属性
    __slot__: {
      prepend: '',
      append: ''
    },
    // 其余的为可直接写在组件标签上的属性
    placeholder: '请输入',
    style: { width: '100%' },
    clearable: true,
    'prefix-icon': '',
    'suffix-icon': '',
    maxlength: null,
    'show-word-limit': false,
    readonly: false,
    disabled: false
  },

  'input-textarea': {
    __config__: {
      type: 'base',
      showName: '多行文本',
      tag: 'el-input-textarea', // 实际渲染的是el-input
      tagIcon: 'textarea',
      defaultValue: undefined,
      document: 'https://element.eleme.cn/#/zh-CN/component/input',
      wrapStyle: {
        display: 'inline-block'
      }
    },
    type: 'textarea',
    placeholder: '请输入',
    autosize: {
      minRows: 4,
      maxRows: 4
    },
    style: { width: '100%' },
    maxlength: null,
    'show-word-limit': false,
    readonly: false,
    disabled: false
  },

  'input-number': {
    __config__: {
      type: 'base',
      showName: '计数器',
      tag: 'el-input-number',
      tagIcon: 'number',
      defaultValue: undefined,
      document: 'https://element.eleme.cn/#/zh-CN/component/input-number',
      wrapStyle: {
        display: 'inline-block'
      }
    },
    placeholder: '',
    min: undefined,
    max: undefined,
    step: 1,
    'step-strictly': false,
    precision: undefined,
    'controls-position': '',
    disabled: false
  },

  select: {
    __config__: {
      type: 'base',
      showName: '下拉选择',
      tag: 'el-select',
      tagIcon: 'select',
      document: 'https://element.eleme.cn/#/zh-CN/component/select',
      wrapStyle: {
        display: 'inline-block'
      }
    },
    __slot__: {
      options: [{
        label: '选项一',
        value: 1
      }, {
        label: '选项二',
        value: 2
      }]
    },
    placeholder: '请选择',
    style: { width: '100%' },
    clearable: true,
    disabled: false,
    filterable: false,
    multiple: false
  },

  'radio-group': {
    __config__: {
      type: 'base',
      showName: '单选框组',
      labelWidth: null,
      tag: 'el-radio-group',
      tagIcon: 'radio',
      defaultValue: undefined,
      optionType: 'default',
      required: true,
      border: false,
      document: 'https://element.eleme.cn/#/zh-CN/component/radio',
      wrapStyle: {
        display: 'inline-block'
      }
    },
    __slot__: {
      options: [{
        label: '选项一',
        value: 1
      }, {
        label: '选项二',
        value: 2
      }]
    },
    size: 'medium',
    disabled: false
  },
  'checkbox-group': {
    __config__: {
      type: 'base',
      showName: '多选框组',
      tag: 'el-checkbox-group',
      tagIcon: 'checkbox',
      defaultValue: [],
      optionType: 'default',
      changeTag: true,
      border: false,
      document: 'https://element.eleme.cn/#/zh-CN/component/checkbox',
      wrapStyle: {
        display: 'block'
      }
    },
    __slot__: {
      options: [{
        label: '选项一',
        value: 1
      }, {
        label: '选项二',
        value: 2
      }]
    },
    style: {},
    size: 'medium',
    min: null,
    max: null,
    disabled: false
  },
  switch: {
    __config__: {
      type: 'base',
      showName: '开关',
      tag: 'el-switch',
      tagIcon: 'switch',
      defaultValue: false,
      document: 'https://element.eleme.cn/#/zh-CN/component/switch',
      wrapStyle: {
        display: 'inline-block'
      }
    },
    style: {},
    disabled: false,
    'active-text': '',
    'inactive-text': '',
    'active-color': null,
    'inactive-color': null,
    'active-value': true,
    'inactive-value': false
  }
};

// 普通组件
export const baseItems = [
  baseItemMap.input,
  baseItemMap['input-textarea'],
  baseItemMap['input-number'],
  baseItemMap.select,
  baseItemMap['radio-group'],
  baseItemMap['checkbox-group'],
  baseItemMap.switch
];

export const formExtraConfig = {
  parent: 'el-form', // 区分是form的子组件
  showLabel: true,
  labelWidth: 100,
  required: true,
  regList: []
};

// demo 可用于form-item
// 暂无用处，使用拖拽到目标位置后动态添加__config__
export const formItems = [
  {
    ...baseItemMap.input,
    __config__: {
      ...baseItemMap.input.__config__
    }
  }
];

// table column默认配置
export const columnDefault = {
  __config__: {
    showName: '表-列',
    tag: 'el-table-column',
    type: 'prop' // prop | customer
  },
  prop: 'propName',
  label: 'label',
  width: 100,
  'min-width': 100,
  align: 'left',
  fixed: false,
  children: [] // when type === customer
};

//
export const columnsItem = [
  {
    key: 'table-select',
    label: 'select'
    // __config__: baseItems.select.__config__
  }
];
