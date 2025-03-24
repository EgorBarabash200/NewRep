const inputName = document.getElementById('main-input');
const inputPhone = document.getElementById('main-phone-input')
const selectPost = document.getElementById('main-select');
const btnTo = document.getElementById('main-button');
const blockDivs = document.getElementById('div-block');
let textName = '';
let textPhone = '';
let jobPost = '';
btnTo.disabled = true;
let dataCards = [];
async function getData() {
    try {
        const responce = await fetch('http://localhost:8080/task/all', {
            method: "GET",
        });
        const data = await responce.json();
        if (data) {
            dataCards = data;
            render()
        }
    } catch (error) {
        console.log(error);
    }
}
async function createCard(cardObj) {
    try {
        await fetch('http://localhost:8080/task', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cardObj),
        });
        await getData();
    } catch (error) {
        console.log(error);
    }
}
async function delitCard(id) {
    try {
        await fetch(`http://localhost:8080/task/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
        });
        await getData();
    } catch (error) {
        console.log(error);
    }
}
async function redactCard(redactCardObj, id) {
    try {
        await fetch(`http://localhost:8080/task/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(redactCardObj),
        });
        await getData();
    } catch (error) {
        console.log(error);
    }
}
function render() {
    blockDivs.innerHTML = '';
    dataCards.forEach((item) => {
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
        if (item.jobPosition === 'employee') {
            container.className = 'green-div';
            pPost.textContent = "Должность: Сотрудник";
        } else if (item.jobPosition === 'develop') {
            container.className = 'red-div';
            pPost.textContent = "Должность: Девелоп";
        } else {
            container.className = 'yello-div';
            pPost.textContent = "Должность: Администратор";
        }
        pDate.textContent = item.createDate;
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
            delitCard(item.id);
        });
        redactDiv.addEventListener('click', (event) => {
            redactContainer(container, item);
        });
    });
}
function redactContainer(container, item) {
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
    let redactTextName = item.name;
    let redactTextPhone = item.phone;
    const redactSelect = document.createElement('select');
    const redactOptions = [
        { value: 'employee', text: 'Сотрудник' },
        { value: 'develop', text: 'Девелоп' },
        { value: 'admin', text: 'Админинистратор' }
    ];
    redactSelect.className = 'change-label';
    const containerSelect = document.createElement('div');
    containerSelect.className = 'container-select-label';
    containerSelect.textContent = 'Должность:';
    let redactJobPost = item.jobPosition;
    console.log(item.jobPosition);
    redactOptions.forEach(optionData => {
        const option = document.createElement('option');
        option.value = optionData.value;
        option.textContent = optionData.text;
        redactSelect.appendChild(option);
    });
    function redactBtnOpen() {
        if (redactTextName.length > 0 && redactTextPhone.length === 11 && redactJobPost.length > 0) {
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
        redactJobPost = event.target.value;
        redactBtnOpen();
    });
    saveBtn.addEventListener("click", (event) => {
        let redactDate = new Date();
        const redactDateString = String(redactDate.getFullYear()) + '-' + String(redactDate.getMonth() + 1) + '-'
            + String(redactDate.getDate()) + ' ' + String(redactDate.getHours()) + ':' + String(redactDate.getMinutes()) + ':' + String(redactDate.getSeconds());
        const redactCardObj = {
            name: redactTextName,
            phone: redactTextPhone,
            jobPosition: redactJobPost,
            createDate: redactDateString
        }
        redactCard(redactCardObj, item.id);
    });
    noSaveBtn.addEventListener("click", (event) => {
        getData();
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
    if (textName.length > 0 && textPhone.length === 11 && jobPost.length > 0) {
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
    jobPost = event.target.value;
    btnOpen();
});
btnTo.addEventListener("click", (event) => {
    let date = new Date();
    const dateString = String(date.getFullYear()) + '-' + String(date.getMonth() + 1) + '-'
        + String(date.getDate()) + ' ' + String(date.getHours()) + ':' + String(date.getMinutes()) + ':' + String(date.getSeconds());
    const cardObj = {
        name: textName,
        phone: textPhone,
        jobPosition: jobPost,
        createDate: dateString
    }
    createCard(cardObj);
});
getData();