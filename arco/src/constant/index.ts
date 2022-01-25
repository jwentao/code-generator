import { BasicComponent } from '../types';

export const BaseComponents: BasicComponent[] = [
    {
        __config__: {
            tag: 'input',
            showName: '输入框',
            defaultValue: undefined
        },
        allowClear: true,
        disabled: false
    },
    {
        __config__: {
            tag: 'select',
            showName: '选择框',
            defaultValue: undefined
        },
        allowClear: true,
        disabled: false
    }
];
