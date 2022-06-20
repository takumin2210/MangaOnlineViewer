import { Text as MantineText } from '@mantine/core';
import { TextProps } from '@mantine/core/lib/components/Text/Text';
import React from 'react';

// eslint-disable-next-line react/jsx-props-no-spreading
const Text = (props: TextProps<'div'>) => <MantineText {...props} />;
export default Text;
