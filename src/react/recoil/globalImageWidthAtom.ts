import { atom } from 'recoil';
import { getUserSettings } from '../../core/settings';

const globalImageWidthAtom = atom<number>({
  key: 'globalImageWidthAtom',
  default: getUserSettings().defaultZoom,
});
export default globalImageWidthAtom;
