import {
    ArrowAutofitWidth as IconArrowAutofitWidth,
    Bookmark as IconBookmark,
    BookmarkOff as IconBookmarkOff,
    Eye as IconEye,
    EyeOff as IconEyeOff,
    ZoomCancel as IconZoomCancel,
    ZoomIn as IconZoomIn,
    ZoomOut as IconZoomOut,
} from 'tabler-icons-react';
import React, { ReactElement, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { settingsAtom } from '../recoil';
import { ActionIcon, Stack, ThemeIcon } from './composer';

const PageFunctions = styled(Stack)`
    position: absolute;
    top: 0;
    right: 5px;
    align-items: flex-end;
    padding: 2px;
    opacity: 0.5;
    &:hover {
        opacity: 1;
    }
`;
const PageIndex = styled(ThemeIcon)`
    width: fit-content;
    min-width: 28px;
    min-height: 28px;
    padding: 1px;
`;
const PageActionButton = styled(ActionIcon)`
    @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
        &:not(.HidePage, .Bookmark) {
            display: none;
        }
    }
`;

interface IControlButton {
    icon: ReactElement;
    name: string;
    title: string;
    onClick: (event: React.MouseEvent) => void;
}

interface PageActionsProps {
    index: number;
    setWidthMultiplier: React.Dispatch<React.SetStateAction<number>>;
    hide: boolean;
    setHide: React.Dispatch<React.SetStateAction<boolean>>;
    setDoublePage: React.Dispatch<React.SetStateAction<boolean>>;
}

const PageActions: React.FC<PageActionsProps> = ({
    index,
    setWidthMultiplier,
    hide,
    setHide,
    setDoublePage,
}) => {
    const { viewMode, widthScale } = useRecoilValue(settingsAtom);
    const [bookmarked, setBookmarked] = useState(false);
    const toggleBookmark = () => {
        setBookmarked((bool) => !bool);
    };
    const controlButtons: IControlButton[] = [
        {
            name: 'Bookmark',
            title: 'Bookmark',
            onClick: () => toggleBookmark(),
            icon: bookmarked ? <IconBookmarkOff size={20} /> : <IconBookmark size={20} />,
        },
        {
            name: 'ZoomIn',
            title: 'Zoom In',
            onClick: () => setWidthMultiplier((m) => (m < widthScale ? m + 1 : widthScale)),
            icon: <IconZoomIn size={20} />,
        },
        {
            name: 'ZoomCancel',
            title: 'Zoom Cancel',
            onClick: () => setWidthMultiplier(0),
            icon: <IconZoomCancel size={20} />,
        },
        {
            name: 'ZoomOut',
            title: 'Zoom Out',
            onClick: () => setWidthMultiplier((m) => (m > -widthScale ? m - 1 : -widthScale)),
            icon: <IconZoomOut size={20} />,
        },
        {
            name: 'ZoomWidth',
            title: 'Zoom Width',
            onClick: () => {
                setWidthMultiplier(widthScale);
                if (viewMode !== 'inherit') {
                    setDoublePage((dp) => !dp);
                }
            },
            icon: <IconArrowAutofitWidth size={20} />,
        },
        {
            name: 'HidePage',
            title: 'Hide Page',
            onClick: () => setHide((h) => !h),
            icon: hide ? <IconEye size={20} /> : <IconEyeOff size={20} />,
        },
    ];
    return (
        <PageFunctions className="PageFunctions">
            <PageIndex className="PageIndex">{index}</PageIndex>
            {controlButtons.map((b) => (
                <PageActionButton
                    key={b.name}
                    name={b.name}
                    title={b.title}
                    type="button"
                    className={`${b.name} controlButton`}
                    onClick={b.onClick}
                >
                    {b.icon}
                </PageActionButton>
            ))}
        </PageFunctions>
    );
};

export default PageActions;
