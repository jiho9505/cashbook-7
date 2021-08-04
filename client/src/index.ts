import '@src/styles/global.scss';
import Model from '@src/models';
import Router from './Router';
import handleEvent from './utils/handleEvent';
import { getValueOnLocalStorage, setValueOnLocalStorage } from './utils/helper';
import { api } from '@src/models/api';
import { initStoreData, newStoreData } from './static/constants';
import { Token } from './types';

new Model();
new Router();

/**
 * 유저 인증 과정이 끝난 후,
 * token을 받아 store를 갱신하고 history state를 account로 변경합니다.
 */
const triggerAfterUserAuthCheck = (accessToken: Token): void => {
  handleEvent.fire('storeupdated', { state: { accessToken } });
  handleEvent.fire('statechange', newStoreData);
};

/**
 * 유저가 refresh token을 가지고 있을 경우,
 * 해당 토큰이 유효하다면 triggerAfterUserAuthCheck를 call 합니다.
 */
if (getValueOnLocalStorage('refreshToken')) {
  const refresh = getValueOnLocalStorage('refreshToken');

  api.get(`/auth/login?refresh=${refresh}`).then((res) => {
    const { httpStatus, accessToken } = res.data;
    if (httpStatus === 'OK') return triggerAfterUserAuthCheck(accessToken);
  });
}

/**
 * OAuth 인증을 통해 홈으로 다시 redirect 되었을 경우,
 * query parameter에 token 정보가 있다면
 * refreshToken은 localStorage에 보관하고
 * triggerAfterUserAuthCheck를 call 합니다.
 */
if (window.location.search) {
  const [accessToken, refreshToken] = window.location.search.split('?')[1].split('&');
  setValueOnLocalStorage('refreshToken', refreshToken.split('=')[1]);
  triggerAfterUserAuthCheck(accessToken.split('=')[1]);
}

/**
 * 만약, 유저가 refresh Token이 없거나
 * 쿼리 파라미터가 없을 경우,
 * 홈 path를 store에 저장합니다.
 */
handleEvent.fire('statechange', history.state ?? initStoreData);
