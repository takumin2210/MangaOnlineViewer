import { useRecoilState, useResetRecoilState } from 'recoil';
import { Button, Center, Group, SegmentedControl, Stack, ThemeIcon } from '@mantine/core';
import {
    IconArrowAutofitDown,
    IconArrowAutofitLeft,
    IconArrowAutofitRight,
    IconSettings,
} from '@tabler/icons-react';
import { settingsAtom } from '../recoil';
import ThemeChanger from './ThemeChanger';
import { ViewMode } from '../../types';

function Settings() {
    const [settings, setSettings] = useRecoilState(settingsAtom);
    const resetSettings = useResetRecoilState(settingsAtom);
    const setViewMode = (mode: ViewMode) => {
        if (mode === settings.viewMode) return;
        setSettings((s) => ({
            ...s,
            viewMode: mode,
        }));
    };

    return (
        <Group id="SettingsPanel">
            <Stack>
                <Button variant="default" onClick={resetSettings}>
                    <IconSettings />
                    Reset Settings/Theme
                </Button>
                <Stack>
                    <span>Display Mode:</span>
                    <SegmentedControl
                        // orientation="vertical"
                        onChange={setViewMode}
                        value={settings.viewMode}
                        data={[
                            {
                                value: 'FluidLTR',
                                // disabled: windowWidth < settings.theme.breakpoints.sm,
                                label: (
                                    <Center>
                                        <Stack>
                                            <Center>
                                                <ThemeIcon>
                                                    <IconArrowAutofitRight size={20} />
                                                </ThemeIcon>
                                            </Center>

                                            <span>Right</span>
                                        </Stack>
                                    </Center>
                                ),
                            },
                            {
                                value: 'Vertical',
                                label: (
                                    <Center>
                                        <Stack>
                                            <Center>
                                                <ThemeIcon>
                                                    <IconArrowAutofitDown size={20} />
                                                </ThemeIcon>
                                            </Center>

                                            <span>Vertical</span>
                                        </Stack>
                                    </Center>
                                ),
                            },
                            {
                                value: 'FluidRTL',
                                // disabled: windowWidth < settings.theme.breakpoints.sm,
                                label: (
                                    <Center>
                                        <Stack>
                                            <Center>
                                                <ThemeIcon>
                                                    <IconArrowAutofitLeft size={20} />
                                                </ThemeIcon>
                                            </Center>

                                            <span>Left</span>
                                        </Stack>
                                    </Center>
                                ),
                            },
                        ]}
                    />
                </Stack>
                <ThemeChanger />
            </Stack>
        </Group>
    );
}

export default Settings;
