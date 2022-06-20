import * as React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import { IManga } from '../types';

export default function loadReader(manga: IManga) {
    createRoot(document.getElementById('MangaOnlineViewer')!).render(<App manga={manga} />);
}
