import { loadNav, loadFooter } from "./components.js"

loadNav()
loadFooter()

let plusButton = document.getElementsByClassName('plus')[0];
let minusButton = document.getElementsByClassName('minus')[0];
let quantity = document.querySelector('.add-to-cart p')
console.log(Number(quantity.innerHTML))

plusButton.addEventListener('click', () => {
    quantity.innerHTML = Number(quantity.innerHTML) + 1;
})
minusButton.addEventListener('click', () => {
    if (Number(quantity.innerHTML) > 0) {
        quantity.innerHTML = Number(quantity.innerHTML) - 1;
    }
})