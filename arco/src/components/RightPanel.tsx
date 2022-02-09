import React from 'react';
import styled from "@emotion/styled";
import { ConfigItem } from "../types";
import { Form, Select, Switch } from '@arco-design/web-react';
const FormItem = Form.Item;
const Option = Select.Option;

interface RightPanelProps {
    activeData: ConfigItem | {},
    setActiveData: (oldData: object, newData: object) => void
}

export const RightPanel = (props: RightPanelProps) => {
    const { activeData, setActiveData } = props;
    return (
        <Container>
            <Form>
                { AllowClearRender(activeData, setActiveData) }
            </Form>
        </Container>
    );
}

const AllowClearRender = (data: Pick<ConfigItem, 'allowClear'>, setActiveData: (data: object) => void) => {
    return (
        <FormItem label='允许清除'>
            <Switch
                checked={data.allowClear}
                onChange={(allowClear) => {
                    setActiveData(data, {
                        ...data,
                        allowClear
                    })
                }}/>
        </FormItem>
    );
}

const renderMap = {
    'input': [AllowClearRender],
    'select': []
};

const Container = styled.div`
  flex: 0 0 300px;
`;
