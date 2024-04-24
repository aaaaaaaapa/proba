import { getBalanceOf, getSenderTransfers } from './contract.js';
import { createLI } from './create-list-item.js';

const accountText = document.getElementById('account');
const balanceText = document.getElementById('balance');
const transferList = document.querySelector('.transfer-list');
const showTransLi = document.getElementById('show-transfer');

const currentAccount = sessionStorage.currentAccount;
let transfers;


const createLICont = () => {

    const divLiCont = document.createElement('div');
    divLiCont.classList.add('li-cont');

    for (const elem of transfers.slice(-2).reverse()) {
        const li = createLI(elem, 'sent');
        divLiCont.append(li);
    }
    return divLiCont;
}


const appendToList = async () => {

    transfers = await getSenderTransfers(currentAccount);
    transferList.innerHTML = '';

    if (transfers.length === 0) {
        transferList.textContent = 'Нет переводов';
    }

    for (let i = 0; i < 2; i++) {
        const divLiCont = createLICont();
        transferList.append(divLiCont);
        transfers.splice(transfers.length - 2, 2);
    }

}

export const showInformation = async () => {

    if (window.location.pathname === '/account.html') {
        accountText.textContent = `${currentAccount}`
        balanceText.textContent = `${await getBalanceOf(currentAccount)} ETH`;
        appendToList();
    }

}

showTransLi.addEventListener('click', () => {
    window.location.href = './transfers.html';
}); 

document.addEventListener('DOMContentLoaded', async () => {
    showInformation();
});