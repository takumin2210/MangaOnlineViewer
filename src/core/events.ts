import $ from 'jquery';
import Swal from 'sweetalert2';
import { getValueGM, logScript, setValueGM } from '../utils/tampermonkey';
import generateZip from './download';
import { applyZoom, reloadImage } from './page';
import { settings } from './settings';
import { addCustomTheme, addFullCustomTheme } from './themes';
import { IBookmark } from '../types';

// Goto Page and Thumbnails
function scrollToElement(ele: JQuery) {
  $(window)
    .scrollTop(ele.offset()?.top || 0)
    .scrollLeft(ele.offset()?.left || 0);
}

// Clean key press configurations and set some when specified
function setKeyDownEvents() {
  try {
    $(document).off('keyup');
    $(document).off('keydown');
    $(document).off('keypress');
    $(document).off('onload');
    $(window).off('keyup');
    $(window).off('keydown');
    $(window).off('keypress');
    $(window).off('onload');
    document.onkeydown = null;
    document.onkeypress = null;
    window.onkeydown = null;
    window.onkeypress = null;
    window.onload = null;
    document.body.onload = null;
  } catch (e) {
    logScript(`Keybinds error: ${e}`);
  }

  function processKey(e: JQuery.KeyDownEvent<Document, undefined, Document, Document>) {
    const a = e.originalEvent?.code;
    if (
      !e.originalEvent?.ctrlKey &&
      !e.originalEvent?.altKey &&
      !e.originalEvent?.shiftKey &&
      !e.originalEvent?.metaKey &&
      $.inArray(a, [
        'KeyW',
        'Numpad8',
        'KeyS',
        'Numpad2',
        'ArrowRight',
        'Period',
        'KeyD',
        'Numpad6',
        'ArrowLeft',
        'Comma',
        'KeyA',
        'Numpad4',
        'Equal',
        'NumpadAdd',
        'KeyE',
        'Minus',
        'NumpadSubtract',
        'KeyQ',
        'Digit9',
        'NumpadDivide',
        'KeyR',
        'Digit0',
        'NumpadMultiply',
        'KeyF',
        'Slash',
        'Numpad5',
        'KeyX',
        'KeyC',
        'KeyV',
        'KeyB',
        'KeyN',
      ]) !== -1
    ) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      switch (a) {
        case 'ArrowUp':
        case 'KeyW':
        case 'Numpad8':
          if (settings.zoom === -1000) {
            const next = $('.MangaPage')
              .get()
              .map((item) => $(item).offset()!.top - $(window).scrollTop()!)
              .findIndex((element) => element > 10);
            scrollToElement($('.MangaPage').eq(next - 2));
          } else {
            window.scrollBy({
              top: -$(window).height()! / 2,
              behavior: 'smooth',
            });
          }
          break;
        case 'ArrowDown':
        case 'KeyS':
        case 'Numpad2':
          if (settings.zoom === -1000) {
            const next = $('.MangaPage')
              .get()
              .map((item) => $(item).offset()!.top - $(window).scrollTop()!)
              .findIndex((element) => element > 10);
            scrollToElement($('.MangaPage').eq(next));
          } else {
            window.scrollBy({
              top: $(window).height()! / 2,
              behavior: 'smooth',
            });
          }
          break;
        case 'ArrowRight':
        case 'Period':
        case 'KeyD':
        case 'Numpad6':
          $('.ChapterControl:first .next').trigger('click');
          break;
        case 'ArrowLeft':
        case 'Comma':
        case 'KeyA':
        case 'Numpad4':
          $('.ChapterControl:first .prev').trigger('click');
          break;
        case 'Equal':
        case 'NumpadAdd':
        case 'KeyE':
          $('#enlarge').trigger('click');
          break;
        case 'Minus':
        case 'NumpadSubtract':
        case 'KeyQ':
          $('#reduce').trigger('click');
          break;
        case 'Digit9':
        case 'NumpadDivide':
        case 'KeyR':
          $('#restore').trigger('click');
          break;
        case 'Digit0':
        case 'NumpadMultiply':
        case 'KeyF':
          $('#fitWidth').trigger('click');
          break;
        case 'Slash':
        case 'Numpad5':
        case 'KeyX':
          $('#settings').trigger('click');
          break;
        case 'KeyC':
          $('#webComic').trigger('click');
          break;
        case 'KeyV':
          $('#verticalMode').trigger('click');
          break;
        case 'KeyN':
          $('#rtlMode').trigger('click');
          break;
        case 'KeyB':
          $('#ltrMode').trigger('click');
          break;
        default:
          break;
      }
      return false;
    }
    return true;
  }

  $(document).on('keydown', processKey);
}

// Controls for the extra features added to the sites
function controls() {
  // Size Controls
  $('#enlarge').on('click', () => {
    settings.zoom += settings.zoomStep;
    $('#Zoom b').html(settings.zoom.toString());
    applyZoom();
  });
  $('#reduce').on('click', () => {
    settings.zoom -= settings.zoomStep;
    $('#Zoom b').html(settings.zoom.toString());
    applyZoom();
  });
  $('#restore').on('click', () => {
    settings.zoom = 100;
    $('#Zoom b').html(settings.zoom.toString());
    applyZoom();
  });
  $('#fitWidth').on('click', () => {
    settings.zoom = 1000;
    $('#Zoom b').html(settings.zoom.toString());
    applyZoom();
  });
  $('#fitHeight').on('click', () => {
    settings.zoom = -1000;
    $('#Zoom b').html(settings.zoom.toString());
    applyZoom();
  });
  $('#zoomStep').on('change', (event) => {
    const step = $(event.target).val();
    setValueGM('ZoomStep', parseInt(step as string, 10));
    logScript(`zoomStep: ${getValueGM('ZoomStep')}`);
  });
  // WebComic View Mode
  $('#webComic').on('click', () => {
    $('#Chapter').addClass('WebComic').removeClass('FluidLTR').removeClass('FluidRTL');
    applyZoom();
  });
  // Fluid LTR View Mode
  $('#ltrMode').on('click', () => {
    $('#Chapter').removeClass('WebComic').addClass('FluidLTR').removeClass('FluidRTL');
    applyZoom();
  });
  // Fluid RTL View Mode
  $('#rtlMode').on('click', () => {
    $('#Chapter').removeClass('WebComic').removeClass('FluidLTR').addClass('FluidRTL');
    applyZoom();
  });
  // Vertical View Mode
  $('#verticalMode').on('click', () => {
    $('#Chapter').removeClass('WebComic').removeClass('FluidLTR').removeClass('FluidRTL');
    applyZoom();
  });
  $('#fitIfOversize').on('change', (event) => {
    $('#Chapter').toggleClass('fitWidthIfOversize');
    if ($(event.target).is(':checked')) {
      setValueGM('FitWidthIfOversize', true);
    } else {
      setValueGM('FitWidthIfOversize', false);
    }
    logScript(`fitIfOversize: ${getValueGM('FitWidthIfOversize')}`);
  });
  $('#viewMode').on('change', (event) => {
    const mode = $(event.target).val() as string;
    $('#Chapter')
      .removeClass('WebComic')
      .removeClass('FluidLTR')
      .removeClass('FluidRTL')
      .addClass(mode);
    setValueGM('ViewMode', mode);
    logScript(`ViewMode: ${getValueGM('ViewMode')}`);
    applyZoom();
  });
  $('#loadMode').on('change', (event) => {
    const mode = $(event.target).val() as string;
    setValueGM('LoadMode', mode);
    logScript(`MangaLoadMode: ${getValueGM('LoadMode')}`);
  });
  $('#showThumbnails').on('change', (event) => {
    $('#Navigation').toggleClass('disabled');
    if ($(event.target).is(':checked')) {
      setValueGM('ShowThumbnails', true);
    } else {
      setValueGM('ShowThumbnails', false);
    }
    logScript(`MangaShowThumbnails: ${getValueGM('ShowThumbnails')}`);
    applyZoom();
  });
  // Download
  $('#downloadZip').on('change', (event) => {
    if ($(event.target).is(':checked')) {
      setValueGM('DownloadZip', true);
      Swal.fire({
        title: 'Attention',
        text: 'Next time a chapter finish loading you will be prompted to save automatically',
        timer: 10000,
        icon: 'info',
      });
    } else {
      setValueGM('DownloadZip', false);
    }
    logScript(`MangaDownloadZip: ${getValueGM('DownloadZip')}`);
  });
  $('#blob').one('click', generateZip);
  $('.download').on('click', () => {
    logScript('Downloading Chapter');
    $('#blob').trigger('click');
  });
  $('#lazyLoadImages').on('change', (event) => {
    if ($(event.target).is(':checked')) {
      setValueGM('LazyLoadImages', true);
      Swal.fire({
        title: 'Warning',
        html: `Lazy load is incompatible with zip download, you will not be able to download with this setting ON.<br/>
               Suggestion: <span style="color:red;font-weight:bold">Disable Thumbnails</span> to save Bandwidth/Memory.`,
        icon: 'warning',
      });
    } else {
      setValueGM('LazyLoadImages', false);
    }
    logScript(`MangaLazyLoadImages: ${getValueGM('LazyLoadImages')}`);
  });
  $('#lazyStart').on('change', (event) => {
    const start = $(event.target).val() as string;
    setValueGM('LazyStart', start);
    logScript(`lazyStart: ${getValueGM('LazyStart')}`);
  });
  $('#PagesPerSecond').on('change', (event) => {
    setValueGM('Timer', parseInt($(event.target).val() as string, 10));
    logScript(`MangaTimer: ${getValueGM('Timer')}`);
  });
  $('#DefaultZoom').on('change', (event) => {
    settings.zoom = parseInt($(event.target).val() as string, 10);
    $('#Zoom b').html(settings.zoom.toString);
    setValueGM('Zoom', parseInt(settings.zoom.toString(), 10));
    logScript(`MangaZoom: ${getValueGM('Zoom')}`);
    applyZoom();
  });
  // Toggle Controls
  $('#pageControls').on('click', () => {
    $('#MangaOnlineViewer').toggleClass('hideControls');
  });
  $('#hidePageControls').on('change', (event) => {
    $('#MangaOnlineViewer').toggleClass('hideControls');
    if ($(event.target).is(':checked')) {
      setValueGM('HidePageControls', true);
    } else {
      setValueGM('HidePageControls', false);
    }
    logScript(`MangaHidePageControls: ${getValueGM('HidePageControls')}`);
  });
  // Theme Control
  $('#ThemeSelector').on('change', (event) => {
    const target = $(event.target);
    $('#MangaOnlineViewer , body')
      .removeClass()
      .addClass(target.val() as string);
    logScript('Theme', target.val());
    setValueGM('Theme', target.val() as string);
    if (target.val() === 'Custom_Dark' || target.val() === 'Custom_Light') {
      $('.CustomTheme').show();
    } else {
      $('.CustomTheme').hide();
    }
    if (target.val() === 'Full_Custom') {
      $('.FullCustom').show();
    } else {
      $('.FullCustom').hide();
    }
  });
  // try {
  //   jscolor.presets.default = {
  //     position: 'right',
  //     format: 'hex',
  //     palette: [
  //       '#000000', '#7d7d7d', '#870014', '#ec1c23', '#ff7e26',
  //       '#fef100', '#22b14b', '#00a1e7', '#3f47cc', '#a349a4',
  //       '#ffffff', '#c3c3c3', '#b87957', '#feaec9', '#ffc80d',
  //       '#eee3af', '#b5e61d', '#99d9ea', '#7092be', '#c8bfe7',
  //     ],
  //     // paletteCols: 12,
  //     hideOnPaletteClick: true,
  //     closeButton: true,
  //     shadow: false,
  //     alphaChannel: false,
  //     paletteSetsAlpha: false,
  //   };
  //   jscolor.install();
  // } catch (e) {
  //   logScript(e);
  // }
  // $('INPUT.colorpicker').minicolors();
  $('#CustomThemeHue').on('change', (event) => {
    const target = $(event.target).val() as string;
    logScript(`CustomTheme: ${target}`);
    $('style[title="Custom_Light"], style[title="Custom_Dark"]').remove();
    $('head').append(addCustomTheme(target));
    setValueGM('CustomTheme', target);
    logScript(`MangaCustomTheme: ${getValueGM('CustomTheme')}`);
  });
  $('.FullCustom').on('change', () => {
    logScript(
      'FullCustomTheme: ',
      $('#CustomThemeHueBody').val(),
      $('#CustomThemeHueText').val(),
      $('#CustomThemeHueLines').val(),
      $('#CustomThemeHuePanel').val(),
      $('#CustomThemeHueButton').val(),
    );
    $('style[title="Full_Custom"]').remove();
    $('head').append(
      addFullCustomTheme(
        $('#CustomThemeHueBody').val() as string,
        $('#CustomThemeHueText').val() as string,
        $('#CustomThemeHueLines').val() as string,
        $('#CustomThemeHuePanel').val() as string,
        $('#CustomThemeHueButton').val() as string,
      ),
    );
    setValueGM('CustomThemeBody', $('#CustomThemeHueBody').val() as string);
    setValueGM('CustomThemeText', $('#CustomThemeHueText').val() as string);
    setValueGM('CustomThemeLines', $('#CustomThemeHueLines').val() as string);
    setValueGM('CustomThemePanel', $('#CustomThemeHuePanel').val() as string);
    setValueGM('CustomThemeButton', $('#CustomThemeHueButton').val() as string);
  });

  $('#gotoPage').on('change', (event) => {
    applyZoom();
    scrollToElement($(`#Page${$(event.target).val()}`));
  });
  $('.Thumbnail').on('click', (event) => {
    applyZoom();
    scrollToElement($(`#Page${$(event.currentTarget).find('span').html()}`));
  });
  // Settings Control
  $('#settings').on('click', () => {
    $('#ViewerControls').slideToggle();
    $('#ViewerShortcuts').slideToggle();
    $('#ImageOptions').toggleClass('settingsOpen');
    $('#Navigation').toggleClass('visible');
  });
  // Individual Page functions
  // Bookmark Page to resume reading
  $('.Bookmark').on('click', (event) => {
    const num = parseInt(
      $(event.target).parents('.MangaPage').find('.PageFunctions span').text(),
      10,
    );
    const mark: IBookmark = {
      url: window.location.href,
      page: num,
      date: Date.now(),
    };
    const found = settings.bookmarks.filter((el) => el.url === mark.url).length > 0;
    settings.bookmarks = settings.bookmarks.filter((el) => el.url !== mark.url);
    if (found) {
      Swal.fire({
        title: 'Bookmark Removed',
        timer: 10000,
        icon: 'error',
      });
    } else {
      settings.bookmarks.push(mark);
      Swal.fire({
        title: 'Saved Bookmark',
        html: `Next time you open this chapter it will resume from:<h4>Page ${num}</h4>(Only <i>ONCE</i> per Bookmark, will be removed after a year unused)`,
        icon: 'success',
      });
    }
    setValueGM('Bookmarks', JSON.stringify(settings.bookmarks));
    logScript(`MangaBookmarks: ${getValueGM('Bookmarks')}`);
  });
  // Reload Page
  $('.Reload').on('click', (event) => {
    reloadImage(
      $(event.target).parents('.MangaPage').find('.PageContent img')[0] as HTMLImageElement,
    );
  });
  // ZoomIn
  $('.ZoomIn').on('click', (event) => {
    const img = $(event.target).parents('.MangaPage').find('.PageContent img');
    const ratio = (img.width()! / img.prop('naturalWidth')) * (100 + settings.zoomStep);
    applyZoom(`#${$(event.target).attr('id')}`, ratio);
  });
  // ZoomOut
  $('.ZoomOut').on('click', (event) => {
    const img = $(event.target).parents('.MangaPage').find('.PageContent img');
    const ratio = (img.width()! / img.prop('naturalWidth')) * (100 - settings.zoomStep);
    applyZoom(`#${$(event.target).attr('id')}`, ratio);
  });
  // ZoomRestore
  $('.ZoomRestore').on('click', () => {
    $('.PageContent img').removeAttr('width');
  });
  // ZoomWidth
  $('.ZoomWidth').on('click', (event) => {
    $(event.target).parents('.MangaPage').find('.PageContent img');
    applyZoom(`#${$(event.target).attr('id')}`, 1000);
  });
  // ZoomHeight
  $('.ZoomHeight').on('click', (event) => {
    $(event.target).parents('.MangaPage').find('.PageContent img');
    applyZoom(`#${$(event.target).attr('id')}`, -1000);
  });
  // Hide
  $('.Hide').on('click', (event) => {
    const img = $(event.target).parents('.MangaPage').find('.PageContent');
    img.slideToggle('slow');
  });
}

export { controls, setKeyDownEvents };