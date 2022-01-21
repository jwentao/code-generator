import React, { ReactNode }  from 'react';
import styled from "@emotion/styled";
import { Input, Select } from '@arco-design/web-react';
const Option = Select.Option;

interface RenderProps {
    label: string,
    __config__: {
        tag: string
    }
}

export const ComponentRender = (props: RenderProps) => {
    const { label } = props;

    const renderFunction = (): ReactNode => {
        console.log(props.__config__.tag);
        return (renderMap[props.__config__.tag] as () => {})();
    }

    const renderMap: { [key: string]: ReactNode} = {
        'input': () => {
            return <Input></Input>
        },
        'select': () => {
            return <Select>
                <Option value={123}>123</Option>
            </Select>
        }
    }


    return (
        <Container>
            <OpWrap>
                <DragBtn className='drag-btn'/>
            </OpWrap>
            { renderFunction() }
        </Container>
    );
}

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
