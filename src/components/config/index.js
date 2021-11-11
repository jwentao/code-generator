export const containerItems = [ // 容器
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
      label: '表单',
      type: 'container',
      tag: 'el-form'
    },
    children: []
  },
  {
    __config__: {
      label: '表格',
      type: 'container',
      tag: 'el-table'
    },
    children: [],
    __vModel__: 'tableData'
  }
];

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
  }
};

export const baseItems = [
  baseItemMap.input
];

// demo
export const formItems = [
  {
    label: 'select'
    // __config__: baseItems.select.__config__
  }
];

export const columnDefault = {
  type: 'prop', // prop | customer
  prop: 'propName',
  __config__: {
    width: 100,
    'min-width': 100,
    align: 'left',
    fixed: undefined
  },
  children: [] // when type === customer
};

// demo
export const columnsItem = [
  {
    key: 'table-select',
    label: 'select'
    // __config__: baseItems.select.__config__
  }
];
