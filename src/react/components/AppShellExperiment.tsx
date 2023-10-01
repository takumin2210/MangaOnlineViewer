import '@mantine/core/styles.css';
import '@mantine/core/styles/AppShell.css';
import '@mantine/core/styles/Burger.css';
import '@mantine/core/styles/Group.css';
import {
    Anchor,
    AppShell,
    Burger,
    Button,
    Center,
    Group,
    Image,
    Stack,
    Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconBook } from '@tabler/icons-react';
import { IManga, IMangaImages } from '../../types';
import { useHeadroom } from '../hooks/useHeadroom';
import Settings from './Settings';

interface ReaderProps {
    manga: IManga;
}

function AppShellExperiment({ manga }: ReaderProps) {
    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(false);
    const headroom = useHeadroom({ fixedAt: 120 });
    return (
        <AppShell
            header={{ height: 40, collapsed: !headroom }}
            navbar={{
                width: 300,
                breakpoint: 'sm',
                collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
            }}
            // footer={{ height: 40, collapsed: headroom }}
            padding="md"
        >
            <AppShell.Header>
                <Group justify="space-between">
                    <Group h="100%" px="md">
                        <Burger
                            opened={mobileOpened}
                            onClick={toggleMobile}
                            hiddenFrom="sm"
                            size="sm"
                        />
                        <Burger
                            opened={desktopOpened}
                            onClick={toggleDesktop}
                            visibleFrom="sm"
                            size="sm"
                        />
                        <IconBook size={30} /> <Title order={4}>{manga.title}</Title>
                        <Anchor href={manga.series}>(Return to Chapter List)</Anchor>
                    </Group>
                    <Group>
                        <Anchor href={manga.prev}>
                            <Button>Previous Chapter</Button>
                        </Anchor>
                        <Anchor href={manga.next}>
                            <Button>Next Chapter</Button>
                        </Anchor>
                    </Group>
                </Group>
            </AppShell.Header>

            <AppShell.Navbar p="md">
                <Title order={3}>Settings</Title>
                <Settings />
            </AppShell.Navbar>

            <AppShell.Main>
                <Center>
                    <Stack>
                        {Array(manga.pages)
                            .fill(0)
                            .map((_, index) => (
                                <Image
                                    key={index}
                                    w="auto"
                                    fit="contain"
                                    src={(manga as IMangaImages).listImages[index]}
                                    maw="100%"
                                />
                            ))}
                    </Stack>
                </Center>
            </AppShell.Main>
            {/* <AppShell.Footer> */}
            {/*     <Group justify="space-between"> */}
            {/*         <Group h="100%" px="md"> */}
            {/*             <Burger */}
            {/*                 opened={mobileOpened} */}
            {/*                 onClick={toggleMobile} */}
            {/*                 hiddenFrom="sm" */}
            {/*                 size="sm" */}
            {/*             /> */}
            {/*             <Burger */}
            {/*                 opened={desktopOpened} */}
            {/*                 onClick={toggleDesktop} */}
            {/*                 visibleFrom="sm" */}
            {/*                 size="sm" */}
            {/*             /> */}
            {/*             <IconBook size={30} /> <Title order={4}>{manga.title}</Title> */}
            {/*             <Anchor href={manga.series}>(Return to Chapter List)</Anchor> */}
            {/*         </Group> */}
            {/*         <Group> */}
            {/*             <Anchor href={manga.prev}> */}
            {/*                 <Button>Previous Chapter</Button> */}
            {/*             </Anchor> */}
            {/*             <Anchor href={manga.next}> */}
            {/*                 <Button>Next Chapter</Button> */}
            {/*             </Anchor> */}
            {/*         </Group> */}
            {/*     </Group> */}
            {/* </AppShell.Footer> */}
        </AppShell>
    );
}

export default AppShellExperiment;
