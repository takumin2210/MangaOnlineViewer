import { Image as MantineImage } from '@mantine/core';
import { ImageProps } from '@mantine/core/lib/components/Image/Image';
import React from 'react';

// eslint-disable-next-line react/jsx-props-no-spreading
const Image = (props: ImageProps) => <MantineImage {...props} />;
export default Image;
