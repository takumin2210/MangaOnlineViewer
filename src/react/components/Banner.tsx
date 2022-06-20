import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import {
    ArrowBigLeft as IconArrowBigLeft,
    ArrowBigRight as IconArrowBigRight,
    FileDownload as IconFileDownload,
} from 'tabler-icons-react';
import generateZip from '../../core/download';
import { mangaAtom } from '../recoil';
import { Anchor, Button, Group } from './composer';
import GlobalActions from './GlobalActions';
import Keybindings from './Keybindings';
import Settings from './Settings';

const ChapterControlWrapper = styled(Group)`
    padding: 10px;
    gap: 10px;
    background-color: ${({ theme }) => (theme.colorScheme === 'dark' ? theme.black : theme.white)};
`;
const ChapterButtons = styled(Group)`
    @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
        order: 2;
    }
`;
const NavigationButton = styled(Button)`
    width: auto;
    height: auto;
    margin: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const Title = styled(Anchor)`
    text-decoration: none;
    padding: 0 10px;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    flex-basis: 30%;
    @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
        order: 1;
        flex-basis: 100%;
    }
`;
const Controls = styled(Group)`
    @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
        order: 2;
        #KeybindingsPanel,
        #GlobalActions {
            display: none;
        }
    }
`;

interface ChapterControlProps {
    position: string;
}

const Banner: React.FC<ChapterControlProps> = ({ position }) => {
    const { next, prev, series, title } = useRecoilValue(mangaAtom);
    const clickRedirect =
        (link: string | undefined) => (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            // eslint-disable-next-line no-restricted-globals
            if (link) location.href = link;
            return false;
        };
    // Todo: Show images load completion?
    return (
        <ChapterControlWrapper id={`Banner${position}`} className="ChapterControl">
            <Controls className="GlobalControls">
                <Settings />
                <Keybindings />
                <GlobalActions />
            </Controls>
            <Title className="ViewerTitle" id="series" href={series || '#'}>
                <b>{title}</b>
                <i>(Return to Chapter List)</i>
            </Title>
            <ChapterButtons className="ButtonGroup">
                <NavigationButton
                    type="button"
                    className="download"
                    id="download"
                    title="Download Chapter"
                    onClick={generateZip}
                >
                    <IconFileDownload />
                </NavigationButton>
                <NavigationButton
                    type="button"
                    className="prev"
                    id="prev"
                    title="Previous Chapter"
                    disabled={!prev || prev === '' || prev === '#'}
                    onClick={clickRedirect(prev || '#')}
                >
                    <IconArrowBigLeft />
                </NavigationButton>
                <NavigationButton
                    type="button"
                    className="next"
                    id="next"
                    title="Next Chapter"
                    disabled={!next || next === '' || next === '#'}
                    onClick={clickRedirect(next || '#')}
                >
                    <IconArrowBigRight />
                </NavigationButton>
            </ChapterButtons>
        </ChapterControlWrapper>
    );
};

export default Banner;
