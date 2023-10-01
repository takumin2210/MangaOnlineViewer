import { useRecoilState } from 'recoil';
import { ActionIcon, ColorSwatch, Group, Slider, Stack } from '@mantine/core';
import { IconCheck, IconMoonStars, IconSun } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { settingsAtom } from '../recoil';
import { Shade } from '../../types';
import Colors from '../../utils/colors';

function ThemeChanger() {
    const [settings, setSettings] = useRecoilState(settingsAtom);
    const [shade, setShade] = useState<number>(settings.themeShade / 100);
    const toggleColorScheme = (value?: 'light' | 'dark') => {
        setSettings((s) => ({
            ...s,
            colorScheme: value || (settings.colorScheme === 'dark' ? 'light' : 'dark'),
        }));
    };
    const setPrimaryColor = (value: string) => {
        if (value === settings.theme) return;
        setSettings((s) => ({
            ...s,
            theme: value,
        }));
    };

    const setPrimaryShade = (value: number) => {
        if (value === settings.themeShade) return;
        setSettings((s) => ({
            ...s,
            themeShade: (value * 100) as Shade,
        }));
    };
    useEffect(() => {
        setPrimaryShade(shade);
    }, [shade]);

    const swatches = Object.keys(Colors).map((colorName) => (
        <ColorSwatch
            key={colorName}
            color={Colors[colorName][600]}
            style={{
                border: `1px solid ${settings.colorScheme === 'dark' ? 'white' : 'black'}`,
            }}
            onClick={() => setPrimaryColor(colorName)}
            title={colorName}
        >
            {settings.theme === colorName && <IconCheck size={16} color="white" />}
        </ColorSwatch>
    ));
    return (
        <Stack id="ColorChanger">
            <Group>
                <Group>
                    <span>Color Scheme:</span>
                    <ActionIcon
                        id="ColorScheme"
                        name="ColorScheme"
                        title="Toggle Color Scheme"
                        className="GlobalControlButton"
                        type="button"
                        onClick={() => toggleColorScheme()}
                    >
                        {settings.colorScheme === 'dark' ? (
                            <IconSun size={20} />
                        ) : (
                            <IconMoonStars size={20} />
                        )}
                    </ActionIcon>
                </Group>
                <Group>
                    <span>Color Shade:</span>
                    <Slider
                        id="ColorShade"
                        name="ColorShade"
                        title="Color Shade"
                        min={1}
                        max={9}
                        step={1}
                        w={100}
                        value={shade}
                        onChange={setShade}
                    />
                </Group>
            </Group>
            <Stack>
                <span>Theme Color:</span>
                <Group>{swatches}</Group>
            </Stack>
        </Stack>
    );
}

export default ThemeChanger;
