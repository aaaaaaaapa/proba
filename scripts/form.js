import { createTransfer, getBalanceOf } from "./contract.js";
import { showInformation } from "./account.js";

const liCreateTrans = document.getElementById('create-transfer');
const modal = document.querySelector('.form');
const transForm = document.querySelector('.trasfer-form');
const submitBtn = document.querySelector('.transfer-btn');
const closeText = document.querySelectorAll('.close-text')[0];


const handleFormSubmit = async () => {

    const { address, code, sum } = transForm.elements;

    try {
        if (Number(sum.value) <= 0) {
            throw new Error('Сумма перевода должна быть больше 0');
        }
        if (Number(sum.value) > Number(await getBalanceOf(sessionStorage.currentAccount))) {
            throw new Error('Недостаточно средств');
        }
        await createTransfer(address.value, code.value, sum.value);
        modal.classList.add('dis');
        alert('Перевод успешно выполнен');
        submitBtn.disabled = true;
    } 
    catch (error) {
        alert(error);
    }
    showInformation();
    renderSendTrans();
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
