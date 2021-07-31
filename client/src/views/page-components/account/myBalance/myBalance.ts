import { $, createDOMWithSelector } from '@src/utils/helper';
import './MyBalance.scss';

export default class MyBalance {
  state: string;

  constructor({ parent, state }) {
    const balanceWrapper = createDOMWithSelector('div', '.account__balance-container');

    parent.appendChild(balanceWrapper);
    this.setProperty(state);
    this.render();
  }

  setProperty(state): void {
    this.state = state;
  }

  render(): void {
    $('.account__balance-container').innerHTML = `
        ${this.createMyBalance()}`;
  }

  createMyBalance(): string {
    return `
        <span class='account__balance-text'>현재 잔고</span>
        <span class='account__balance'>${this.state}</span> 
    `;
  }
}
