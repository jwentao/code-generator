import React, { ReactNode }  from 'react';
import styled from "@emotion/styled";
import { ConfigItem } from '../types';
import { Input, Select } from '@arco-design/web-react';
const Option = Select.Option;

interface RenderProps extends ConfigItem {
    setActiveData: (oldData: object, newData: object) => void
}

export const ComponentRender = (props: RenderProps) => {
    const { setActiveData } = props;

    const renderFunction = (): ReactNode => {
        return (renderMap[props.__config__.tag] as () => {})();
    }

    const renderMap: { [key: string]: ReactNode} = {
        'input': () => {
            return <Input
                allowClear={props.allowClear}
                disabled={props.disabled}
            ></Input>
        },
        'select': () => {
            return <Select>
                <Option value={123}>123</Option>
            </Select>
        }
    }


    return (
        <Container onClick={() => { setActiveData(props, props) }}>
            <OpWrap>
                <DragBtn className='drag-btn'/>
            </OpWrap>
            { renderFunction() }
        </Container>
    );
}

ComponentRender.whyDidYouRender = true;

const Container = styled.div`
  position: relative;
`;

const OpWrap = styled.div`
  position: absolute;
  right: 0;
  top: -20px;
  display: flex;
  height: 20px;
`;

const DragBtn = styled.span`
  background-color: red;
  width: 20px;
`;
