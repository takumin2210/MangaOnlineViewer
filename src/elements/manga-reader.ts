import { css, html, LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import './manga-page';
import type { IMangaImages } from '../types';
import { getUserSettings } from '../core/settings';
import localhost from '../main/localhost';
import iconsCSS from '../ui/styles/icons.css';
import sequence from '../utils/sequence';

@customElement('manga-reader')
export default class MangaReader extends LitElement {
  @property()
  manga: IMangaImages = localhost.run();

  render() {
    return html`
      <main
        id="Chapter"
        class="${getUserSettings().fitWidthIfOversize ? 'fitWidthIfOversize' : ''}
      ${getUserSettings().viewMode}"
      >
        ${map(
          sequence(this.manga.pages, this.manga.begin),
          (index) =>
            html`<manga-page
              id="PageImg${index}"
              class="MangaPage"
              index="${index}"
              src="${this.manga.listImages[index]}"
            ></manga-page>`,
        )}
      </main>
    `;
  }

  static styles = [
    unsafeCSS(iconsCSS),
    css`
      #Chapter {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        min-width: 225px;
      }

      #Chapter.FluidLTR {
        direction: ltr;
      }

      #Chapter.FluidRTL {
        direction: rtl;
      }

      #Chapter.FluidLTR,
      #Chapter.FluidRTL {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
      }

      #Chapter.FluidLTR .PageImg,
      #Chapter.FluidRTL .PageImg {
        min-width: unset;
      }

      #Chapter.FluidLTR .MangaPage.DoublePage,
      #Chapter.FluidRTL .MangaPage.DoublePage {
        grid-column: span 2;
      }

      #Chapter.FluidLTR .MangaPage:not(.DoublePage):nth-child(2n),
      #Chapter.FluidRTL .MangaPage:not(.DoublePage):nth-child(2n) {
        display: flex;
        justify-content: start;
      }

      #Chapter.FluidLTR .MangaPage:not(.DoublePage):nth-child(2n-1),
      #Chapter.FluidRTL .MangaPage:not(.DoublePage):nth-child(2n-1) {
        display: flex;
        justify-content: end;
      }

      #Chapter.Vertical .PageContent {
        margin-bottom: 15px;
      }

      #Chapter.FluidLTR .MangaPage,
      #Chapter.FluidRTL .MangaPage {
        width: auto;
      }

      #Chapter.FluidLTR .ZoomWidth .icon-tabler,
      #Chapter.FluidRTL .ZoomWidth .icon-tabler {
        color: red;
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
      #MangaOnlineViewer:not(.bookmarked) .ControlButton.Bookmark > .icon-tabler-bookmark-off {
        display: none;
      }

      #MangaOnlineViewer.hideControls .PageFunctions {
        visibility: hidden;
      }
    `,
  ];
}
