const inputName = document.getElementById('main-input');
const inputPhone = document.getElementById('main-phone-input')
const selectPost = document.getElementById('main-select');
const btnTo = document.getElementById('main-button');
const blockDivs = document.getElementById('div-block');
let textName = '';
let textPhone = '';
let selectColor = '';
btnTo.disabled = true;
const defaultData = JSON.parse(localStorage.getItem('cards'));
let dataCards = defaultData ? defaultData : [];
console.log(dataCards);
function render() {
    blockDivs.innerHTML = '';
    dataCards.forEach((item) => {
        const container = document.createElement('div');
        const pName = document.createElement('p');
        const pPhone = document.createElement('p');
        const pPost = document.createElement('p');
        const pDate = document.createElement('p');
        pName.textContent = "Имя" + " " + item.name;
        pPhone.textContent = "Телефон" + " " + item.phone;
        if (item.color === 'green') {
            container.className = 'green-div';
            pPost.textContent = "Должность: Сотрудник";
        } else if (item.color === 'red') {
            container.className = 'red-div';
            pPost.textContent = "Должность: Зам.Начальника";
        } else {
            container.className = 'yello-div';
            pPost.textContent = "Должность: Начальник";
        }
        pDate.textContent = item.date;
        blockDivs.appendChild(container);
        container.appendChild(pName);
        container.appendChild(pPhone);
        container.appendChild(pPost);
        container.appendChild(pDate);
    })
}
function btnOpen() {
    if (textName.length > 0 && textPhone.length === 11 && selectColor.length > 0) {
        btnTo.disabled = false;
    } else {
        btnTo.disabled = true;
    }
}
inputName.addEventListener("input", (event) => {
    textName = event.target.value;
    btnOpen();
});
inputName.addEventListener("keydown", (event) => {
    if (event.key === ' ') {
        event.preventDefault();
    }
});
inputPhone.addEventListener("input", (event) => {
    textPhone = event.target.value
    btnOpen();
});
inputPhone.addEventListener("keydown", (event) => {
    if (event.key === 'e') {
        event.preventDefault();
    }
});
selectPost.addEventListener("change", (event) => {
    selectColor = event.target.value;
    btnOpen();
});
btnTo.addEventListener("click", (event) => {
    let date = new Date();
    const dateString = String(date.getFullYear()) + '-' + String(date.getMonth() + 1) + '-'
        + String(date.getDate()) + ' ' + String(date.getHours()) + ':' + String(date.getMinutes()) + ':' + String(date.getSeconds());
    const cardObj = {
        name: textName,
        phone: textPhone,
        color: selectColor,
        date: dateString
    }
    dataCards.push(cardObj);
    localStorage.setItem('cards', JSON.stringify(dataCards));
    render();
});
render();