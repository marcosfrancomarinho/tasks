
let list = []
const elmt = {
    search: document.querySelector("#search"),
    form: document.querySelector(".form"),
    result: document.querySelector(".result"),
}
const clear = (e) => e.search.value = ""
const focus = (e) => e.search.focus()

window.onload = () => loading(elmt)

function setItemLocalStorage() {
    localStorage.setItem("mytask", JSON.stringify(list))
}
function listScreen(value) {
    elmt.result.innerHTML +=
        `<div class="container__task"> 
        <span class ="task">${value}</span> 
        <span class = "btn-all">
            <button class="done" onclick = "done(this.parentElement.parentElement)">✔️</button>
            <button class="edit" onclick = "edit(this.parentElement.parentElement)">✏️</button>
            <button class = "alter" onclick = "alter(this.parentElement.parentElement)">OK</button>
            <button class="remove" onclick = "remove(this.parentElement.parentElement)">❌</button>
        </span>
    </div>`
}
function done(value) {
    const chores = value.children[0].innerHTML
    const index = list.findIndex(data => data.task == chores)
    if (value.children[0].classList.toggle("check")) {
        value.classList.add("checked")
        list[index].status = true
        setItemLocalStorage()
    } else {
        value.classList.remove("checked")
        list[index].status = false
        setItemLocalStorage()
    }
}
function remove(value) {
    const chores = value.children[0].innerHTML
    const index = list.findIndex(data => data.task == chores)
    list.splice(index, 1)
    setItemLocalStorage()
    elmt.result.removeChild(value)
}
function edit(value) {
    const chores = value.children[0].innerHTML
    elmt.search.value = chores
    focus(elmt)
    value.children[1].children[2].style.display = "inline-block"
    value.children[1].children[1].style.display = "none"
}
function alter(value) {
    const chores = value.children[0].innerHTML
    const index = list.findIndex(data => data.task == chores)
    list[index].task = elmt.search.value
    value.children[0].innerHTML = elmt.search.value
    setItemLocalStorage()
    value.children[1].children[1].style.display = "inline-block"
    value.children[1].children[2].style.display = "none"
    clear(elmt)
    focus(elmt)
}
function createTask(e, status) {
    return {
        task: e.search.value,
        status: status
    }
}
elmt.form.onsubmit = (event) => {
    event.preventDefault()
    list.push(createTask(elmt, false))
    setItemLocalStorage()
    listScreen(elmt.search.value.toLowerCase())
    clear(elmt)
}
const loading = (e) => {
    if (localStorage.length != 0) {
        list = JSON.parse(localStorage.getItem("mytask"))
    }
    list.map(data => listScreen(data.task))
    for (let index in list) {
        if (list[index].status) {
            e.result.children[index].children[0].classList.add("check")
            e.result.children[index].classList.add("checked")
        }
    }
}
