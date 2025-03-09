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
    dataCards.forEach((item, index) => {
        const container = document.createElement('div');
        const textDiv = document.createElement('div');
        const pName = document.createElement('p');
        const pPhone = document.createElement('p');
        const pPost = document.createElement('p');
        const pDate = document.createElement('p');
        const imgDiv = document.createElement('div');
        const redactDiv = document.createElement('div');
        const delitDiv = document.createElement('div');
        textDiv.className = 'div-text';
        imgDiv.className = 'div-img';
        redactDiv.className = 'redact-div';
        delitDiv.className = 'delit-div';
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
        container.appendChild(textDiv);
        container.appendChild(imgDiv);
        textDiv.appendChild(pName);
        textDiv.appendChild(pPhone);
        textDiv.appendChild(pPost);
        textDiv.appendChild(pDate);
        imgDiv.appendChild(redactDiv);
        imgDiv.appendChild(delitDiv);

        delitDiv.addEventListener('click', (event) => {
            dataCards.splice(index, 1);
            localStorage.setItem("cards", JSON.stringify(dataCards));
            render();
        });
        redactDiv.addEventListener('click', (event) => {
            redactContainer(container, item, index);
        });
    });
}
function redactContainer(container, item, index) {
    container.innerHTML = '';
    container.style.cssText = `
        display: flex;
        flex-direction: column ;
    `;
    const containerBtnBlock = document.createElement('div');
    containerBtnBlock.className = 'container-img-redact'
    const containerTextBlock = document.createElement('div');
    containerTextBlock.className = 'container-text-redact'
    const containerNameRedact = document.createElement('div');
    containerNameRedact.className = 'container-npc-text-redact';
    const containerPhoneRedact = document.createElement('div');
    containerPhoneRedact.className = 'container-npc-text-redact';
    const containerSelectRedact = document.createElement('div');
    containerSelectRedact.className = 'container-npc-text-redact';
    const redactInputName = document.createElement("input");
    redactInputName.type = 'text';
    redactInputName.placeholder = 'Введите новое имя';
    redactInputName.className = 'redact-block-input';
    redactInputName.value = item.name;
    const containerName = document.createElement('div');
    containerName.className = 'container-name-label';
    containerName.textContent = 'Имя:';
    const redactInputPhone = document.createElement("input");
    redactInputPhone.type = 'number';
    redactInputPhone.placeholder = 'Введите новый телефон';
    redactInputPhone.className = 'redact-block-input'
    redactInputPhone.value = item.phone;
    const containerPhone = document.createElement('div');
    containerPhone.className = 'container-phone-label';
    containerPhone.textContent = 'Телефон:';
    const saveBtn = document.createElement('button');
    saveBtn.className = 'btn-redact'
    saveBtn.disabled = true;
    const noSaveBtn = document.createElement('div');
    noSaveBtn.className = 'btn-no-redact'
    let redactTextName = '';
    let redactTextPhone = '';
    const redactSelect = document.createElement('select');
    const redactOptions = [
        { value: 'green', text: 'Сотрудник' },
        { value: 'red', text: 'Зам.Начальника' },
        { value: 'yello', text: 'Начальник' }
    ];
    const containerSelect = document.createElement('div');
    containerSelect.className = 'container-select-label';
    containerSelect.textContent = 'Должность:';
    let redactSelectColor = '';
    redactOptions.forEach(optionData => {
        const option = document.createElement('option');
        option.value = optionData.value;
        option.textContent = optionData.text;
        redactSelect.appendChild(option);
    });
    function redactBtnOpen() {
        if (redactTextName.length > 0 && redactTextPhone.length === 11 && redactSelectColor.length > 0) {
            saveBtn.disabled = false;
        } else {
            saveBtn.disabled = true;
        }
    }
    redactInputName.addEventListener("input", (event) => {
        redactTextName = event.target.value;
        redactBtnOpen();
    });
    redactInputName.addEventListener("keydown", (event) => {
        if (event.key === ' ') {
            event.preventDefault();
        }
    });
    redactInputPhone.addEventListener("input", (event) => {
        redactTextPhone = event.target.value;
        redactBtnOpen();
    });
    redactInputPhone.addEventListener("keydown", (event) => {
        if (event.key === 'e') {
            event.preventDefault();
        }
    });
    redactSelect.addEventListener("change", (event) => {
        redactSelectColor = event.target.value;
        redactBtnOpen();
    });
    saveBtn.addEventListener("click", (event) => {
        let redactDate = new Date();
        const redactDateString = String(redactDate.getFullYear()) + '-' + String(redactDate.getMonth() + 1) + '-'
            + String(redactDate.getDate()) + ' ' + String(redactDate.getHours()) + ':' + String(redactDate.getMinutes()) + ':' + String(redactDate.getSeconds());
        const redactCardObj = {
            name: redactTextName,
            phone: redactTextPhone,
            color: redactSelectColor,
            date: redactDateString
        }
        dataCards[index] = redactCardObj;
        localStorage.setItem("cards", JSON.stringify(dataCards));
        render();
    });
    noSaveBtn.addEventListener("click", (event) => {
        render();
    })
    container.appendChild(containerTextBlock);
    containerTextBlock.appendChild(containerNameRedact);
    containerTextBlock.appendChild(containerPhoneRedact);
    containerTextBlock.appendChild(containerSelectRedact);
    containerNameRedact.appendChild(containerName);
    containerNameRedact.appendChild(redactInputName);
    containerPhoneRedact.appendChild(containerPhone);
    containerPhoneRedact.appendChild(redactInputPhone);
    containerSelectRedact.appendChild(containerSelect);
    containerSelectRedact.appendChild(redactSelect);
    container.appendChild(containerBtnBlock);
    containerBtnBlock.appendChild(saveBtn);
    containerBtnBlock.appendChild(noSaveBtn);
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