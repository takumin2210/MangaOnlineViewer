import { atom, AtomEffect } from 'recoil';
import _ from 'lodash';
import { ISettings } from '../../types';
import { getSettings, setSettings } from '../../utils/tampermonkey';
import diffObj from '../../utils/diffObj';

const defaultSettings: ISettings = {
  configVersion: 1,
  downloadZip: false,
  zoomStep: 25,
  loadMode: 'wait',
  viewMode: 'inherit', // inherit = WebComic
  bookmarks: [],
  throttlePageLoad: 1000,
  widthScale: 5,
  theme: {
    colorScheme: 'dark',
    primaryColor: 'cyan',
    breakpoints: { sm: 768 },
    primaryShade: 6,
    white: '#F9F9F9', // #EEEEEE
    black: '#262626', // #121212
    colors: {
      gray: [
        '#F7FAFC',
        '#EDF2F7',
        '#E2E8F0',
        '#CBD5E0',
        '#A0AEC0',
        '#718096',
        '#4A5568',
        '#2D3748',
        '#1A202C',
        '#171923',
      ],

      red: [
        '#FFF5F5',
        '#FED7D7',
        '#FEB2B2',
        '#FC8181',
        '#F56565',
        '#E53E3E',
        '#C53030',
        '#9B2C2C',
        '#822727',
        '#63171B',
      ],

      orange: [
        '#FFFAF0',
        '#FEEBC8',
        '#FBD38D',
        '#F6AD55',
        '#ED8936',
        '#DD6B20',
        '#C05621',
        '#9C4221',
        '#7B341E',
        '#652B19',
      ],

      yellow: [
        '#FFFFF0',
        '#FEFCBF',
        '#FAF089',
        '#F6E05E',
        '#ECC94B',
        '#D69E2E',
        '#B7791F',
        '#975A16',
        '#744210',
        '#5F370E',
      ],

      green: [
        '#F0FFF4',
        '#C6F6D5',
        '#9AE6B4',
        '#68D391',
        '#48BB78',
        '#38A169',
        '#2F855A',
        '#276749',
        '#22543D',
        '#1C4532',
      ],

      teal: [
        '#E6FFFA',
        '#B2F5EA',
        '#81E6D9',
        '#4FD1C5',
        '#38B2AC',
        '#319795',
        '#2C7A7B',
        '#285E61',
        '#234E52',
        '#1D4044',
      ],

      blue: [
        '#ebf8ff',
        '#bee3f8',
        '#90cdf4',
        '#63b3ed',
        '#4299e1',
        '#3182ce',
        '#2b6cb0',
        '#2c5282',
        '#2a4365',
        '#1A365D',
      ],

      cyan: [
        '#EDFDFD',
        '#C4F1F9',
        '#9DECF9',
        '#76E4F7',
        '#0BC5EA',
        '#00B5D8',
        '#00A3C4',
        '#0987A0',
        '#086F83',
        '#065666',
      ],

      purple: [
        '#FAF5FF',
        '#E9D8FD',
        '#D6BCFA',
        '#B794F4',
        '#9F7AEA',
        '#805AD5',
        '#6B46C1',
        '#553C9A',
        '#44337A',
        '#322659',
      ],

      pink: [
        '#FFF5F7',
        '#FED7E2',
        '#FBB6CE',
        '#F687B3',
        '#ED64A6',
        '#D53F8C',
        '#B83280',
        '#97266D',
        '#702459',
        '#521B41',
      ],

      linkedin: [
        '#E8F4F9',
        '#CFEDFB',
        '#9BDAF3',
        '#68C7EC',
        '#34B3E4',
        '#00A0DC',
        '#008CC9',
        '#0077B5',
        '#005E93',
        '#004471',
      ],

      facebook: [
        '#E8F4F9',
        '#D9DEE9',
        '#B7C2DA',
        '#6482C0',
        '#4267B2',
        '#385898',
        '#314E89',
        '#29487D',
        '#223B67',
        '#1E355B',
      ],

      messenger: [
        '#D0E6FF',
        '#B9DAFF',
        '#A2CDFF',
        '#7AB8FF',
        '#2E90FF',
        '#0078FF',
        '#0063D1',
        '#0052AC',
        '#003C7E',
        '#002C5C',
      ],

      whatsapp: [
        '#dffeec',
        '#b9f5d0',
        '#90edb3',
        '#65e495',
        '#3cdd78',
        '#22c35e',
        '#179848',
        '#0c6c33',
        '#01421c',
        '#001803',
      ],

      twitter: [
        '#E5F4FD',
        '#C8E9FB',
        '#A8DCFA',
        '#83CDF7',
        '#57BBF5',
        '#1DA1F2',
        '#1A94DA',
        '#1681BF',
        '#136B9E',
        '#0D4D71',
      ],

      telegram: [
        '#E3F2F9',
        '#C5E4F3',
        '#A2D4EC',
        '#7AC1E4',
        '#47A9DA',
        '#0088CC',
        '#007AB8',
        '#006BA1',
        '#005885',
        '#003F5E',
      ],

      whiteAlpha: [
        'rgba(255, 255, 255, 0.04)',
        'rgba(255, 255, 255, 0.06)',
        'rgba(255, 255, 255, 0.08)',
        'rgba(255, 255, 255, 0.16)',
        'rgba(255, 255, 255, 0.24)',
        'rgba(255, 255, 255, 0.36)',
        'rgba(255, 255, 255, 0.48)',
        'rgba(255, 255, 255, 0.64)',
        'rgba(255, 255, 255, 0.80)',
        'rgba(255, 255, 255, 0.92)',
      ],

      blackAlpha: [
        'rgba(0, 0, 0, 0.04)',
        'rgba(0, 0, 0, 0.06)',
        'rgba(0, 0, 0, 0.08)',
        'rgba(0, 0, 0, 0.16)',
        'rgba(0, 0, 0, 0.24)',
        'rgba(0, 0, 0, 0.36)',
        'rgba(0, 0, 0, 0.48)',
        'rgba(0, 0, 0, 0.64)',
        'rgba(0, 0, 0, 0.80)',
        'rgba(0, 0, 0, 0.92)',
      ],
    },
    other: {
      variant: 'filled',
    },
  },
};
const gmStorageEffect: AtomEffect<ISettings> = ({ setSelf, onSet, trigger }) => {
  // Initialize atom value to the remote storage state
  if (trigger === 'get') {
    // Avoid expensive initialization
    const value = getSettings(defaultSettings);
    setSelf(_.defaultsDeep(value, defaultSettings));
  }

  // Subscribe to local changes and update the server value
  onSet((newValue) => {
    setSettings(diffObj(newValue, defaultSettings));
  });
};

const settingsAtom = atom<ISettings>({
  key: 'settingsAtom',
  default: defaultSettings,
  effects: [gmStorageEffect],
});
export default settingsAtom;
