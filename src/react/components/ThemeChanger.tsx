import React from 'react';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { ColorSwatch, SegmentedControl, useMantineTheme } from '@mantine/core';
import {
    Check as IconCheck,
    MoonStars as IconMoonStars,
    SquaresFilled as IconSquaresFilled,
    Sun as IconSun,
} from 'tabler-icons-react';
import { settingsAtom } from '../recoil';
import { Group, ActionIcon, Stack } from './composer';

const ColorChangerWrapper = styled(Group)`
    margin: 3px 3px 3px 10px;
`;
const ButtonVariantsGroup = styled(Group)`
    justify-content: left;
`;
const Shade = styled.input`
    width: 40px;
    padding: 2px 2px 2px 8px;
`;

const ThemeChanger: React.FC = () => {
    const setSettings = useSetRecoilState(settingsAtom);
    const {
        colors,
        primaryColor,
        primaryShade,
        colorScheme,
        white,
        black,
        other: { variant },
    } = useMantineTheme();
    const toggleColorScheme = (value?: 'light' | 'dark') => {
        setSettings((s) => ({
            ...s,
            theme: {
                ...s.theme,
                colorScheme: value || (colorScheme === 'dark' ? 'light' : 'dark'),
            },
        }));
    };
    const setPrimaryColor = (value: string) => {
        if (value === primaryColor) return;
        setSettings((s) => ({
            ...s,
            theme: {
                ...s.theme,
                primaryColor: value,
                ...(value === 'whiteAlpha' && {
                    colorScheme: 'dark',
                    other: { variant: 'filled' },
                }),
                ...(value === 'blackAlpha' && {
                    colorScheme: 'light',
                    other: { variant: 'filled' },
                }),
                ...(value === 'dark' && {
                    colorScheme: 'light',
                    other: { variant: 'filled' },
                }),
            },
        }));
    };
    // const changeColor = () => {
    //     if (color === settings.theme.colors.custom[6]) return;
    //     setSettings((s) => ({
    //         ...s,
    //         theme: {
    //             ...s.theme,
    //             primaryColor: 'custom',
    //             colors: { ...s.theme.colors, custom: getColorTheme(color) },
    //         },
    //     }));
    // };
    const setPrimaryShade = (value: number) => {
        if (value === primaryShade) return;
        setSettings((s) => ({
            ...s,
            theme: { ...s.theme, primaryShade: value as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 },
        }));
    };
    const changeVariant = (value: 'filled' | 'outline' | 'light') => {
        if (value === variant) return;
        setSettings((s) => ({
            ...s,
            theme: {
                ...s.theme,
                other: {
                    ...s.theme.other,
                    variant: value,
                },
            },
        }));
    };

    const swatches = Object.keys(colors).map((colorName) => (
        <ColorSwatch
            key={colorName}
            color={colors[colorName][primaryShade as number]}
            style={{
                border: `1px solid ${colorScheme === 'dark' ? white : black}`,
            }}
            onClick={() => setPrimaryColor(colorName)}
            title={colorName}
        >
            {primaryColor === colorName && <IconCheck size={16} color="white" />}
        </ColorSwatch>
    ));
    return (
        <ColorChangerWrapper id="ColorChanger">
            <Group>
                <Stack>
                    <span>Color Scheme:</span>
                    <ActionIcon
                        id="ColorScheme"
                        name="ColorScheme"
                        title="Toggle Color Scheme"
                        className="GlobalControlButton"
                        type="button"
                        onClick={() => toggleColorScheme()}
                    >
                        {colorScheme === 'dark' ? (
                            <IconSun size={20} />
                        ) : (
                            <IconMoonStars size={20} />
                        )}
                    </ActionIcon>
                    <span>Color Shade:</span>
                    <Shade
                        type="number"
                        id="ColorShade"
                        name="ColorShade"
                        title="Color Shade"
                        min={1}
                        max={9}
                        step={1}
                        value={primaryShade as number}
                        onChange={(event) =>
                            setPrimaryShade(parseInt(event.currentTarget?.value, 10))
                        }
                    />
                </Stack>
                <Stack>
                    <span>Button Variant:</span>
                    <SegmentedControl
                        orientation="vertical"
                        onChange={changeVariant}
                        value={variant}
                        data={[
                            {
                                value: 'filled',
                                label: (
                                    <ButtonVariantsGroup>
                                        <ActionIcon
                                            id="ButtonVariant"
                                            name="ButtonVariant"
                                            title="Toggle Button Variant"
                                            className="GlobalControlButton"
                                            variant="filled"
                                            type="button"
                                        >
                                            <IconSquaresFilled size={20} />
                                        </ActionIcon>
                                        <span>Filled</span>
                                    </ButtonVariantsGroup>
                                ),
                            },
                            {
                                value: 'outline',
                                label: (
                                    <ButtonVariantsGroup>
                                        <ActionIcon
                                            id="ButtonVariant"
                                            name="ButtonVariant"
                                            title="Toggle Button Variant"
                                            className="GlobalControlButton"
                                            variant="outline"
                                            type="button"
                                        >
                                            <IconSquaresFilled size={20} />
                                        </ActionIcon>
                                        <span>Outline</span>
                                    </ButtonVariantsGroup>
                                ),
                            },
                            {
                                value: 'light',
                                disabled:
                                    primaryColor === 'whiteAlpha' || primaryColor === 'blackAlpha',
                                label: (
                                    <ButtonVariantsGroup>
                                        <ActionIcon
                                            id="ButtonVariant"
                                            name="ButtonVariant"
                                            title="Toggle Button Variant"
                                            className="GlobalControlButton"
                                            variant="light"
                                            type="button"
                                        >
                                            <IconSquaresFilled size={20} />
                                        </ActionIcon>
                                        <span>Light</span>
                                    </ButtonVariantsGroup>
                                ),
                            },
                        ]}
                    />
                </Stack>
            </Group>
            <Stack>
                <span>Theme Color:</span>
                <Group>{swatches}</Group>
            </Stack>
        </ColorChangerWrapper>
    );
};
export default ThemeChanger;
