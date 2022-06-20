import React from 'react';
import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
    ArrowAutofitWidth as IconArrowAutofitWidth,
    ZoomInArea as IconZoomInArea,
    ZoomOutArea as IconZoomOutArea,
    ZoomPan as IconZoomPan,
} from 'tabler-icons-react';
import { globalImageWidthAtom, settingsAtom } from '../recoil';
import { ActionIcon, Group } from './composer';

const GlobalActionsWrapper = styled.div``;
const GlobalActionButton = styled(ActionIcon)``;
const GroupGlobalAction = styled(Group)``;

interface IControlButton {
    icon: JSX.Element;
    name: string;
    title: string;
    onClick: (event: React.MouseEvent) => void;
}

interface ImageOptionsProps {}

const GlobalActions: React.FC<ImageOptionsProps> = () => {
    const setGlobalImageWidth = useSetRecoilState(globalImageWidthAtom);
    const { widthScale } = useRecoilValue(settingsAtom);
    const controlButtons: IControlButton[] = [
        {
            name: 'Enlarge',
            title: 'Enlarge All',
            onClick: () => setGlobalImageWidth((m) => (m < widthScale ? m + 1 : widthScale)),
            icon: <IconZoomInArea size={20} />,
        },
        {
            name: 'Restore',
            title: 'Restore All',
            onClick: () => setGlobalImageWidth(0),
            icon: <IconZoomPan size={20} />,
        },
        {
            name: 'Reduce',
            title: 'Reduce All',
            onClick: () => setGlobalImageWidth((m) => (m > -widthScale ? m - 1 : -widthScale)),
            icon: <IconZoomOutArea size={20} />,
        },
        {
            name: 'FitWidth',
            title: 'Fit Width All',
            onClick: () => setGlobalImageWidth(5),
            icon: <IconArrowAutofitWidth size={20} />,
        },
    ];
    // Todo: Drawer to show Bookmarks
    // Todo: PagesFit height
    return (
        <GlobalActionsWrapper id="GlobalActions">
            <GroupGlobalAction id="GroupGlobalAction">
                {controlButtons.map((b) => (
                    <GlobalActionButton
                        key={b.name}
                        id={b.name}
                        name={b.name}
                        title={b.title}
                        className="GlobalControlButton"
                        type="button"
                        onClick={b.onClick}
                    >
                        {b.icon}
                    </GlobalActionButton>
                ))}
            </GroupGlobalAction>
        </GlobalActionsWrapper>
    );
};
export default GlobalActions;
