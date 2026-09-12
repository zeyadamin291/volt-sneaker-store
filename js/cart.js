let productsInCart = []
const parentElement = ''
const product_list = document.getElementById('purchases');
const products = document.querySelectorAll('.product')

const calcSubTotal = () => {
    let sumPrice = 0;
    productsInCart.forEach(product => {
        sumPrice += product.price
    })
    return sumPrice;
}

const updateProductsInCart = product => {
    for (let p of productsInCart) {
        if (product.id === p.id) {
            p.count++;
            p.price = p.basePrice * p.count;
            return;
        }
    }
    productsInCart.push(product);
}

export const updateCartUI = () => {
    if (productsInCart.length > 0) {
        let cartItems = document.getElementById('purchases');
        cartItems.innerHTML = '';
        for (let p of productsInCart) {
            let productElement = document.createElement('div');
            productElement.className = 'cart-item';
            productElement.innerHTML = `
                <img src="${p.img}" alt="${p.name}">
                <div class="item-details">
                    <h4>${p.name}</h4>
                    <p>Price: $${p.price.toFixed(2)}</p>
                    <p>Quantity: ${p.count}</p>
                </div>
            `;
            cartItems.appendChild(productElement);
        }
        const subTotalHTML = document.getElementById('cart-subtotal');
        subTotalHTML.innerHTML = `$${calcSubTotal()}`;
    } else {
        
    }
}


products.forEach(product => {
    product.addEventListener('click', (e) => {
        if (e.target.classList.contains('.add-product')) {
            const Id = e.target.dataset.id;
            const name = product.querySelector('h3.name').textContent;
            const price = product.querySelector('.price').textContent;
            const img = product.querySelector('img.product-img').src;
            let productToCart = {
                id: Id,
                name: name,
                price: +price,
                basePrice: +price,
                img: img,
                count: 1
            };
            updateProductsInCart(productToCart);
            updateCartUI();
        }
    })
})