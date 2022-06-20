import { useViewportSize } from '@mantine/hooks';
import React, { useState } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { Drawer, SegmentedControl } from '@mantine/core';
import {
    ArrowAutofitDown as IconArrowAutofitDown,
    ArrowAutofitLeft as IconArrowAutofitLeft,
    ArrowAutofitRight as IconArrowAutofitRight,
    Settings as IconSettings,
} from 'tabler-icons-react';
import { settingsAtom } from '../recoil';
import { Stack, ActionIcon, Button, ThemeIcon } from './composer';
import ThemeChanger from './ThemeChanger';

const Settings: React.FC = () => {
    const [settings, setSettings] = useRecoilState(settingsAtom);
    const [settingsDrawerOpen, setSettingsDrawerOpen] = useState(false);
    const { width: windowWidth } = useViewportSize();
    const resetSettings = useResetRecoilState(settingsAtom);
    const setViewMode = (mode: 'inherit' | 'ltr' | 'rtl') => {
        if (mode === settings.viewMode) return;
        setSettings((s) => ({
            ...s,
            viewMode: mode,
        }));
    };

    return (
        <div id="SettingsPanel">
            <ActionIcon
                id="Settings"
                name="Settings"
                title="Settings"
                className="GlobalControlButton"
                type="button"
                onClick={() => setSettingsDrawerOpen((value) => !value)}
            >
                <IconSettings size={20} />
            </ActionIcon>
            <Drawer
                id="SettingsDrawer"
                opened={settingsDrawerOpen}
                onClose={() => setSettingsDrawerOpen(false)}
                title="Settings"
                size="md"
                padding="sm"
                position="left"
                zIndex={1000}
            >
                <Stack>
                    <Button variant="default" onClick={resetSettings}>
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
                                    value: 'inherit',
                                    label: (
                                        <Stack>
                                            <ThemeIcon>
                                                <IconArrowAutofitDown size={20} />
                                            </ThemeIcon>

                                            <span>Vertical</span>
                                        </Stack>
                                    ),
                                },
                                {
                                    value: 'ltr',
                                    disabled: windowWidth < settings.theme.breakpoints.sm,
                                    label: (
                                        <Stack>
                                            <ThemeIcon>
                                                <IconArrowAutofitRight size={20} />
                                            </ThemeIcon>
                                            <span>Right</span>
                                        </Stack>
                                    ),
                                },
                                {
                                    value: 'rtl',
                                    disabled: windowWidth < settings.theme.breakpoints.sm,
                                    label: (
                                        <Stack>
                                            <ThemeIcon>
                                                <IconArrowAutofitLeft size={20} />
                                            </ThemeIcon>
                                            <span>Left</span>
                                        </Stack>
                                    ),
                                },
                            ]}
                        />
                    </Stack>
                    <ThemeChanger />
                </Stack>
            </Drawer>
        </div>
    );
};

export default Settings;
