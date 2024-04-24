import { getBalanceOf, getSenderTransfers } from './contract.js';
import { createLI } from './create-list-item.js';

const transferList = document.querySelector('.transfer-list');
const currentAccount = sessionStorage.currentAccount;

const appendToList = async () => {

    const transfers = await getSenderTransfers(currentAccount);

    for (let i = 0; i < 1; i++) {
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

document.addEventListener('DOMContentLoaded', () => {
    appendToList();
});