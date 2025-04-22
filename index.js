var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var userInputName = document.getElementById("main-input");
var userInputPhone = document.getElementById("main-phone-input");
var userSelectPost = document.getElementById("main-select");
var btnTo = document.getElementById("main-button");
var containerBlockDivs = document.getElementById("div-block");
var textUserName = "";
var textUserPhone = "";
var userJobPost = "";
var newDataCards = [];
if (btnTo) {
    if ('disabled' in btnTo) {
        btnTo.disabled = true;
    }
}
;
dataGetCards();
function dataGetCards() {
    return __awaiter(this, void 0, void 0, function () {
        var responce, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, fetch("http://localhost:8080/task/all", {
                            method: "GET",
                        })];
                case 1:
                    responce = _a.sent();
                    if (!responce) return [3 /*break*/, 3];
                    return [4 /*yield*/, responce.json()];
                case 2:
                    data = _a.sent();
                    newDataCards = data;
                    renderingCard();
                    _a.label = 3;
                case 3: return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    console.log(error_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function createPostCard(cardObj) {
    return __awaiter(this, void 0, void 0, function () {
        var error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("http://localhost:8080/task", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(cardObj),
                        })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, dataGetCards()];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.log(error_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function dataDeleteCard(id) {
    return __awaiter(this, void 0, void 0, function () {
        var error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("http://localhost:8080/task/".concat(id), {
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json",
                            },
                        })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, dataGetCards()];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    console.log(error_3);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function redactPutCard(redactCardObj, id) {
    return __awaiter(this, void 0, void 0, function () {
        var error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("http://localhost:8080/task/".concat(id), {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(redactCardObj),
                        })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, dataGetCards()];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_4 = _a.sent();
                    console.log(error_4);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function renderingCard() {
    if (containerBlockDivs) {
        containerBlockDivs.innerHTML = "";
    }
    newDataCards.forEach(function (item) {
        var container = document.createElement("div");
        var textDiv = document.createElement("div");
        var pName = document.createElement("p");
        var pPhone = document.createElement("p");
        var pPost = document.createElement("p");
        var pDate = document.createElement("p");
        var imgDiv = document.createElement("div");
        var redactDiv = document.createElement("div");
        var delitDiv = document.createElement("div");
        textDiv.className = "div-text";
        imgDiv.className = "div-img";
        redactDiv.className = "redact-div";
        delitDiv.className = "delit-div";
        pName.textContent = "Имя" + " " + item.name;
        pPhone.textContent = "Телефон" + " " + item.phone;
        if (item.jobPosition === "employee") {
            container.className = "green-div";
            pPost.textContent = "Должность: Сотрудник";
        }
        else if (item.jobPosition === "develop") {
            container.className = "red-div";
            pPost.textContent = "Должность: Девелоп";
        }
        else {
            container.className = "yello-div";
            pPost.textContent = "Должность: Администратор";
        }
        pDate.textContent = item.createDate;
        if (containerBlockDivs) {
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
        delitDiv.addEventListener("click", function () {
            dataDeleteCard(item.id);
        });
        redactDiv.addEventListener("click", function () {
            redactRendeeringCard(container, item);
        });
    });
}
function redactRendeeringCard(container, item) {
    container.innerHTML = "";
    container.style.cssText = "\n        display: flex;\n        flex-direction: column ;\n    ";
    var containerBtnBlock = document.createElement("div");
    containerBtnBlock.className = "container-img-redact";
    var containerTextBlock = document.createElement("div");
    containerTextBlock.className = "container-text-redact";
    var containerNameRedact = document.createElement("div");
    containerNameRedact.className = "container-npc-text-redact";
    var containerPhoneRedact = document.createElement("div");
    containerPhoneRedact.className = "container-npc-text-redact";
    var containerSelectRedact = document.createElement("div");
    containerSelectRedact.className = "container-npc-text-redact";
    var redactInputName = document.createElement("input");
    redactInputName.type = "text";
    redactInputName.placeholder = "Введите новое имя";
    redactInputName.className = "redact-block-input";
    redactInputName.value = item.name;
    var containerName = document.createElement("div");
    containerName.className = "container-name-label";
    containerName.textContent = "Имя:";
    var redactInputPhone = document.createElement("input");
    redactInputPhone.type = "number";
    redactInputPhone.placeholder = "Введите новый телефон";
    redactInputPhone.className = "redact-block-input";
    redactInputPhone.value = item.phone;
    var containerPhone = document.createElement("div");
    containerPhone.className = "container-phone-label";
    containerPhone.textContent = "Телефон:";
    var saveBtn = document.createElement("button");
    saveBtn.className = "btn-redact";
    saveBtn.disabled = true;
    var noSaveBtn = document.createElement("div");
    noSaveBtn.className = "btn-no-redact";
    var redactTextName = item.name;
    var redactTextPhone = item.phone;
    var redactSelect = document.createElement("select");
    var redactOptions = [
        { value: "employee", text: "Сотрудник" },
        { value: "develop", text: "Девелоп" },
        { value: "admin", text: "Админинистратор" },
    ];
    redactSelect.className = "change-label";
    var containerSelect = document.createElement("div");
    containerSelect.className = "container-select-label";
    containerSelect.textContent = "Должность:";
    var redactJobPost = item.jobPosition;
    redactOptions.forEach(function (optionData) {
        var option = document.createElement("option");
        option.value = optionData.value;
        option.textContent = optionData.text;
        if (optionData.value === item.jobPosition) {
            option.selected = true;
        }
        redactSelect.appendChild(option);
    });
    function redactBtnOpen() {
        saveBtn.disabled = !(redactTextName.length > 0 &&
            redactTextPhone.length === 11 &&
            redactJobPost.length > 0);
    }
    redactInputName.addEventListener("input", function (event) {
        var _a;
        var target = event.target;
        redactTextName = (_a = target === null || target === void 0 ? void 0 : target.value) !== null && _a !== void 0 ? _a : '';
        redactBtnOpen();
    });
    redactInputName.addEventListener("keydown", function (event) {
        if (event.key === " ") {
            event.preventDefault();
        }
    });
    redactInputPhone.addEventListener("input", function (event) {
        var _a;
        var target = event.target;
        redactTextPhone = (_a = target === null || target === void 0 ? void 0 : target.value) !== null && _a !== void 0 ? _a : '';
        redactBtnOpen();
    });
    redactInputPhone.addEventListener("keydown", function (event) {
        if (event.key === "e") {
            event.preventDefault();
        }
    });
    redactSelect.addEventListener("change", function (event) {
        var _a;
        var target = event.target;
        redactJobPost = (_a = target === null || target === void 0 ? void 0 : target.value) !== null && _a !== void 0 ? _a : '';
        ;
        redactBtnOpen();
    });
    saveBtn.addEventListener("click", function () {
        var redactCardObj = {
            name: redactTextName,
            phone: redactTextPhone,
            jobPosition: redactJobPost,
        };
        redactPutCard(redactCardObj, item.id);
    });
    noSaveBtn.addEventListener("click", function () {
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
    btnTo.disabled = !(textUserName.length > 0 &&
        textUserPhone.length === 11 &&
        userJobPost.length > 0);
}
userInputName.addEventListener("input", function (event) {
    var _a;
    var target = event.target;
    textUserName = (_a = target === null || target === void 0 ? void 0 : target.value) !== null && _a !== void 0 ? _a : '';
    buttonOpen();
});
userInputName.addEventListener("keydown", function (event) {
    var _a;
    var target = event.target;
    if ((_a = target === null || target === void 0 ? void 0 : target.value) === null || _a === void 0 ? void 0 : _a.includes(" ")) {
        event.preventDefault();
    }
});
userInputPhone.addEventListener("input", function (event) {
    var _a;
    var target = event.target;
    textUserPhone = (_a = target === null || target === void 0 ? void 0 : target.value) !== null && _a !== void 0 ? _a : '';
    buttonOpen();
});
userInputPhone.addEventListener("keydown", function (event) {
    var target = event.target;
    var listKey = ["e", "+", "-", ".", "E", ",", "ArrowUp", "ArrowDown"];
    if (target && listKey.includes(event.key)) {
        event.preventDefault();
    }
});
userSelectPost.addEventListener("change", function (event) {
    var _a;
    var target = event.target;
    userJobPost = (_a = target === null || target === void 0 ? void 0 : target.value) !== null && _a !== void 0 ? _a : '';
    buttonOpen();
});
btnTo.addEventListener("click", function () {
    var cardObj = {
        name: textUserName,
        phone: textUserPhone,
        jobPosition: userJobPost,
    };
    createPostCard(cardObj);
});
