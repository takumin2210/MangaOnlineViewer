import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useEffect } from 'react';
import { createTheme, MantineColor, MantineProvider } from '@mantine/core';
import { IManga } from '../../types';
import mangaAtom from '../recoil/mangaAtom';
import { settingsAtom } from '../recoil';
import colors from '../../utils/colors';
import AppShellExperiment from './AppShellExperiment';

interface AppProps {
    manga: IManga;
}

function App({ manga }: AppProps) {
    const setManga = useSetRecoilState(mangaAtom);
    const settings = useRecoilValue(settingsAtom);
    useEffect(() => {
        setManga(manga);
    });
    const themeColors = Object.values(colors).reduce((acc, color) => {
        // @ts-ignore
        acc[color.name] = [
            color['50'],
            color['100'],
            color['200'],
            color['300'],
            color['400'],
            color['500'],
            color['600'],
            color['700'],
            color['800'],
            color['900'],
        ];
        return acc;
    }, {});
    const theme = createTheme({
        primaryColor: settings.theme as MantineColor,
        colors: themeColors,
        // @ts-ignore
        primaryShade: settings.themeShade / 100,
    });
    return (
        <MantineProvider
            defaultColorScheme="dark"
            forceColorScheme={settings.colorScheme}
            theme={theme}
        >
            <AppShellExperiment manga={manga} />
        </MantineProvider>
    );
}

export default App;
