import { ThemeIcon as MantineThemeIcon } from '@mantine/core';
import { ThemeIconProps } from '@mantine/core/lib/components/ThemeIcon/ThemeIcon';
import React from 'react';

// eslint-disable-next-line react/jsx-props-no-spreading
const ThemeIcon = (props: ThemeIconProps) => <MantineThemeIcon {...props} />;
export default ThemeIcon;
