import { getBalanceOf, getSenderTransfers } from './contract.js';
import { createLI } from './create-list-item.js';

const accountText = document.getElementById('account');
const balanceText = document.getElementById('balance');
const transferList = document.querySelector('.transfer-list');
const currentAccount = sessionStorage.currentAccount;


const appendToList = async () => {

    const transfers = await getSenderTransfers(currentAccount);

    for (const elem of transfers.slice(-3)) {
        const li = createLI(elem);
        transferList.append(li);
    }

}

export const showInformation = async () => {

    accountText.textContent = `${currentAccount}`
    balanceText.textContent = `${await getBalanceOf(currentAccount)} ETH`;
    transferList.innerHTML = '';
    appendToList();
}

document.addEventListener('DOMContentLoaded', async () => {
    showInformation();
});