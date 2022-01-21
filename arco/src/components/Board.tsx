import React, { useState, useEffect } from 'react';
import styled from "@emotion/styled";
import { ReactSortable } from "react-sortablejs";
import { ComponentRender } from "./ComponentRender";

interface BoardProps {
    setActiveData: (data: object) => void
}


export const Board = (props: BoardProps) => {
    const [list, setList] = useState<{label: string, id: number, __config__: {tag: string }}[]>([]);

    const { setActiveData } = props;
    setActiveData({test: 1});

    useEffect(() => {
        console.log(list);
    }, [list])
    return (
        <Container>
            <ReactSortable
                group={{name: 'baseComponent'}}
                list={list}
                handle='.drag-btn'
                setList={setList}
            >
                {
                    list.map(item => (<ComponentRender key={item.id} {...item} />))
                }
            </ReactSortable>
        </Container>
    );
}

const Container = styled.div`
  flex: 1;
  border-left: 1px solid gray;
`;
