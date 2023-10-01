import type { IManga } from '../types';
import head from '../ui/reader';
import './manga-app';
// import './manga-online-reader';

export default function display(manga: IManga) {
  document.head.innerHTML = head(manga);
  document.body.innerHTML = '<manga-app></manga-app>';
  // document.body.innerHTML = '<manga-online-reader></manga-online-reader>';
}
