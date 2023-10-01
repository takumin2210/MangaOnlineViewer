import { css, html, LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { IconMessage } from './icons';
import { getLocaleString } from '../core/settings';
import iconsCSS from '../ui/styles/icons.css';
import { isBackgroundColorDark } from '../utils/colors';
import { IManga } from '../types';

@customElement('manga-comments-panel')
export default class MangaCommentsPanel extends LitElement {
  @property()
  manga?: IManga;

  render() {
    return html`
      <section id="CommentsPanel" class="${this.manga?.comments ? '' : 'hide'}">
        <div
          id="CommentsButton"
          class="ControlButton"
          title="${getLocaleString('DISPLAY_COMMENTS')}"
        >
          ${IconMessage} ${getLocaleString('DISPLAY_COMMENTS')}
        </div>
        <div
          id="CommentsArea"
          class="hide 
          ${isBackgroundColorDark(this.manga?.comments ?? document.body) ? 'dark' : 'light'}"
        >
          ${this.manga?.comments}
        </div>
      </section>
    `;
  }

  static styles = [
    unsafeCSS(iconsCSS),
    css`
      #CommentsPanel.hide,
      #CommentsArea.hide {
        display: none;
      }
      #MangaOnlineViewer #CommentsPanel {
        padding: 10px;
      }

      #MangaOnlineViewer #CommentsArea {
        background: var(--theme-body-background);
      }

      #MangaOnlineViewer #CommentsButton {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    `,
  ];
}
