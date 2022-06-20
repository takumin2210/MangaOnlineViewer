import { atom } from 'recoil';
import { IManga } from '../../types';

const defaultManga: IManga = {
  title: 'Loading...',
  series: '',
  pages: 1,
  prev: '',
  next: '',
  listImages: [''],
};
const mangaAtom = atom<IManga>({
  key: 'mangaAtom',
  default: defaultManga,
});
export default mangaAtom;
