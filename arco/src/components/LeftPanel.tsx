import React, { useState } from 'react';
import { Button } from '@arco-design/web-react';
import styled from "@emotion/styled";
import { ReactSortable } from "react-sortablejs";

interface BasicComponent {
    tag: string
}

export const LeftPanel = () => {
    const [count, setCount] = useState(0);

    const add = () => setCount(count + 1);
    return (
        <Container>
            <Button onClick={add}>add</Button>
            <div>{ count }</div>
        </Container>
    );
}

const Container = styled.div`
  width: 280px;
  flex: 0 0 280px;
`;
