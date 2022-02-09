import React, { useState } from 'react';
import styled from "@emotion/styled";
import { ReactSortable } from "react-sortablejs";
import { BaseComponents } from '../constant';
import { ComponentCard } from "./ComponentCard";
import { css } from '@emotion/css';
import { BasicComponent, ConfigItem } from '../types';
import { generateId, deepClone } from '../utils';

export const LeftPanel = () => {
    const [baseList, setBaseList] = useState(BaseComponents.map(item => ({
        ...item,
        id: item.__config__.tag // react-sortable要求有id
    })));

    const cloneComponent = (val: BasicComponent) => {
      const cloneComponent = {
          ...deepClone(val),
          id: generateId()
      };
      console.log(cloneComponent);
      return cloneComponent
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
                            label={item.__config__.showName} />))
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
