export const containerItems = [ // 容器
  {
    label: '空容器',
    type: 'container',
    key: 'empty',
    children: []
  },
  {
    label: '表单',
    type: 'container',
    key: 'form',
    children: []
  },
  {
    label: '表格',
    type: 'container',
    key: 'table',
    children: [],
    __vModel__: 'tableData',
    __config__: {
      border: false
    }
  }
];

const baseItemMap = {
  input: {
    tag: 'el-input',
    tagIcon: 'input',
    document: 'https://element.eleme.cn/#/zh-CN/component/input',
    label: '单行文本',
    __vModel__: 'input',
    // 组件的自定义配置
    __config__: { // 这里放可以直接写入的属性
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
    // 组件的插槽属性
    __slot__: {
      prepend: '',
      append: ''
    }
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
