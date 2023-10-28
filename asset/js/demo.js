const array = []
const demo = document.querySelector("#demo")
window.onload = () => {
    const keys = Object.keys(localStorage).sort()
    keys.forEach(elmt => {
        array.push(JSON.parse(localStorage.getItem(elmt)))
    })

    array.map((data) => {
        demo.innerHTML += `<li>${data}</li>`
    })
}