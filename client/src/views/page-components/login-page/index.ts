import { GithubIcon, LoginBg, LoginLogo } from '@src/static/image-urls';
import handleEvent from '@src/utils/handleEvent';
import { $, createDOMWithSelector } from '@src/utils/helper';

import './index.scss';

export default class LoginView {
  loginWrapper: HTMLDivElement | HTMLElement;

  constructor() {
    handleEvent.subscribe('storeupdated', (e: CustomEvent) => {
      if (e.detail.state.path !== '/') return;
      this.loginWrapper = createDOMWithSelector('div', '.login');
      $('.content-wrap').innerHTML = '';
      $('.content-wrap').appendChild(this.loginWrapper);

      this.render();
      this.loginWrapper.addEventListener('click', this.onClickLoginButtonHandler.bind(this));
    });
  }

  onClickLoginButtonHandler(e: MouseEvent) {
    const { target } = e;
    if (!(target instanceof HTMLElement)) return;
    if (target.closest('.login__button')) {
      handleEvent.fire('requestGithubLogin');
    }
  }

  render(): void {
    this.loginWrapper.innerHTML = `
      ${this.createLogo()}
      ${this.createLeftPartInPage()}
      ${this.createRightPartInPage()}
    `;
  }

  createLogo() {
    return `
      <div class="login__logo">
        <img src=${LoginLogo}> 
      </div>
    `;
  }

  createLeftPartInPage() {
    return `
      <div class="login__left-part">
        <img src=${LoginBg}>
        <div class="login__guide">
            <div>자신감 있게 돈을 관리해보세요.</div>
        </div>
        <div class="login__guide-detail">
            <div>통찰력을 갖고 돈의 흐름을 통제해보세요. <br>여러 가지 도구들로 당신이 올바른 결정을 할 수 있도록 도와줍니다.</div>
        </div>
      </div>
    `;
  }

  createRightPartInPage() {
    return `
      <div class="login__right-part">
          <div class="login__welcome">
            <div>Sign In<br> to <span class='highlight'>woowahan</span> ledger</div>
          </div>
          ${this.createLoginButton()}
      </div>
    `;
  }

  createLoginButton() {
    return `
      <div class="login__button-container">
        <button class="login__button"> 
            <img src=${GithubIcon}>
            <span>Sign up with Github</span>
        </button>
      </div>
    `;
  }
}
