import sites from '../main';

export default {
  name: 'Manga OnlineViewer',
  author: 'Tago',
  updateURL: 'https://github.com/TagoDR/MangaOnlineViewer/raw/master/Manga_OnlineViewer.meta.js',
  downloadURL: 'https://github.com/TagoDR/MangaOnlineViewer/raw/master/Manga_OnlineViewer.user.js',
  namespace: 'https://github.com/TagoDR',
  description: `Shows all pages at once in online view for these sites: ${sites
    .flatMap((s) => s.name)
    .map((s) => s.trim())
    .join(', ')}`,
  version: new Date().toISOString().slice(0, 10).replaceAll('-', '.'),
  license: 'MIT',
  grant: ['GM_getValue', 'GM_setValue', 'GM_listValues', 'GM_deleteValue', 'GM_xmlhttpRequest'],
  connect: '*',
  include: sites.map((s) => s.url.toString()),
  exclude: [/https?:\/\/(www.)?tsumino.com\/.+/, /https?:\/\/(www.)?pururin.io\/.+/],
} as Partial<Tampermonkey.ScriptMetadata>;
