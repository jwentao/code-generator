import React, { useState, useEffect } from 'react';
import styled from "@emotion/styled";
import { ConfigItem } from "../types";
import { ReactSortable } from "react-sortablejs";
import { ComponentRender } from "./ComponentRender";

interface BoardProps {
    list: ConfigItem[],
    setList: (data: any) => any,
    setActiveData: (oldData: object, newData: object) => void
}


export const Board = (props: BoardProps) => {

    const { list, setList, setActiveData } = props;

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
                    list.map(item => (<ComponentRender
                        setActiveData={setActiveData}
                        key={item.id} {...item} />))
                }
            </ReactSortable>
        </Container>
    );
}

// Board.whyDidYouRender = true;


const Container = styled.div`
  flex: 1;
  border-left: 1px solid gray;
`;
