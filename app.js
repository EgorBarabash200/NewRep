const btn = document.getElementById('red-kwadrat');
const listDivs = document.getElementById('new-div');
let num = 1;
btn.addEventListener("click" , (event) =>{
    const div = document.createElement('div');
    div.textContent = 'DIV №' + num ;
    listDivs.appendChild(div);
    num += 1;
});
