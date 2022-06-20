import loadReader from '../react';
import { IManga } from '../types';
import { logScript } from '../utils/tampermonkey';

export default function display(manga: IManga, begin: number) {
  window.stop();
  if (manga.before !== undefined) {
    manga.before();
  }
  document.head.innerHTML = `
<title>
  ${manga.title || document.getElementsByTagName('title')[0].innerHTML}
</title>
  <meta charset='UTF-8' >`;
  document.body.innerHTML = "<div id='MangaOnlineViewer'></div>";
  document.body.className = '';
  document.body.removeAttribute('style');
  logScript('Rebuilding Site');
  setTimeout(() => {
    try {
      setTimeout(() => {
        loadReader({ ...manga, begin });
      }, 50);
    } catch (e) {
      logScript(e);
    }
  }, 50);
  if (manga.after !== undefined) {
    manga.after();
  }
}
