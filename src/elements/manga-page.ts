import { css, html, LitElement, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {
  IconArrowAutofitHeight,
  IconArrowAutofitWidth,
  IconBookmark,
  IconBookmarkOff,
  IconEye,
  IconEyeOff,
  IconRefresh,
  IconZoomCancel,
  IconZoomIn,
  IconZoomOut,
} from './icons';
import { getLocaleString } from '../core/settings';
import iconsCSS from '../ui/styles/icons.css';

@customElement('manga-page')
export default class MangaPage extends LitElement {
  @property({ type: Number })
  index = 0;

  @property({ type: String })
  src = '';

  @state() visible = true;

  @state() bookmarked = false;

  render() {
    return html` <div id="Page${this.index}" class="MangaPage">
      <div class="PageFunctions">
        <button class="Bookmark ControlButton" title="${getLocaleString('BOOKMARK')}">
          ${!this.bookmarked ? IconBookmark : IconBookmarkOff}
        </button>
        <button class="ZoomIn ControlButton" title="${getLocaleString('ZOOM_IN')}">
          ${IconZoomIn}
        </button>
        <button class="ZoomRestore ControlButton" title="${getLocaleString('ZOOM_RESET')}">
          ${IconZoomCancel}
        </button>
        <button class="ZoomOut ControlButton" title="${getLocaleString('ZOOM_OUT')}">
          ${IconZoomOut}
        </button>
        <button class="ZoomWidth ControlButton" title="${getLocaleString('ZOOM_WIDTH')}">
          ${IconArrowAutofitWidth}
        </button>
        <button class="ZoomHeight ControlButton" title="${getLocaleString('ZOOM_HEIGHT')}">
          ${IconArrowAutofitHeight}
        </button>
        <button class="Hide ControlButton" title="${getLocaleString('HIDE')}">
          ${!this.visible ? IconEye : IconEyeOff}
        </button>
        <button class="Reload ControlButton" title="${getLocaleString('RELOAD')}">
          ${IconRefresh}
        </button>
        <span class="PageIndex">${this.index}</span>
      </div>
      <div class="PageContent">
        <img
          id="PageImg${this.index}"
          alt="Manga Page ${this.index}"
          class="PageImg"
          src=${this.src}
        />
      </div>
    </div>`;
  }

  static styles = [
    unsafeCSS(iconsCSS),
    css`
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
      .PageFunctions .ControlButton {
        padding: 3px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0;
        border-width: 0;
        min-height: auto;
        opacity: 0.5;
      }
      .PageFunctions:hover .ControlButton {
        opacity: 1;
      }
      .PageFunctions .ControlButton:hover {
        opacity: 0.9;
      }
      .icon-tabler {
        height: 1rem;
        width: 1rem;
        align-self: center;
        vertical-align: sub;
      }
      .MangaPage {
        text-align: center;
        line-height: 0;
      }
      .PageFunctions {
        font-family: monospace;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin: 0;
        padding: 0;
        gap: 3px;
        position: absolute;
        right: 0;
      }
      .MangaPage {
        text-align: center;
        line-height: 0;
      }
      .PageContent {
        text-align: center;
        display: inline-block;
        overflow-x: auto;
        max-width: 100%;
        transition: all 0.3s ease-in-out;
        height: 100%;
        overflow-y: hidden;
      }
      img {
        height: auto;
        vertical-align: middle;
        border: 0 none;
      }
      .PageContent .PageImg {
        min-width: 30vw;
        max-width: 100%;
      }
      .PageFunctions > .PageIndex {
        background-color: var(--theme-primary-color);
        color: var(--theme-primary-text-color);
        min-width: 20px;
        text-align: center;
        display: inline-block;
        padding: 3px 5px;
        line-height: 1rem;
        border-radius: 5px;
      }
    `,
  ];
}

declare global {
  interface HTMLElementMangaPageMap {
    'manga-page': MangaPage;
  }
}
