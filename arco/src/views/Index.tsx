import React from 'react';
import { LeftPanel } from '../components/LeftPanel';
import { Header } from '../components/Header';
import { Board } from "../components/Board";
import { RightPanel } from "../components/RightPanel";
import styled from "@emotion/styled";

export const Index = () => {
    return (
        <div>
            <Header></Header>
            <Container>
                <LeftPanel></LeftPanel>
                <Board></Board>
                <RightPanel></RightPanel>
            </Container>
        </div>
    )
}

const Container = styled.div`
    display: flex;
  height: calc(100vh - 50px);
`;
