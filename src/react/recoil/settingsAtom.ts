import { atom, AtomEffect } from 'recoil';
import { ISettings } from '../../types';
import { defaultSettings, getUserSettings, updateSettings } from '../../core/settings';

const gmStorageEffect: AtomEffect<ISettings> = ({ setSelf, onSet, trigger }) => {
  // Initialize atom value to the remote storage state
  if (trigger === 'get') {
    // Avoid expensive initialization
    setSelf(getUserSettings());
  }

  // Subscribe to local changes and update the server value
  onSet((newValue) => {
    updateSettings(newValue);
  });
};

const settingsAtom = atom<ISettings>({
  key: 'settingsAtom',
  default: defaultSettings,
  effects: [gmStorageEffect],
});
export default settingsAtom;
