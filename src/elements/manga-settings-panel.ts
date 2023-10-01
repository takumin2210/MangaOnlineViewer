import { css, html, LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import { themesCSS } from '../ui/themes';
import { IconCheck, IconMoon, IconPalette, IconSun, IconX } from './icons';
import locales from '../locales';
import { getLocaleString, getUserSettings } from '../core/settings';
import iconsCSS from '../ui/styles/icons.css';
import colors from '../utils/colors';

@customElement('manga-settings-panel')
export default class MangaSettingsPanel extends LitElement {
  @property({ reflect: true })
  visible = false;

  render() {
    return html`
      <div id="SettingsOverlay" class="overlay ${this.visible ? 'visible' : ''}"></div>
      <div id="SettingsPanel" class="panel ${this.visible ? 'visible' : ''}">
        <h2>${getLocaleString('SETTINGS')}</h2>
        <button id="CloseSettings" class="closeButton" title="${getLocaleString('CLOSE')}">
          ${IconX}
        </button>
        <button id="ResetSettings" class="simpleButton">
          ${getLocaleString('BUTTON_RESET_SETTINGS')}
        </button>
        <!-- =========================================================================================== -->
        <div class="ControlLabel locale">
          ${getLocaleString('LANGUAGE')}
          <select id="locale">
            ${map(
              locales,
              (locale) =>
                html`<option
                  value="${locale.ID}"
                  ${getUserSettings().locale === locale.ID ? 'selected' : ''}
                >
                  ${locale.NAME}
                </option>`,
            )}
          </select>
        </div>
        <!-- =========================================================================================== -->
        <div id="ThemeSection">
          <div class="ControlLabel ColorSchemeSelector">
            ${getLocaleString('COLOR_SCHEME')}
            <button id="ColorScheme" class="simpleButton">${IconSun} ${IconMoon}</button>
          </div>
          <!-- =========================================================================================== -->
          <div class="ControlLabel ThemeSelector">
            ${getLocaleString('THEME')}
            <span
              class="custom ThemeRadio 
            ${getUserSettings().theme === 'custom' ? 'selected' : ''}"
              title="custom"
            >
              ${IconPalette} ${IconCheck}
            </span>
            ${map(
              [...Object.keys(colors).map((color) => colors[color].name)],
              (theme) =>
                html` <span
                  title="${theme}"
                  class="${theme} ThemeRadio ${getUserSettings().theme === theme ? 'selected' : ''}"
                >
                  ${IconCheck}
                </span>`,
            )}
          </div>
          <!-- =========================================================================================== -->
          <div
            id="Hue"
            class="ControlLabel CustomTheme ControlLabelItem 
          ${getUserSettings().theme.startsWith('custom') ? 'show' : ''}"
          >
            ${getLocaleString('THEME_HUE')}
            <input
              id="CustomThemeHue"
              type="color"
              value="${getUserSettings().customTheme}"
              class="colorpicker CustomTheme"
            />
          </div>
          <!-- =========================================================================================== -->
          <div
            id="Shade"
            class="ControlLabel CustomTheme ControlLabelItem
          ${getUserSettings().theme.startsWith('custom') ? '' : 'show'}"
          >
            <span>
              ${getLocaleString('THEME_SHADE')}
              <output id="themeShadeVal" class="RangeValue" for="themeShade"
                >${getUserSettings().themeShade}</output
              >
            </span>
            <input
              type="range"
              value="${getUserSettings().themeShade}"
              name="ThemeShade"
              id="ThemeShade"
              min="100"
              max="900"
              step="100"
              oninput="themeShadeVal.value = this.value"
            />
          </div>
        </div>
        <!-- =========================================================================================== -->
        <div class="ControlLabel loadMode">
          ${getLocaleString('DEFAULT_LOAD_MODE')}
          <select id="loadMode">
            <option value="wait" ${getUserSettings().loadMode === 'wait' ? 'selected' : ''}>
              ${getLocaleString('LOAD_MODE_NORMAL')}
            </option>
            <option value="always" ${getUserSettings().loadMode === 'always' ? 'selected' : ''}>
              ${getLocaleString('LOAD_MODE_ALWAYS')}
            </option>
            <option value="never" ${getUserSettings().loadMode === 'never' ? 'selected' : ''}>
              ${getLocaleString('LOAD_MODE_NEVER')}
            </option>
          </select>
        </div>
        <!-- =========================================================================================== -->
        <div class="ControlLabel PagesPerSecond">
          ${getLocaleString('LOAD_SPEED')}
          <select id="PagesPerSecond">
            <option value="3000" ${getUserSettings().throttlePageLoad === 3000 ? 'selected' : ''}>
              0.3(${getLocaleString('SLOWLY')})
            </option>
            <option value="2000" ${getUserSettings().throttlePageLoad === 2000 ? 'selected' : ''}>
              0.5
            </option>
            <option value="1000" ${getUserSettings().throttlePageLoad === 1000 ? 'selected' : ''}>
              01(${getLocaleString('NORMAL')})
            </option>
            <option value="500" ${getUserSettings().throttlePageLoad === 500 ? 'selected' : ''}>
              02
            </option>
            <option value="250" ${getUserSettings().throttlePageLoad === 250 ? 'selected' : ''}>
              04(${getLocaleString('FAST')})
            </option>
            <option value="125" ${getUserSettings().throttlePageLoad === 125 ? 'selected' : ''}>
              08
            </option>
            <option value="100" ${getUserSettings().throttlePageLoad === 100 ? 'selected' : ''}>
              10(${getLocaleString('EXTREME')})
            </option>
            <option value="1" ${getUserSettings().throttlePageLoad === 1 ? 'selected' : ''}>
              ${getLocaleString('ALL_PAGES')}
            </option>
          </select>
        </div>
        <!-- =========================================================================================== -->
        <div class="ControlLabel DefaultZoomMode">
          ${getLocaleString('DEFAULT_ZOOM_MODE')}
          <select id="DefaultZoomMode">
            <option value="percent" ${getUserSettings().zoomMode === 'percent' ? 'selected' : ''}>
              ${getLocaleString('PERCENT')}
            </option>
            <option value="width" ${getUserSettings().zoomMode === 'width' ? 'selected' : ''}>
              ${getLocaleString('FIT_WIDTH')}
            </option>
            <option value="height" ${getUserSettings().zoomMode === 'height' ? 'selected' : ''}>
              ${getLocaleString('FIT_HEIGHT')}
            </option>
          </select>
        </div>
        <!-- =========================================================================================== -->
        <div
          class="ControlLabel DefaultZoom ControlLabelItem
        ${getUserSettings().zoomMode === 'percent' ? 'show' : ''}"
        >
          <span>
            ${getLocaleString('DEFAULT_ZOOM')}
            <output id="defaultZoomVal" class="RangeValue" for="DefaultZoom">
              ${getUserSettings().defaultZoom}%
            </output>
          </span>
          <input
            type="range"
            value="${getUserSettings().defaultZoom}"
            name="DefaultZoom"
            id="DefaultZoom"
            min="5"
            max="200"
            step="5"
            list="tickmarks"
            oninput='defaultZoomVal.value = this.value + "%"'
          />
          <datalist id="tickmarks">
            <option value="5">5</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="75">75</option>
            <option value="100">100</option>
            <option value="125">125</option>
            <option value="150">150</option>
            <option value="175">175</option>
            <option value="200">200</option>
          </datalist>
        </div>
        <!-- =========================================================================================== -->
        <div class="ControlLabel minZoom">
          <span>
            ${getLocaleString('MINIMUM_ZOOM')}
            <output id="minZoomVal" class="RangeValue" for="minZoom"
              >${getUserSettings().minZoom}%</output
            >
          </span>
          <input
            type="range"
            value="${getUserSettings().minZoom}"
            name="minZoom"
            id="minZoom"
            min="30"
            max="100"
            step="10"
            oninput='minZoomVal.value = this.value + "%"'
          />
        </div>
        <!-- =========================================================================================== -->
        <div class="ControlLabel zoomStep">
          <span>
            ${getLocaleString('ZOOM_STEP')}
            <output id="zoomStepVal" class="RangeValue" for="zoomStep"
              >${getUserSettings().zoomStep}%</output
            >
          </span>
          <input
            type="range"
            value="${getUserSettings().zoomStep}"
            name="zoomStep"
            id="zoomStep"
            min="5"
            max="50"
            step="5"
            oninput='zoomStepVal.value = this.value + "%"'
          />
        </div>
        <!-- =========================================================================================== -->
        <div class="ControlLabel viewMode">
          ${getLocaleString('DEFAULT_VIEW_MODE')}
          <select id="viewMode">
            <option value="Vertical" ${getUserSettings().viewMode === 'Vertical' ? 'selected' : ''}>
              ${getLocaleString('VIEW_MODE_VERTICAL')}
            </option>
            <option value="WebComic" ${getUserSettings().viewMode === 'WebComic' ? 'selected' : ''}>
              ${getLocaleString('VIEW_MODE_WEBCOMIC')}
            </option>
            <option value="FluidLTR" ${getUserSettings().viewMode === 'FluidLTR' ? 'selected' : ''}>
              ${getLocaleString('VIEW_MODE_LEFT')}
            </option>
            <option value="FluidRTL" ${getUserSettings().viewMode === 'FluidRTL' ? 'selected' : ''}>
              ${getLocaleString('VIEW_MODE_RIGHT')}
            </option>
          </select>
        </div>
        <!-- =========================================================================================== -->
        <div class="ControlLabel fitIfOversize">
          ${getLocaleString('FIT_WIDTH_OVERSIZED')}
          <input
            type="checkbox"
            value="true"
            name="fitIfOversize"
            id="fitIfOversize"
            ${getUserSettings().fitWidthIfOversize ? 'checked' : ''}
          />
        </div>
        <!-- =========================================================================================== -->
        <div class="ControlLabel showThumbnails">
          ${getLocaleString('SHOW_THUMBNAILS')}
          <input
            type="checkbox"
            value="true"
            name="showThumbnails"
            id="showThumbnails"
            ${getUserSettings().showThumbnails ? 'checked' : ''}
          />
        </div>
        <!-- =========================================================================================== -->
        <div class="ControlLabel lazyLoadImages">
          ${getLocaleString('LAZY_LOAD_IMAGES_ENABLE')}
          <input
            type="checkbox"
            value="true"
            name="lazyLoadImages"
            id="lazyLoadImages"
            ${getUserSettings().lazyLoadImages ? 'checked' : ''}
          />
        </div>
        <!-- =========================================================================================== -->
        <div
          class="ControlLabel lazyStart ControlLabelItem
        ${getUserSettings().lazyLoadImages ? 'show' : ''}"
        >
          <span>
            ${getLocaleString('LAZY_LOAD_IMAGES')}
            <output id="lazyStartVal" for="lazyStart">${getUserSettings().lazyStart}</output>
          </span>
          <input
            type="range"
            value="${getUserSettings().lazyStart}"
            name="lazyStart"
            id="lazyStart"
            min="5"
            max="100"
            step="5"
            oninput="lazyStartVal.value = this.value"
          />
        </div>
        <!-- =========================================================================================== -->
        <div class="ControlLabel downloadZip">
          ${getLocaleString('DOWNLOAD_IMAGES')}
          <input
            type="checkbox"
            value="false"
            name="downloadZip"
            id="downloadZip"
            ${getUserSettings().downloadZip ? 'checked' : ''}
          />
        </div>
        <!-- =========================================================================================== -->
        <div class="ControlLabel hidePageControls">
          ${getLocaleString('HIDE_CONTROLS')}
          <input
            type="checkbox"
            value="false"
            name="hidePageControls"
            id="hidePageControls"
            ${getUserSettings().hidePageControls ? 'checked' : ''}
          />
        </div>
        <!-- =========================================================================================== -->
        <div class="ControlLabel headerType">
          ${getLocaleString('HEADER_TYPE')}
          <select id="headerType">
            <option value="hover" ${getUserSettings().header === 'hover' ? 'selected' : ''}>
              ${getLocaleString('HEADER_HOVER')}
            </option>
            <option value="scroll" ${getUserSettings().header === 'scroll' ? 'selected' : ''}>
              ${getLocaleString('HEADER_SCROLL')}
            </option>
            <option value="click" ${getUserSettings().header === 'click' ? 'selected' : ''}>
              ${getLocaleString('HEADER_CLICK')}
            </option>
            <option value="fixed" ${getUserSettings().header === 'fixed' ? 'selected' : ''}>
              ${getLocaleString('HEADER_FIXED')}
            </option>
          </select>
        </div>
      </div>
    `;
  }

  static styles = [
    unsafeCSS(iconsCSS),
    unsafeCSS(themesCSS),
    css`
      .panel {
        padding: 5px;
        position: inherit;
        border-radius: 5px;
        background-color: var(--theme-background-color);
      }
      #SettingsPanel {
        color: var(--theme-text-color);
        padding: 10px;
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        z-index: 1000;
        transition:
          transform 0.3s ease-in,
          background-color 0.3s linear;
        transform: translateX(-100%);
        display: flex;
        flex-flow: column;
        gap: 5px;
        overflow-y: auto;
        max-width: 100vw;
        width: 305px;
      }

      #SettingsPanel.visible {
        transform: translateX(0);
      }

      #SettingsPanel .ControlLabel {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        align-items: center;
      }

      #SettingsPanel .ControlLabelItem {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      #SettingsPanel .ControlLabelItem:not(.show) {
        display: none;
      }

      #SettingsPanel input[type='range'] {
        width: 100%;
      }

      #SettingsPanel .RangeValue {
        display: inline-block;
        color: var(--theme-primary-text-color);
        line-height: 20px;
        text-align: center;
        border-radius: 3px;
        background: var(--theme-primary-color);
        padding: 2px 5px;
        margin-left: 8px;
      }

      #SettingsPanel datalist {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        writing-mode: vertical-lr;
        width: 100%;
      }

      #SettingsPanel datalist option {
        padding: 0;
      }
      #ThemeSection {
        border: 1px solid var(--theme-body-text-color);
        border-radius: 10px;
        padding: 10px;
      }

      .ThemeRadio {
        border: 1px solid var(--theme-text-color);
        color: var(--theme-primary-text-color);
        background-color: var(--theme-primary-color);
        height: 20px;
        width: 20px;
        border-radius: 50%;
        padding: 1px;
        margin: 2px 5px;
        position: relative;
      }

      .ThemeRadio svg {
        position: absolute;
        top: 15%;
        right: 15%;
      }

      .ThemeRadio.selected .icon-tabler-check {
        display: inline;
      }

      .ThemeRadio:not(.selected) .icon-tabler-check {
        display: none;
      }

      #ThemeSelector {
        width: 110px;
      }
      .closeButton {
        width: fit-content;
        height: fit-content;
        position: absolute;
        right: 10px;
        top: 10px;
      }

      .overlay {
        position: fixed;
        display: none;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 950;
        cursor: pointer;
      }

      .overlay.visible {
        display: block;
      }
    `,
  ];
}

declare global {
  interface HTMLElementMangaPageMap {
    'manga-settings-panel': MangaSettingsPanel;
  }
}
