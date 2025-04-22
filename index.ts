const userInputName = document.getElementById("main-input") as HTMLInputElement;
const userInputPhone = document.getElementById("main-phone-input") as HTMLInputElement;
const userSelectPost = document.getElementById("main-select") as HTMLInputElement;
const btnTo = document.getElementById("main-button") as HTMLInputElement;
const containerBlockDivs = document.getElementById("div-block");
let textUserName = "";
let textUserPhone = "";
let userJobPost = "";
let newDataCards = [];
if(btnTo){
    if('disabled' in btnTo){
        btnTo.disabled = true;
    }
};
dataGetCards();
async function dataGetCards() {
    try {
        const responce = await fetch("http://localhost:8080/task/all", {
            method: "GET",
        });
        if (responce) {
            const data = await responce.json();
            newDataCards = data;
            renderingCard();
        }
    } catch (error) {
        console.log(error);
    }
}
async function createPostCard(cardObj) {
    try {
        await fetch("http://localhost:8080/task", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(cardObj),
        });
        await dataGetCards();
    } catch (error) {
        console.log(error);
    }
}
async function dataDeleteCard(id) {
    try {
        await fetch(`http://localhost:8080/task/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        await dataGetCards();
    } catch (error) {
        console.log(error);
    }
}
async function redactPutCard(redactCardObj, id) {
    try {
        await fetch(`http://localhost:8080/task/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(redactCardObj),
        });
        await dataGetCards();
    } catch (error) {
        console.log(error);
    }
}
function renderingCard() {
    if(containerBlockDivs){
        containerBlockDivs.innerHTML = "";
    }
    interface UserCardData {
        id: number; 
        name: string;
        phone: string;
        jobPosition: 'employee' | 'develop';
        createDate: string;
    }
    newDataCards.forEach((item: UserCardData) => {
        const container = document.createElement("div");
        const textDiv = document.createElement("div");
        const pName = document.createElement("p");
        const pPhone = document.createElement("p");
        const pPost = document.createElement("p");
        const pDate = document.createElement("p");
        const imgDiv = document.createElement("div");
        const redactDiv = document.createElement("div");
        const delitDiv = document.createElement("div");
        textDiv.className = "div-text";
        imgDiv.className = "div-img";
        redactDiv.className = "redact-div";
        delitDiv.className = "delit-div";
        pName.textContent = "Имя" + " " + item.name;
        pPhone.textContent = "Телефон" + " " + item.phone;
        if (item.jobPosition === "employee") {
            container.className = "green-div";
            pPost.textContent = "Должность: Сотрудник";
        } else if (item.jobPosition === "develop") {
            container.className = "red-div";
            pPost.textContent = "Должность: Девелоп";
        } else {
            container.className = "yello-div";
            pPost.textContent = "Должность: Администратор";
        }
        pDate.textContent = item.createDate;
        if(containerBlockDivs){
            containerBlockDivs.appendChild(container);
        }
        container.appendChild(textDiv);
        container.appendChild(imgDiv);
        textDiv.appendChild(pName);
        textDiv.appendChild(pPhone);
        textDiv.appendChild(pPost);
        textDiv.appendChild(pDate);
        imgDiv.appendChild(redactDiv);
        imgDiv.appendChild(delitDiv);
        delitDiv.addEventListener("click", () => {
            dataDeleteCard(item.id);
        });
        redactDiv.addEventListener("click", () => {
            redactRendeeringCard(container, item);
        });
    });
}
function redactRendeeringCard(container, item) {
    container.innerHTML = "";
    container.style.cssText = `
        display: flex;
        flex-direction: column ;
    `;
    const containerBtnBlock = document.createElement("div");
    containerBtnBlock.className = "container-img-redact";
    const containerTextBlock = document.createElement("div");
    containerTextBlock.className = "container-text-redact";
    const containerNameRedact = document.createElement("div");
    containerNameRedact.className = "container-npc-text-redact";
    const containerPhoneRedact = document.createElement("div");
    containerPhoneRedact.className = "container-npc-text-redact";
    const containerSelectRedact = document.createElement("div");
    containerSelectRedact.className = "container-npc-text-redact";
    const redactInputName = document.createElement("input");
    redactInputName.type = "text";
    redactInputName.placeholder = "Введите новое имя";
    redactInputName.className = "redact-block-input";
    redactInputName.value = item.name;
    const containerName = document.createElement("div");
    containerName.className = "container-name-label";
    containerName.textContent = "Имя:";
    const redactInputPhone = document.createElement("input");
    redactInputPhone.type = "number";
    redactInputPhone.placeholder = "Введите новый телефон";
    redactInputPhone.className = "redact-block-input";
    redactInputPhone.value = item.phone;
    const containerPhone = document.createElement("div");
    containerPhone.className = "container-phone-label";
    containerPhone.textContent = "Телефон:";
    const saveBtn = document.createElement("button");
    saveBtn.className = "btn-redact";
    saveBtn.disabled = true;
    const noSaveBtn = document.createElement("div");
    noSaveBtn.className = "btn-no-redact";
    let redactTextName = item.name;
    let redactTextPhone = item.phone;
    const redactSelect = document.createElement("select");
    const redactOptions = [
        { value: "employee", text: "Сотрудник" },
        { value: "develop", text: "Девелоп" },
        { value: "admin", text: "Админинистратор" },
    ];
    redactSelect.className = "change-label";
    const containerSelect = document.createElement("div");
    containerSelect.className = "container-select-label";
    containerSelect.textContent = "Должность:";
    let redactJobPost = item.jobPosition;
    redactOptions.forEach((optionData) => {
        const option = document.createElement("option");
        option.value = optionData.value;
        option.textContent = optionData.text;
        if (optionData.value === item.jobPosition) {
            option.selected = true;
        }
        redactSelect.appendChild(option);
    });
    function redactBtnOpen() {
        saveBtn.disabled = !(
            redactTextName.length > 0 &&
            redactTextPhone.length === 11 &&
            redactJobPost.length > 0
        );
    }
    redactInputName.addEventListener("input", (event) => {
        const target = event.target as HTMLInputElement | null;
        redactTextName = target?.value ?? '';
        redactBtnOpen();
    });
    redactInputName.addEventListener("keydown", (event) => {
        if (event.key === " ") {
            event.preventDefault();
        }
    });
    redactInputPhone.addEventListener("input", (event) => {
        const target = event.target as HTMLInputElement | null;
        redactTextPhone = target?.value ?? '';
        redactBtnOpen();
    });
    redactInputPhone.addEventListener("keydown", (event) => {
        if (event.key === "e") {
            event.preventDefault();
        }
    });
    redactSelect.addEventListener("change", (event) => {
        const target = event.target as HTMLInputElement | null;
        redactJobPost = target?.value ?? '';;
        redactBtnOpen();
    });
    saveBtn.addEventListener("click", () => {
        const redactCardObj = {
            name: redactTextName,
            phone: redactTextPhone,
            jobPosition: redactJobPost,
        };
        redactPutCard(redactCardObj, item.id);
    });
    noSaveBtn.addEventListener("click", () => {
        dataGetCards();
    });
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
function buttonOpen() {
    btnTo.disabled = !(
        textUserName.length > 0 &&
        textUserPhone.length === 11 &&
        userJobPost.length > 0
    );
}
userInputName.addEventListener("input", (event: Event) => {
    const target = event.target as HTMLInputElement | null;
    textUserName = target?.value ?? '';
    buttonOpen();
});

userInputName.addEventListener("keydown", (event: KeyboardEvent) => {
    const target = event.target as HTMLInputElement | null;
    if (target?.value?.includes(" ")) {
        event.preventDefault();
    }
});

userInputPhone.addEventListener("input", (event: Event) => {
    const target = event.target as HTMLInputElement | null;
    textUserPhone = target?.value ?? '';
    buttonOpen();
});

userInputPhone.addEventListener("keydown", (event: KeyboardEvent) => {
    const target = event.target as HTMLInputElement | null;
    const listKey = ["e", "+", "-", ".", "E", ",", "ArrowUp", "ArrowDown"];
    
    if (target && listKey.includes(event.key)) {
        event.preventDefault();
    }
});

userSelectPost.addEventListener("change", (event: Event) => {
    const target = event.target as HTMLSelectElement | null;
    userJobPost = target?.value ?? '';
    buttonOpen();
});
btnTo.addEventListener("click", () => {
    const cardObj = {
        name: textUserName,
        phone: textUserPhone,
        jobPosition: userJobPost,
    };
    createPostCard(cardObj);
});
