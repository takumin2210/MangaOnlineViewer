import { css, html, LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import { IManga } from '../types';
import { getLocaleString, getUserSettings } from '../core/settings';
import {
  IconArrowAutofitDown,
  IconArrowAutofitHeight,
  IconArrowAutofitLeft,
  IconArrowAutofitRight,
  IconArrowAutofitWidth,
  IconArrowBigLeft,
  IconArrowBigRight,
  IconBookmarks,
  IconFileDownload,
  IconKeyboard,
  IconListNumbers,
  IconLoader2,
  IconMenu2,
  IconSettings,
  IconSpacingVertical,
  IconZoomInArea,
  IconZoomOutArea,
  IconZoomPan,
} from './icons';
import iconsCSS from '../ui/styles/icons.css';
import sequence from '../utils/sequence.ts';

@customElement('manga-header')
export default class MangaHeader extends LitElement {
  @property()
  manga?: IManga;

  render() {
    return html`<header id="Header" class="${getUserSettings().header}">
      <div id="menu">${IconMenu2}</div>
      <aside id="GlobalFunctions">
        <span>
          <button id="enlarge" title="${getLocaleString('ENLARGE')}" class="ControlButton">
            ${IconZoomInArea}
          </button>
          <button id="restore" title="${getLocaleString('RESTORE')}" class="ControlButton">
            ${IconZoomPan}
          </button>
          <button id="reduce" title="${getLocaleString('REDUCE')}" class="ControlButton">
            ${IconZoomOutArea}
          </button>
          <button id="fitWidth" title="${getLocaleString('FIT_WIDTH')}" class="ControlButton">
            ${IconArrowAutofitWidth}
          </button>
          <button id="fitHeight" title="${getLocaleString('FIT_HEIGHT')}" class="ControlButton">
            ${IconArrowAutofitHeight}
          </button>
          <button id="keybindings" title="${getLocaleString('KEYBINDINGS')}" class="ControlButton">
            ${IconKeyboard}
          </button>
        </span>
        <span>
          <button id="ltrMode" title="${getLocaleString('VIEW_MODE_LEFT')}" class="ControlButton">
            ${IconArrowAutofitRight}
          </button>
          <button
            id="verticalMode"
            title="${getLocaleString('VIEW_MODE_VERTICAL')}"
            class="ControlButton tablets"
          >
            ${IconArrowAutofitDown}
          </button>
          <button
            id="webComic"
            title="${getLocaleString('VIEW_MODE_WEBCOMIC')}"
            class="ControlButton tablets"
          >
            ${IconSpacingVertical}
          </button>
          <button id="rtlMode" title="${getLocaleString('VIEW_MODE_RIGHT')}" class="ControlButton">
            ${IconArrowAutofitLeft}
          </button>
          <button
            id="pageControls"
            title="${getLocaleString('TOGGLE_CONTROLS')}"
            class="ControlButton tablets"
          >
            ${IconListNumbers}
          </button>
          <button
            id="bookmarks"
            title="${getLocaleString('BOOKMARKS')}"
            class="ControlButton tablets"
          >
            ${IconBookmarks}
          </button>
          <button
            id="settings"
            title="${getLocaleString('SETTINGS')}"
            class="ControlButton tablets phones"
          >
            ${IconSettings}
          </button>
        </span>
        <span id="ZoomSlider">
          <output id="ZoomVal" class="RangeValue" for="Zoom">
            ${getUserSettings().defaultZoom}%
          </output>
          <input
            type="range"
            value="${getUserSettings().defaultZoom}"
            name="Zoom"
            id="Zoom"
            min="1"
            max="200"
          />
        </span>
      </aside>
      <div class="ViewerTitle">
        <h1 id="MangaTitle">${this.manga?.title}</h1>
        <a id="series" href="${this.manga?.series}">
          (${getLocaleString('RETURN_CHAPTER_LIST')})
        </a>
      </div>
      <nav id="ChapterNavigation">
        <div id="Counters" class="ControlLabel">
          ${getLocaleString('PAGES_LOADED')}:
          <i>0</i> /
          <b
            >${this.manga && this.manga.begin > 1
              ? this.manga.pages - (this.manga.begin - 1)
              : this.manga?.pages}</b
          >
          <span class="ControlLabel"> ${getLocaleString('GO_TO_PAGE')}: </span>
          <select id="gotoPage">
            <option selected>#</option>
            ${map(
              sequence(this.manga?.pages ?? 0, this.manga?.begin ?? 1),
              (index) => html`<option value="${index}">${index}</option>`,
            )}
          </select>
        </div>
        <div id="ChapterControl" class="ChapterControl">
          <button
            id="download"
            class="NavigationControlButton ControlButton disabled"
            type="button"
            title="${getLocaleString('DOWNLOAD_ZIP')}"
          >
            ${IconFileDownload} ${IconLoader2} ${getLocaleString('BUTTON_DOWNLOAD')}
          </button>
          <a
            id="prev"
            class="NavigationControlButton ControlButton"
            type="button"
            href="${this.manga?.prev ?? ''}"
            title="${getLocaleString('PREVIOUS_CHAPTER')}"
          >
            ${IconArrowBigLeft} ${getLocaleString('BUTTON_PREVIOUS')}
          </a>
          <a
            id="next"
            class="NavigationControlButton ControlButton"
            type="button"
            href="${this.manga?.next ?? ''}"
            title="${getLocaleString('NEXT_CHAPTER')}"
          >
            ${getLocaleString('BUTTON_NEXT')}${IconArrowBigRight}
          </a>
        </div>
      </nav>
    </header>`;
  }

  static styles = [
    unsafeCSS(iconsCSS),
    css`
      a,
      a:link,
      a:visited,
      a:active,
      a:focus {
        color: var(--theme-body-text-color);
        text-decoration: none;
      }
      .panel {
        padding: 5px;
        position: inherit;
        border-radius: 5px;
        background-color: var(--theme-background-color);
      }
      #gotoPage {
        min-width: 35px;
      }

      #Header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-flow: row nowrap;
        transition: transform 0.3s ease-in;
        position: sticky;
        top: 0;
        left: 0;
        right: 0;
        background-color: var(--theme-background-color);
        z-index: 900;
      }

      #Header.scroll.headroom-hide {
        transform: translateY(-100%);
      }

      #Header.scroll.headroom-show {
        transform: translateY(-1%);
      }

      #Header.hover,
      #Header.fixed,
      #Header.click {
        position: static;
        transform: none;
      }

      #Header.headroom-end,
      #Header.visible,
      #Header.fixed {
        transform: translateY(-1%);
        position: sticky;
      }

      #Header.hover:hover,
      #Header.fixed {
        position: sticky;
      }

      #Header.scroll #menu,
      #Header.fixed #menu,
      #Header.hover:hover #menu,
      #Header:not(.click).visible #menu {
        display: none;
      }
      #menu {
        position: fixed;
        min-height: 70px;
        width: 100%;
        top: 0;
        z-index: 1;
        color: var(--theme-body-text-color);
      }

      #Header.click #menu {
        cursor: pointer;
      }

      #Header.click:not(.headroom-hide, .headroom-show) #menu,
      #Header.click.headroom-end #menu,
      #Header.click.visible #menu {
        position: static;
        width: 50px;
        min-height: unset;
      }

      #MangaTitle {
        padding: 2px;
        margin: 0;
        font-size: 1.2rem;
        font-weight: 400;
      }

      #GlobalFunctions {
        display: flex;
        gap: 3px;
        padding-left: 10px;
        flex-wrap: wrap;
        width: 300px;
        z-index: 100;
      }

      #GlobalFunctions .icon-tabler {
        width: 25px;
        height: 25px;
      }

      #GlobalFunctions #ZoomSlider {
        display: flex;
        align-items: center;
      }

      #GlobalFunctions #Zoom {
        margin-left: 5px;
      }

      #GlobalFunctions #ZoomVal {
        width: 40px;
        display: inline-block;
        color: var(--theme-primary-text-color);
        line-height: 20px;
        text-align: center;
        border-radius: 3px;
        background: var(--theme-primary-color);
        padding: 2px 5px;
      }

      #ChapterNavigation {
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: end;
        padding-right: 10px;
        width: 300px;
      }

      .ChapterControl {
        display: flex;
        flex-wrap: nowrap;
      }

      .ChapterControl .NavigationControlButton {
        display: inline-flex;
        margin-left: 3px;
        justify-content: center;
        align-items: center;
        padding: 5px 10px;
        gap: 0.5em;
      }

      .ChapterControl .NavigationControlButton .icon-tabler {
        flex-shrink: 0;
        align-self: center;
        width: 1rem;
        height: 1rem;
      }

      .ChapterControl .NavigationControlButton[href='#'],
      .ChapterControl .NavigationControlButton[href=''],
      .ChapterControl .NavigationControlButton[href='undefined'] {
        visibility: hidden;
      }

      .ChapterControl #download.loading {
        cursor: not-allowed;
        pointer-events: none;
        opacity: 0.6;
      }

      .ChapterControl #download.disabled {
        visibility: hidden;
      }

      .ViewerTitle {
        text-align: center;
        min-height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding: 5px;
        flex-basis: 60%;
      }

      #Header .ViewerTitle #series[href='#'],
      #Header .ViewerTitle #series[href=''],
      #Header .ViewerTitle #series[href='undefined'] {
        visibility: hidden;
      }

      #Header #menu .icon-tabler {
        position: absolute;
        top: 5px;
        left: 10px;
        height: 32px;
        width: 32px;
      }
      .ControlButton {
        cursor: pointer;
        border-radius: 5px;
        border-width: 1px;
        padding: 2px;
        min-height: 32px;
        color: var(--theme-primary-text-color);
        background-color: var(--theme-primary-color);
        border-color: var(--theme-border-color);
      }

      .ControlButton:hover {
        opacity: 0.8;
      }

      .panel {
        padding: 5px;
        position: inherit;
        border-radius: 5px;
        background-color: var(--theme-background-color);
      }
    `,
  ];
}

declare global {
  interface HTMLElementMangaPageMap {
    'manga-header': MangaHeader;
  }
}
