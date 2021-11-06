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

const baseItems = {
  select: {
    __config__: { // 可以直接写入element components的

    }
  }
};

// demo
export const formItems = [
  {
    label: 'select',
    __config__: baseItems.select.__config__
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
    label: 'select',
    __config__: baseItems.select.__config__
  }
];
