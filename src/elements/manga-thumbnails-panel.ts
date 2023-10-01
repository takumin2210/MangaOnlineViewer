import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import { IMangaImages } from '../types';
import { IconCategory } from './icons';
import { getLocaleString, getUserSettings } from '../core/settings';
import sequence from '../utils/sequence';

@customElement('manga-thumbnails-panel')
export default class MangaThumbnailsPanel extends LitElement {
  @property({ reflect: true })
  visible = getUserSettings().showThumbnails;

  @property()
  manga?: IMangaImages;

  render() {
    return html`
      <nav id="Navigation" class="panel ${this.visible ? '' : 'disabled'}">
        <div id="NavigationCounters" class="ControlLabel">
          ${IconCategory}
          <i>0</i> /
          <b>
            ${this.manga && this.manga?.begin > 1
              ? this.manga.pages - (this.manga.begin - 1)
              : this.manga?.pages}
          </b>
          ${getLocaleString('PAGES_LOADED')}
        </div>
        <div id="Thumbnails">
          ${map(
            sequence(this.manga?.pages ?? 0, this.manga?.begin ?? 1),
            (index) =>
              html`<div id="Thumbnail${index}" class="Thumbnail">
                <img
                  id="ThumbnailImg${index}"
                  alt=""
                  class="ThumbnailImg"
                  src="${this.manga?.listImages[index]}"
                />
                <span class="ThumbnailIndex">${index}</span>
              </div>`,
          )}
        </div>
      </nav>
    `;
  }

  static styles = [
    css`
      .panel {
        padding: 5px;
        position: inherit;
        border-radius: 5px;
        background-color: var(--theme-background-color);
      }
      .Thumbnail .ThumbnailImg[src=''],
      .Thumbnail .ThumbnailImg:not([src]) {
        width: 100px;
        height: 150px;
        display: inline-block;
        background-position: center;
        background-repeat: no-repeat;
        background-size: 20%;
      }

      #NavigationCounters {
        margin: 5px;
        width: 100%;
        line-height: 1rem;
      }

      #Navigation {
        color: var(--theme-text-color);
        background-color: var(--theme-hightlight-color);
        bottom: -180px;
        height: 185px;
        overflow-x: hidden;
        overflow-y: hidden;
        padding-bottom: 20px;
        position: fixed;
        white-space: nowrap;
        width: 100%;
        text-align: center;
        transition:
          transform 0.3s ease-in,
          background-color 0.3s linear;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        line-height: 0;
      }

      #Navigation #Thumbnails {
        overflow-x: auto;
        overflow-y: hidden;
        margin-right: 10px;
      }

      #Navigation:hover {
        transform: translateY(-180px);
      }

      #Navigation.disabled {
        display: none;
      }

      #Navigation.visible {
        transform: translateY(-180px);
      }

      #Navigation .Thumbnail {
        display: inline-block;
        height: 150px;
        margin: 0 5px;
        border: 1px solid var(--theme-primary-color);
      }

      #Navigation .Thumbnail .ThumbnailIndex {
        color: var(--theme-text-color);
        background-color: var(--theme-hightlight-color);
        display: block;
        opacity: 0.8;
        position: relative;
        bottom: 25%;
        width: 100%;
        line-height: 1rem;
      }

      #Navigation .Thumbnail .ThumbnailImg {
        cursor: pointer;
        display: inline-block;
        max-height: 150px;
        min-height: 150px;
        min-width: 80px;
        max-width: 160px;
      }
    `,
  ];
}
declare global {
  interface HTMLElementMangaPageMap {
    'manga-thumbnails-panel': MangaThumbnailsPanel;
  }
}
