import { getSenderTransfersObj, getMoney, getRecipientTransfersObj, getAllTransfers, cancelTransfer } from './contract.js';
import { createLI, createBtn } from './create-list-item.js';

const transferList = document.querySelector('.transfer-list');
const senderTransText = document.getElementById('sent');
const recTransText = document.getElementById('received');
const modalInp = document.querySelector('.input');
const codeForm = document.querySelector('.code-form');
const codeInput = document.getElementById('code-inp');
const closeText = document.querySelectorAll('.close-text')[1];
const btn = document.querySelector('.get-trans-btn');

const currentAccount = sessionStorage.currentAccount;
let transfers;

const getTransfers = async () => {
    let trans;

    if (document.querySelector('.selected').id === 'sent') {
        trans = await getSenderTransfersObj(currentAccount);
    }
    else {
        trans = await getRecipientTransfersObj(currentAccount);
    }
    return Object.entries(trans);
}

const createDivLiCont = (type) => {

    const divLiCont = document.createElement('div');
    divLiCont.classList.add('li-cont');

    for (const elem of transfers.slice(-2).reverse()) {
        const li = createLI(elem[1], type);

        if (elem[1].isAvaible && !elem[1].isReceived) {
            let btn;
            if (type === 'sent') {
                btn = createBtn('Отменить перевод', 'cancel-btn');
                btn.addEventListener('click', () => handleCancelBtn(elem));
            }
            else {
                btn = createBtn('Принять перевод', 'get-btn');
                btn.addEventListener('click', () => handleGetBtn(elem));
            }
            li.append(btn);
        }

        divLiCont.append(li);
    }
    return divLiCont;
}

const appendToList = (type, transfers) => {
    
    transferList.innerHTML = '';

    if (transfers.length === 0) {
        transferList.textContent = 'Нет переводов';
    }
    
    while (transfers.length > 0) {
        const divLiCont = createDivLiCont(type);
        transferList.append(divLiCont);
        transfers.splice(transfers.length - 2, 2);
    }
    
}

const renderSendTrans = async () => {
    recTransText.classList.remove('selected');
    senderTransText.classList.add('selected');
    transfers = await getTransfers();
    appendToList('sent', transfers);
}

const renderRecTrans = async () => {
    senderTransText.classList.remove('selected');
    recTransText.classList.add('selected');
    transfers = await getTransfers();
    appendToList('received', transfers);
}

senderTransText.addEventListener('click', async () => {
    await renderSendTrans();
});

recTransText.addEventListener('click', async () => {
    await renderRecTrans();
});

closeText.addEventListener('click', () => {
    modalInp.classList.add('dis');
    codeForm.reset();
});

codeInput.addEventListener('input', () => {

    if (codeInput.value.trim() !== '') {
        console.log(codeInput.value)
        btn.disabled = false;
    }
    else {
        btn.disabled = true;
    }

});

const handleCancelBtn = async (elem) => {
    if (confirm('Вы действительно хотите отменить перевод?')) {
        transfers = await getAllTransfers();
        cancelTransfer(elem[0])
        await renderSendTrans();
        alert('Перевод успешно отменен');
    }
}

const handleGetBtn = (elem) => {
    modalInp.classList.toggle('dis');

    codeForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        if (elem[1].code === codeInput.value) {
            alert('Вы получили перевод');
        }
        else {
            alert('Перевод отменен');
        }
        await getMoney(elem[0], codeInput.value);
        codeForm.reset();
        modalInp.classList.add('dis');
        await renderRecTrans();
    });
}


document.addEventListener('DOMContentLoaded', async () => {
    transfers = await getTransfers();
    appendToList('sent', transfers);
    btn.disabled = true;
    codeForm.reset();
});