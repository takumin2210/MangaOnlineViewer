import { css, html, LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { IconDeviceFloppy, IconPencil, IconX } from './icons';
import { getLocaleString, getUserSettings } from '../core/settings';
import iconsCSS from '../ui/styles/icons.css?inline';
import keyscss from '@gerhobbelt/keyscss/keys.css?inline';

@customElement('manga-keybindings-panel')
export default class MangaKeybindingsPanel extends LitElement {
  @property({ reflect: true })
  visible = false;

  @property({ reflect: true })
  editor = false;

  keybindList() {
    return map(Object.keys(getUserSettings().keybinds), (kb) => {
      const keys = getUserSettings().keybinds[kb]?.length
        ? getUserSettings()
            .keybinds[kb]?.map((key) => `<kbd class="dark">${key}</kbd>`)
            .join(' / ')
        : '';
      return html`<span>${getLocaleString(kb)}:</span> <span>${unsafeHTML(keys)}</span>`;
    });
  }

  keybindEditor() {
    return html`${map(
        Object.keys(getUserSettings().keybinds),
        (kb) =>
          html`<label for="${kb}">${getLocaleString(kb)}:</label>
            <input
              type="text"
              class="KeybindInput"
              id="${kb}"
              name="${kb}"
              value="${getUserSettings().keybinds[kb]?.join(' , ') ?? ''}"
            />`,
      )}
      <div id="HotKeysRules">${unsafeHTML(getLocaleString('KEYBIND_RULES'))}</div>`;
  }

  render() {
    return html`<div id="KeybindingsOverlay" class="overlay ${this.visible ? 'visible' : ''}"></div>
      <div id="KeybindingsPanel" class="panel ${this.visible ? 'visible' : ''}">
        <h2>${getLocaleString('KEYBINDINGS')}</h2>
        <button id="CloseKeybindings" class="closeButton" title="${getLocaleString('CLOSE')}">
          ${IconX}
        </button>
        <div class="controls">
          <button
            id="EditKeybindings"
            class="ControlButton"
            type="button"
            title="${getLocaleString('EDIT_KEYBINDS')}"
          >
            ${IconPencil} ${getLocaleString('BUTTON_EDIT')}
          </button>
          <button
            id="SaveKeybindings"
            class="ControlButton hidden"
            type="button"
            title="${getLocaleString('SAVE_KEYBINDS')}"
          >
            ${IconDeviceFloppy} ${getLocaleString('BUTTON_SAVE')}
          </button>
        </div>
        <div id="KeybindingsList">${this.editor ? this.keybindEditor() : this.keybindList()}</div>
      </div>`;
  }

  static styles = [
    unsafeCSS(iconsCSS),
    unsafeCSS(keyscss),
    css`
      .panel {
        padding: 5px;
        position: inherit;
        border-radius: 5px;
        background-color: var(--theme-background-color);
      }
      #KeybindingsPanel {
        padding: 10px;
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        transition: transform 0.3s ease-in-out;
        transform: translateX(100%);
        line-height: 1.5em;
        z-index: 1000;
        overflow-y: auto;
        width: 360px;
        max-width: 100vw;
      }

      #KeybindingsPanel.visible {
        transform: translateX(0);
        display: block;
      }

      #KeybindingsPanel #KeybindingsList {
        display: grid;
        grid-template-columns: 1fr 2fr;
        gap: 5px;
      }

      #KeybindingsPanel .ControlButton {
        margin-left: 3px;
        justify-content: center;
        align-items: center;
        padding: 5px 10px;
        gap: 0.5em;
      }

      #KeybindingsPanel label {
        display: ruby;
      }
      #KeybindingsPanel input {
        display: inline-block;
        width: 100%;
      }

      #KeybindingsPanel #HotKeysRules {
        grid-column: span 2;
      }
      .closeButton {
        width: fit-content;
        height: fit-content;
        position: absolute;
        right: 10px;
        top: 10px;
      }

      .overlay {
        position: fixed;
        display: none;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 950;
        cursor: pointer;
      }

      .overlay.visible {
        display: block;
      }
    `,
  ];
}
declare global {
  interface HTMLElementMangaPageMap {
    'manga-keybindings-panel': MangaKeybindingsPanel;
  }
}
