import React from 'react';
import styled from "@emotion/styled";

interface ComponentCardProps {
    label: string
}

export const ComponentCard = (props: ComponentCardProps) => {
    const { label } = props;
    return (
        <Container>
            <Inner>
                { label }
            </Inner>
        </Container>
    );
}

const Container = styled.div`
  cursor: move;
  flex: 0 0 50%;
  width: 50%;
  padding: 2px;
`;

const Inner = styled.div`
  background-color: #DCDFE6;
  height: 30px;
  line-height: 30px;
  padding-left: 20px;

  &:hover {
    background-color: #DCDFE6;
  }
`;
