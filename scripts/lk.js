import { transformDate } from './contract.js'

const createHeader = (text) => {

    const h1 = document.createElement('h1');
    h1.classList.add('lk-header');
    h1.textContent = text;
    return h1;

}

const createSectionTitle = (text) => {

    const h2 = document.createElement('h2');
    h2.classList.add('section-title');
    h2.textContent = text;
    return h2;

}

const createParText = (text) => {

    const p = document.createElement('p');
    p.classList.add('section-text');
    p.textContent = text;
    return p;

}


const createNavBar = () => {

    const divNav = document.createElement('div');
    divNav.classList.add('nav');

    const h1 = createHeader('Личный кабинет');

    divNav.append(h1);
    return divNav;

}

const createInformDiv = (text1, text2) => {

    const divInf = document.createElement('div');
    divInf.classList.add('information');

    const title = createSectionTitle('Информация об аккаунте');
    const accText = createParText(text1);
    const balanceText = createParText(text2);

    divInf.append(title, accText, balanceText);
    return divInf;

}

const createTransListItem = (item) => {

    const transCont = document.createElement('div');
    transCont.classList.add('trans-list-item');

    const recText = createParText(item.recipient);
    const codeText = createParText(item.code);
    const sumText = createParText(item.sum);
    const dateText = createParText(transformDate(item.creationDate));
    const status = item.status ? createParText('Перевод ещё не выполнен') : createParText('Перевод выполнен');
    
    transCont.append(recText, codeText, sumText, dateText, status);
    return transCont;

}

const createTransList = (arr) => {
    const transUL = document.createElement('ul');
    transUL.classList.add('trasn-list');

    for (const item of arr) {
        const transItem = createTransListItem(item);
        transUL.append(transItem);
    }
    return transUL;
}

const createTransDiv = (arr) => {

    const divTrans = document.createElement('div');
    divTrans.classList.add('transaction');

    const title = createSectionTitle('Транзакции');
    const transText = createParText('Отправленные транзакции:');
    const transUL = createTransList(arr);
    divTrans.append(title, transText, transUL);

    return divTrans;

}


const createMainDiv = (acc, bal, arr) => {

    const divMain = document.createElement('div');
    divMain.classList.add('main');

    const divInf = createInformDiv(acc, bal);
    const divTrans = createTransDiv(arr);
    divMain.append(divInf, divTrans);

    return divMain;

}


export const createLK = async (account, balance, transfers) => {

    const divLK = document.createElement('div');
    divLK.classList.add('lk');

    const divNav = createNavBar();
    const divMain = createMainDiv(`Ваш аккаунт: ${account}`, `Баланс: ${balance} ETH`, transfers);

    divLK.append(divNav, divMain);

    return divLK;
}