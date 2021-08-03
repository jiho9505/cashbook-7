import './ResultMessage.scss';
import { $, createDOMWithSelector } from '@src/utils/helper';

export default class ResultMessage {
  constructor(message) {
    const resultMessageWrapper = createDOMWithSelector('div', '.result-message-container');
    const resultMessage = createDOMWithSelector('div', '.result-message');

    $('#root').appendChild(resultMessageWrapper);
    $('.result-message-container').appendChild(resultMessage);
    resultMessage.innerHTML = message;

    setTimeout(() => {
      $('#root').removeChild(resultMessageWrapper);
    }, 2500);
  }
}
