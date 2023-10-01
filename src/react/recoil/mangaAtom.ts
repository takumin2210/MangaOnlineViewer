import { atom } from 'recoil';
import { IManga } from '../../types';

const defaultManga: IManga = {
  title: '',
  series: '',
  pages: 0,
  begin: 0,
  prev: '',
  next: '',
  listImages: [''],
};
const mangaAtom = atom<IManga>({
  key: 'mangaAtom',
  default: defaultManga,
});
export default mangaAtom;
