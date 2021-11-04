export const layoutItems = [
  {
    label: '行容器'
  },
  {
    label: '表单',
    type: 'form'
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
