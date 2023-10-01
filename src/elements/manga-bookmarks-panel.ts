import { css, html, LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import { IconExternalLink, IconTrash, IconX } from './icons';
import { getLocaleString, getUserSettings } from '../core/settings';
import { isEmpty } from '../utils/checks';
import iconsCSS from '../ui/styles/icons.css';

@customElement('manga-bookmarks-panel')
export default class MangaBookmarksPanel extends LitElement {
  @property({ reflect: true })
  visible = false;
  listBookmarks() {
    if (isEmpty(getUserSettings().bookmarks)) {
      return [getLocaleString('LIST_EMPTY')];
    }

    return map(
      getUserSettings().bookmarks,
      (mark, index) =>
        html` <div id="Bookmark${index + 1}" class="BookmarkItem">
          <span class="bookmarkData bookmarkDate">
            ${new Date(mark.date).toISOString().slice(0, 10)}
          </span>
          <span class="bookmarkData bookmarkURl">
            <a class="" href="${mark.url}" target="_blank">${mark.url}</a>
          </span>
          <span class="bookmarkData bookmarkPage">Page: ${mark.page}</span>
          <span class="bookmarkData bookmarkFunctions">
            <a class="" href="${mark.url}" target="_blank">
              <button class="ControlButton open" title="Open Bookmark" type="button">
                ${IconExternalLink}
              </button>
            </a>
            <button
              class="ControlButton erase"
              title="Delete Bookmark"
              type="button"
              value="${mark.url}"
            >
              ${IconTrash}
            </button>
          </span>
        </div>`,
    );
  }

  render() {
    return html`
      <div id="BookmarksOverlay" class="overlay ${this.visible ? 'visible' : ''}"></div>
      <div id="BookmarksPanel" class="panel ${this.visible ? 'visible' : ''}">
        <button id="CloseBookmarks" class="closeButton" title="${getLocaleString('CLOSE')}">
          ${IconX}
        </button>
        <h2>${getLocaleString('BOOKMARKS')}</h2>
        <div id="BookmarksList">${this.listBookmarks()}</div>
      </div>`;
  }

  static styles = [
    unsafeCSS(iconsCSS),
    css`
      .panel {
        padding: 5px;
        position: inherit;
        border-radius: 5px;
        background-color: var(--theme-background-color);
      }
      #BookmarksPanel {
        position: fixed;
        top: 10%;
        width: 50%;
        left: 25%;
        right: 25%;
        text-align: center;
        max-height: 70%;
        transition: transform 0.3s ease-in-out;
        transform: scaleY(0%);
        z-index: 1000;
      }

      #BookmarksPanel.visible {
        transform: scaleY(100%);
        display: block;
      }

      #BookmarksList {
        padding: 0 15px;
        overflow: auto;
        max-height: 60vh;
      }

      #BookmarksList .BookmarkItem {
        display: flex;
        flex-flow: row;
        justify-content: space-between;
        align-items: center;
        padding: 2px;
      }

      #BookmarksList .bookmarkData {
        flex-basis: 15%;
      }

      #BookmarksList .bookmarkURl {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        flex-basis: 55%;
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
