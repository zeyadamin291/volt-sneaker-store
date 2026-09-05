import { loadFooter, loadNav } from './components.js'
loadNav()
loadFooter()

const loadProducts = async () => {
    try {

        const response = await fetch("../data/products.json")
        const products = await response.json();
        return products

    } catch (err) {
        console.error(err)
    }
}

const laodCategories = async ()=>{
    try {
        const response = await fetch("../data/categories.json")
        const categories = await response.json();
        return categories

    } catch (err) {
        console.error(err)
    }
}
const thing = async () => {
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


let product_list = document.getElementById('product-list');

try {
    
    const products = await thing();
    product_list.innerHTML = products.map(product => product.documentElement.outerHTML).join('');

}
catch (error) {
    console.error(error)
}