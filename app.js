
const input = document.getElementById('main-input');
const btnTo = document.getElementById('main-button');
const blockDivs = document.getElementById('div-block');
let textInput = '';

input.addEventListener("input", (event) => {
    textInput = event.target.value;
});

btnTo.addEventListener("click", (event) => {
    const div = document.createElement('div');
    div.textContent = textInput;
    div.className = 'new-div';
    blockDivs.appendChild(div);
});
