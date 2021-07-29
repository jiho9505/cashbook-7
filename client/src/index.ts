import '@src/styles/global.scss';
import Model from '@src/models';
import Router from './Router';
import handleEvent from './utils/handleEvent';

new Model();
new Router();

handleEvent.fire(
  'statechange',
  history.state ?? {
    path: '/',
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    isReplace: true,
  }
);
