import React, { useState } from 'react';
import { LeftPanel } from '../components/LeftPanel';
import { Header } from '../components/Header';
import { Board } from "../components/Board";
import { RightPanel } from "../components/RightPanel";
import styled from "@emotion/styled";
import {ConfigItem} from "../types";

export const Index = () => {
    const [activeData, setActiveData] = useState<ConfigItem | {}>({});
    const setLActiveData = (oldData: object, newData: object): void => {
        setActiveData(newData);
    }

    const [list, setList] = useState<ConfigItem[]>([]);

    return (
        <div>
            <Header></Header>
            <Container>
                <LeftPanel></LeftPanel>
                <Board setActiveData={setLActiveData} list={list} setList={setList}></Board>
                <RightPanel activeData={activeData} setActiveData={setLActiveData}></RightPanel>
            </Container>
        </div>
    )
}

const Container = styled.div`
    display: flex;
  height: calc(100vh - 50px);
`;
