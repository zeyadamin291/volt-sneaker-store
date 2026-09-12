import { addToCart, loadNav, loadFooter } from "./components.js"
import { loadProductById } from "./loadData.js";

loadNav()
loadFooter()

let addToCartBtn = document.querySelectorAll('.add-to-cart button')[2];
let plusButton = document.getElementsByClassName('plus')[0];
let minusButton = document.getElementsByClassName('minus')[0];
let quantity = document.querySelector('.add-to-cart p')

function loadQuantity() {
    const saved = localStorage.getItem('product-quantity');
    if (saved !== null) {
        const qty = parseInt(saved, 10);
        if (!isNaN(qty) && qty > 0) {
            quantity.textContent = qty;
            return qty;
        }
    }
    quantity.textContent = 1;
    return 1;
}

let currentQnt = loadQuantity();

const updateQuantity = (nextQuantity) => {
    currentQnt = Math.max(1, Number(nextQuantity) || 1);
    quantity.textContent = currentQnt;
    localStorage.setItem('product-quantity', String(currentQnt));
};

plusButton.addEventListener('click', () => {
    updateQuantity(currentQnt + 1);
});
minusButton.addEventListener('click', () => {
    updateQuantity(currentQnt - 1);
});

/*====================================== Fetching data ==========================================*/


const getProductID = () => {
    const urlParams = new URLSearchParams(window.location.search)
    let id = urlParams.get('id');
    return id;
}

const fetchSizes = async () => {
    const data = await loadProductById(getProductID());
    let sizesDiv = document.getElementsByClassName('sizes')[0];
    let sizesJson = data['sizes'];
    for (let size of sizesJson) {
        let sizeButton = document.createElement('button')
        sizeButton.className = 'size-btn';
        sizeButton.textContent = size;
        sizesDiv.append(sizeButton)
    }
}



const fetchData = async () => {
    const id = getProductID();
    const data = await loadProductById(id);

    let productName = document.getElementsByClassName('product-name')[0];
    let productPrice = document.getElementsByClassName('detail-price')[0];
    let productDescription = document.getElementsByClassName('description')[0];
    let productImage = document.querySelector('.main-img img');
    console.log(productImage)
    productName.textContent = data['name'].toUpperCase();
    productPrice.textContent = `$${data['price'].toFixed(2)}`;
    productDescription.textContent = data['description'];
    productImage.src = data['img'];

    for (const img of data['images']) {
        let thumbnail = document.createElement('img');
        thumbnail.src = img;
        document.querySelector('.thumbnails').append(thumbnail);
    }
}


try {
    const id = getProductID();
    fetchSizes();
    fetchData();

    const addToCartButton = document.querySelector('.add-to-cart button:last-of-type');
    if (addToCartButton) {
        addToCartButton.addEventListener('click', async () => {
            const product = await loadProductById(id);
            if (!product) return;

            const selectedQuantity = Math.max(1, Number(quantity.textContent || 1));
            addToCart({
                id: product.id,
                name: product.name,
                price: Number(product.price),
                basePrice: Number(product.price),
                img: product.img,
                count: selectedQuantity
            });
        });
    }
} catch (err) {
    console.error(err)
}