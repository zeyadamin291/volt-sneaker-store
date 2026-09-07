import { loadFooter, loadNav } from './components.js'
import { laodCategories, loadProducts } from './loadData.js'
import { filterProducts } from './filters.js'
loadNav()
loadFooter()


let productsJson = await loadProducts();
let categoryJson = await laodCategories();

const loadProductList = async (products = productsJson, categories = categoryJson) => {
    let product_list = [];
    const parser = new DOMParser();

    for (let el of products) {
        let response = await fetch('../components/products.html')
        if (!(response).ok) throw new Error('Network response has crashed');
        const newProductHtml = await response.text();
        const newProduct = parser.parseFromString(newProductHtml, 'text/html');
        newProduct.querySelector('.product img').src = el.img;
        newProduct.querySelector('.name').innerHTML = el.name;
        newProduct.querySelector('.price').innerHTML = el.price;
        newProduct.querySelector('.product').dataset.id = el.id;
        let productCat = newProduct.querySelector('.category')
        for (let cat of categories) {
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
    let category_btns = [];

    for (let el of categoryJson) {
        const catButton = document.createElement('button')
        catButton.className = 'btn'
        catButton.textContent = el.name;
        catButton.dataset.category = el.id;

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

try {

    const categoryBtns = document.querySelectorAll('.categories .btn');

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', async () => {
            categoryBtns.forEach(b => {
                if (b.classList.contains('btn-primary')) {
                    b.classList.remove('btn-primary');
                }
            })

            btn.classList.add('btn-primary');

            const categoryId = btn.dataset.category || 'all';
            console.log('Category clicked:', categoryId);

            if (categoryId === 'all') {
                const products = await loadProductList();
                product_list.innerHTML = products.map(product => product.documentElement.outerHTML).join('');
            } else {

                const filteredProducts = await filterProducts(categoryId);
                const products = await loadProductList(filteredProducts);
                product_list.innerHTML = products.map(product =>
                    product.documentElement.outerHTML  // ✅ Convert Document → HTML string
                ).join('');
            }
        })
    })
}

catch (err) {
    console.error(err)
}


try {
    let productCards = document.querySelectorAll('.product')
    productCards.forEach(card => {
        console.log(card)
        card.addEventListener('click', () => {
            const productId = card.dataset.id; // أو من attribute
            window.location.href = `product-detail.html?id=${productId}`;
        })
    })
}
catch (err) {
    console.error(err)
}