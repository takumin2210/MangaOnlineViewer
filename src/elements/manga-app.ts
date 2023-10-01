import { css, html, LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './manga-reader';
import './manga-header';
import './manga-bookmarks-panel';
import './manga-keybindings-panel';
import './manga-settings-panel';
import './manga-thumbnails-panel';
import './manga-comments-panel';
import type { IMangaImages } from '../types';
import { getUserSettings, isBookmarked } from '../core/settings';
import localhost from '../main/localhost';
import iconsCSS from '../ui/styles/icons.css';

@customElement('manga-app')
export default class MangaApp extends LitElement {
  @property()
  manga: IMangaImages = localhost.run();

  render() {
    return html`<div
      id="MangaOnlineViewer"
      class="${getUserSettings().colorScheme} 
        ${getUserSettings().hidePageControls ? 'hideControls' : ''}
        ${isBookmarked() ? 'bookmarked' : ''}"
      data-theme="${getUserSettings().theme}"
    >
      <manga-header .manga="${this.manga}"></manga-header>
      <manga-reader .manga="${this.manga}"></manga-reader>
      <manga-comments-panel .manga="${this.manga}"></manga-comments-panel>
      <manga-thumbnails-panel .manga="${this.manga}"></manga-thumbnails-panel>
      <manga-settings-panel></manga-settings-panel>
      <manga-keybindings-panel></manga-keybindings-panel>
      <manga-bookmarks-panel></manga-bookmarks-panel>
    </div>`;
  }

  static styles = [
    unsafeCSS(iconsCSS),
    css`
      #MangaOnlineViewer {
        padding-bottom: 40px;
        min-height: 760px;
        min-width: 360px;
        text-decoration: none;
        color: var(--theme-body-text-color);
        background-color: var(--theme-body-background);
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

      select {
        height: 20px;
        padding: 0;
        margin-bottom: 5px;
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

      .fitWidthIfOversize .PageContent .PageImg {
        max-width: 100%;
      }

      .ControlButton.hidden,
      #MangaOnlineViewer.light #ColorScheme > .icon-tabler-sun,
      #MangaOnlineViewer:not(.light) #ColorScheme > .icon-tabler-moon,
      .ChapterControl #download.loading > .icon-tabler-file-download,
      .ChapterControl #download:not(.loading) > .icon-tabler-loader-2,
      .MangaPage.hide .ControlButton.Hide > .icon-tabler-eye-off,
      .MangaPage:not(.hide) .ControlButton.Hide > .icon-tabler-eye,
      #MangaOnlineViewer.bookmarked .ControlButton.Bookmark > .icon-tabler-bookmark,
      #MangaOnlineViewer:not(.bookmarked) .ControlButton.Bookmark > .icon-tabler-bookmark-off,
      #CommentsPainel.hide,
      #CommentsArea.hide {
        display: none;
      }

      #MangaOnlineViewer.hideControls .PageFunctions {
        visibility: hidden;
      }

      #CommentsPainel {
        padding: 10px;
      }

      #CommentsArea {
        background: var(--theme-body-background);
      }

      #CommentsButton {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      #MangaOnlineViewer .es_ES,
      #MangaOnlineViewer .pt_BR,
      #MangaOnlineViewer .zh_CN,
      #MangaOnlineViewer:not([locale='en_US']) .en_US {
        display: none;
      }

      #MangaOnlineViewer:not([locale]) .en_US,
      #MangaOnlineViewer[locale='en_US'] .en_US,
      #MangaOnlineViewer[locale='es_ES'] .es_ES,
      #MangaOnlineViewer[locale='pt_BR'] .pt_BR,
      #MangaOnlineViewer[locale='zh_CN'] .zh_CN {
        display: initial;
      }
    `,
  ];
}

declare global {
  interface HTMLElementMangaPageMap {
    'manga-app': MangaApp;
  }
}
