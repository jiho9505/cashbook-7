import { PATHS } from '@src/static/constants';
import { SimplifiedLogo, Logout } from '@src/static/image-urls';
import { HTMLText, Image, Month, Path, Year } from '@src/types';
import handleEvent from '@src/utils/handleEvent';
import { $, createDOMWithSelector, removeValueOnLocalStorage } from '@src/utils/helper';

import './index.scss';
import MonthController from './MonthController/MonthController';

export default class Header {
  currentPath: Path;
  currentYear: Year;
  currentMonth: Month;

  constructor() {
    handleEvent.subscribe('storeupdated', (e: CustomEvent) => {
      const { path, year, month } = e.detail.state;

      this.currentPath = path;
      this.currentYear = year;
      this.currentMonth = month;

      this.render();
    });

    $('header').addEventListener('click', this.onClickNavItem);
  }

  /**
   * 마우스로 아이템을 클릭할 경우,
   * HTMLElement 이외의 요소를 클릭하면 return,
   * a tag가 아니면 return 합니다.
   * 예외 처리를 통과하면, path를 얻어 state를 바꿉니다.
   */
  onClickNavItem(e: MouseEvent) {
    e.preventDefault();
    const { target } = e;
    if (!(target instanceof HTMLElement)) return;

    if (target.closest('.nav__logout-btn')) {
      removeValueOnLocalStorage('refreshToken');
      handleEvent.fire('statechange', { ...history.state, path: '/', isLoggedIn: false });
    }

    const a = target.closest('a');
    if (!a) return;

    const path = a.getAttribute('href');
    handleEvent.fire('statechange', { ...history.state, path });
  }

  render() {
    $('header').innerHTML = `
      ${this.getHeaderLogoDOM()}
      <nav class="header__nav">
        <ul>
          ${this.getLiDOMs(this.currentPath as Path)}
          <li class='nav__logout-btn'><img src=${Logout}></li>
        </ul>
      </nav>
    `;

    new MonthController(this.currentYear, this.currentMonth);
  }

  /**
   * header logo 에 해당하는 DOM을 반환합니다.
   */
  getHeaderLogoDOM(): HTMLText {
    const $headerLogo = createDOMWithSelector('div', '.header__logo');
    const $Logo = createDOMWithSelector('img');
    $Logo.setAttribute('src', `${SimplifiedLogo}`);
    $headerLogo.appendChild($Logo);

    return $headerLogo.outerHTML;
  }

  /**
   * navigation bar의 li DOM들을 반환합니다.
   */
  getLiDOMs(currentPath: Path): HTMLText {
    const $liDOMs = PATHS.reduce((acc, [path, img]) => {
      const $liDOM = this.getLiDOM(path as Path, img, currentPath);
      return [...acc, $liDOM];
    }, []).join('');

    return $liDOMs;
  }

  /**
   * Navigation 바의
   * li HTML 요소들을 얻어옵니다.
   * 현재 url과 path가 일치할 경우, active class를 추가합니다.
   */
  getLiDOM(
    path: Path, //
    img: Image,
    currentPath: Path
  ): HTMLText {
    const pathClassName = `header__${path.slice(1)}${path === currentPath ? ' active' : ''}`;

    const pathHTML = `
      <li>
        <a href=${path} class='${pathClassName}'>
          <img src=${img}>
        </a>
      </li>
    `;

    return pathHTML;
  }
}
