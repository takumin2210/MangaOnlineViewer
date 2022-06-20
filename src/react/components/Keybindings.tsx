import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { Dialog } from '@mantine/core';
import { Keyboard as IconKeyboard } from 'tabler-icons-react';
import { ActionIcon, Stack } from './composer';

const Key = styled.div``;
const KeyGroup = styled(Stack)`
    align-items: self-start;
`;

const color = (colorScheme: 'dark' | 'light') => {
    if (colorScheme === 'dark')
        return css`
            background-color: #fafafa;
            color: #323232;
            text-shadow: 0 0 2px #ffffff;
            box-shadow: inset 0 0 1px #ffffff, inset 0 0 0.4em #c8c8c8, 0 0.1em 0 #828282,
                0 0.11em 0 rgba(0, 0, 0, 0.4), 0 0.1em 0.11em rgba(0, 0, 0, 0.9);
        `;
    return css`
        background-color: #505050;
        color: #fafafa;
        text-shadow: -1px -1px 0 #464646;
        box-shadow: inset 0 0 1px #969696, inset 0 -0.05em 0.4em #505050, 0 0.1em 0 #1e1e1e,
            0 0.1em 0.1em rgba(0, 0, 0, 0.3);
    `;
};
const Kbd = styled.span`
    display: inline-block;
    white-space: nowrap;
    min-width: 1em;
    padding: 0.3em 0.4em 0.2em 0.3em;
    font-style: normal;
    font-family: 'Lucida Grande', Lucida, Arial, sans-serif;
    text-align: center;
    text-decoration: none;
    border-radius: 0.3em;
    border: none;
    cursor: default;
    user-select: none;
    font-size: 0.85em;
    line-height: 1;

    ${({ theme }) => color(theme.colorScheme)}
`;

const Keybindings: React.FC = () => {
    const [keybindingsDrawerOpen, setKeybindingsDrawerOpen] = useState(false);
    // Todo: Add actual keybinds
    return (
        <div id="KeybindingsPanel">
            <ActionIcon
                id="Keybindings"
                name="Keybindings"
                title="Keybindings"
                className="GlobalControlButton"
                type="button"
                onClick={() => setKeybindingsDrawerOpen((value) => !value)}
            >
                <IconKeyboard size={20} />
            </ActionIcon>
            <Dialog
                id="KeybindingsDrawer"
                opened={keybindingsDrawerOpen}
                withCloseButton
                onClose={() => setKeybindingsDrawerOpen(false)}
                title="Keybindings"
                size="md"
            >
                <KeyGroup>
                    <Key>
                        <span>Open Settings: </span>
                        <br />
                        <Kbd className="dark">Numpad 5</Kbd> or <Kbd className="dark">/</Kbd>
                        <br />
                    </Key>
                    <Key>
                        <span>Global Zoom in pages (enlarge): </span>
                        <br />
                        <Kbd className="dark">Numpad +</Kbd> or <Kbd className="dark">=</Kbd>
                        <br />
                    </Key>
                    <Key>
                        <span>Global Zoom out pages (reduce): </span>
                        <br />
                        <Kbd className="dark">Numpad -</Kbd> or <Kbd className="dark">-</Kbd>
                        <br />
                    </Key>
                    <Key>
                        <span>Global Restore pages to original: </span>
                        <br />
                        <Kbd className="dark">Numpad /</Kbd> or <Kbd className="dark">9</Kbd>
                        <br />
                    </Key>
                    <Key>
                        <span>Global Fit window width: </span>
                        <br />
                        <Kbd className="dark">Numpad *</Kbd> or <Kbd className="dark">0</Kbd>
                        <br />
                    </Key>
                    <Key>
                        <span>Vertical Mode: </span>
                        <Kbd className="dark">V</Kbd>
                        <br />
                    </Key>
                    <Key>
                        <span>WebComic Mode: </span>
                        <Kbd className="dark">C</Kbd>
                        <br />
                    </Key>
                    <Key>
                        <span>Right to Left Mode: </span>
                        <Kbd className="dark">N</Kbd>
                        <br />
                    </Key>
                    <Key>
                        <span>Left to Right Mode: </span>
                        <Kbd className="dark">B</Kbd>
                        <br />
                    </Key>
                    <Key>
                        <span>Next Chapter: </span>
                        <br />
                        <Kbd className="dark">→</Kbd> or <Kbd className="dark">D</Kbd> or{' '}
                        <Kbd className="dark">Numpad 6</Kbd> or <Kbd className="dark">.</Kbd>
                        <br />
                    </Key>
                    <Key>
                        <span>Previous Chapter: </span>
                        <br />
                        <Kbd className="dark">←</Kbd> or <Kbd className="dark">A</Kbd> or{' '}
                        <Kbd className="dark">Numpad 4</Kbd> or <Kbd className="dark">,</Kbd>
                        <br />
                    </Key>
                    <Key>
                        <span>Scroll Up: </span>
                        <br />
                        <Kbd className="dark">↑</Kbd> or <Kbd className="dark">W</Kbd> or{' '}
                        <Kbd className="dark">Numpad 8</Kbd>
                        <br />
                    </Key>
                    <Key>
                        <span>Scroll Down: </span>
                        <br />
                        <Kbd className="dark">↓</Kbd> or <Kbd className="dark">S</Kbd> or{' '}
                        <Kbd className="dark">Numpad 2</Kbd>
                    </Key>
                </KeyGroup>
            </Dialog>
        </div>
    );
};
export default Keybindings;
