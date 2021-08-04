import '@src/styles/global.scss';
import Model from '@src/models';
import Router from './Router';
import handleEvent from './utils/handleEvent';
import { setValueOnLocalStorage } from './utils/helper';

new Model();
new Router();

/**
 * OAuth 인증을 통해 홈으로 다시 redirect 되었을 경우,
 * query parameter에 token 정보가 있다면
 * accessToken은 JS 내에, refreshToken은 localStorage에 보관합니다.
 */
if (window.location.search) {
  const [accessToken, refreshToken] = window.location.search.split('?')[1].split('&');

  handleEvent.fire('storeupdated', { state: { accessToken: accessToken.split('=')[1] } });
  setValueOnLocalStorage('refreshToken', refreshToken.split('=')[1]);
}

handleEvent.fire(
  'statechange',
  history.state ?? {
    path: '/',
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    isReplace: true,
  }
);
