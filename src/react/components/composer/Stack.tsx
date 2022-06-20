import React from 'react';
import styled from 'styled-components';

/*
import { Stack as MantineStack } from '@mantine/core';
import { StackProps } from '@mantine/core/lib/components/Stack/Stack';
import {DefaultProps, MantineNumberSize} from "@mantine/styles";

// eslint-disable-next-line react/jsx-props-no-spreading
const Stack = (props: StackProps) => <MantineStack {...props} />;
*/
interface StackProps extends React.ComponentPropsWithoutRef<'div'> {
    spacing?: React.CSSProperties['gap'];
    align?: React.CSSProperties['alignItems'];
    justify?: React.CSSProperties['justifyContent'];
}

const Stack = styled.div<StackProps>`
    display: flex;
    flex-flow: column nowrap;
    gap: ${({ spacing }) => spacing || '5px'};
    align-items: ${({ align }) => align || 'center'};
    justify-content: ${({ justify }) => justify || 'center'};
`;
export default Stack;
