// 容器
export const containerItems = [
  {
    __config__: {
      label: '空容器',
      type: 'container',
      tag: 'empty'
    },
    children: []
  },
  {
    __config__: {
      label: '表单(todo)',
      type: 'container',
      tag: 'el-form'
    },
    children: []
  },
  {
    __config__: {
      label: '表格',
      type: 'container',
      tag: 'el-table',
      ref: 'table',
      tableData: 'tableData'
    },
    children: [],
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
      label: '单行文本',
      changeTag: true,
      tag: 'el-input',
      tagIcon: 'input',
      defaultValue: undefined,
      document: 'https://element.eleme.cn/#/zh-CN/component/input'
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

  select: {
    __config__: {
      type: 'base',
      label: '下拉选择',
      tag: 'el-select',
      tagIcon: 'select',
      document: 'https://element.eleme.cn/#/zh-CN/component/select'
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
  }
};

// 普通组件
export const baseItems = [
  baseItemMap.input,
  baseItemMap.select
];

// demo 可用于form-item
export const formItems = [
  {
    label: 'select'
    // __config__: baseItems.select.__config__
  }
];

// table column默认配置
export const columnDefault = {
  __config__: {
    label: '表-列',
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
