import React from 'react';
import styled from 'styled-components';

/*
import { Group as MantineGroup } from '@mantine/core';
import { GroupProps } from '@mantine/core/lib/components/Group/Group';

// eslint-disable-next-line react/jsx-props-no-spreading
const Group = (props: GroupProps) => <MantineGroup {...props} />;
*/
export interface GroupProps extends React.ComponentPropsWithoutRef<'div'> {
    wrap?: React.CSSProperties['flexWrap'];
    grow?: React.CSSProperties['flexGrow'];
    spacing?: React.CSSProperties['gap'];
    direction?: React.CSSProperties['flexDirection'];
    justify?: React.CSSProperties['justifyContent'];
    align?: React.CSSProperties['alignItems'];
}

const Group = styled.div<GroupProps>`
    display: flex;
    flex-direction: ${({ direction }) => direction || 'row'};
    flex-wrap: ${({ wrap }) => wrap || 'wrap'};
    gap: ${({ spacing }) => spacing || '5px'};
    align-items: ${({ align }) => align || 'center'};
    justify-content: ${({ justify }) => justify || 'center'};
`;
export default Group;
