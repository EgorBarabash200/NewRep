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

        delitDiv.addEventListener('click', (event) =>{
            let delitElement = dataCards.splice(index, 1);
            localStorage.setItem("cards" , JSON.stringify(dataCards));
            render();
        });
        redactDiv.addEventListener('click', (event) =>{
            redactContainer(container, item);
        });
    });
}
function redactContainer(container, item){
    container.innerHTML = '';
    container.style.cssText = `
        display: flex;
        flex-direction: column ;
    `;
    const containerBtnBlock = document.createElement('div');
    containerBtnBlock.className = 'container-img-redact'
    const containerTextBlock = document.createElement('div');
    containerTextBlock.className = 'container-text-redact'
    const redactInputName = document.createElement("input"); 
    redactInputName.type = 'text';
    redactInputName.placeholder = 'Введите новое имя';
    redactInputName.className = 'block-input'
    const redactInputPhone = document.createElement("input"); 
    redactInputPhone.type = 'number';
    redactInputPhone.placeholder = 'Введите новый телефон';
    redactInputPhone.className = 'block-input'
    const redactBtn = document.createElement('div');
    redactBtn.className = 'btn-redact'
    const noRedactBtn = document.createElement('div');
    noRedactBtn.className = 'btn-no-redact'
    let redactTextName = '';
    let redactTextPhone = '';
    const redactSelect = document.createElement('select');
    const redactOptions = [
        {value: 'green', text: 'Сотрудник'},
        {value: 'red', text: 'Зам.Начальника'},
        {value: 'yello', text: 'Начальник'}
    ];
    redactOptions.forEach(optionData => {
        const option = document.createElement('option');
        option.value = optionData.value;
        option.textContent = optionData.text;
        redactSelect.appendChild(option);
      });
    redactInputName.addEventListener("input", (event) =>{
        redactTextName = event.target.value;
    });
    redactInputPhone.addEventListener("input", (event) =>{
        redactTextPhone = event.target.value; 
    });
   /* redactBtn.addEventListener("click", (event) =>{
       const redactPname = document.createElement('p');
       const redactPphone = document.createElement('p');
       redactPname = "Имя" + redactTextName;
       redactPphone = "Телефон" + redactTextPhone; 
       containerTextBlock.appendChild(redactPname);
       containerTextBlock.appendChild(redactPphone); 
    }) */
    container.appendChild(containerBtnBlock);
    container.appendChild(containerTextBlock);
    containerBtnBlock.appendChild(redactBtn);
    containerBtnBlock.appendChild(noRedactBtn);
    containerTextBlock.appendChild(redactInputName);
    containerTextBlock.appendChild(redactInputPhone);
    containerTextBlock.appendChild(redactSelect);
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