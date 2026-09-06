import { loadFooter, loadNav } from './components.js'
import {laodCategories , loadProducts} from './loadData.js'
loadNav()
loadFooter()

const loadProductList = async () => {
    let productsJson = await loadProducts();
    let categoryJson = await laodCategories();
    let product_list = [];
    const parser = new DOMParser();

    for (let el of productsJson) {
        let response = await fetch('../components/products.html')
        if (!(response).ok) throw new Error('Network response has crashed');
        const newProductHtml = await response.text();
        const newProduct = parser.parseFromString(newProductHtml, 'text/html');
        newProduct.querySelector('.product img').src = el.img;
        newProduct.querySelector('.name').innerHTML = el.name;
        newProduct.querySelector('.price').innerHTML = el.price;
        let productCat = newProduct.querySelector('.category')
        for (let cat of categoryJson) {
            if (cat.id === el.categoryId) {
                productCat.innerHTML = cat.name;
            }
        }
        product_list.push(newProduct)
        console.log(newProduct)
    }
    return product_list
}


const loadCategoriesList = async () => {
    let categoriesJson = await laodCategories();
    let allBtn = document.createElement('button');
    allBtn.classList.add('btn','btn-primary')
    let category_btns = [];

    for (let el of categoriesJson) {
        const catButton = document.createElement('button')
        catButton.className = 'btn'
        catButton.textContent = el.name;
        catButton.dataset.category = el.id || el.name;

        category_btns.push(catButton)
    }
    return category_btns;
}

let product_list = document.getElementById('product-list');
let category_list = document.getElementsByClassName('categories')[0];

try {

    const products = await loadProductList();
    product_list.innerHTML = products.map(product => product.documentElement.outerHTML).join('');
    const categories = await loadCategoriesList(); 
    categories.forEach(category => {
        category_list.appendChild(category);
    });
}
catch (error) {
    console.error(error)
}