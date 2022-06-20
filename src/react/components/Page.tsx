import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { isBruteforceManga, isImagesManga, isPagesManga } from '../../types';
import { getElementAttribute } from '../../utils/request';
import { logScript } from '../../utils/tampermonkey';
import useZoom from '../hooks/useZoom';
import { mangaAtom, settingsAtom } from '../recoil';
import { Image, Stack } from './composer';
import PageActions from './PageActions';

const PageWrapper = styled.div`
    position: relative;

    &.hide {
        display: flex;
        justify-content: flex-end;
        background-color: ${({ theme }) =>
            theme.colorScheme === 'dark' ? theme.black : theme.white};
    }

    &.hide .PageFunctions {
        position: relative;
        flex-flow: row-reverse;
        margin-bottom: auto;
    }
    &.hide button:not(.HidePage) {
        display: none;
    }

    &.hide .PageContent {
        display: none;
    }

    &.DoublePage {
        grid-column: span 2;
    }
`;
const PageContent = styled(Stack)`
    & .mantine-Image-figure,
    & .mantine-Image-imageWrapper {
        display: contents;
    }
`;
const PageImage = styled(Image)`
    & img {
        max-width: 100%;
        //min-width: 150px;
        min-height: 231px;
    }

    & img[src=''],
    & img:not([src]),
    & svg {
        width: 500px;
        height: 750px;
    }
`;

interface PageProps {
    pageNumber: number;
    index: number;
    position: number;
}

const Page: React.FC<PageProps> = ({ pageNumber, index, position }) => {
    const manga = useRecoilValue(mangaAtom);
    const { throttlePageLoad, viewMode } = useRecoilValue(settingsAtom);
    const [src, setSrc] = useState('');
    const [hide, setHide] = useState(true);
    const [doublePage, setDoublePage] = useState(false);
    const [imgRef, width, setWidthMultiplier] = useZoom();
    // Todo: Lazy load images
    // Todo: Does lazy work with download
    // Todo: Count Loaded images

    useEffect(() => {
        let timeout: NodeJS.Timeout | undefined;
        new Promise((resolve) => {
            logScript('Waiting to load image ', pageNumber);
            timeout = setTimeout(() => {
                if (isImagesManga(manga)) {
                    // logScript('Doing Image ', pageNumber, 'url: ', manga.listImages[position]);
                    resolve(manga.listImages[position]);
                } else if (isPagesManga(manga)) {
                    getElementAttribute(
                        manga.listPages[position],
                        manga.imageSelector,
                        manga.imageAttribute || 'src',
                    ).then((url) => {
                        // logScript('Doing Page ', pageNumber, 'url: ', url);
                        resolve(url);
                    });
                } else if (isBruteforceManga(manga)) {
                    // Todo: is Brute Force working?
                    // logScript('Doing Bruteforce ', pageNumber);
                    resolve(manga.bruteForce(position));
                }
            }, index * throttlePageLoad);
        }).then((value) => {
            logScript(`Loading Page ${pageNumber} with: ${value}`);
            setSrc(value as string);
            setHide(false);
        });

        return () => {
            clearTimeout(timeout);
        };
    }, [manga]);

    return (
        <PageWrapper
            as="section"
            id={`Page${pageNumber}`}
            className={[
                viewMode !== 'inherit' && doublePage ? 'DoublePage' : '',
                hide ? 'hide' : '',
                'MangaPage',
            ].join(' ')}
        >
            <PageContent className="PageContent">
                <PageImage
                    id={`PageImg${pageNumber}`}
                    alt={`PageImg${pageNumber}`}
                    className="PageImg"
                    src={src}
                    width={width}
                    imageRef={imgRef}
                    withPlaceholder
                />
            </PageContent>
            <PageActions
                index={pageNumber}
                setWidthMultiplier={setWidthMultiplier}
                hide={hide}
                setHide={setHide}
                setDoublePage={setDoublePage}
            />
        </PageWrapper>
    );
};
export default Page;
