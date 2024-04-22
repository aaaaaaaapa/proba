import { getAllAccounts, getSenderTransfers } from "./contract.js";
import { createRegistrationForm, createAlert, createHeader } from "./form.js";
import { getBalanceOf } from "./contract.js";
import { createLK } from "./lk.js";

const cont = document.querySelector('.container');
let currentAccount;

const handleFormSubmit = async (event) => {
    event.preventDefault();
    const value = event.target.accounts.value;
    currentAccount = value;
    await renderLK();
}

const renderRegistrationForm = async () => {
    const accounts = await getAllAccounts();
    const form = createRegistrationForm(accounts);
    const title = createHeader('Регистрация');

    form.addEventListener('submit', async (event) => await handleFormSubmit(event));

    cont.append(title, form);
}

const renderLK = async () => {

    cont.innerHTML = '';

    const balance = await getBalanceOf(currentAccount);
    const transfers = await getSenderTransfers(currentAccount);
    const divLK = await createLK(currentAccount, balance, transfers);

    cont.append(divLK);
}

document.addEventListener('DOMContentLoaded', async () => {
    await renderRegistrationForm();
});