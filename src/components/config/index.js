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
    children: []
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

// demo
export const columnsItem = [
  {
    label: 'select',
    __config__: baseItems.select.__config__
  }
];
