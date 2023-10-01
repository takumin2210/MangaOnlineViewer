import html from 'html-react-parser';
import type { IManga } from '../../types';
import {
    IconArrowAutofitDown,
    IconArrowAutofitHeight,
    IconArrowAutofitLeft,
    IconArrowAutofitRight,
    IconArrowAutofitWidth,
    IconArrowBigLeft,
    IconArrowBigRight,
    IconBookmarks,
    IconCategory,
    IconFileDownload,
    IconKeyboard,
    IconListNumbers,
    IconLoader2,
    IconMenu2,
    IconMessage,
    IconSettings,
    IconSpacingVertical,
    IconZoomInArea,
    IconZoomOutArea,
    IconZoomPan,
} from '../../display/components/icons';
import { getLocaleString, getUserSettings } from '../../core/settings';
import sequence from '../../utils/sequence';
import listPages from '../../display/components/MangaPages';
import ThumbnailsPanel from '../../display/components/ThumbnailsPanel';
import SettingsPanel from '../../display/components/SettingsPanel';
import KeybindingsPanel from '../../display/components/KeybindingsPanel';
import BookmarksPanel from '../../display/components/BookmarksPanel';
import { isBackgroundColorDark } from '../../utils/colors';

interface ReaderProps {
    manga: IManga;
}

function Reader({ manga }: ReaderProps) {
    const listOptions = (times: number, begin: number) =>
        sequence(times, begin).map((index: number) => `<option value='${index}'>${index}</option>`);
    return (
        <div id="Reader">
            <header id="Header" className={getUserSettings().header}>
                <div id="menu">{html(IconMenu2)}</div>
                <aside id="GlobalFunctions">
                    <span>
                        <button
                            type="button"
                            id="enlarge"
                            title={getLocaleString('ENLARGE')}
                            className="ControlButton"
                        >
                            {html(IconZoomInArea)}
                        </button>
                        <button
                            type="button"
                            id="restore"
                            title={getLocaleString('RESTORE')}
                            className="ControlButton"
                        >
                            {html(IconZoomPan)}
                        </button>
                        <button
                            type="button"
                            id="reduce"
                            title={getLocaleString('REDUCE')}
                            className="ControlButton"
                        >
                            {html(IconZoomOutArea)}
                        </button>
                        <button
                            type="button"
                            id="fitWidth"
                            title={getLocaleString('FIT_WIDTH')}
                            className="ControlButton"
                        >
                            {html(IconArrowAutofitWidth)}
                        </button>
                        <button
                            type="button"
                            id="fitHeight"
                            title={getLocaleString('FIT_HEIGHT')}
                            className="ControlButton"
                        >
                            {html(IconArrowAutofitHeight)}
                        </button>
                        <button
                            type="button"
                            id="keybindings"
                            title={getLocaleString('KEYBINDINGS')}
                            className="ControlButton"
                        >
                            {html(IconKeyboard)}
                        </button>
                    </span>
                    <span>
                        <button
                            type="button"
                            id="ltrMode"
                            title={getLocaleString('VIEW_MODE_LEFT')}
                            className="ControlButton"
                        >
                            {html(IconArrowAutofitRight)}
                        </button>
                        <button
                            type="button"
                            id="verticalMode"
                            title={getLocaleString('VIEW_MODE_VERTICAL')}
                            className="ControlButton tablets"
                        >
                            {html(IconArrowAutofitDown)}
                        </button>
                        <button
                            type="button"
                            id="webComic"
                            title={getLocaleString('VIEW_MODE_WEBCOMIC')}
                            className="ControlButton tablets"
                        >
                            {html(IconSpacingVertical)}
                        </button>
                        <button
                            type="button"
                            id="rtlMode"
                            title={getLocaleString('VIEW_MODE_RIGHT')}
                            className="ControlButton"
                        >
                            {html(IconArrowAutofitLeft)}
                        </button>
                        <button
                            type="button"
                            id="pageControls"
                            title={getLocaleString('TOGGLE_CONTROLS')}
                            className="ControlButton tablets"
                        >
                            {html(IconListNumbers)}
                        </button>
                        <button
                            type="button"
                            id="bookmarks"
                            title={getLocaleString('BOOKMARKS')}
                            className="ControlButton tablets"
                        >
                            {html(IconBookmarks)}
                        </button>
                        <button
                            type="button"
                            id="settings"
                            title={getLocaleString('SETTINGS')}
                            className="ControlButton tablets phones"
                        >
                            {html(IconSettings)}
                        </button>
                    </span>
                    <span id="ZoomSlider">
                        <output id="ZoomVal" className="RangeValue" htmlFor="Zoom">
                            {getUserSettings().defaultZoom}%
                        </output>
                        <input
                            type="range"
                            value={getUserSettings().defaultZoom}
                            name="Zoom"
                            id="Zoom"
                            min="1"
                            max="200"
                        />
                    </span>
                </aside>
                <div className="ViewerTitle">
                    <h1 id="MangaTitle">{manga.title}</h1>
                    <a id="series" href={manga.series}>
                        ({getLocaleString('RETURN_CHAPTER_LIST')})
                    </a>
                </div>
                <nav id="ChapterNavigation">
                    <div id="Counters" className="ControlLabel">
                        {getLocaleString('PAGES_LOADED')}:<i>0</i> /{' '}
                        <b>{manga.begin > 1 ? manga.pages - (manga.begin - 1) : manga.pages}</b>
                        <span className="ControlLabel">{getLocaleString('GO_TO_PAGE')}:</span>
                        <select id="gotoPage">
                            <option selected>#</option>
                            {listOptions(manga.pages, manga.begin).join('')}
                        </select>
                    </div>
                    <div id="ChapterControl" className="ChapterControl">
                        <button
                            type="button"
                            id="download"
                            className="NavigationControlButton ControlButton disabled"
                            title={getLocaleString('DOWNLOAD_ZIP')}
                        >
                            {html(IconFileDownload)}
                            {html(IconLoader2)}
                            {getLocaleString('BUTTON_DOWNLOAD')}
                        </button>
                        <a
                            id="prev"
                            className="NavigationControlButton ControlButton"
                            type="button"
                            href={manga.prev ?? ''}
                            title={getLocaleString('PREVIOUS_CHAPTER')}
                        >
                            {html(IconArrowBigLeft)}
                            {getLocaleString('BUTTON_PREVIOUS')}
                        </a>
                        <a
                            id="next"
                            className="NavigationControlButton ControlButton"
                            type="button"
                            href={manga.next ?? ''}
                            title={getLocaleString('NEXT_CHAPTER')}
                        >
                            {getLocaleString('BUTTON_NEXT')}
                            {html(IconArrowBigRight)}
                        </a>
                    </div>
                </nav>
            </header>
            <main
                id="Chapter"
                className={`${getUserSettings().fitWidthIfOversize ? 'fitWidthIfOversize' : ''} ${
                    getUserSettings().viewMode
                }`}
            >
                {html(listPages(manga.pages, manga.begin).join(' '))}
            </main>
            <section id="CommentsPainel" className={manga.comments ? '' : 'hide'}>
                <div
                    id="CommentsButton"
                    className="ControlButton"
                    title={getLocaleString('DISPLAY_COMMENTS')}
                >
                    {html(IconMessage)}
                    {getLocaleString('DISPLAY_COMMENTS')}
                </div>
                <div
                    id="CommentsArea"
                    className={`hide${isBackgroundColorDark(manga.comments ?? document.body)}
                            ? 'dark'
                            : 'light'
                    }`}
                >
                    {manga.comments?.outerHTML}
                </div>
            </section>
            <nav
                id="Navigation"
                className={`panel ${getUserSettings().showThumbnails} ? '' : 'disabled'}`}
            >
                <div id="NavigationCounters" className="ControlLabel">
                    {html(IconCategory)}
                    <i>0</i> /{' '}
                    <b>{manga.begin > 1 ? manga.pages - (manga.begin - 1) : manga.pages}</b>
                    {getLocaleString('PAGES_LOADED')}
                </div>
                <div id="Thumbnails">
                    {html(ThumbnailsPanel(manga.pages, manga.begin).join(' '))}
                </div>
            </nav>
            {html(SettingsPanel)}
            {html(KeybindingsPanel)}
            {html(BookmarksPanel)}
        </div>
    );
}

export default Reader;
