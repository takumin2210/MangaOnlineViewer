import { atom } from 'recoil';

const globalImageWidthAtom = atom<number>({
  key: 'globalImageWidthAtom',
  default: 0,
});
export default globalImageWidthAtom;
