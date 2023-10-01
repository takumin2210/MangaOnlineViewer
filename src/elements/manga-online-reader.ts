import { LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import type { IMangaImages } from '../types';
import localhost from '../main/localhost';
import app from '../ui/components/App';
import styles from '../ui/styles/styles';

@customElement('manga-online-reader')
export default class MangaOnlineReader extends LitElement {
  @property()
  manga: IMangaImages = localhost.run();

  render() {
    return unsafeHTML(app(this.manga));
  }

  static styles = [unsafeCSS(styles)];
}

declare global {
  interface HTMLElementMangaPageMap {
    'manga-online-reader': MangaOnlineReader;
  }
}
