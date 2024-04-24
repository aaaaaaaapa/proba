import { getAllAccounts } from "./contract.js";

const select = document.querySelector('.account-select');
const form = document.querySelector('.registration-form');

const createOption = (elem) => {

    const opt = document.createElement('option');
    opt.classList.add('account-option');
    opt.value = elem;
    opt.textContent = elem;

    return opt;
    
}

const handleFormSubmit = (event) => {

    event.preventDefault();

    const value = select.value;
    sessionStorage.setItem('currentAccount', value);
    window.location.replace('lk.html');

}

const renderRegistrationForm = async () => {

    const accounts = await getAllAccounts();

    for (const elem of accounts) {
        const opt = createOption(elem);
        select.append(opt);
    }

}

document.addEventListener('DOMContentLoaded', async () => {
    await renderRegistrationForm();
    form.addEventListener('submit', handleFormSubmit);
});