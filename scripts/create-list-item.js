import { convertToEth, transformDate } from "./contract.js";

const checkStatus = (elem) => {

    if (!elem.isAvaible && elem.isReceived) {
        return 'перевод получен';
    }
    else if (elem.isAvaible) {
        return 'перевод ещё не получен';
    }
    else {
        return 'перевод отменен';
    }

}

export const createLI = (elem, type) => {

    const li = document.createElement('li');
    li.classList.add('transfer-list-item');

    const status = checkStatus(elem);

    if (type === 'sent') {
        li.innerHTML = `<div class="transfer">
            <div class="trans-cont">
                <span class="transfer-item-head">Получатель:</span>
                <span class="transfer-item-text" id="list-recepient">${elem.recipient}</span>
            </div>
            <div class="trans-cont">
                <span class="transfer-item-head">Кодовое слово:</span>
                <span class="transfer-item-text" id="list-code">${elem.code}</span>
            </div>
            <div class="trans-cont">
                <span class="transfer-item-head">Сумма:</span>
                <span class="transfer-item-text" id="list-sum">${convertToEth(elem.sum)} ETH</span>
            </div>
            <div class="trans-cont">
                <span class="transfer-item-head">Дата создания:</span>
                <span class="transfer-item-text" id="list-date">${transformDate(elem.creationDate)}</span>
            </div>
            <div class="trans-cont">
                <span class="transfer-item-head">Статус:</span>
                <span class="transfer-item-text" id="list-status">${status}</span>
            </div>
        </div>`;
    }

    else if (type === 'received') {

        li.innerHTML = `<div class="transfer">
            <div class="trans-cont">
                <span class="transfer-item-head">Отправитель:</span>
                <span class="transfer-item-text" id="list-recepient">${elem.sender}</span>
            </div>
            <div class="trans-cont">
                <span class="transfer-item-head">Сумма:</span>
                <span class="transfer-item-text" id="list-sum">${convertToEth(elem.sum)} ETH</span>
            </div>
            <div class="trans-cont">
                <span class="transfer-item-head">Дата создания:</span>
                <span class="transfer-item-text" id="list-date">${transformDate(elem.creationDate)}</span>
            </div>
            <div class="trans-cont">
                <span class="transfer-item-head">Статус:</span>
                <span class="transfer-item-text" id="list-status">${status}</span>
            </div>
        </div>`;
    }

    return li;

}

export const createBtn = (text, className) => {
    const btn = document.createElement('button');
    btn.classList.add(className);
    btn.textContent = text;

    return btn;
}