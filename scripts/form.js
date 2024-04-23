import { createTransfer, getAllAccounts, getBalanceOf } from "./contract.js";
import { showInformation } from "./lk.js";

const liCreateTrans = document.getElementById('create-transfer');
const modal = document.querySelector('.form');
const transForm = document.querySelector('.trasfer-form');
const submitBtn = document.querySelector('.transfer-btn');
const closeText = document.querySelector('.close-text');

const handleFormSubmit = async () => {

    const { address, code, sum } = transForm.elements;

    try {
        if (!(await getAllAccounts()).includes(address.value.trim())) {
            throw new Error('Адрес не найден');
        }
        if (Number(sum.value) <= 0) {
            throw new Error('Сумма перевода должна быть больше 0');
        }
        if (Number(sum.value) > Number(await getBalanceOf(sessionStorage.currentAccount))) {
            throw new Error('Недостаточно средств');
        }
        createTransfer(address.value, code.value, sum.value);
        modal.classList.add('dis');
        showInformation();
        transForm.reset();
    } 
    catch (error) {
        alert(error)
    }
}

transForm.addEventListener('submit', (event) => {
    event.preventDefault();
    handleFormSubmit();
});

transForm.addEventListener('input', () => {
    const { address, code, sum } = transForm.elements;
    if (address.value && code.value && sum.value) {
        submitBtn.disabled = false;
    }
});

liCreateTrans.addEventListener('click', () => {

    modal.classList.toggle('dis');
    document.body.classList.toggle('hide');
    transForm.reset();

});

closeText.addEventListener('click', () => {
    modal.classList.add('dis');
});

document.addEventListener('DOMContentLoaded', () => {
    submitBtn.disabled = true;
});