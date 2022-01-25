export interface BasicComponent {
    __config__: {
        tag: string,
        showName: string,
        defaultValue: string | number | boolean | undefined | null
    },

    allowClear?: boolean | undefined,
    disabled?: boolean | undefined
}

export interface ConfigItem extends BasicComponent {
    id: string
}
