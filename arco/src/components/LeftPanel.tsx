import React, { useState } from 'react';
import styled from "@emotion/styled";
import { ReactSortable } from "react-sortablejs";
import { BaseComponents } from '../constant';
import { ComponentCard } from "./ComponentCard";
import { css } from '@emotion/css';
import { BasicComponent } from '../types';

export const LeftPanel = () => {
    const [baseList, setBaseList] = useState(BaseComponents);

    const cloneComponent = (val: any) => {
      console.log(val);
      return {
          ...val,
          id: Math.random()
      }
    }

    return (
        <Container>
            <ComponentBlock>
                <ReactSortable
                    group={{name: 'baseComponent', pull: 'clone', put: false }}
                    sort={false}
                    className={css`
                      display: flex;  
                    `}
                    clone={cloneComponent}
                    setList={setBaseList}
                    list={baseList}>
                    {
                        BaseComponents.map(item => (<ComponentCard
                            key={item.__config__.tag}
                            label={item.label} />))
                    }
                </ReactSortable>
            </ComponentBlock>
        </Container>
    );
}

const Container = styled.div`
  width: 280px;
  padding: 4px;
  flex: 0 0 280px;
`;

const ComponentBlock = styled.div`
    overflow: hidden;
`;
