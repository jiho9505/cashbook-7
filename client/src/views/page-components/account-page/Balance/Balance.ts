import { $, createDOMWithSelector } from '@src/utils/helper';
import './Balance.scss';

export default class Balance {
  state: string;

  constructor({ parent, state }) {
    const balanceWrapper = createDOMWithSelector('div', '.account__balance-container');

    parent.appendChild(balanceWrapper);
    this.setState(state);
    this.render();
  }

  setState(state): void {
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
