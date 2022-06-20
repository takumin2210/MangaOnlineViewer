import React, { useEffect } from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { MantineProvider } from '@mantine/core';
import { IManga } from '../../types';
import Banner from './Banner';
import Chapter from './Chapter';
import Headroom from './Headroom';
import mangaAtom from '../recoil/mangaAtom';
import settingsAtom from '../recoil/settingsAtom';

interface GlobalStyleProps {
    color: string;
    background: string;
}
const GlobalStyle = createGlobalStyle<GlobalStyleProps>`
    body {
        color: ${(props) => props.color};
        background-color: ${(props) => props.background};
        min-width: 300px;
    }
`;
interface ReaderProps {
    manga: IManga;
}

const Reader: React.FC<ReaderProps> = ({ manga }) => {
    const { theme } = useRecoilValue(settingsAtom);
    const setManga = useSetRecoilState(mangaAtom);
    useEffect(() => {
        setManga(manga);
    });
    // Todo: add thumbnail bar?
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle
                color={theme.colorScheme === 'light' ? theme.black : theme.white}
                background={theme.colorScheme === 'dark' ? theme.black : theme.white}
            />
            <MantineProvider
                theme={theme}
                // Todo: Setting to change icons colors?
                // theme={{
                //     colorScheme: settings.theme.colorScheme,
                //     black: settings.theme.black,
                //     white: settings.theme.white,
                // }}
                // styles={{
                //     Button: (theme) => ({
                //         ...(theme.primaryShade < 4
                //             ? { root: { color: theme.colors.dark[theme.primaryShade as number] } }
                //             : {}),
                //     }),
                //     ThemeIcon: (theme) => ({
                //         ...(theme.primaryShade < 4
                //             ? { root: { color: theme.colors.dark[theme.primaryShade as number] } }
                //             : {}),
                //     }),
                //     ActionIcon: (theme) => ({
                //         ...(theme.primaryShade < 4
                //             ? { root: { color: theme.colors.dark[theme.primaryShade as number] } }
                //             : {}),
                //     }),
                // }}
                defaultProps={{
                    Button: {
                        variant: theme.other?.variant,
                        color: theme.primaryColor,
                    },
                    ThemeIcon: {
                        variant: theme.other?.variant,
                        color: theme.primaryColor,
                    },
                    ActionIcon: {
                        variant: theme.other?.variant,
                        color: theme.primaryColor,
                    },
                }}
                withNormalizeCSS
            >
                <Headroom>
                    <Banner position="Top" />
                </Headroom>
                <Chapter />
            </MantineProvider>
        </ThemeProvider>
    );
};
export default Reader;
