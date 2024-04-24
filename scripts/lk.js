import { getBalanceOf, getSenderTransfers } from './contract.js';
import { createLI } from './create-list-item.js';

const accountText = document.getElementById('account');
const balanceText = document.getElementById('balance');
const transferList = document.querySelector('.transfer-list');
const showTransLi = document.getElementById('show-transfer');

const currentAccount = sessionStorage.currentAccount;


const appendToList = async () => {

    const transfers = await getSenderTransfers(currentAccount);

    for (let i = 0; i < 2; i++) {
        const divLiCont = document.createElement('div');
        divLiCont.classList.add('li-cont');
        for (const elem of transfers.slice(-3).reverse()) {
            const li = createLI(elem);
            divLiCont.append(li);
        }
        transferList.append(divLiCont);
        transfers.splice(transfers.length - 4, 3);
    }

}

export const showInformation = async () => {

    if (document.location.pathname === '/lk.html') {
        accountText.textContent = `${currentAccount}`
        balanceText.textContent = `${await getBalanceOf(currentAccount)} ETH`;
    }

    transferList.innerHTML = '';
    appendToList();
    
}

showTransLi.addEventListener('click', () => {
    window.location.href = 'trasn-history.html';
}); 

document.addEventListener('DOMContentLoaded', async () => {
    showInformation();
});