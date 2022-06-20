import { IBookmark } from './IBookmark';

export interface ITheme {
  primaryShade: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  colorScheme: 'dark' | 'light';
  white: string;
  black: string;
  colors: Record<
    string,
    [string, string, string, string, string, string, string, string, string, string]
  >;
  primaryColor: string;
  breakpoints: { sm: number };
  other: {
    variant: 'filled' | 'outline' | 'light';
  };
}

export interface ISettings {
  configVersion: number;
  downloadZip: boolean;
  zoomStep: number;
  viewMode: 'inherit' | 'ltr' | 'rtl'; // inherit = WebComic
  bookmarks: IBookmark[];
  loadMode: 'wait' | 'always' | 'never';
  throttlePageLoad: number;
  theme: ITheme;
  widthScale: number;
}
