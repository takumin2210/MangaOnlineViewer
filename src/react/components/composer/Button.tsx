import { Button as MantineButton } from '@mantine/core';
import { ButtonProps } from '@mantine/core/lib/components/Button/Button';
import React from 'react';

// eslint-disable-next-line react/jsx-props-no-spreading
const Button = (props: ButtonProps<'button'>) => <MantineButton {...props} />;
export default Button;
