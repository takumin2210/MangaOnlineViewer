import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { mangaAtom, settingsAtom } from '../recoil';
import Page from './Page';

interface ChapterStylesParam {
    viewMode: 'inherit' | 'ltr' | 'rtl';
}

const ChapterWrapper = styled.div<ChapterStylesParam>`
    display: grid;
    grid-template-columns: repeat(${({ viewMode }) => (viewMode === 'inherit' ? 1 : 2)}, 1fr);
    direction: ${({ viewMode }) => viewMode};
    min-width: 225px;
`;

interface ChapterProps {}

const Chapter: React.FC<ChapterProps> = () => {
    const { viewMode } = useRecoilValue(settingsAtom);
    const { begin, pages } = useRecoilValue(mangaAtom);
    // Todo: Should add Pagination?
    return (
        <ChapterWrapper id="Chapter" className="viewMode" viewMode={viewMode}>
            {Array(pages)
                .fill(0)
                .map((_, i) => i + 1)
                .filter((e) => e >= (begin || 0))
                .map((pageNumber, index) => (
                    <Page
                        key={pageNumber}
                        pageNumber={pageNumber}
                        position={pageNumber - 1}
                        index={index}
                    />
                ))}
        </ChapterWrapper>
    );
};

export default Chapter;
