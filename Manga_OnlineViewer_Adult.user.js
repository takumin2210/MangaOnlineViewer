// ==UserScript==
// @name Manga OnlineViewer Adult
// @author Tago
// @updateURL https://github.com/TagoDR/MangaOnlineViewer/raw/master/Manga_OnlineViewer_Adult.meta.js
// @downloadURL https://github.com/TagoDR/MangaOnlineViewer/raw/master/Manga_OnlineViewer_Adult.user.js
// @namespace https://github.com/TagoDR
// @description Shows all pages at once in online view for these sites: ASMHentai, BestPornComix, DoujinMoeNM, 8Muses, ExHentai,e-Hentai, HBrowser, Hentai2Read, HentaiFox, HentaiHand, HentaIHere, HentaiMimi, hitomi, Imhentai, KingComix, MultPorn, MyHentaiGallery, nHentai.net,nHentai.xxx, nHentai.com, 9Hentai, PornComixOnline, Pururin, Simply-Hentai, TMOHentai, Tsumino, vermangasporno,vercomicsporno, xyzcomics
// @version 2022.06.06
// @license MIT
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_listValues
// @grant GM_deleteValue
// @grant GM_xmlhttpRequest
// @connect *
// @require https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js
// @require https://cdnjs.cloudflare.com/ajax/libs/jszip/3.9.1/jszip.min.js
// @require https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.js
// @require https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/11.4.10/sweetalert2.min.js
// @require https://cdnjs.cloudflare.com/ajax/libs/color-scheme/1.0.1/color-scheme.min.js
// @require https://cdnjs.cloudflare.com/ajax/libs/unveil2/2.0.8/jquery.unveil2.min.js
// @require https://cdnjs.cloudflare.com/ajax/libs/jquery.imagesloaded/5.0.0/imagesloaded.pkgd.min.js
// @require https://cdnjs.cloudflare.com/ajax/libs/jquery-minicolors/2.3.6/jquery.minicolors.min.js
// @include /https?:\/\/(www.)?asmhentai.com\/gallery\/.+/
// @include /https?:\/\/(www.)?bestporncomix.com\/gallery\/.+/
// @include /https?:\/\/(www.)?doujins.com\/.+/
// @include /https?:\/\/comics.8muses.com\/comics\/picture\/.+/
// @include /https?:\/\/(g.)?(exhentai|e-hentai).org\/s\/.+\/.+/
// @include /https?:\/\/(www.)?hbrowse.com\/.+/
// @include /https?:\/\/(www.)?hentai2read.com\/[^/]+\/[0-9]+(.[0-9]+)?\//
// @include /https?:\/\/(www.)?hentaifox.com\/g\/.+/
// @include /https?:\/\/(www.)?hentaihand.com\/viewc\/[0-9]+\/[0-9]+/
// @include /https?:\/\/(www.)?hentaihere.com\/.+\/.+\//
// @include /https?:\/\/(www.)?hentaimimi.com\/view\/.+/
// @include /https?:\/\/hitomi.la\/reader\/.+/
// @include /https?:\/\/(www.)?imhentai.xxx\/view\/.+\/.+\//
// @include /https?:\/\/(www.)?kingcomix.com\/.+/
// @include /https?:\/\/(www.)?multporn.net\/(comics|hentai_manga)\/.+/
// @include /https?:\/\/(www.)?myhentaigallery.com\/gallery\/show\/.+\/[0-9]+/
// @include /https?:\/\/(www.)?nhentai.(net|xxx)\/g\/.+\/.+/
// @include /https?:\/\/(www.)?nhentai.com\/.+\/comic\/.+/
// @include /https?:\/\/(www.)?9hentai.(ru|to)\/g\/.+/
// @include /https?:\/\/(www.)?porncomixone.net\/comic\/.+/
// @include /https?:\/\/(www.)?pururin.(io|to)\/(view|read)\/.+\/.+\/.+/
// @include /https?:\/\/(www.)?simply-hentai.com\/.+\/page\/.+/
// @include /https?:\/\/(www.)?tmohentai.com\/reader\/.+\/paginated\/[0-9]+/
// @include /https?:\/\/(www.)?tsumino.com\/Read\/Index\/[0-9]+(\?page=.+)?/
// @include /https?:\/\/(www.)?(vermangasporno|vercomicsporno).com\/.+/
// @include /https?:\/\/(www.)?xyzcomics.com\/.+/
// ==/UserScript==

(function () {
  'use strict';

  var W = typeof unsafeWindow === 'undefined' ? window : unsafeWindow;

  /* global $:readonly, JSZip:readonly ,NProgress:readonly , jscolor:readonly , ColorScheme:readonly , Swal:readonly */

  // == 8Muses =======================================================================================
  var eightMuses = {
    name: '8Muses',
    url: /https?:\/\/comics.8muses.com\/comics\/picture\/.+/,
    homepage: 'https://comics.8muses.com/',
    language: ['English'],
    category: 'hentai',
    run() {
      function decode(data) {
        /* eslint-disable no-mixed-operators,no-shadow */
        return ((t) => {
          if (t.charAt(0) !== '!') return t;
          return t
            .slice(1)
            .replace(/[\x21-\x7e]/g, (s) =>
              String.fromCharCode(33 + ((s.charCodeAt(0) + 14) % 94)),
            );
        })(data.replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&amp;/g, '&'));
        /* eslint-enable no-mixed-operators,no-shadow */
      }
      let api = null;
      const url = W.location.href;
      $.ajax({
        type: 'GET',
        url,
        async: false,
        success(res) {
          api = res;
        },
      });
      const dataPublic = JSON.parse(decode($(api).find('#ractive-public').html().trim()));
      const dataShared = JSON.parse(decode($(api).find('#ractive-shared').html().trim()));
      const src = dataShared.options.pictureHost || W.location.host;
      const images = dataPublic.pictures.map((img) => `//${src}/image/fl/${img.publicUri}.jpg`);
      return {
        title: $('.top-menu-breadcrumb li:eq(-2) a').text(),
        series: $('.top-menu-breadcrumb li:last').prev('li').find('a').attr('href'),
        pages: dataPublic.pictures.length,
        prev: '#',
        next: '#',
        listImages: images,
      };
    },
  };

  // == 9Hentai ======================================================================================
  var ninehentai = {
    name: '9Hentai',
    url: /https?:\/\/(www.)?9hentai.(ru|to)\/g\/.+/,
    homepage: 'https://9hentai.ru',
    language: ['English'],
    category: 'hentai',
    waitAttr: ['#jumpPageModal input', 'max'],
    run() {
      let api;
      $.ajax({
        type: 'POST',
        url: '/api/getBookByID',
        data: { id: parseInt(W.location.pathname.match(/[0-9]+/)[0], 10) },
        dataType: 'json',
        async: false,
        success(res) {
          api = res.results;
        },
      });
      return {
        title: api.title,
        series: `/g/${api.id}/`,
        pages: api.total_page,
        prev: '#',
        next: '#',
        listImages: Array(api.total_page)
          .fill(null)
          .map((_, i) => `${api.image_server + api.id}/${i + 1}.jpg`),
      };
    },
  };

  // == ASMHentai ====================================================================================
  var asmhentai = {
    name: 'ASMHentai',
    url: /https?:\/\/(www.)?asmhentai.com\/gallery\/.+/,
    homepage: 'https://asmhentai.com/',
    language: ['English'],
    category: 'hentai',
    run() {
      const num = $('.pag_info:first option').get().length - 2;
      const src = $('.no_image')
        .attr('src')
        .replace(/\d+\.jpg/, '');
      return {
        title: $('title')
          .text()
          .trim()
          .replace(/ Page.+/, ''),
        series: $('.rt').attr('href'),
        pages: num,
        prev: '#',
        next: '#',
        listImages: Array(num)
          .fill(null)
          .map((_, i) => `${src + (i + 1)}.jpg`),
      };
    },
  };

  // == BestPornComix ================================================================================
  var bestporncomix = {
    name: 'BestPornComix',
    url: /https?:\/\/(www.)?bestporncomix.com\/gallery\/.+/,
    homepage: 'https://www.bestporncomix.com',
    language: ['English'],
    category: 'hentai',
    timer: 5000,
    run() {
      return {
        title: $('.post-title:first').text().trim(),
        series: '#',
        pages: $('figure img').get().length,
        prev: '#',
        next: '#',
        listImages: $('figure a')
          .get()
          .map((i) => $(i).attr('href')),
      };
    },
  };

  // == Doujin-Moe Non-members =======================================================================
  var doujinmoe = {
    name: 'DoujinMoeNM',
    url: /https?:\/\/(www.)?doujins.com\/.+/,
    homepage: 'https://doujins.com/',
    language: ['English'],
    category: 'hentai',
    waitEle: '.doujin',
    run() {
      const imgs = $('.doujin').get();
      return {
        title: $('.title').text(),
        series: $('.title a').eq(-2).attr('href'),
        pages: imgs.length,
        prev: '#',
        next: '#',
        listImages: imgs.map((i) => $(i).attr('data-file')),
      };
    },
  };

  // == ExHentai =====================================================================================
  var exhentai = {
    name: ['ExHentai', 'e-Hentai'],
    url: /https?:\/\/(g.)?(exhentai|e-hentai).org\/s\/.+\/.+/,
    homepage: ['https://exhentai.org/', 'https://e-hentai.org/'],
    language: ['English'],
    obs: 'May get your IP Banned, use with moderation',
    category: 'hentai',
    run() {
      const num = parseInt($('.sn div span:eq(1)').text().trim(), 10);
      const maxGalley = Math.ceil(num / 40);
      const gallery = $('.sb a')
        .attr('href')
        .replace(/\?p=\d+/, '');
      return {
        title: $('#i1 h1').text().trim(),
        series: gallery,
        pages: num,
        prev: '#',
        next: '#',
        img: '#img',
        lazy: true,
        bruteForce(func) {
          Array(maxGalley)
            .fill(null)
            .map((_, i) => i)
            .slice(Math.floor(Math.abs((func.begin - 1) / 40)))
            .map((galleryId, galleryOrder) =>
              func
                .getHtml(
                  galleryId > 0
                    ? `${gallery}?inline_set=ts_m&p=${galleryId}`
                    : `${gallery}?inline_set=ts_m`,
                  func.wait * galleryOrder,
                )
                .then((html) => {
                  $(html)
                    .find('.gdtm a, .gdtl a')
                    .get()
                    .map((item) => $(item).attr('href'))
                    .map((url, index) => {
                      setTimeout(() => {
                        if (galleryId * 40 + index + 1 >= func.begin) {
                          func.addPage(galleryId * 40 + index + 1, url);
                        }
                        return null;
                      }, func.wait * (galleryOrder * 40 + index + 1));
                      return galleryId * 40 + index + 1;
                    });
                }),
            );
        },
      };
    },
  };

  // == HBrowser =====================================================================================
  var hbrowse = {
    name: 'HBrowser',
    url: /https?:\/\/(www.)?hbrowse.com\/.+/,
    homepage: 'http://www.hbrowse.com/',
    language: ['English'],
    category: 'hentai',
    run() {
      const url = W.location.href + (W.location.href.slice(-1) === '/' ? '' : '/');
      const num = $('td.pageList a, td.pageList strong').length - 1;
      const chapter = $('#chapters + table a.listLink');
      return {
        title: $('.listTable td.listLong:first').text().trim(),
        series: W.location.href.match(/.+\/[0-9]+\//),
        pages: num,
        prev: chapter
          .eq(chapter.index(chapter.filter(`[href='${W.location.href}']`)) - 1)
          .attr('href'),
        next: chapter
          .eq(chapter.index(chapter.filter(`[href='${W.location.href}']`)) + 1)
          .attr('href'),
        listPages: Array(num)
          .fill(null)
          .map((_, i) => url + String(`000${i + 1}`).slice(-4)),
        img: 'td.pageImage a img',
      };
    },
  };

  // == Hentai2Read ==================================================================================
  var hentai2read = {
    name: 'Hentai2Read',
    url: /https?:\/\/(www.)?hentai2read.com\/[^/]+\/[0-9]+(.[0-9]+)?\//,
    homepage: 'http://hentai2read.com/',
    language: ['English'],
    category: 'hentai',
    run() {
      return {
        title: $('.reader-left-text').text().trim(),
        series: W.gData.mainURL,
        pages: W.gData.images.length,
        prev: W.gData.previousURL,
        next: W.gData.nextURL,
        listImages: W.gData.images.map((i) => `https://static.hentaicdn.com/hentai${i}`),
      };
    },
  };

  // == HentaiFox ====================================================================================
  var hentaifox = {
    name: 'HentaiFox',
    url: /https?:\/\/(www.)?hentaifox.com\/g\/.+/,
    homepage: 'http://www.hentaifox.com/',
    language: ['English'],
    category: 'hentai',
    waitVar: 'g_th',
    run() {
      const num = parseInt($('.total_pages:first').text(), 10);
      const src = $('#gimg')
        .attr('src')
        ?.replace(/\d+.\w+$/, '');
      function findExt(i) {
        const c = W.g_th[i][0];
        if (c === 'p') return '.png';
        if (c === 'b') return '.bmp';
        if (c === 'g') return '.gif';
        return '.jpg';
      }
      return {
        title: $('title')
          .text()
          .trim()
          .replace(/ - Page .+/, ''),
        series: $('.return a').attr('href'),
        pages: num,
        prev: '#',
        next: '#',
        listImages: Array(num)
          .fill(null)
          .map((_, i) => src + (i + 1) + findExt(i + 1)),
      };
    },
  };

  // == HentaiHand ==================================================================================
  var hentaihand = {
    name: 'HentaiHand',
    url: /https?:\/\/(www.)?hentaihand.com\/viewc\/[0-9]+\/[0-9]+/,
    homepage: 'https://hentaihand.com/',
    language: ['English'],
    category: 'hentai',
    waitVar: 'model',
    run() {
      return {
        title: W.model.title.replace(' - Page {page}', ''),
        series: $('.back-to-gallery a').attr('href'),
        pages: Object.keys(W.images).length,
        prev: '#',
        next: '#',
        listImages: Object.values(W.images),
      };
    },
  };

  // == HentaIHere ===================================================================================
  var hentaihere = {
    name: 'HentaIHere',
    url: /https?:\/\/(www.)?hentaihere.com\/.+\/.+\//,
    homepage: 'https://www.hentaihere.com/',
    language: ['English'],
    category: 'hentai',
    run() {
      const src = $('#reader-content img').attr('src');
      const size = src.match(/([0-9]+)\..+/)[1].length;
      const ext = src.match(/[0-9]+(\..+)/)[1];
      const num = $('#pageDropdown:first li').length;
      const origin = $('.breadcrumb a:eq(2)');
      return {
        title: origin.text().trim(),
        series: origin.attr('href'),
        pages: num,
        prev: '#',
        next: '#',
        listImages: Array(num)
          .fill(null)
          .map((_, i) => src.replace(/[0-9]+.jpg/, String(`00000${i + 1}`).slice(-1 * size) + ext)),
      };
    },
  };

  // == HentaiMimi ==================================================================================
  var hentaimimi = {
    name: 'HentaiMimi',
    url: /https?:\/\/(www.)?hentaimimi.com\/view\/.+/,
    homepage: 'https://hentaimimi.com/',
    language: ['English'],
    category: 'hentai',
    waitVar: 'previewImages',
    // start: 'never',
    run() {
      return {
        title: $('h3:first').text().trim(),
        series: W.location.pathname,
        pages: W.previewImages.length,
        prev: '#',
        next: '#',
        listImages: W.previewImages.map((i) => `https://hentaimimi.com//${i}`),
      };
    },
  };

  // == hitomi =======================================================================================
  var hitomi = {
    name: 'hitomi',
    url: /https?:\/\/hitomi.la\/reader\/.+/,
    homepage: 'https://hitomi.la/',
    language: ['English'],
    category: 'hentai',
    waitAttr: ['#comicImages img', 'src'],
    run() {
      return {
        title: $('title').text().replace('| Hitomi.la', '').trim(),
        series: $('.brand').attr('href'),
        pages: W.galleryinfo.files.length,
        prev: '#',
        next: '#',
        listImages: W.galleryinfo.files.map((file) =>
          W.url_from_url_from_hash(W.galleryinfo, file, 'webp', undefined, 'a'),
        ),
      };
    },
  };

  // == Imhentai =====================================================================================
  var imhentai = {
    name: 'Imhentai',
    url: /https?:\/\/(www.)?imhentai.xxx\/view\/.+\/.+\//,
    homepage: 'http://imhentai.xxx/',
    language: ['English'],
    category: 'hentai',
    waitVar: 'g_th',
    run() {
      const galleryId = $('#gallery_id').val();
      const imageDir = $('#image_dir').val();
      const cId = $('#u_id').val();
      let randomServer;
      if (cId > 0 && cId <= 274825) {
        randomServer = 'm1.imhentai.xxx';
      }
      if (cId > 274825 && cId <= 403818) {
        randomServer = 'm2.imhentai.xxx';
      }
      if (cId > 403818 && cId <= 527143) {
        randomServer = 'm3.imhentai.xxx';
      }
      if (cId > 527143 && cId <= 632481) {
        randomServer = 'm4.imhentai.xxx';
      }
      if (cId > 632481) {
        randomServer = 'm5.imhentai.xxx';
      }
      const src = Object.values(W.g_th).map((key, index) => {
        const ext = key
          .split(',')[0]
          .replace('g', 'gif')
          .replace('p', 'png')
          .replace('j', 'jpg')
          .replace('b', 'bmp');
        return `//${randomServer}/${imageDir}/${galleryId}/${index + 1}.${ext}`;
      });
      return {
        title: $('title').text().trim(),
        series: $('.return_btn').attr('href'),
        pages: parseInt($('#pages').val(), 10),
        prev: '#',
        next: '#',
        listImages: src,
      };
    },
  };

  // == KingComix ====================================================================================
  var kingcomix = {
    name: 'KingComix',
    url: /https?:\/\/(www.)?kingcomix.com\/.+/,
    homepage: 'https://kingcomix.com/',
    language: ['English'],
    category: 'hentai',
    run() {
      const src = $('figure img, .entry-content img.lazy')
        .get()
        .map(
          (i) =>
            $(i).attr('src') ||
            $(i).attr('data-src') ||
            $(i).attr('data-full-url') ||
            $(i).attr('data-lazy-src'),
        );
      return {
        title: $('h1.singleTitle-h1').text().trim(),
        series: '#',
        pages: src.length,
        prev: '#',
        next: '#',
        listImages: src,
      };
    },
  };

  // == MultPorn =====================================================================================
  var multporn = {
    name: 'MultPorn',
    url: /https?:\/\/(www.)?multporn.net\/(comics|hentai_manga)\/.+/,
    homepage: 'https://multporn.net/',
    language: ['English'],
    category: 'hentai',
    // waitEle: '.jb-idx-thumb:last .jb-thm-thumb-image',
    run() {
      let api = null;
      const url = $('head')
        .text()
        .match(/"configUrl":"(.+?)",/)[1]
        .replace('\\', '');
      $.ajax({
        type: 'GET',
        url,
        async: false,
        success(res) {
          api = res;
        },
      });
      const imgs = $(api)
        .find('image')
        .get()
        .map((i) => $(i).attr('imageURL'));
      return {
        title: $('#page-title').text().trim(),
        series: '#',
        pages: imgs.length,
        prev: '#',
        next: '#',
        listImages: imgs,
      };
    },
  };

  // == MyHentaiGallery ==============================================================================
  var myhentaigallery = {
    name: 'MyHentaiGallery',
    url: /https?:\/\/(www.)?myhentaigallery.com\/gallery\/show\/.+\/[0-9]+/,
    homepage: 'https://www.myhentaigallery.com',
    language: ['English'],
    category: 'hentai',
    run() {
      const src = $('.gallery-slide img').attr('src');
      const num = parseInt($('.pagination ul li:not(.next,.last):last').text(), 10);
      return {
        title: $('title').text().trim(),
        series: $('.back-to-gallery a').attr('href'),
        pages: num,
        prev: '#',
        next: '#',
        listImages: Array(num)
          .fill(null)
          .map((_, i) => src.replace(/[0-9]+\./, `${String(`000${i + 1}`).slice(-3)}.`)),
      };
    },
  };

  // == nHentai.Com ==================================================================================
  var nhentaicom = {
    name: 'nHentai.com',
    url: /https?:\/\/(www.)?nhentai.com\/.+\/comic\/.+/,
    homepage: 'https://nhentai.com/',
    language: ['English'],
    category: 'hentai',
    waitEle: '.pages-selector option',
    run() {
      return {
        title: $('.comic-title').text().trim(),
        series: $('.comic-title a').attr('href'),
        pages: $('.pages-selector option').get().length,
        prev: '#',
        next: '#',
        listImages: $('.reader img')
          .get()
          .map((i) => $(i).attr('data-src')),
      };
    },
  };

  // == nHentai.net ==================================================================================
  var nhentainet = {
    name: ['nHentai.net', 'nHentai.xxx'],
    url: /https?:\/\/(www.)?nhentai.(net|xxx)\/g\/.+\/.+/,
    homepage: ['https://nhentai.net/', 'https://nhentai.xxx/'],
    language: ['English'],
    category: 'hentai',
    run() {
      function getExt(ext) {
        if (ext === 'g') return 'gif';
        if (ext === 'p') return 'png';
        return 'jpg';
      }
      const num = parseInt($('.num-pages:first').html(), 10);
      const src = $('#image-container img')
        .attr('src')
        ?.replace(/\d+.\w\w\w$/, '');
      // eslint-disable-next-line camelcase
      const ext =
        W?.images_ext?.map(getExt) ||
        // eslint-disable-next-line no-underscore-dangle
        W?._gallery?.images?.pages?.map((i) => getExt(i.t)) ||
        Array(num).fill('jpg');
      return {
        title: $('title').text().split('- Page')[0].trim(),
        series: $('.go-back').attr('href'),
        pages: num,
        prev: '#',
        next: '#',
        listImages: Array(num)
          .fill(null)
          .map((_, i) => `${src}${i + 1}.${ext[i]}`),
      };
    },
  };

  // == PornComixOnline ==============================================================================
  var porncomixonline = {
    name: 'PornComixOnline',
    url: /https?:\/\/(www.)?porncomixone.net\/comic\/.+/,
    homepage: 'https://www.porncomixone.net',
    language: ['English'],
    category: 'hentai',
    run() {
      const imgs = $('figure a').get();
      return {
        title: $('.post-title').text().trim(),
        series: '#',
        pages: imgs.length,
        prev: '#',
        next: '#',
        listImages: imgs.map((i) => $(i).attr('href')),
      };
    },
  };

  // == Pururin ======================================================================================
  var pururin = {
    name: 'Pururin',
    url: /https?:\/\/(www.)?pururin.(io|to)\/(view|read)\/.+\/.+\/.+/,
    homepage: 'http://pururin.io/',
    language: ['English'],
    category: 'hentai',
    waitAttr: ['.image-holder img', 'src'],
    run() {
      const src = $('.image-holder img').attr('src');
      const num = $('.form-control option').length;
      return {
        title: $('.title').text().trim(),
        series: $('.control a:eq(3)').attr('href'),
        pages: num,
        prev: '#',
        next: '#',
        listImages: Array(num)
          .fill(null)
          .map((_, i) => src.replace(/\/[0-9]+\./, `/${i + 1}.`)),
      };
    },
  };

  // == Simply-Hentai ================================================================================
  var simplyhentai = {
    name: 'Simply-Hentai',
    url: /https?:\/\/(www.)?simply-hentai.com\/.+\/page\/.+/,
    homepage: 'http://simply-hentai.com/',
    language: ['English'],
    category: 'hentai',
    run() {
      let api;
      $.ajax({
        type: 'GET',
        url: W.location.href.replace(/\/page\/[0-9]+#?$/, '/all-pages'),
        dataType: 'json',
        async: false,
        success(res) {
          api = res;
        },
      });
      const imgs = Object.values(api).map((i) => i.full || i.giant || i.path);
      return {
        title: $('h1 .pu-trigger:first').text().trim(),
        series: $('h1 .pu-trigger:first').attr('href'),
        pages: imgs.length,
        prev: '#',
        next: '#',
        listImages: imgs,
      };
    },
  };

  // == TMOHentai ====================================================================================
  var tmohhentai = {
    name: 'TMOHentai',
    url: /https?:\/\/(www.)?tmohentai.com\/reader\/.+\/paginated\/[0-9]+/,
    homepage: 'http://tmohentai.com/',
    language: ['Spanish'],
    category: 'hentai',
    run() {
      const num = $('#select-page option').get().length;
      return {
        title: $('.reader-title').text().trim(),
        series: $('.nav a:eq(-2)').attr('href'),
        pages: num,
        prev: '#',
        next: '#',
        listPages: Array(num)
          .fill(null)
          .map((_, i) => W.location.href.replace(/\/[0-9]+?$/, `/${i + 1}`)),
        img: '.content-image',
        lazyAttr: 'data-original',
      };
    },
  };

  // == Tsumino ======================================================================================
  var tsumino = {
    name: 'Tsumino',
    url: /https?:\/\/(www.)?tsumino.com\/Read\/Index\/[0-9]+(\?page=.+)?/,
    homepage: 'http://tsumino.com/',
    language: ['English'],
    category: 'hentai',
    run() {
      let api;
      $.ajax({
        type: 'GET',
        url: `https://www.tsumino.com/Read/Load?q=${$('#image-container').attr('data-opt')}`,
        dataType: 'json',
        async: false,
        success(res) {
          api = res;
        },
      });
      const src = $('#image-container').attr('data-cdn');
      const imgs = Array(api.reader_page_total)
        .fill(null)
        .map((_, i) => src.replace('[PAGE]', `${i + 1}`));
      return {
        title: $('title')
          .text()
          .match(/(.+Read )(.+)/)[2],
        series: api.reader_start_url,
        pages: api.reader_page_total,
        prev: '#',
        next: '#',
        listImages: imgs,
      };
    },
  };

  // == Ver Mangas Porno =============================================================================
  var vercomicsporno = {
    name: ['vermangasporno', 'vercomicsporno'],
    url: /https?:\/\/(www.)?(vermangasporno|vercomicsporno).com\/.+/,
    homepage: ['https://vermangasporno.com/', 'https://vercomicsporno.com/'],
    language: ['Spanish'],
    category: 'hentai',
    run() {
      const imgs = $('img[loading="lazy"].size-full, .comicimg picture img, .wp-content img').get();
      const src = imgs.map((i) => $(i).attr('data-lazy-src') || $(i).attr('src'));
      return {
        title: $('h1.titl').text().trim() || $('title').text().trim(),
        series: '#',
        pages: imgs.length,
        prev: '#',
        next: '#',
        listImages: src,
      };
    },
  };

  // == xyzcomics ====================================================================================
  var xyzcomics = {
    name: 'xyzcomics',
    url: /https?:\/\/(www.)?xyzcomics.com\/.+/,
    homepage: 'http://xyzcomics.com/',
    language: ['English'],
    category: 'hentai',
    run() {
      const imgs = $('.jig-link').get();
      return {
        title: $('.entry-title').first().text().trim(),
        series: '#',
        pages: imgs.length,
        prev: '#',
        next: '#',
        listImages: imgs.map((i) => i.href),
      };
    },
  };

  /* eslint-disable no-unused-vars,@typescript-eslint/no-unused-vars */
  const sites = [
    asmhentai,
    bestporncomix,
    doujinmoe,
    eightMuses,
    exhentai,
    // gntai, [CORS disabled]
    hbrowse,
    hentai2read,
    // hentaicafe, [RIP]
    // hentaicomic, [RIP]
    hentaifox,
    hentaihand,
    hentaihere,
    hentaimimi,
    // hentainexus, [RIP]
    hitomi,
    imhentai,
    kingcomix,
    // luscious, Todo: Fix
    multporn,
    myhentaigallery,
    nhentainet,
    nhentaicom,
    ninehentai,
    porncomixonline,
    pururin,
    simplyhentai,
    // superhentais, Todo: Fix
    tmohhentai,
    tsumino,
    vercomicsporno,
    xyzcomics,
  ];

  /* eslint-disable camelcase */
  // Encapsulation for the console
  function logScript(...text) {
    // eslint-disable-next-line no-console
    console.log('MangaOnlineViewer: ', ...text);
    return text;
  }
  // Compose console output
  const logScriptC = (x) => (y) => logScript(x, y)[1];
  // Replacement function for GM_info allowing for debugging in console
  const getInfoGM =
    typeof GM_info !== 'undefined'
      ? GM_info
      : {
          scriptHandler: 'Console',
          script: {
            name: 'Debug',
            version: 'Testing',
          },
        };
  // Replacement function for GM_getValue allowing for debugging in console
  function getValueGM(name, defaultValue = null) {
    if (typeof GM_getValue !== 'undefined') return GM_getValue(name, defaultValue);
    logScript('Getting: ', name, '=', defaultValue);
    return defaultValue;
  }
  // Replacement function for GM_setValue allowing for debugging in console
  function setValueGM(name, value) {
    if (typeof GM_setValue !== 'undefined') return String(GM_setValue(name, value));
    logScript('Getting: ', name, '=', value);
    return String(value);
  }
  // See https://stackoverflow.com/a/2401861/331508 for optional browser sniffing code.
  function getBrowser() {
    const ua = navigator.userAgent;
    let tem;
    let M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
      tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
      return `IE ${tem[1] || ''}`;
    }
    if (M[1] === 'Chrome') {
      tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
      if (tem !== null) {
        return tem.slice(1).join(' ').replace('OPR', 'Opera');
      }
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    tem = ua.match(/version\/(\d+)/i);
    if (tem !== null) {
      M.splice(1, 1, tem[1]);
    }
    return M.join(' ');
  }
  // See
  // https://stackoverflow.com/questions/27487828/how-to-detect-if-a-userscript-is-installed-from-the-chrome-store
  function getEngine() {
    return `${getInfoGM.scriptHandler || 'Greasemonkey'} ${getInfoGM.script.version}`;
  }
  const isMobile = W.matchMedia('screen and (max-width: 1024px)').matches;

  const cache = {
    zip: JSZip,
    downloadFiles: 0,
    Data: {},
  };
  const getExtension = (mimeType) =>
    ((/image\/(?<ext>jpe?g|png|webp)/.exec(mimeType) || {}).groups || {}).ext || '' || 'png';
  const getFilename = (name, index, total, ext) =>
    `${name}${(index + 1)
      .toString()
      .padStart(Math.floor(Math.log10(total)) + 1, '0')}.${ext.replace('jpeg', 'jpg')}`;
  // Generate Zip File for download
  function generateZip() {
    // Source:
    // http://stackoverflow.com/questions/8778863/downloading-an-image-using-xmlhttprequest-in-a-userscript/8781262#8781262
    if (cache.downloadFiles === 0) {
      const filenameRegex = /^(?<name>.*?)(?<index>\d+)\.(?<ext>\w+)$/;
      const images = $('.MangaPage img');
      const filenames = (() => {
        const result = [];
        for (let i = 0; i < images.length; i += 1) {
          const $img = $(images[i]);
          const filename = $img.attr('src')?.split(/[?#]/)[0].split('/').pop() ?? '';
          const match = filenameRegex.exec(filename);
          if (!match) break;
          const fixedFilename = getFilename(
            match.groups?.name,
            match.groups?.index,
            images.length,
            match.groups?.ext,
          );
          if (result.length > 0 && fixedFilename <= result[result.length - 1]) break;
          result.push(fixedFilename);
        }
        if (result.length < images.length) return [];
        return result;
      })();
      images.get().forEach((value, index) => {
        const img = $(value);
        const src = img.attr('src') ?? '';
        const base64 = /^data:(?<mimeType>image\/\w+);base64,+(?<data>.+)/.exec(src);
        if (base64) {
          const filename = getFilename(
            'Page ',
            index,
            images.length,
            getExtension(base64.groups?.mimeType),
          );
          cache.zip.file(filename, base64.groups.data, {
            base64: true,
            createFolders: true,
          });
          logScript(`${filename} Added to Zip from Base64 Image, From: ${src}`);
          cache.downloadFiles += 1;
        } else {
          try {
            GM_xmlhttpRequest({
              method: 'GET',
              url: src,
              overrideMimeType: 'text/plain; charset=x-user-defined',
              responseType: 'blob',
              onload(request) {
                const filename =
                  filenames[index] ||
                  getFilename('Page ', index, images.length, getExtension(request.response.type));
                cache.zip.file(filename, request.response, {
                  base64: true,
                  createFolders: true,
                  compression: 'DEFLATE',
                });
                logScript(
                  `${filename} Added to Zip as Base64 Image, From: ${src}, Data:`,
                  request.response,
                );
                cache.downloadFiles += 1;
              },
            });
          } catch (e) {
            logScript(e);
          }
        }
      });
    }
    const total = parseInt($('#Counters').find('b').text(), 10);
    if (cache.downloadFiles < total) {
      logScript(`Waiting for Files to Download ${cache.downloadFiles} of ${total}`);
      setTimeout(generateZip, 2000);
    } else {
      const blobLink = document.getElementById('blob');
      try {
        blobLink.download = `${$('#series i').first().text().trim()}.zip`;
        cache.zip
          .generateAsync({
            type: 'blob',
          })
          .then((content) => {
            blobLink.href = window.URL.createObjectURL(content);
            logScript('Download Ready');
            $('#blob')[0].click();
          });
      } catch (e) {
        logScript(e);
        // blobLink.innerHTML += ' (not supported on this browser)';
      }
    }
  }

  // Configuration
  const settings = {
    Theme: getValueGM('MangaTheme', 'Light'),
    CustomTheme: getValueGM('MangaCustomTheme', '#3d0099'),
    CustomThemeBody: getValueGM('MangaCustomThemeBody', '#000000'),
    CustomThemeText: getValueGM('MangaCustomThemeText', '#ffffff'),
    CustomThemeLines: getValueGM('MangaCustomThemeLines', '#666666'),
    CustomThemePanel: getValueGM('MangaCustomThemePanel', '#333333'),
    CustomThemeButton: getValueGM('MangaCustomThemeButton', '#282828'),
    FitWidthIfOversize: getValueGM('MangaFitWidthIfOversize', true),
    ShowThumbnails: getValueGM('MangaShowThumbnails', true),
    DownloadZip: getValueGM('MangaDownloadZip', false),
    Timer: getValueGM('MangaTimer', 1000),
    Zoom: getValueGM('MangaZoom', 100),
    zoomStep: getValueGM('MangaZoomStep', 25),
    loadMode: getValueGM('MangaLoadMode', 'normal'),
    viewMode: getValueGM('MangaViewMode', ''),
    bookmarks: JSON.parse(getValueGM('MangaBookmarks', '[]')),
    lazyLoadImages: getValueGM('MangaLazyLoadImages', false),
    lazyStart: getValueGM('MangaLazyStart', 50),
    hidePageControls: getValueGM('MangaHidePageControls', false),
  };
  // Force Settings for mobile
  if (isMobile) {
    settings.lazyLoadImages = true;
    settings.lazyStart = parseInt(getValueGM('MangaLazyStart', 5), 10);
    settings.FitWidthIfOversize = true;
    settings.ShowThumbnails = false;
    settings.viewMode = '';
  }
  // Clear old Bookmarks
  const bookmarkTimeLimit = 1000 * 60 * 60 * 24 * 30 * 12; // year
  settings.bookmarks = settings.bookmarks.filter((el) => Date.now() - el.date < bookmarkTimeLimit);
  setValueGM('MangaBookmarks', JSON.stringify(settings.bookmarks));
  // Icons in Base64 format
  // Source: http://www.iconarchive.com/show/farm-fresh-icons-by-fatcow.html
  // Source: http://www.iconarchive.com/show/oxygen-icons-by-oxygen-icons.org.7.html
  // Source: http://www.iconarchive.com/show/ivista-2-icons-by-gakuseisean.html
  const icon = {
    enlarge:
      'data:image/png;base64,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',
    reduce:
      'data:image/png;base64,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%3D%3D',
    restore:
      'data:image/png;base64,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%3D',
    fitWidth:
      'data:image/png;base64,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',
    fitHeight:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEV0lEQVR42sWWXWgcVRTHz8zsZj8jWkGw4oNWgghNH6wPLYpJ1hYfFKko+GbriqEiQq0+9MO2vohCqoIvfRAlgi/6oqKI1CbRWm01rUyirUuaZJPdlSSQTfdjZna+djxnNhNnd+98VFEvXObeGeb+f/d/z733cPA/F87dSafTqVgstgnrvyKmaRqYplleW1uTmABYtjZUdUpTVfzCtT52Phlt1kDub06JCALE4/F+hJj2AuivVqtiXZLwX45ZW+O22jMrAH23tEN2Dey8sywgZ1Op1DYEmPIGqNVESZJtAZ5fF3Zm7YJYqnLw1jcWjDzBt4l3CbtKT08PpJJJf4BavS7Ksuw7c+p99BPASQT45ajAXCLW4NFoFJJBAHUCUJRu+90uYFMsAbx/zoLXHhVgU9ojPhgAiUQiAECSRMUDwHbC1X/njAUHHuLZgdrRtygIIxFIxOP+ABIBNBqhAE6dtWD/g8LGIJw7CBkxILR2QQCALIsNH4ANCOyPnrdg707hLzgfcQcAd4I/gEwAeA74ATgQH09a8NR9fJuolzgVnudDACiKqIYAoPr5lAWPbeO7hL0gCAC3oj+AQgB4ZAaJUz19xYLd9/CBwtcH0GiIGssBxrlwbg7g/i1cl7AXCL0PBMAAtB3gfcQnJiY2fpifn4dsNhvKgdAAmq63jmIPgPHxcRgcHLTbY2NjkMlkQjuAh1EAgKqKOsUArhcLggoBDAwM2GtK7aGhIU/hzneBACoBrDvgVBJyBqNKtufzeSisWXD7TVxoB8IDGIan/W6RsVwTMncLoYSvC8BAAFsQZ867hDufX06b8Eh/hCnebDYxBbDsNj2dwysedBDhDrABeI/Zu5+fTBrw5PZImzgJU6UxUGgDhJaREyJw4w29/gDaOoDjQNsd0AHw4Y86PL2zp02c4odyP7pPFKVhty2rCQLehOVqfXXH9nt3mKYxEwjAr+8CzmcJTn2rw/6BnjZxusorlSpg4gm1Wg3oXomieCyRkLPP7NtbLBQ+xZxD9wUg64Lsp/L2aQ1e2h2zLSZoyqTK5TIsFgo2QCqZgs2bb8VbkDeHh4efv3z5ygerq6u6W/BvA+gmwMjXKrzycBx4MG3Lr12rQOmPEhQQ4PE9exBKp7Z18OWDRy5OXhopFot6h54/QOf+d0O8950G757R4PtDaUhEDMBEBpaWlmFhcRFMdGPXrowNcvzE8TcunL9w7OrV2S5xXwAnBrwAzs6Y8PoXKnx1IGkHGqbzKFiE/MICbLnzDujtTVso/ubkzxeP5XI5pjgbQNdFsyMIWetv4BKM/qBD9oEoUP5A9i+g+NLyMvT13WUePnzo6K/Tv52cnZ31FP9HAPQ0mphmcZYNUKlUbPslpaGcePXIi3Nz86OlUslXnAWwlQ4J2lJeGU7niUc7QNUNqNUlmP49V37h2X3PraysfIa7wQgS7wLAWd+M4reF+ZE5GMfJiWQyL0tSKHGWA/95+RN8q4s/S0hajQAAAABJRU5ErkJggg==',
    reload:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC70lEQVR4XrXQa0xTdxgG8Pd/es6x2JbL2iINtCQdAkvAuOAwBMKMfiBZJGWMYQIx68plwwEbUfACeIlGyJbQVYMxsjGGZkHDIFZHIBurboOQESgLldaISMu6cmprSi/0cnp6TL8IiSb9tN+H5+OTJw/8r/rHVgCgAr7qmZKoLown7y3rgiMnf4aY2q/roeP6Aio/9RtZc/F33kedMw0lx3WnDzcP88pbhmE7DLb5dcYKc4+cmG2DfXva5D5qecFe0JuD3Wa7T+XYxOp8RNIhQZIfK+8Yeb1gdMEFhDgR1xoDBxxhUuOkUY+XxVq9GPnFBmLzvDhK93B31lu58sxnkAOl6gmIwqNx1eCDD3P2waUHf+Q7gsEOGoWkDArq6YjfhyfFZ0X4vEyaA5gHMfsZv/f9t+z9T6hwLvNqgWnZAicmx/mrNluR3W7+208ZVLRtXpnEed6YmCn6E0Q7vGGOf3bTtXbNaTZO25aMEceKCV4p674Dn3yvEyi6bhfkHW0XjrIsFKon4NPhxYT83qmz0vPa07tqr7ybuL8qLq1uEF4jEUuh9KQaiqubUXF1E6hnLaCZ+5dT1TsWv+ezb8QJB1VkG8tCTDcWKfjBQOHKSUpeol1TFfb99fGe1qtEkfoefD4wB19PPI1v/k4nrzg3QNRotFsnqkaWgAcvsIePPRlOGi9x0JjCFwplRdxhdXZKKpEpyyVJMk5KebwKT4ixUVbTEAMZsHWi1Q5GysE1WV21z9b8lxxr3kN+q18IG/wD/3l3n11YYTSrtsCPLqe7aNNpX/yyryvkWP4HolA0pGf6gSWmMCxYUYloUTfQWDoKM4AAsRiLIlwcC6UIgrNCZLnsNmoncZ4ofP+mZqsgStY0CCzji8ciu08hmtfIBNZXI3TQirGEm2AC8wJ2/Zc485AxCHxGP6+DN5LV3gJZ3VB2uuruT2mV3yoTi6tTxIX1wuR3PiDeazMACTFIlC2QWnOOk1rVWSApOyaXKBoglpfB+En628ogAgAAAABJRU5ErkJggg%3D%3D',
    zoomIn:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACoUlEQVQ4jZXQu2tTYRjH8e9535OTmDQxaZuYU6NNi9a7CaiQSczmWBGKm0WHLkL9DxTETSkF0YqD1kEUvCJI6yBxUiTVqPUKLa1JJfZiehLTkzQ3h1htQBB/08sLz+e5KKzKmXMXgk1O16lyuRJ0N7cemJv9lpifn0/ksrnhK4NnY/wlcuUxcPn6gKPJeVNv2xhuD24OtrT4aXK1+NfYHeHFbLa3o2uXe/zls9G/AucvXRtwujwnd+/ey7auLvR1PrwtHvR1Xta3BViqOjCM75HOLduD7149f9AAXBy+Ha5Uqtf27Y3Q2R7AqqlIqSAVBVUKbFYNn7eV5HdBcWku3NG14+mHxIupFUDMpJL9fn0D7YH1lCoK+QKUynD07CRCAaFAs8vKntBOmv2bsdrs/asnEJUq4TZdR5UKDiustYMUUDRzmMtQAwTgb3bh14NYNK17NaDmzULYscaGFPXCI6cnKZo5CmaOQ/0jFMwsDy/1oKoKrR4XFovWcEQ19yM/ZWSNoCo3IBW4faYTgP3HRnhy5SDVGmTy9VVUKbBqlgZAmEtLicmpaaSoISWovyYpmFmEAEX582eaBppFJhqAUml5MP7qNV/Ts6gSpKx3G7vVg1CgWoVSBbI/8mTmviAUBhuAu8MXYkZm4f6Ne4+YXcjULy9AAWo1MJdhYdHg8cgdPr2Nk/oYb5hAAmzaFho1DGPr64+TW/PFMlbNSiZXYN4wmfgyw/j4Sz6/f4PHViWdTh+JRqOj8Xg8DfVGv9Nz/GSv2+3pd3s84SanE01KqrVKorxcHNzZ4SOdTl+NxWIUi8VFXdejQ0NDiQbgX+nr6+sNhUK/EbvdHpX/LvuTsbGxRCAQmI5EIt2pVMqWTCYP/xewgvh8vmmv19s9MTFx4ifGBwN4Ure0EAAAAABJRU5ErkJggg%3D%3D',
    zoomOut:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAClElEQVQ4jZWQTUsbURiFz9w7mYmOSfNhYkZjjVJTba0J1EKW8R8IBXEpdOGmoP+gBemuRQJSCV1Uuyhd2C8KhXSVrlqK0bGkrS4MamJNNRonMZmJSSZdxFgHBOmBy3u5cJ733MPgnKYfz3paTOYHlUrVY7G1Bvf3/kiZTEbK5/ILz0KPorhAtHGZCb+YEVpMr8T2q/4uT6/HbnehxWx3NTUJ/qNcbrzbe8sSX/4SuRDwZG5+xmS2Tg0ODqHf64XY5oTDboXY5kBHuxtFTYAsHwZ6rt/w/Fj5+l4HeLqw6K9Wtfk7QwH0dLnBcywoZUAZBiwlMPIcnI5WJA8JSsV9f7f35udf0rfNBoDspJKTLrETXe4OlKsMCipQrgAMA5DTYzPzuO0bgM3VC97YPHk+Aalq8LeLIljKQOCBK80AJUChBCgnQA0AAeCymeESPTBw3Mh5AFtQVL/QZAQldePYwwRKSh6qkkdJOYaq5PBhbhQsy6DVaobBwOlKZPPHhU05J3tY2gnKAIvTPQAArQZoWn1mC/WvsJSA5ww6AFGKRSmxuQVKaqAUYE+TUAYgpN5F401RZHAGKukA5fJJaGllFb/Te2ApQOlpeaQ+NQ0oV4HccQHZ/W0QBiEd4M3CbFTOHrx7+fYj9g6yZ2YGQK1WL/LgSManyGusx5eQWlvSJaAAcK3fF5FluW91LdFXKFXAczyyeRUZWUFiewfx+DLWf36Hjdewu7s7FgwGI7FYLA3UF51p9N7UuMVinbRYrX6TyQQDpdBqValyUgoNdDuRTqefR6NRqKp6JIricDgclnSAyzQxMTHu8/nOIIIgDNPLbf8Ui8Ukt9u9FQgERlKplDGZTN79L0AD4nQ6txwOx8jGxsb9vyYg/nmG24G2AAAAAElFTkSuQmCC',
    zoomRestore:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACsUlEQVR4Xp2SW0iTYRjH/5/fYdtnTc0jrhPW0Dwt7HC3mZBeKF1pbVoO26V3RkK3URcqiLBADRxEXZR2o9LuDAaKeSHOw1ZuRdBhTs3cNL9tbt/29m6gqASBP/jB8168fx6e50FHR0eb1Wp9PjAwMJS0v79/aHBw0NbV1fWiurr6Av5Hc3PzbXKAQCBAnE4nsdvtpLe3N2Qyme7W19fnVVVV8fgXra2t9wglFouR5eVl4nA4SDAYJHvE4/HE1OSkq6WlxczzfAaOkMayrAKUiYn3cLncMBgM8K1vYnbxIz55v2B6doEprdSV9XR399TV1d0CIBwKoChBYdk01NbehNv7FcHtPziVnQ3CKxCJxjDhmMYJdVa+xdL2QBTFs4cCqFw4HIbX+xlqtRo//GvIzc9HFDx2EgK2IMLj/42ZuXkY9IZiGlB8NECIRqNITxeRhBMU8EsEHzeicK2F8TPEYEVi8GP1F3Jy80SO43IAMHsBXLImhCCwGQAt8G1lHf7vEviTWal3PCFDIXA4f7oQ66v+CB327qEOGAYQBAEZGWr4fD6Ua89BlgKAHIHA0/DwDs5nqXCl4hLG39lXJGnHA4DsdwBCwPMcWI7H6OgYzGYz0pUiphY+YXMjhJIzBbhxVY/ZmQ/o6+uTI5HdNBzEct/SGYmEydLiIrHZbOSZ1ZqqSVwmSf5sBcn42Bi5dv06KSoqInTtSwAq9odIQCDLMra2t6DRFILlWLwZHsaDh53JM8fjJ0/hnJ+HrrICoVAoodfrywG8pl7e2wKbHIRWq4VOp0NDQwNMRiOampqojTAa76Rsb2+HJElzHo8HNTU1ZSqV6hWAEoZenkmrvfhIqVTy2IMACUJSBcMwKelneWTk7UvaRalGo7FkZmbC7XY34hiUUa1UG7Ucx0BBzaMWUMW/uh49keTZSXYAAAAASUVORK5CYII%3D',
    zoomWidth:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACyUlEQVR4XqWSX0hTbRjAn/ecdSbbNJdFK/p3tTAvXI4IwrwJ6vtEqK819abIG1GCYRcFs+FNXdS+z82tP1ARpX7VVUVoYgWl07oItH8KUcHUxf7Y5v667exse3rfEUsxr/rBw3k453l/D895XmI2m3dJkqQGilwuj25YX2FGgFpCuApEhGw2G+QITCdT6QZRFJEQAkvhKisrr1RVVY3Q53OFQjGcTqebjxmObjMYDMqmxkal8djR7YhYX6pSuZhwBQ6HYw4RpcHBAan7v3/ziWQK/7Z7kJFIxPGv7jkMR6LodPRgj912x2KxQFdXVzHAbrfPIqW/rw8XQiFsuu7Djvte9M8H0fPNi6f/n8XDlz0YDC1gZ6f5lc1mY2eKIYOf8DyB9l4vfIqoYMaPYPiaBkYuD5AUJWi9HYfdcqG0rKwMlv6HoiBPC6+d2ARtdxOgKefhwpG1wCY+PxgDd0CCWy2bwWoVI5FIlDbjVgrWCAJEowtgN5bDuScZUClKCp2CyTjcbNkA8ej3rChmwjzJQy6HwCA0iiqtVgsvR8Ygk4rBxQYOovFFiC2mwGlUQSIWgkePB5J0zVU8yZUCEuConOeWCHQ6Hej1ehh1jUE4HCl0RzqX1+eD4eGnyPOykuPG+i0YfO+XcXgij2T5CIgI1dXVLIGhoaHiOyZSq9Ugzb/1ZKWdOw7otspdHyZu5Mr1OSq5y1Yxg4i5TCaDLBhut3tZeDwebG0/ZbW21Uw6THvj7+6dwauW5rSz2/qPDCk5Cr2yhXFoChqN5tdV5TjgeR54QhSX+idrLCf3BJ65RsnB/bXKkenJXiZghwrxG4o75whCKAHgmvi8sU6v9Y9PffGVKDUVMtpBTovWwOoUJIIglLD8ozsND1+/0Tg79o0LXH5AFggEHphMJgUASLAKAmVqauoFyxfFPLQdWgc1dYbaOuNZIGyEP+EHsrF5Hxph5xoAAAAASUVORK5CYII%3D',
    hide: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAbpJREFUeNrUk8FKAlEUhu9oqRQ2JCG0UBgNWijWQkFhiAqaXERLceE21+16A1+gRQshCFy5MGiTCROBguEqzGkVI0kgumihOKQw3f4zOL2Aqw58MHPv+f9zzr0zAuecLRIOtmAsbCAgrIf5KGtgHyggBHzzvC+ggxp4AiNbZxsIMDh1u91niqJs5XI5v6Zpq41Gw0WbsizPIpHIpFQqDWu12vt0Oi1Cd0d1aQQPOE8kEhf1el2uVCrbpmmuBwIB12RiMAIiF63RHuVQLmksrdPpTKPq42AwmBqGwQlVVTlFsXjNZfmAK8oJR1fc3qdc0pB2CS7ZZDLpQ/uu2WxmzVUoFFDZZJeXV9Z7OBxln59vzN6nXNKgUJYMblqt1vpoNNr2IChBkiSmqk2WSh1ZAo/HzZaXpT+DbwQ0H6R1OhyOfrfb/Wk2m2Y8Ht8QRdGLeZmmvbJQaIeJog/VNXZ4uGcZ67rez+fz9ziLW7oVAXPYV5FEA8fpdDqayWSivV5vs91ue6liLBYbB4PBfrlc7lSr1Q4aeMDyM52TbWB/FysgAnaBH3jn62MwBC9AA4b97Qj//19Y2OBXgAEA3HnRUkre/J0AAAAASUVORK5CYII%3D',
    settings:
      'data:image/png;base64,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%3D',
    menu: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABqUlEQVR4XqWTPWtUQRhGz/vO7HWDYNJaWyz5FSJEgoWlYCGInaClCGpI4geC1mJjIWshqGn9CGwQf4TmJo0/wRRK1Jt7H+eOO8VCsIgHHjjD8MDMy4ydfLD57cfvdqFphZjFAB3mBgM3jldhjxOr73RU5lM3Np0A+Fp/BjcMw62PeL7jXBm1AMlDdil5bayeX6TvRkRmvBsJbikD3CPQUIUDXuwGAConuwTBBYCAyJRLyyOCQYxw7ZHx5KZ4tbnDhaURABuTbS4uLSLBm+QFB8ty/bExDHD1ofH0hqAFU0voyHF1ZFcKohDL7Me3xeVUHt8STQvRyFcaOJni6j0YGUEElaPwckVIEAAPUAVjOCBTHCU3oxCLvp7UuDnBI+4BOGAYnY2tGoBjUxeiKi2AuTtv1fNrmi5l+T5qJT2b1PoppfT+Jft+9m319N0yRM7dNSrg7D3jw4oAMHU45Fin7AHww4a4tSbOrBsf10UHWHmyZDC37ALC7AxUPJcBvGwimHUsl6As/usv9N0413z/NL/2/nTTdnSigP3jO5oZg2D0XQNOAQscjb0/9SM6Il0maJIAAAAASUVORK5CYII%3D',
    webComic:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACvUlEQVR42rWXaW4aQRCFayDs4IDZ7Bi83CGHyPLDMDiRZYRygRwmV4hQkCWbYbO5RDhBZMkLJGGzwezrkOo2xIEwhA7tJz0hesT019XV1YUA09KeSFL3wO+Hq+sbEASBehWNRiPq3Z1tOI3F4J0o6nC4N3k++3YbAtwRgGwuByqVaqXJJ5JlGbwezwRgHYcqSgCuEylaOPCL8P1HHgFWW/0jwAi2XmwggIQAATcOFZUBogggilAoFlcO/0RkC9wuF5xKCBBYEqBUvuUK4HTY2QAq1SqXySeyWa1sALVanSvA2pqFDaDRbHIFMJtMbADtdpsrgMFgYAPodvv4dcRpegF0Os2SAJJUIIWIFA9MX07zC7SojQvRYoBoPF4Q9/c5rXxaUiIBAZ9vIYDzczicNpvNL2Wyep4RQDcajcyHUOgNjpSUANbQ22gHWs05AEN0GX2DrikBPEMb0bo5z1YVCWcX3UIPlADUyVTqU38w+Eiv0f+aQ6AvJUkn+nxTV+88zQKYo7FYHX+48nIH/T7EUyly7BZCzAI48BiWyDG8vLqmybPsPtBoYdT2dncgHIlA6OgIer0eJM7O4P0CCMU6kM3mHjoiBgCybV6vB74cH8PbV6/Ban2OBa0LyfNzRQjlhuRnnh4dFpGju7W5AREECJD7pN4Au32dRiKJkZi3HYqlOF9gb0gIwKbbRSMQPDyELk7cbrVpJEhOpNLpvxJTuSEplZkBaOPhdMDXTAa+XVzQl5OtkYdDCAWDgFUWcHv/0ROOAW4rd7B8BjwCGPQGMBoNc58z3YbV+3umyf+EmCfmjqiOCcRFD7UJLBYzG0Cz1eIDMJbJaGQD6HQ6XAH0ej0bQL/f43kbg0ajZQMYDmXFhGIHEECtVrEBEPEEIFoGwIbeG38+hUgBuoQFhUiLNqE1TwRAWm3yh+N3Kf4FvfygMCu2Xp8AAAAASUVORK5CYII%3D',
    bookmark:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACfUlEQVQ4T5WTW0iTARiGnzl/TadLnUGpebgRDU2zg2YQmBdBJHYwNUHyhGIFURdaCJnQhUpUF2EoHqE8VZB4E0QlhaampmZZVprzUEpz859u0/3OGFGUaeB3/b4PH+/7fTL+M4dDNyTJgaZeU+1aMtl//LInt1O7sSwQfaZ2J7C8mnZNgL9K2P2m/3EHpimC9ySED2l4tS5AUXZUaU5JbSbGYYqzU8pyaz5mrQegGm0tG/LeFe3G/GfULeUzPsca/QHNSojsYLBzrI+fn4e9naBUubm6OCkULv6+m7bFpJzez+IszI+AtovmurvPh4ZN7+YMyzqNiG5BkomjWmlSlhDpXlRRfj1HEZgMGAAjLImgVYNhDPSfYLYXDG9BFEG0AZmCeZ2Z9OpvxdYQZYEeQlrlzQtFEXEZKvR6MEzBwjSIg6BpA50VYAKjAwjutH+QNGnV47mDk0uVv1twhn038qJvpWYlh9qYjTDT+dNsGAWTGRYdsci9qHph6j1fOXJWL9FqzWNljZ51lyOaE4967kDdAmY9LFpgwR4UPtR3Ob0+WdwZA0z8CvOfO3h61as3KnQmBL0JJDmY7WHRAWxdeDau7DtwpTv0zyb+Amx1JWjgmkuPUjAK4ACuASDZwaQazEuIdq7moLz+sDEtA6tucDxMyLx/TlWK3JavRjfLpdrpmmXkFMZ7nNoi6GyspriSiawHPYayVQHlSRsb0w+5n2h4aXx/sWGq4Mv3pXqr0NddnliYsDk/Ya9DQMUjzb2MO9r41QDKh5nKjqY+qa2qw1AAqFdcnXdquGN+bIgQeaRsNhwQV7bg5GzLdr1EO2BZ40ttnG2J0Ev0A3NWzQ/Exfbo5qJ4cQAAAABJRU5ErkJggg==',
    pictureRight:
      'data:image/png;base64,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',
    pictureDown:
      'data:image/png;base64,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',
    pictureLeft:
      'data:image/png;base64,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',
    controls:
      'data:image/png;base64,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',
  };

  /**
   * Checks if a JavaScript value is empty
   * @example
   * isEmpty(null) // true
   * isEmpty(undefined) // true
   * isEmpty([]) // true
   * isEmpty({}) // true
   * isEmpty("") // true
   * isEmpty(false) // false
   * isEmpty(0) // false
   * isEmpty([{},{"0":false},{"":0},{"0":0}]) // false
   * isEmpty(42) // false
   * isEmpty([{"":1},{"0":1}]) // false
   * @param {any} value - item to test
   * @returns {boolean} true if empty, otherwise false
   */
  /**
   * Checks if value is nothing. Deep-checks arrays and objects
   * @example
   * isNothing(null) // true
   * isNothing(undefined) // true
   * isNothing([]) // true
   * isNothing({}) // true
   * isNothing("") // true
   * isNothing(false) // true
   * isNothing(0) // true
   * isNothing([{},{"0":false},{"":0},{"0":0}]) // true
   * isNothing(42) // false
   * isNothing([{"":1},{"0":1}]) // false
   * @param {any} value - item to test
   * @returns {boolean} true if nothing, otherwise false
   */
  function isNothing(value) {
    const isEmptyObject = (a) => {
      if (!Array.isArray(a)) {
        // it's an Object, not an Array
        const hasNonempty = Object.keys(a).some((element) => !isNothing(a[element]));
        return hasNonempty ? false : isEmptyObject(Object.keys(a));
      }
      // check if array is really not empty as JS thinks at least one element should be non-empty
      return !a.some((element) => !isNothing(element));
    };
    return (
      // eslint-disable-next-line eqeqeq
      value == false ||
      value === 0 ||
      typeof value === 'undefined' ||
      value == null ||
      (typeof value === 'object' && isEmptyObject(value))
    );
  }

  // Get html pages content
  function getHtml(url, wait = settings.Timer) {
    return new Promise((resolve) => {
      setTimeout(() => {
        logScript(`Getting page: ${url}`);
        $.ajax({
          type: 'GET',
          url,
          dataType: 'html',
          async: true,
          success: (html) => {
            logScript(`Got page: ${url}`);
            resolve(html);
          },
          // retryCount and retryLimit will let you retry a determined number of times
          retryCount: 0,
          retryLimit: 10,
          // retryTimeout limits the next retry (in milliseconds)
          retryWait: 10000,
          // timeout for each request
          timeout: 1000,
          // created tells when this request was created
          created: Date.now(),
          error() {
            this.retryCount += 1;
            if (this.retryCount <= this.retryLimit) {
              logScript(`Retrying Getting page: ${url}`);
              setTimeout(() => {
                $.ajax(this);
              }, this.retryWait);
            } else {
              logScript(`Failed Getting page: ${url}`);
            }
          },
        });
      }, wait);
    });
  }
  // After pages load apply default Zoom
  function applyZoom(pages = '.PageContent img', zoom = settings.Zoom) {
    const $pages = typeof pages === 'string' ? $(pages) : pages;
    $pages.each((index, value) => {
      $(value).removeAttr('width').removeAttr('height').removeAttr('style');
      if (zoom === 1000) {
        $(value).width(window.innerWidth);
      } else if (zoom === -1000) {
        $(value).height(
          window.innerHeight +
            ($('#Navigation').hasClass('disabled') ? 0 : -34) +
            ($('#Chapter').hasClass('WebComic') ? 0 : -35),
        );
      } else {
        $(value).width($(value).prop('naturalWidth') * (zoom / 100));
      }
    });
  }
  // Force reload the image
  function reloadImage(img) {
    const src = img.attr('src');
    if (src !== undefined) {
      img.removeAttr('src');
      setTimeout(() => {
        img.attr('src', src);
      }, 500);
    }
  }
  function onImagesDone() {
    logScript('Images Loading Complete');
    if (!settings.lazyLoadImages) {
      $('.download').attr('href', '#download');
      logScript('Download Available');
      if (settings.DownloadZip) {
        $('#blob').trigger('click');
      }
    }
  }
  function updateProgress() {
    const total = $('.PageContent img').get().length;
    const loaded = $('.PageContent img.imgLoaded').get().length;
    const percentage = Math.floor((loaded / total) * 100);
    $('title').html(`(${percentage}%) ${$('#series i').first().text()}`);
    $('#Counters i, #NavigationCounters i').html(loaded.toString());
    NProgress.configure({
      showSpinner: false,
    }).set(loaded / total);
    logScript(`Progress: ${percentage}%`);
    if (loaded === total) onImagesDone();
  }
  // change class if the image is loaded or broken
  function onImagesProgress(imgLoad, image) {
    const $item = $(image.img);
    if (image.isLoaded) {
      $item.addClass('imgLoaded');
      $item.removeClass('imgBroken');
      const thumb = $item.attr('id').replace('PageImg', 'ThumbnailImg');
      $(`#${thumb}`)
        .attr('src', $item.attr('src'))
        .on('load', () => applyZoom($item));
    } else {
      $item.addClass('imgBroken');
      reloadImage($item);
      $item.parent().imagesLoaded().progress(onImagesProgress);
    }
    updateProgress();
  }
  // Corrects urls
  function normalizeUrl(url) {
    let uri = url.trim();
    if (uri.startsWith('//')) {
      uri = `https:${uri}`;
    }
    return uri;
  }
  // Adds an image to the place-holder div
  function addImg(index, imageSrc) {
    const src = normalizeUrl(imageSrc);
    if (!settings.lazyLoadImages || index < settings.lazyStart) {
      $(`#PageImg${index}`).attr('src', src);
      $(`#PageImg${index}`).parent().imagesLoaded().progress(onImagesProgress);
      logScript('Loaded Image:', index, 'Source:', src);
    } else {
      $(`#PageImg${index}`)
        .attr('data-src', src)
        .unveil({
          offset: 1000,
        })
        .on('loaded.unveil', () => {
          $(`#PageImg${index}`).parent().imagesLoaded().progress(onImagesProgress);
          logScript('Unveiled Image: ', index, ' Source: ', $(`#PageImg${index}`).attr('src'));
        });
    }
    return index;
  }
  // Adds a page to the place-holder div
  function addPage(manga, index, pageUrl) {
    if (!settings.lazyLoadImages || index < settings.lazyStart) {
      getHtml(pageUrl).then((response) => {
        const src = normalizeUrl(
          $(response)
            .find(manga.img)
            .attr(manga.lazyAttr ?? 'src'),
        );
        $(`#PageImg${index}`).attr('src', src);
        $(`#PageImg${index}`).parent().imagesLoaded().progress(onImagesProgress);
        logScript('Loaded Page:', index, 'Source:', src);
      });
    } else {
      $(`#PageImg${index}`)
        .attr(
          'data-src',
          'data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
        )
        .unveil({
          offset: 2000,
        })
        .on('loaded.unveil', () => {
          getHtml(pageUrl).then((response) => {
            const src = normalizeUrl(
              $(response)
                .find(manga.img)
                .attr(manga.lazyAttr ?? 'src'),
            );
            $(`#PageImg${index}`).attr('src', src).width('auto');
            $(`#PageImg${index}`).parent().imagesLoaded().progress(onImagesProgress);
            logScript('Unveiled Page: ', index, ' Source: ', $(`#PageImg${index}`).attr('src'));
          });
        });
    }
    return index;
  }
  // daley the use of an url/src
  function delayAdd(src, wait = settings.Timer) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(src);
      }, wait);
    });
  }
  // use a list of pages to fill the viewer
  function loadMangaPages(begin, manga) {
    return manga.listPages?.map((url, index) =>
      index >= begin
        ? delayAdd(url, (manga.timer || settings.Timer) * (index - begin)).then((response) =>
            addPage(manga, index + 1, response),
          )
        : null,
    );
  }
  // use a list of images to fill the viewer
  function loadMangaImages(begin, manga) {
    return manga.listImages?.map((src, index) =>
      index >= begin
        ? delayAdd(src, (manga.timer || settings.Timer) * (index - begin)).then((response) =>
            addImg(index + 1, response),
          )
        : null,
    );
  }
  // Entry point for loading hte Manga pages
  function loadManga(manga, begin = 1) {
    settings.lazyLoadImages = manga.lazy || settings.lazyLoadImages;
    logScript('Loading Images');
    logScript(`Intervals: ${manga.timer || settings.Timer || 'Default(1000)'}`);
    logScript(`Lazy: ${settings.lazyLoadImages}`);
    if (settings.lazyLoadImages) {
      logScript('Download may not work with Lazy Loading Images');
    }
    if (!isNothing(manga.listImages)) {
      logScript('Method: Images:', manga.listImages);
      loadMangaImages(begin - 1, manga);
    } else if (!isNothing(manga.listPages)) {
      logScript('Method: Pages:', manga.listPages);
      loadMangaPages(begin - 1, manga);
    } else if (manga.bruteForce !== undefined) {
      logScript('Method: Brute Force');
      manga.bruteForce({
        begin,
        addImg,
        addPage: (index, pageUrl) => addPage(manga, index, pageUrl),
        loadMangaImages: (m) => loadMangaImages(begin - 1, m),
        loadMangaPages: (m) => loadMangaPages(begin - 1, m),
        getHtml,
        wait: settings.Timer,
      });
    }
  }

  const scheme = new ColorScheme().scheme('mono').variation('default');
  // Add custom Themes to the page
  function addTheme(theme) {
    return `<style type='text/css' name='${theme[0]}'>
  .${theme[0]} .controlLabel, .${theme[0]} .ViewerTitle, .${theme[0]}, .PageFunctions a.visible, .${theme[0]} a, .${theme[0]} a:link, .${theme[0]} a:visited, .${theme[0]} a:active, .${theme[0]} a:focus{ text-decoration:none; color: ${theme[2]};}
  .${theme[0]} {background-repeat: repeat;background-position: 0 0;background-image: none;background-color: ${theme[1]};background-attachment: scroll;}
  .${theme[0]} #ImageOptions #menu .menuOuterArrow {border-left-width: 10px;border-left-style: solid;border-left-color: ${theme[4]};}
  .${theme[0]} #ImageOptions #menu .menuInnerArrow {border-left-width: 5px;border-left-style: solid;border-left-color: ${theme[1]};}
  .${theme[0]} .PageFunctions { border: 1px solid ${theme[3]}; border-bottom: medium none; border-left: medium none; border-right: medium none;}
  /*.${theme[0]} #Chapter { border: 1px solid ${theme[3]}; border-top: medium none; border-left: medium none; border-right: medium none;}*/
  .${theme[0]} .PageFunctions > span, .${theme[0]} .Thumbnail span {background: none repeat scroll 0 0 ${theme[4]};}
  .${theme[0]} .panel {background: none repeat scroll 0 0 ${theme[4]}; border: thin solid ${theme[3]};}
  .${theme[0]} .PageContent, .${theme[0]} .Thumbnail img { outline: 2px solid ${theme[3]}; background: none repeat scroll 0 0 ${theme[4]};}
  .${theme[0]} .ChapterControl a { border: 1px solid ${theme[3]}; background-color: ${theme[5]};
  </style>`;
  }
  function addCustomTheme(color) {
    const bg = scheme.from_hex(color.replace('#', '')).colors();
    return (
      addTheme(['Custom_Dark', '#000000', `#${bg[2]}`, `#${bg[3]}`, `#${bg[0]}`, `#${bg[1]}`]) +
      addTheme(['Custom_Light', '#eeeeec', `#${bg[3]}`, `#${bg[2]}`, `#${bg[0]}`, `#${bg[1]}`])
    );
  }
  function addFullCustomTheme(body, text, lines, panel, buttons) {
    return addTheme(['Full_Custom', body, text, lines, panel, buttons]);
  }
  function loadThemes() {
    const bg = scheme.from_hex(settings.CustomTheme.replace('#', '')).colors();
    return [
      //   1-body       2-text       3-lines     4-panel     5-buttons
      ['Dark', '#000000', '#ffffff', '#666666', '#333333', '#282828'],
      ['Light', '#eeeeec', '#2e3436', '#888a85', '#babdb6', '#c8cec2'],
      ['Clear', '#ffffff', '#2e3436', '#888a85', '#eeeeec', '#d3d7cf'],
      ['Dark_Blue', '#000000', '#91a0b0', '#586980', '#3e4b5b', '#222c3b'],
      ['Tango_Blue', '#000000', '#82a0bf', '#3d669b', '#304c77', '#102747'],
      ['Lime', '#000000', '#8abd59', '#608d34', '#38531f', '#233413'],
      ['Plum', '#000000', '#ad7fa8', '#75507b', '#49324d', '#311b37'],
      ['Light_Plum', '#eeeeec', '#5c3566', '#9b71a2', '#ad7fa8', '#d2b8ce'],
      ['Earthy', '#000000', '#ffffff', '#693d3d', '#46211a', '#683327'],
      ['Cool_Blues', '#000000', '#c4dfe6', '#66a5ad', '#07575b', '#003b46'],
      ['Custom_Dark', '#000000', `#${bg[2]}`, `#${bg[3]}`, `#${bg[0]}`, `#${bg[1]}`],
      ['Custom_Light', '#eeeeec', `#${bg[3]}`, `#${bg[2]}`, `#${bg[0]}`, `#${bg[1]}`],
      [
        'Full_Custom',
        settings.CustomThemeBody,
        settings.CustomThemeText,
        settings.CustomThemeLines,
        settings.CustomThemePanel,
        settings.CustomThemeButton,
      ],
    ];
  }
  const themes = loadThemes();
  const themesSelector = themes.map(
    (theme) =>
      `<option value='${theme[0]}' ${
        settings.Theme === theme[0] ? 'selected' : ''
      }>${theme[0].replace('_', ' ')}</option>`,
  );
  const themesCSS = themes.map(addTheme).join('');

  // Goto Page and Thumbnails
  function scrollToElement(ele) {
    $(W).scrollTop(ele.offset().top).scrollLeft(ele.offset().left);
  }
  // Clean key press configurations and set some when specified
  function setKeyDownEvents() {
    try {
      $(document).off('keyup');
      $(document).off('keydown');
      $(document).off('keypress');
      $(document).off('onload');
      $(W).off('keyup');
      $(W).off('keydown');
      $(W).off('keypress');
      $(W).off('onload');
      document.onkeydown = null;
      document.onkeypress = null;
      W.onkeydown = null;
      W.onkeypress = null;
      W.onload = null;
      document.body.onload = null;
    } catch (e) {
      logScript(`Keybinds error: ${e}`);
    }
    function processKey(e) {
      const a = e.originalEvent.code;
      if (
        !e.originalEvent.ctrlKey &&
        !e.originalEvent.altKey &&
        !e.originalEvent.shiftKey &&
        !e.originalEvent.metaKey &&
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
            if (settings.Zoom === -1000) {
              const next = $('.MangaPage')
                .get()
                .map((item) => $(item).offset().top - $(window).scrollTop())
                .findIndex((element) => element > 10);
              scrollToElement($('.MangaPage').eq(next - 2));
            } else {
              window.scrollBy({
                top: -$(window).height() / 2,
                behavior: 'smooth',
              });
            }
            break;
          case 'ArrowDown':
          case 'KeyS':
          case 'Numpad2':
            if (settings.Zoom === -1000) {
              const next = $('.MangaPage')
                .get()
                .map((item) => $(item).offset().top - $(window).scrollTop())
                .findIndex((element) => element > 10);
              scrollToElement($('.MangaPage').eq(next));
            } else {
              window.scrollBy({
                top: $(window).height() / 2,
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
        }
        return false;
      }
      return true;
    }
    $(document).on('keydown', processKey);
  }
  // Controls for the extra features added to the sites
  function controls$1() {
    // Size Controls
    $('#enlarge').on('click', () => {
      settings.Zoom += settings.zoomStep;
      $('#Zoom b').html(settings.Zoom);
      applyZoom();
    });
    $('#reduce').on('click', () => {
      settings.Zoom -= settings.zoomStep;
      $('#Zoom b').html(settings.Zoom);
      applyZoom();
    });
    $('#restore').on('click', () => {
      settings.Zoom = 100;
      $('#Zoom b').html(settings.Zoom);
      applyZoom();
    });
    $('#fitWidth').on('click', () => {
      settings.Zoom = 1000;
      $('#Zoom b').html(settings.Zoom);
      applyZoom();
    });
    $('#fitHeight').on('click', () => {
      settings.Zoom = -1000;
      $('#Zoom b').html(settings.Zoom);
      applyZoom();
    });
    $('#zoomStep').on('change', (event) => {
      const step = $(event.target).val();
      setValueGM('MangaZoomStep', parseInt(step, 10));
      logScript(`zoomStep: ${getValueGM('MangaZoomStep')}`);
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
        setValueGM('MangaFitWidthIfOversize', true);
      } else {
        setValueGM('MangaFitWidthIfOversize', false);
      }
      logScript(`fitIfOversize: ${getValueGM('MangaFitWidthIfOversize')}`);
    });
    $('#viewMode').on('change', (event) => {
      const mode = $(event.target).val();
      $('#Chapter')
        .removeClass('WebComic')
        .removeClass('FluidLTR')
        .removeClass('FluidRTL')
        .addClass(mode);
      setValueGM('MangaViewMode', mode);
      logScript(`ViewMode: ${getValueGM('MangaViewMode')}`);
      applyZoom();
    });
    $('#loadMode').on('change', (event) => {
      const mode = $(event.target).val();
      setValueGM('MangaLoadMode', mode);
      logScript(`MangaLoadMode: ${getValueGM('MangaLoadMode')}`);
    });
    $('#showThumbnails').on('change', (event) => {
      $('#Navigation').toggleClass('disabled');
      if ($(event.target).is(':checked')) {
        setValueGM('MangaShowThumbnails', true);
      } else {
        setValueGM('MangaShowThumbnails', false);
      }
      logScript(`MangaShowThumbnails: ${getValueGM('MangaShowThumbnails')}`);
      applyZoom();
    });
    // Download
    $('#downloadZip').on('change', (event) => {
      if ($(event.target).is(':checked')) {
        setValueGM('MangaDownloadZip', true);
        Swal.fire({
          title: 'Attention',
          text: 'Next time a chapter finish loading you will be prompted to save automatically',
          timer: 10000,
          icon: 'info',
        });
      } else {
        setValueGM('MangaDownloadZip', false);
      }
      logScript(`MangaDownloadZip: ${getValueGM('MangaDownloadZip')}`);
    });
    $('#blob').one('click', generateZip);
    $('.download').on('click', () => {
      logScript('Downloading Chapter');
      $('#blob').trigger('click');
    });
    $('#lazyLoadImages').on('change', (event) => {
      if ($(event.target).is(':checked')) {
        setValueGM('MangaLazyLoadImages', true);
        Swal.fire({
          title: 'Warning',
          html: `Lazy load is incompatible with zip download, you will not be able to download with this setting ON.<br/>
               Suggestion: <span style="color:red;font-weight:bold">Disable Thumbnails</span> to save Bandwidth/Memory.`,
          icon: 'warning',
        });
      } else {
        setValueGM('MangaLazyLoadImages', false);
      }
      logScript(`MangaLazyLoadImages: ${getValueGM('MangaLazyLoadImages')}`);
    });
    $('#lazyStart').on('change', (event) => {
      const start = $(event.target).val();
      setValueGM('MangaLazyStart', start);
      logScript(`lazyStart: ${getValueGM('MangaLazyStart')}`);
    });
    $('#PagesPerSecond').on('change', (event) => {
      setValueGM('MangaTimer', parseInt($(event.target).val(), 10));
      logScript(`MangaTimer: ${getValueGM('MangaTimer')}`);
    });
    $('#DefaultZoom').on('change', (event) => {
      settings.Zoom = parseInt($(event.target).val(), 10);
      $('#Zoom b').html(settings.Zoom);
      setValueGM('MangaZoom', parseInt(settings.Zoom, 10));
      logScript(`MangaZoom: ${getValueGM('MangaZoom')}`);
      applyZoom();
    });
    // Toggle Controls
    $('#pageControls').on('click', () => {
      $('#MangaOnlineViewer').toggleClass('hideControls');
    });
    $('#hidePageControls').on('change', (event) => {
      $('#MangaOnlineViewer').toggleClass('hideControls');
      if ($(event.target).is(':checked')) {
        setValueGM('MangaHidePageControls', true);
      } else {
        setValueGM('MangaHidePageControls', false);
      }
      logScript(`MangaHidePageControls: ${getValueGM('MangaHidePageControls')}`);
    });
    // Theme Control
    $('#ThemeSelector').on('change', (event) => {
      const target = $(event.target);
      $('#MangaOnlineViewer , body').removeClass().addClass(target.val());
      logScript('MangaTheme', target.val());
      setValueGM('MangaTheme', target.val());
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
    $('INPUT.colorpicker').minicolors();
    $('#CustomThemeHue').on('change', (event) => {
      const target = $(event.target).val();
      logScript(`CustomTheme: ${target}`);
      $('style[title="Custom_Light"], style[title="Custom_Dark"]').remove();
      $('head').append(addCustomTheme(target));
      setValueGM('MangaCustomTheme', target);
      logScript(`MangaCustomTheme: ${getValueGM('MangaCustomTheme')}`);
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
          $('#CustomThemeHueBody').val(),
          $('#CustomThemeHueText').val(),
          $('#CustomThemeHueLines').val(),
          $('#CustomThemeHuePanel').val(),
          $('#CustomThemeHueButton').val(),
        ),
      );
      setValueGM('MangaCustomThemeBody', $('#CustomThemeHueBody').val());
      setValueGM('MangaCustomThemeText', $('#CustomThemeHueText').val());
      setValueGM('MangaCustomThemeLines', $('#CustomThemeHueLines').val());
      setValueGM('MangaCustomThemePanel', $('#CustomThemeHuePanel').val());
      setValueGM('MangaCustomThemeButton', $('#CustomThemeHueButton').val());
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
      const mark = {
        url: W.location.href,
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
      setValueGM('MangaBookmarks', JSON.stringify(settings.bookmarks));
      logScript(`MangaBookmarks: ${getValueGM('MangaBookmarks')}`);
    });
    // Reload Page
    $('.Reload').on('click', (event) => {
      reloadImage($(event.target).parents('.MangaPage').find('.PageContent img'));
    });
    // ZoomIn
    $('.ZoomIn').on('click', (event) => {
      const img = $(event.target).parents('.MangaPage').find('.PageContent img');
      const ratio = (img.width() / img.prop('naturalWidth')) * (100 + settings.zoomStep);
      applyZoom(img, ratio);
    });
    // ZoomOut
    $('.ZoomOut').on('click', (event) => {
      const img = $(event.target).parents('.MangaPage').find('.PageContent img');
      const ratio = (img.width() / img.prop('naturalWidth')) * (100 - settings.zoomStep);
      applyZoom(img, ratio);
    });
    // ZoomRestore
    $('.ZoomRestore').on('click', () => {
      $('.PageContent img').removeAttr('width');
    });
    // ZoomWidth
    $('.ZoomWidth').on('click', (event) => {
      const img = $(event.target).parents('.MangaPage').find('.PageContent img');
      applyZoom(img, 1000);
    });
    // ZoomHeight
    $('.ZoomHeight').on('click', (event) => {
      const img = $(event.target).parents('.MangaPage').find('.PageContent img');
      applyZoom(img, -1000);
    });
    // Hide
    $('.Hide').on('click', (event) => {
      const img = $(event.target).parents('.MangaPage').find('.PageContent');
      img.slideToggle('slow');
    });
  }

  var htmlKeybinds =
    'export default `<div id="ViewerShortcuts" class="panel" style="display:none"><kbd class="dark">Numpad 5</kbd>/<kbd class="dark">/</kbd>: Open Settings<br><kbd class="dark">Numpad +</kbd>/<kbd class="dark">=</kbd>: Global Zoom in pages (enlarge)<br><kbd class="dark">Numpad -</kbd>/<kbd class="dark">-</kbd>: Global Zoom out pages (reduce)<br><kbd class="dark">Numpad /</kbd>/<kbd class="dark">9</kbd>: Global Restore pages to original<br><kbd class="dark">Numpad *</kbd>/<kbd class="dark">0</kbd>: Global Fit window width<br><kbd class="dark">V</kbd>: Vertical Mode<br><kbd class="dark">C</kbd>: WebComic Mode<br><kbd class="dark">N</kbd>: Right to Left Mode<br><kbd class="dark">B</kbd>: Left to Right Mode<br><kbd class="dark">→</kbd>/<kbd class="dark">D</kbd>/<kbd class="dark">Numpad 6</kbd>/<kbd class="dark">.</kbd> : Next Chapter<br><kbd class="dark">←</kbd>/<kbd class="dark">A</kbd>/<kbd class="dark">Numpad 4</kbd>/<kbd class="dark">,</kbd> : Previous Chapter<br><kbd class="dark">↑</kbd>/<kbd class="dark">W</kbd>/<kbd class="dark">Numpad 8</kbd>: Scroll Up<br><kbd class="dark">↓</kbd>/<kbd class="dark">S</kbd>/<kbd class="dark">Numpad 2</kbd>: Scroll Down<br></div>`; //# sourceMappingURL=keybinds.js.map';

  var cssStyles =
    "export default `html { font-size: 100%; } body { margin: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #333; background-color: #FFF; padding: 0; } a { color: #08C; text-decoration: none; } img { height: auto; max-width: 100%; vertical-align: middle; border: 0 none; } #nprogress .bar { background: #29d; position: fixed; z-index: 1031; top: 0; left: 0; width: 100%; height: 4px; } #MangaOnlineViewer { width: 100%; height: 100%; padding-bottom: 100px; min-height: 1080px; } #MangaOnlineViewer #Chapter { text-align: center; margin: 25px auto 0; display: block; } #MangaOnlineViewer #Chapter.WebComic .PageFunctions { position: relative; margin-bottom: -23px; } #MangaOnlineViewer #Chapter.WebComic .PageContent { margin-bottom: 0; line-height: 0; } #MangaOnlineViewer #Chapter.FluidLTR .MangaPage { width: auto; } #MangaOnlineViewer #Chapter.FluidRTL .MangaPage { width: auto; } #MangaOnlineViewer #Chapter.FluidLTR { direction: ltr; } #MangaOnlineViewer #Chapter.FluidRTL { direction: rtl; } #MangaOnlineViewer #ViewerControls { padding: 8px; position: fixed; top: 0; left: 405px; width: auto; display: none; } #MangaOnlineViewer #ViewerShortcuts { padding: 8px; position: fixed; top: 65px; left: 0; } #MangaOnlineViewer #ViewerControls .controlLabel { display: list-item; list-style: none; } #MangaOnlineViewer select { height: 20px; padding: 0; margin-bottom: 5px; } #MangaOnlineViewer .controlButton { cursor: pointer; border: 0 none; } #MangaOnlineViewer #ImageOptions { left: 0; position: absolute; top: 0; width: 405px; } #MangaOnlineViewer #ImageOptions .panel { padding: 5px; position: inherit; } #MangaOnlineViewer #ImageOptions:hover { position: fixed; } #MangaOnlineViewer #ImageOptions.settingsOpen { position: fixed; } #MangaOnlineViewer #ImageOptions #menu { position: fixed; height: 64px; width: 200px; top: 0; } #MangaOnlineViewer #ImageOptions #Zoom { position: absolute; left: 18px; bottom: -65px; } #MangaOnlineViewer .MangaPage { width: 100%; display: inline-block; text-align: center; transform: translate3d(0, 0, 0); backface-visibility: hidden; perspective: 1000px; } #MangaOnlineViewer .PageContent { margin: 0 0 15px; text-align: center; display: inline-block; } #MangaOnlineViewer .PageContent img[src=\"\"], #MangaOnlineViewer .PageContent img:not([src]) { width: 500px; height: 750px; display: inline-block; } #MangaOnlineViewer #gotoPage { width: 35px; } #MangaOnlineViewer #ThemeSelector { width: 110px; } #MangaOnlineViewer .ChapterControl { margin-right: 120px; margin-top: 1px; float: right; } #MangaOnlineViewer .ChapterControl a { display: inline-block; width: 80px; height: 25px; text-align: center; margin-left: 3px; margin-bottom: -1px; } #MangaOnlineViewer .ChapterControl a[href='#'], #MangaOnlineViewer .ChapterControl a[href=''] { visibility: hidden } #MangaOnlineViewer .ViewerTitle { display: block; text-align: center; height: 35px; } #MangaOnlineViewer #Counters { position: absolute; right: 10px; top: 10px; } #MangaOnlineViewer .PageFunctions { font-family: monospace; font-size: 10pt; padding-right: 120px; text-align: right } #MangaOnlineViewer .PageFunctions > span { min-width: 20px; text-align: center; display: inline-block; padding: 2px 10px } #MangaOnlineViewer .PageFunctions > a { height: 16px; width: 16px; padding: 10px; } #MangaOnlineViewer .PageFunctions a { opacity: 0.2; } #MangaOnlineViewer .PageFunctions:hover a { opacity: 1; } #MangaOnlineViewer.hideControls .PageFunctions { display: none; visibility: hidden; } #MangaOnlineViewer #NavigationCounters { margin-top: 5px; width: 100%; } #MangaOnlineViewer #Navigation { bottom: -180px; height: 190px; overflow-x: hidden; overflow-y: hidden; padding-bottom: 20px; position: fixed; white-space: nowrap; width: 100%; text-align: center; } #MangaOnlineViewer #Navigation #Thumbnails { overflow-x: auto; overflow-y: hidden; } #MangaOnlineViewer #Navigation:hover { bottom: 0; } #MangaOnlineViewer #Navigation.disabled { display: none; } #MangaOnlineViewer #Navigation.visible { bottom: 0; } #MangaOnlineViewer #Navigation .Thumbnail { display: inline-block; height: 150px; margin: 0 5px; position: relative; } #MangaOnlineViewer #Navigation .Thumbnail span { display: block; opacity: 0.8; position: relative; top: -30px; width: 100%; } #MangaOnlineViewer #Navigation .Thumbnail img { align-content: center; cursor: pointer; display: inline-block; margin-bottom: -10px; margin-top: 10px; max-height: 150px; min-height: 150px; min-width: 80px; max-width: 160px; } #MangaOnlineViewer #Navigation .nav { transform: rotate(-90deg); } #MangaOnlineViewer #ImageOptions .menuOuterArrow { width: 0; height: 0; border-top: 10px solid transparent; border-bottom: 10px solid transparent; border-left: 10px solid blue; display: inline-block; position: absolute; bottom: 0; } #MangaOnlineViewer #ImageOptions .menuInnerArrow { width: 0; height: 0; border-top: 5px solid transparent; border-bottom: 5px solid transparent; border-left: 5px solid white; left: -10px; position: absolute; top: -5px; display: inline-block; } #MangaOnlineViewer.mobile * { float: none !important; } #MangaOnlineViewer.mobile #Navigation { display: none; } #MangaOnlineViewer.mobile .PageFunctions { padding: 0; } #MangaOnlineViewer.mobile .PageFunctions a:not(.Bookmark) { display: none; } #MangaOnlineViewer.mobile .PageFunctions a.Bookmark { opacity: 1; } #MangaOnlineViewer.mobile .PageFunctions span { right: 0; position: inherit; text-align: center; } #MangaOnlineViewer.mobile .PageContent { margin: 0; width: 100%; } #MangaOnlineViewer.mobile .PageContent img { width: 100% !important; } #MangaOnlineViewer.mobile .fitWidthIfOversize .PageContent img { max-width: 100%; } #MangaOnlineViewer.mobile #ImageOptions img:not(#settings) { display: none; } #MangaOnlineViewer.mobile #ViewerShortcuts { display: none !important; } #MangaOnlineViewer.mobile #ViewerControls { padding: 8px; position: fixed; top: 0; left: 45px; width: auto; } #MangaOnlineViewer.mobile #ViewerControls span.DefaultZoom, #MangaOnlineViewer.mobile #ViewerControls span.viewMode, #MangaOnlineViewer.mobile #ViewerControls span.fitIfOversize, #MangaOnlineViewer.mobile #ViewerControls span.showThumbnails, #MangaOnlineViewer.mobile #ViewerControls span.lazyLoadImages, #MangaOnlineViewer.mobile #ViewerControls span.downloadZip { display: none; } #MangaOnlineViewer.mobile #ViewerControls { padding: 8px; position: fixed; top: 0; left: 45px; width: auto; } #MangaOnlineViewer.mobile #ImageOptions #menu { display: none; } #MangaOnlineViewer.mobile #ImageOptions #Zoom { display: none; } #MangaOnlineViewer.mobile .ViewerTitle { height: auto; } #MangaOnlineViewer.mobile .ChapterControl { margin: 10px; display: block; text-align: center; } #MangaOnlineViewer.mobile .ChapterControl .download { display: none; } #MangaOnlineViewer.mobile #Counters { position: inherit; text-align: center; margin: 10px; } #MangaOnlineViewer.mobile #Chapter { margin: 5px auto 0; } #MangaOnlineViewer .fitWidthIfOversize .PageContent img { max-width: 100%; } #MangaOnlineViewer .minicolors-theme-default .minicolors-swatch { top: 2px; left: 2px; } `; //# sourceMappingURL=styles.js.map";

  const externalScripts = [
    '<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js" integrity="sha512-894YE6QWD5I59HgZOGReFYm4dnWc1Qt5NtvYSaNcOP+u1T9qYdvdihz0PPSiiqn/+/3e7Jo4EaG7TubfWGUrMQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>',
    '<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.9.1/jszip.min.js" integrity="sha512-amNoSoOK3jIKx6qlDrv36P4M/h7vc6CHwiBU3XG9/1LW0ZSNe8E3iZL1tPG/VnfCrVrZc2Zv47FIJ7fyDX4DMA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>',
    '<script src="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.js" integrity="sha256-XWzSUJ+FIQ38dqC06/48sNRwU1Qh3/afjmJ080SneA8=" crossorigin="anonymous"></script>',
    '<script src="https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/11.4.10/sweetalert2.min.js" integrity="sha512-OgIASmUioEN3o3gYIAxYUeW4G5FWdhORLq0p7UhTM6Xrm5XGY4IrSDM3uYTCNh4ik4V8BX0NaX9/Z/VMqigCzg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>',
    '<script src="https://cdnjs.cloudflare.com/ajax/libs/color-scheme/1.0.1/color-scheme.min.js" integrity="sha256-7IUC8vhyoPLh1tuQJnffPB5VO6HpR4VWK4Y1ciOOoBY=" crossorigin="anonymous"></script>',
    '<script src="https://cdnjs.cloudflare.com/ajax/libs/unveil2/2.0.8/jquery.unveil2.min.js" integrity="sha256-B00tEEtJRbA9gas0viRdqVPI81EuZG+kYU978/alKt8=" crossorigin="anonymous"></script>',
    '<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.imagesloaded/5.0.0/imagesloaded.pkgd.min.js" integrity="sha512-kfs3Dt9u9YcOiIt4rNcPUzdyNNO9sVGQPiZsub7ywg6lRW5KuK1m145ImrFHe3LMWXHndoKo2YRXWy8rnOcSKg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>',
    '<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-minicolors/2.3.6/jquery.minicolors.min.js" integrity="sha512-vBqPkpOdZM0O7YezzE8xaoUdyt4Z2d+gLrY0AMvmNPLdLuNzvreTopyuaM9/FiRzHs1bwWzYDJgH6STcuNXpqg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>',
  ];
  externalScripts.map((script) => {
    const find = script.match(/src="(.+?)"/);
    return find ? find[1] : '';
  });
  const externalCSS = [
    '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" integrity="sha256-l85OmPOjvil/SOvVt3HnSSjzF1TUMyT9eV0c2BzEGzU=" crossorigin="anonymous" />',
    '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css" integrity="sha256-pMhcV6/TBDtqH9E9PWKgS+P32PVguLG8IipkPyqMtfY=" crossorigin="anonymous" />',
    '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gerhobbelt/keyscss@1.1.3-6/keys.css" integrity="sha256-a/1ebfXeoX0xLUcQCJLQsm6APQNBwrm03/XFcvW7xAI=" crossorigin="anonymous">',
    '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/11.4.10/sweetalert2.min.css" integrity="sha512-R9EM3xazxo9xyo8pz3IMTw7SIO1qKnG1Vs3yJnVApYhqDwemdSJJbcd5KROicK87kRiFksOhhtW/s2c4Mdjrwg==" crossorigin="anonymous" referrerpolicy="no-referrer" />',
    '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-minicolors/2.3.6/jquery.minicolors.min.css" integrity="sha512-BVeRnUOL0G7d4gXmj+0VxpoiQuEibKQtlkclADKvCdNrESs0LA6+H8s1lU455VqWFtHBfF/pKDGw/CMat2hqOg==" crossorigin="anonymous" referrerpolicy="no-referrer" />',
  ];

  const panel = `<div id='ImageOptions'>
  <div id='menu'>
    <span class='menuOuterArrow'><span class='menuInnerArrow'></span></span>
  </div>
  <div class='panel'>
    <img id='enlarge' alt='Enlarge' title='Enlarge' src='${icon.enlarge}' class='controlButton' />
    <img id='restore' alt='Restore' title='Restore' src='${icon.restore}' class='controlButton' />
    <img id='reduce' alt='Reduce' title='Reduce' src='${icon.reduce}' class='controlButton' />
    <img id='fitWidth' alt='Fit Width' title='Fit Width' src='${icon.fitWidth}' class='controlButton' />
    <img id='fitHeight' alt='Fit Height' title='Fit Height' src='${icon.fitHeight}' class='controlButton' />
    <img id='webComic' alt='Web Comic Mode' title='Web Comic Mode' src='${icon.webComic}' class='controlButton' />
    <img id='ltrMode' alt='Left to Right Mode' title='Left to Right Mode' src='${icon.pictureLeft}' class='controlButton'/>
    <img id='verticalMode' alt='Vertical Mode' title='Vertical Mode' src='${icon.pictureDown}' class='controlButton'/>
    <img id='rtlMode' alt='Right to Left Mode' title='Right to Left Mode' src='${icon.pictureRight}' class='controlButton'/>
    <img id='pageControls' alt='Toggle Page Controls' title='Toggle Page Controls' src='${icon.controls}' class='controlButton'/>
    <img id='settings' alt='settings' title='settings' src='${icon.settings}' class='controlButton' />
  </div>
  <div id='Zoom' class='controlLabel'>Zoom: <b>${settings.Zoom}</b> %</div>
</div>`;
  const controls = `<div id='ViewerControls' class='panel'>
  <span class='controlLabel ThemeSelector'>Theme:
    <select id='ThemeSelector'>
      ${themesSelector}
    </select>
      <span class='CustomTheme' ${
        settings.Theme !== 'Custom_Dark' && settings.Theme !== 'Custom_Light'
          ? 'style="display: none;"'
          : ''
      }><br/>-Base:<input id='CustomThemeHue' value='${
    settings.CustomTheme
  }' class='colorpicker CustomTheme'></span>
      <span class='FullCustom' ${
        settings.Theme !== 'Full_Custom' ? 'style="display: none;"' : ''
      }><br/>-Body:<input id='CustomThemeHueBody' value='${
    settings.CustomThemeBody
  }' class='colorpicker FullCustom'></span>
      <span class='FullCustom' ${
        settings.Theme !== 'Full_Custom' ? 'style="display: none;"' : ''
      }><br/>-Text:<input id='CustomThemeHueText' value=${
    settings.CustomThemeText
  }' class='colorpicker FullCustom'></span>
      <span class='FullCustom' ${
        settings.Theme !== 'Full_Custom' ? 'style="display: none;"' : ''
      }><br/>-Lines:<input id='CustomThemeHueLines' value='${
    settings.CustomThemeLines
  }' class='colorpicker FullCustom'></span>
      <span class='FullCustom' ${
        settings.Theme !== 'Full_Custom' ? 'style="display: none;"' : ''
      }><br/>-Painels:<input id='CustomThemeHuePanel' value='${
    settings.CustomThemePanel
  }' class='colorpicker FullCustom'></span>
      <span class='FullCustom' ${
        settings.Theme !== 'Full_Custom' ? 'style="display: none;"' : ''
      }><br/>-Buttons:<input id='CustomThemeHueButton' value='${
    settings.CustomThemeButton
  }' class='colorpicker FullCustom'></span>
  </span>
  <span class='controlLabel loadMode'>Default Load Mode:
    <select id='loadMode'>
      <option value='normal' ${
        settings.loadMode === 'normal' ? 'selected' : ''
      }>Normal(Wait 3 sec)</option>
      <option value='always' ${
        settings.loadMode === 'always' ? 'selected' : ''
      }>Always(Immediately)</option>
      <option value='never' ${
        settings.loadMode === 'never' ? 'selected' : ''
      }>Never(Manually)</option>
    </select>
  </span>
  <span class='controlLabel PagesPerSecond'>Pages/Second:
    <select id='PagesPerSecond'>
      <option value='3000' ${settings.Timer === 3000 ? 'selected' : ''}>0.3(Slow)</option>
      <option value='2000' ${settings.Timer === 2000 ? 'selected' : ''}>0.5</option>
      <option value='1000' ${settings.Timer === 1000 ? 'selected' : ''}>01(Normal)</option>
      <option value='500' ${settings.Timer === 500 ? 'selected' : ''}>02</option>
      <option value='250' ${settings.Timer === 250 ? 'selected' : ''}>04(Fast)</option>
      <option value='125' ${settings.Timer === 125 ? 'selected' : ''}>08</option>
      <option value='100' ${settings.Timer === 100 ? 'selected' : ''}>10(Extreme)</option>
    </select>
  </span>
  <span class='controlLabel DefaultZoom'>Default Zoom:
    <select id='DefaultZoom'>
      <option value='50' ${settings.Zoom === 50 ? 'selected' : ''}>50%</option>
      <option value='75' ${settings.Zoom === 75 ? 'selected' : ''}>75%</option>
      <option value='100' ${settings.Zoom === 100 ? 'selected' : ''}>100%</option>
      <option value='125' ${settings.Zoom === 125 ? 'selected' : ''}>125%</option>
      <option value='150' ${settings.Zoom === 150 ? 'selected' : ''}>150%</option>
      <option value='175' ${settings.Zoom === 175 ? 'selected' : ''}>175%</option>
      <option value='200' ${settings.Zoom === 200 ? 'selected' : ''}>200%</option>
      <option value='1000' ${settings.Zoom === 1000 ? 'selected' : ''}>Fit Width</option>
      <option value='-1000' ${settings.Zoom === -1000 ? 'selected' : ''}>Fit Height</option>
    </select>
  </span>
  <span class='controlLabel zoomStep'>Zoom Change Step (between 5 and 50): <br/>
    <input type='range' value='${
      settings.zoomStep
    }' name='zoomStep' id='zoomStep' min='5' max='50' step='5' oninput='zoomStepVal.value = this.value'>
    <output id='zoomStepVal'>${settings.zoomStep}</output>
  </span>
  <span class='controlLabel viewMode'>Default View Mode:
    <select id='viewMode'>
      <option value='' ${settings.viewMode === '' ? 'selected' : ''}>Vertical</option>
      <option value='WebComic' ${
        settings.viewMode === 'WebComic' ? 'selected' : ''
      }>WebComic</option>
      <option value='FluidLTR' ${
        settings.viewMode === 'FluidLTR' ? 'selected' : ''
      }>Left to Right</option>
      <option value='FluidRTL' ${
        settings.viewMode === 'FluidRTL' ? 'selected' : ''
      }>Right to Left</option>
    </select>
  </span>
  <span class='controlLabel fitIfOversize'>Fit Width if Oversize:
    <input type='checkbox' value='true' name='fitIfOversize' id='fitIfOversize' ${
      settings.FitWidthIfOversize ? 'checked' : ''
    }>
  </span>
  <span class='controlLabel showThumbnails'>Show Thumbnails:
    <input type='checkbox' value='true' name='showThumbnails' id='showThumbnails' ${
      settings.ShowThumbnails ? 'checked' : ''
    }>
   </span>
   <span class='controlLabel lazyLoadImages'>Lazy Load Images:
    <input type='checkbox' value='true' name='lazyLoadImages' id='lazyLoadImages' ${
      settings.lazyLoadImages ? 'checked' : ''
    }>
   </span>
   <span class='controlLabel lazyStart'>Lazy Start From Page (between 5 and 100):<br/>
    <input type='range' value='${
      settings.lazyStart
    }' name='lazyStart' id='lazyStart' min='5' max='100' step='5' oninput='lazyStartVal.value = this.value'>
    <output id='lazyStartVal'>${settings.lazyStart}</output>
  </span>
  <span class='controlLabel downloadZip'>Download Images as Zip Automatically:
    <input type='checkbox' value='false' name='downloadZip' id='downloadZip' ${
      settings.DownloadZip ? 'checked' : ''
    }>
  </span>
  <span class='controlLabel hidePageControls'>Always Hide Page Controls:
    <input type='checkbox' value='false' name='hidePageControls' id='hidePageControls' ${
      settings.hidePageControls ? 'checked' : ''
    }>
  </span>
</div>`;
  const chapterControl = (id) => (manga) =>
    `<div id='${id}' class='ChapterControl'>
    <a href='#' class='download'>Download</a>
    <a class='prev' id='prev' href='${manga.prev || ''}' onclick='W.location="${
      manga.prev || ''
    }";W.location.reload();'>Previous</a>
    <a class='next' id='next' href='${manga.next || ''}' onclick='W.location="${
      manga.next || ''
    }";W.location.reload();'>Next</a>
</div>`;
  const chapterControlTop = chapterControl('ChapterControlTop');
  const chapterControlBottom = chapterControl('ChapterControlBottom');
  const title = (manga) =>
    `<div class='ViewerTitle'><br/><a id='series' href='${manga.series}'><i>${manga.title}</i><br/>(Return to Chapter List)</a></div>`;
  // Add Pages Place-holders
  const listPages = (times) =>
    Array(times)
      .fill(null)
      .map(
        (_, index) => `
<div id='Page${index + 1}' class='MangaPage'>
  <div class='PageFunctions'>
    <a class='Bookmark controlButton' title='Bookmark'></a>
    <a class='ZoomIn controlButton' title='Zoom In'></a>
    <a class='ZoomRestore controlButton' title='Zoom Restore'></a>
    <a class='ZoomOut controlButton' title='Zoom Out'></a>
    <a class='ZoomWidth controlButton' title='Zoom to Width'></a>
    <a class='ZoomHeight controlButton' title='Zoom to Height'></a>
    <a class='Hide controlButton' title='Hide'></a>
    <a class='Reload controlButton' title='Reload'></a>
    <span>${index + 1}</span>
  </div>
  <div class='PageContent'>
    <img id='PageImg${index + 1}' alt='PageImg${index + 1}' />
  </div>
</div>`,
      );
  const listOptions = (times) =>
    Array(times)
      .fill(null)
      .map((_, index) => `<option value='${index + 1}'>${index + 1}</option>`);
  const listThumbnails = (times) =>
    Array(times)
      .fill(null)
      .map(
        (_, index) =>
          `<div id='Thumbnail${index + 1}' class='Thumbnail'><img id='ThumbnailImg${
            index + 1
          }' alt='ThumbnailImg${index + 1}' src=''/><span>${index + 1}</span></div>`,
      );
  const body = (manga, begin = 0) => `
<div id='MangaOnlineViewer' class='${settings.Theme} ${isMobile ? 'mobile' : ''} ${
    settings.hidePageControls ? 'hideControls' : ''
  }'>
  ${title(manga)}
  <div id='Counters' class='controlLabel'>
    <i>0</i> of <b>${manga.pages}</b> Pages Loaded
    <span class='controlLabel'>Go to Page:</span>
    <select id='gotoPage'>
      <option selected>#</option>
      ${listOptions(manga.pages).slice(begin).join('')}
    </select>
  </div>
  ${chapterControlTop(manga)}
  <div id='Chapter' class='${settings.FitWidthIfOversize === true ? 'fitWidthIfOversize' : ''} ${
    settings.viewMode
  }'>
    ${listPages(manga.pages).slice(begin).join('')}
  </div>
  ${title(manga)}
  ${chapterControlBottom(manga)}
  ${panel}
  ${controls}
  ${htmlKeybinds}
  <div id='Navigation' class='panel ${settings.ShowThumbnails ? '' : 'disabled'}'>
    <div id='NavigationCounters' class='controlLabel'>
      <img alt='Thumbnails' title='Thumbnails' src='${icon.menu}' class='nav' /><i>0</i> of <b>${
    manga.pages
  }</b> Pages Loaded
    </div>
    <div id='Thumbnails'>
      ${listThumbnails(manga.pages).slice(begin).join('')}
    </div>
  </div>
  <a href='#' id='blob' style='display: none;'>Download</a>
</div>`;
  // Inject CSS for this script
  const readerCSS = `<style type='text/css'>
${cssStyles}
#MangaOnlineViewer .PageFunctions .Bookmark {background: url('${icon.bookmark}') no-repeat scroll center center transparent;}
#MangaOnlineViewer .PageFunctions .Reload {background: url('${icon.reload}') no-repeat scroll center center transparent;}
#MangaOnlineViewer .PageFunctions .Hide {background: url('${icon.hide}') no-repeat scroll center center transparent;}
#MangaOnlineViewer .PageFunctions .ZoomIn {background: url('${icon.zoomIn}') no-repeat scroll center center transparent;}
#MangaOnlineViewer .PageFunctions .ZoomOut {background: url('${icon.zoomOut}') no-repeat scroll center center transparent;}
#MangaOnlineViewer .PageFunctions .ZoomRestore {background: url('${icon.zoomRestore}') no-repeat scroll center center transparent;}
#MangaOnlineViewer .PageFunctions .ZoomWidth {background: url('${icon.zoomWidth}') no-repeat scroll center center transparent;}
#MangaOnlineViewer .PageFunctions .ZoomHeight {background: url('${icon.zoomWidth}') no-repeat scroll center center transparent;}
</style>`;
  function reader(manga, begin = 0) {
    return `
<head>
  <title>${manga.title}</title>
  <meta charset='UTF-8'>
  ${externalScripts.join('\n')}
  ${externalCSS.join('\n')}
  ${readerCSS}
  ${themesCSS}
</head>
<body class='${settings.Theme}'>
  ${body(manga, begin > 0 ? begin - 1 : 0)}
</body>`;
  }

  function formatPage(manga, begin = 0) {
    W.stop();
    if (manga.before !== undefined) {
      manga.before();
    }
    document.documentElement.innerHTML = reader(manga, begin);
    logScript('Rebuilding Site');
    setTimeout(() => {
      try {
        controls$1();
        setKeyDownEvents();
        setTimeout(() => {
          $(window).scrollTop(0);
          loadManga(manga, begin);
        }, 50);
        // Clear used Bookmarks
        if (!isNothing(settings.bookmarks.filter((el) => el.url === W.location.href))) {
          logScript(`Bookmark Removed ${W.location.href}`);
          settings.bookmarks = settings.bookmarks.filter((el) => el.url !== W.location.href);
          setValueGM('MangaBookmarks', JSON.stringify(settings.bookmarks));
        }
      } catch (e) {
        logScript(e);
      }
    }, 50);
    if (manga.after !== undefined) {
      manga.after();
    }
  }
  function lateStart(site, begin = 1) {
    const manga = site.run();
    logScript('LateStart');
    const options = {
      title: 'Starting<br>MangaOnlineViewer',
      input: 'range',
      inputAttributes: {
        min: '1',
        max: manga.pages.toString(),
        step: '1',
      },
      inputValue: begin,
      text: 'Choose the Page to start from:',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      reverseButtons: true,
      icon: 'question',
    };
    Swal.fire(options).then((result) => {
      if (result.value) {
        logScript(`Choice: ${result.value}`);
        formatPage(manga, result.value);
      } else {
        logScript(result.dismiss);
      }
    });
  }
  // Organize the site adding place-holders for the manga pages
  function preparePage(site, manga, begin = 0) {
    logScript(`Found ${manga.pages} pages`);
    if (manga.pages > 0) {
      let beginning = begin;
      if (beginning === 0) {
        beginning = settings?.bookmarks?.find((b) => b.url === W.location.href)?.page || 0;
      }
      $('head').append(` ${externalScripts.join('\n')}
        ${externalCSS.join('\n')}
       <style type='text/css'>#mov {position: fixed;left: 50%;transform: translateX(-50%);top: 0;z-index: 1000000;border-radius: .25em;font-size: 1.5em;cursor: pointer;display: inline-block;margin: .3125em;padding: .625em 2em;box-shadow: none;font-weight: 500;color: #FFF;background: rgb(102, 83, 146);border: 1px #FFF;}</style>`);
      W.mov = (b) => lateStart(site, b || beginning);
      switch (site.start || settings.loadMode) {
        case 'never':
          $('body').append('<button id="mov" onclick=mov()>Start MangaOnlineViewer</button>');
          break;
        case 'always':
          formatPage(manga, 0);
          break;
        case 'normal':
        default:
          Swal.fire({
            title: 'Starting<br>MangaOnlineViewer',
            html: `${
              beginning > 1 ? `Resuming reading from Page ${beginning}.<br/>` : ''
            }Please wait, 3 seconds...`,
            showCancelButton: true,
            cancelButtonColor: '#d33',
            reverseButtons: true,
            timer: 3000,
          }).then((result) => {
            if (result.value || result.dismiss === Swal.DismissReason.timer) {
              formatPage(manga, beginning);
            } else {
              $('body').append('<button id="mov" onclick=mov()>Start MangaOnlineViewer</button>');
              logScript(result.dismiss);
            }
          });
          break;
      }
    }
  }
  // Script Entry point
  function start(sites) {
    logScript(
      `Starting ${getInfoGM.script.name} ${
        getInfoGM.script.version
      } on ${getBrowser()} with ${getEngine()}`,
      getInfoGM,
    );
    // W.InfoGM = getInfoGM;
    logScript(`${sites.length} Known Manga Sites`);
    let waitElapsed = 0;
    // Wait for something on the site to be ready before executing the script
    function waitExec(site) {
      if (site.waitMax !== undefined) {
        if (waitElapsed >= site.waitMax) {
          preparePage(site, site.run());
          return;
        }
      }
      if (site.waitAttr !== undefined) {
        const wait = $(site.waitAttr[0]).attr(site.waitAttr[1]);
        logScript(`Waiting for ${site.waitAttr[1]} of ${site.waitAttr[0]} = ${wait}`);
        if (isNothing(wait)) {
          setTimeout(() => {
            waitExec(site);
          }, site.waitStep || 1000);
          waitElapsed += site.waitStep || 1000;
          return;
        }
      }
      if (site.waitEle !== undefined) {
        const wait = $(site.waitEle);
        logScript(`Waiting for ${site.waitEle} = ${wait}`);
        if (isNothing(wait)) {
          setTimeout(() => {
            waitExec(site);
          }, site.waitStep || 1000);
          waitElapsed += site.waitStep || 1000;
          return;
        }
      }
      if (site.waitVar !== undefined) {
        const wait = W[site.waitVar];
        logScript(`Waiting for ${site.waitVar} = ${wait}`);
        if (isNothing(wait)) {
          setTimeout(() => {
            waitExec(site);
          }, site.waitStep || 1000);
          waitElapsed += site.waitStep || 1000;
          return;
        }
      }
      preparePage(site, site.run());
    }
    logScript('Looking for a match...');
    function test(list) {
      return list
        .filter((site) => site.url.test(W.location.href))
        .map(logScriptC('Site Found:'))
        .map(waitExec);
    }
    test(sites);
  }

  start(sites);
})();
