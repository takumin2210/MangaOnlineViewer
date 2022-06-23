/* eslint-disable no-unused-vars,@typescript-eslint/no-unused-vars */
import mangahost from './mangahost.js';
import asurasflamecans from './asurasflamecans.js';
import batoto from './batoto.js';
import comicastle from './comicastle.js';
import disasterscans from './disasterscans.js';
import dysnatyscans from './dysnatyscans.js';
import foolslide from './foolslide.js';
import funmanga from './funmanga.js';
import hatigarmscans from './hatigarmscans.js';
import komiraw from './komiraw.js';
import jaiminisbox from './jaiminisbox.js';
import kissmanga from './kissmanga.js';
import leitor from './leitor.js';
import lhtranslation from './lhtranslation.js';
import madarawp from './madarawp.js';
import mangadex from './mangadex.js';
import mangadoom from './mangadoom.js';
import mangafox from './mangafox.js';
import mangafreak from './mangafreak.js';
import mangahere from './mangahere.js';
import mangahub from './mangahub.js';
import mangainn from './mangainn.js';
import mangakakalot from './mangakakalot.js';
import mangalyght from './mangalyght.js';
import wpmanga from './wpmanga.js';
import mangapark from './mangapark.js';
import mangareader from './mangareader.js';
import mangasee from './mangasee.js';
import mangatown from './mangatown.js';
import ninemanga from './ninemanga.js';
import rawdevart from './rawdevart.js';
import readcomicsonline from './readcomicsonline.js';
import readmangatoday from './readmangatoday.js';
import senmanga from './senmanga.js';
import tmofans from './tmofans.js';
import unionmangas from './unionmangas.js';
import localhost from './localhost.js';
import { ISite } from '../types/ISite';

const sites = [
  // localhost,
  asurasflamecans,
  comicastle,
  disasterscans,
  dysnatyscans,
  funmanga,
  hatigarmscans,
  // jaiminisbox, [Broken, Dead?]
  // japscan, Todo: Fix japscan
  // kissmanga, [Broken, Dead?]
  komiraw,
  leitor,
  lhtranslation,
  mangadex,
  mangadoom,
  mangafreak,
  mangafox,
  // mangago, [Weak? Not Safe?]
  mangahere,
  // mangahost, [Broken, Dead?]
  mangahub,
  mangainn,
  mangakakalot,
  mangalyght,
  mangapark,
  // mangareader, [RIP]
  mangasee,
  mangatown,
  ninemanga,
  rawdevart,
  readcomicsonline,
  readmangatoday,
  senmanga,
  // tenmanga, [Not Safe?]
  // thespectrum, [Broken, Dead?]
  tmofans,
  unionmangas,
  // wpmanga, Todo: Fix wpmanga
  batoto,
  foolslide, // Must be at the end because is a generic check
  madarawp, // Must be at the end because is a generic check
] as ISite[];
export default sites;
