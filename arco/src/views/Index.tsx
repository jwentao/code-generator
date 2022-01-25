import React, { useState } from 'react';
import { LeftPanel } from '../components/LeftPanel';
import { Header } from '../components/Header';
import { Board } from "../components/Board";
import { RightPanel } from "../components/RightPanel";
import styled from "@emotion/styled";
import {ConfigItem} from "../types";

export const Index = () => {
    const [activeData, setActiveData] = useState<ConfigItem | {}>({});
    const setLActiveData = (data: object): void => {
        setActiveData(data);
        console.log(data);
    }
    return (
        <div>
            <Header></Header>
            <Container>
                <LeftPanel></LeftPanel>
                <Board setActiveData={setLActiveData}></Board>
                <RightPanel activeData={activeData} setActiveData={setLActiveData}></RightPanel>
            </Container>
        </div>
    )
}

const Container = styled.div`
    display: flex;
  height: calc(100vh - 50px);
`;
