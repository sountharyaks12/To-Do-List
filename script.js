let addBtn = document.querySelector('.addBtn');
let input = document.querySelector('.input');
let todolist = document.querySelector('.todo_list');
let enterAlert = document.querySelector('.enterAlert')
let delAlert = document.querySelector('.delAlert');

let todoArray = [];

addBtn.addEventListener('click', () => {

    if (input.value.trim() == "") {
        enterAlert.innerHTML = "Please Enter ";
        return;
    }
    else {
        enterAlert.style.display = "none";
        todoArray.push(input.value);
        console.log(todoArray);

        addtodo(input.value)

        input.value = ''
        localStorage.setItem('todoArray', JSON.stringify(todoArray))
    }
})
function addtodo(todo) {
    let eachlist = document.createElement('div');
    eachlist.className = "eachlist"

    let li = document.createElement('li');
    eachlist.appendChild(li)

    let wrapDiv = document.createElement('div');
    wrapDiv.className = "wrapDiv"
    eachlist.appendChild(wrapDiv)

    let del = document.createElement('span')
    del.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    del.className = "del"
    wrapDiv.appendChild(del);

    let checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.className = "checkbox"
    wrapDiv.appendChild(checkbox)

    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            li.style.textDecoration = 'line-through'
        }
        else {
            li.style.textDecoration = 'none'
        }
    })

    del.addEventListener('click', () => {
        if (checkbox.checked) {
            eachlist.remove();
            let index = todoArray.indexOf(todo)
            if (index > -1) {
                todoArray.splice(index, 1)
                console.log(todoArray);
                localStorage.setItem('todoArray', JSON.stringify(todoArray))
                delAlert.style.display = "none"
            }
        }
        else {

            delAlert.innerHTML="You are Unable to delete task that is unchecked";
        }
    })
    li.innerHTML = todo;
    todolist.appendChild(eachlist)
}

window.onload = () => {
    todoArray = JSON.parse(localStorage.getItem('todoArray')) || []
    console.log(todoArray);
    todoArray.forEach(item => addtodo(item));
}