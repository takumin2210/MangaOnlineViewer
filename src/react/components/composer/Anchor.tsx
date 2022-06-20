import { Anchor as ManineAnchor } from '@mantine/core';
import { AnchorProps } from '@mantine/core/lib/components/Anchor/Anchor';
import React from 'react';

// eslint-disable-next-line react/jsx-props-no-spreading
const Anchor = ({ ...props }: AnchorProps<'a'>) => <ManineAnchor {...props} />;
export default Anchor;
