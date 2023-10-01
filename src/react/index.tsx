import { createRoot } from 'react-dom/client';
import { IManga } from '../types';
import Reader from './components/Reader';
import head from '../display/reader';
import { loadManga } from '../display/page';
import events from '../display/events';

export default function loadReader(manga: IManga) {
    document.head.innerHTML = head(manga);
    document.body.innerHTML = "<div id='MangaOnlineViewer'></div>";
    createRoot(document.getElementById('MangaOnlineViewer')!).render(<Reader manga={manga} />);
    setTimeout(() => {
        events();
        loadManga(manga, 0);
    }, 1000);
}
