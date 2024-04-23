import { getBalanceOf } from './contract.js';

const accountText = document.getElementById('account');
const balanceText = document.getElementById('balance');
const currentAccount = sessionStorage.currentAccount;

document.addEventListener('DOMContentLoaded', async () => {
    accountText.textContent = `Адрес аккаунта: ${currentAccount}`
    balanceText.textContent = `Баланс: ${await getBalanceOf(currentAccount)} ETH`;
});