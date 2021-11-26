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
      type: 'base', // 组件类型，基础组件base不可嵌套，container组件可嵌套
      showName: '单行文本', // 左右panel显示的名称，如果嵌套进form组件中，form-item的label会从这里取值
      tag: 'el-input', // 实际渲染的标签
      tagIcon: 'input',
      defaultValue: undefined, // 默认值
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
    // 其余的为可直接写在组件标签上的属性，参考element文档
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
  },

  slider: {
    __config__: {
      type: 'base',
      showName: '滑块',
      tag: 'el-slider',
      tagIcon: 'slider',
      defaultValue: null,
      document: 'https://element.eleme.cn/#/zh-CN/component/slider',
      wrapStyle: {
        display: 'block'
      }
    },
    disabled: false,
    min: 0,
    max: 100,
    step: 1,
    'show-stops': false,
    range: false
  },

  rate: {
    __config__: {
      type: 'base',
      showName: '评分',
      tag: 'el-rate',
      tagIcon: 'rate',
      defaultValue: 0,
      document: 'https://element.eleme.cn/#/zh-CN/component/rate',
      wrapStyle: {
        display: 'inline-block'
      }
    },
    style: {},
    max: 5,
    'allow-half': false,
    'show-text': false,
    'show-score': false,
    disabled: false
  },

  'color-picker': {
    __config__: {
      type: 'base',
      showName: '颜色选择',
      tag: 'el-color-picker',
      tagIcon: 'color',
      defaultValue: null,
      document: 'https://element.eleme.cn/#/zh-CN/component/color-picker',
      wrapStyle: {
        display: 'inline-block'
      }
    },
    'show-alpha': false,
    'color-format': '',
    disabled: false,
    size: 'medium'
  },

  'time-picker': {
    __config__: {
      type: 'base',
      showName: '时间选择',
      tag: 'el-time-picker',
      tagIcon: 'time',
      defaultValue: null,
      document: 'https://element.eleme.cn/#/zh-CN/component/time-picker',
      wrapStyle: {
        display: 'inline-block'
      }
    },
    placeholder: '请选择',
    style: { width: '100%' },
    disabled: false,
    clearable: true,
    'picker-options': {
      selectableRange: '00:00:00-23:59:59'
    },
    format: 'HH:mm:ss',
    'value-format': 'HH:mm:ss'
  },

  'time-picker-range': {
    __config__: {
      type: 'base',
      showName: '时间范围',
      tag: 'el-time-picker',
      key: 'el-time-picker-range',
      tagIcon: 'time-range',
      defaultValue: null,
      document: 'https://element.eleme.cn/#/zh-CN/component/time-picker',
      wrapStyle: {
        display: 'inline-block'
      }
    },
    style: { width: '100%' },
    disabled: false,
    clearable: true,
    'is-range': true,
    'range-separator': '至',
    'start-placeholder': '开始时间',
    'end-placeholder': '结束时间',
    format: 'HH:mm:ss',
    'value-format': 'HH:mm:ss'
  },
  'date-picker': {
    __config__: {
      type: 'base',
      showName: '日期选择',
      tag: 'el-date-picker',
      tagIcon: 'date',
      defaultValue: null,
      document: 'https://element.eleme.cn/#/zh-CN/component/date-picker',
      wrapStyle: {
        display: 'inline-block'
      }
    },
    placeholder: '请选择',
    type: 'date',
    style: { width: '100%' },
    disabled: false,
    clearable: true,
    format: 'yyyy-MM-dd',
    'value-format': 'yyyy-MM-dd',
    readonly: false
  },
  'date-picker-range': {
    __config__: {
      type: 'base',
      showName: '日期范围',
      tag: 'el-date-picker',
      key: 'el-date-picker-range',
      tagIcon: 'date-range',
      defaultValue: null,
      document: 'https://element.eleme.cn/#/zh-CN/component/date-picker',
      wrapStyle: {
        display: 'inline-block'
      }
    },
    style: { width: '100%' },
    type: 'daterange',
    'range-separator': '至',
    'start-placeholder': '开始日期',
    'end-placeholder': '结束日期',
    disabled: false,
    clearable: true,
    format: 'yyyy-MM-dd',
    'value-format': 'yyyy-MM-dd',
    readonly: false
  },
  upload: {
    __config__: {
      type: 'base',
      showName: '上传',
      tag: 'el-upload',
      tagIcon: 'upload',
      defaultValue: null,
      buttonText: '点击上传',
      fileSize: 2,
      sizeUnit: 'MB',
      showTip: false,
      document: 'https://element.eleme.cn/#/zh-CN/component/upload',
      wrapStyle: {
        display: 'inline-block'
      }
    },
    __slot__: {
      'list-type': true
    },
    action: 'https://jsonplaceholder.typicode.com/posts/',
    disabled: false,
    accept: '',
    name: 'file',
    'auto-upload': true,
    'list-type': 'text',
    multiple: false
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
  baseItemMap.switch,
  baseItemMap.slider,
  baseItemMap.rate,
  baseItemMap['color-picker'],
  baseItemMap['time-picker'],
  baseItemMap['time-picker-range'],
  baseItemMap['date-picker'],
  baseItemMap['date-picker-range'],
  baseItemMap.upload
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
