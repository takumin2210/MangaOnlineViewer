import { ActionIcon as MantineActionIcon } from '@mantine/core';
import { ActionIconProps } from '@mantine/core/lib/components/ActionIcon/ActionIcon';
import React from 'react';

// eslint-disable-next-line react/jsx-props-no-spreading
const ActionIcon = (props: ActionIconProps<'button'>) => <MantineActionIcon {...props} />;
export default ActionIcon;
