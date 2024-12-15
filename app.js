const btn = document.getElementById('red-kwadrat');
const listDivs = document.getElementById('new-div');
let num = 1;
btn.addEventListener("click" , (event) =>{
    const div = document.createElement('div');
    div.textContent = 'DIV №' + num ;
    listDivs.appendChild(div);
    num += 1;
});

const input =document.getElementById('main-input');
const btnTo = document.getElementById('main-button');
const blockDivs = document.getElementById('div-block');
let str = '';

input.addEventListener("input" , (event) =>{
    str = event.target.value;
});

btnTo.addEventListener("click" , (event) =>{
    const div = document.createElement('div');
    div.textContent = str;
    div.className = 'new-div';
     blockDivs.appendChild(div);
});
