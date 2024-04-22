export const createHeader = (text) => {

    const h1 = document.createElement('h1');
    h1.classList.add('registr-header');
    h1.textContent = text;
    return h1;

}

const createFormEl = () => {

    const form = document.createElement('form');
    form.classList.add('registration-form');
    return form;

}

const createOption = (value) => {

    const opt = document.createElement('option');
    opt.classList.add('account-opt');
    opt.value = value;
    opt.textContent = value;
    return opt;

}

const createLabel = (text) => {

    const label = document.createElement('label');
    label.classList.add('form-label');
    label.textContent = text;
    return label;

}

const createSelectEl = (arr, name='accounts') => {

    const select = document.createElement('select');
    select.classList.add('account-select');
    select.name = name;

    for (const elem of arr) {
        const opt = createOption(elem);
        select.append(opt);
    }
    return select;

}

const createSelectCont = (arr) => {

    const divSelect = document.createElement('div');
    divSelect.classList.add('select-cont');

    const label = createLabel('Выберите аккаунт:');
    const select = createSelectEl(arr);

    divSelect.append(label, select);
    return divSelect;

}

const createBtn = (text) => {

    const btn = document.createElement('button');
    btn.classList.add('registration-btn');
    btn.textContent = text;
    return btn;

}

export const createAlert = (text) => {

    const divAlert = document.createElement('div');
    divAlert.classList.add('alert');

    const span = document.createElement('span');
    span.textContent = text;

    divAlert.append(span);
    return divAlert;

}

export const createRegistrationForm = (arr) => {

    const form = createFormEl()
    const divSelect = createSelectCont(arr);
    const registBtn = createBtn('Продолжить');

    form.append(divSelect, registBtn);

    return form;

}