let productsInCart = [];
const product_list = document.getElementById('purchases');

const calcSubTotal = () => {
    let sumPrice = 0;
    productsInCart.forEach(product => {
        sumPrice += product.price;
    });
    return sumPrice;
};

const updateProductsInCart = product => {
    for (let p of productsInCart) {
        if (product.id === p.id) {
            p.count++;
            p.price = p.basePrice * p.count;
            return;
        }
    }
    productsInCart.push(product);
};

export const updateCartUI = () => {
    const cartItems = document.getElementById('purchases'); 
    if (!cartItems) return;

    if (productsInCart.length > 0) {
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
        if (subTotalHTML) subTotalHTML.innerHTML = `$${calcSubTotal()}`;
    } else {
        cartItems.innerHTML = '<p class="empty-cart-msg">Your cart is empty.</p>';
    }
};


export async function loadCart() {
    const cart = document.getElementById('cart-container');
    if (!cart) {
        console.warn('Cart: #cart container not found in page');
        return;
    }
    try {
        const response = await fetch('../components/cart.html');
        if (!response.ok) throw new Error('Network response has crashed');
        const html = await response.text();
        cart.innerHTML = html;
    } catch (err) {
        console.error('Error loading cart: ', err);
    }
}

async function toggleCart() {
    const cart = document.getElementById('cart');
    const openBtn = document.getElementById('cart-button');
    if (!cart) {
        console.warn('Cart: #cart not found');
        return;
    }
    const closeBtn = cart.querySelector('.x-button'); // it's a class, not an id

    if (!openBtn || !closeBtn) {
        console.warn('Cart: missing element', { openBtn, closeBtn });
        return;
    }

    openBtn.addEventListener('click', () => {
        cart.classList.add('active');
        updateCartUI();
    });

    closeBtn.addEventListener('click', () => {
        cart.classList.remove('active');
    });
}


function bindProductListeners() {
    const products = document.querySelectorAll('.product');
    products.forEach(product => {
        product.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-product')) {
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
        });
    });
}


export async function loadNav() {
    const navBar = document.getElementById('navbar');
    try {
        const response = await fetch('../components/navbar.html');
        console.log('fetched navbar');
        if (!response.ok) throw new Error('Network response has crashed');
        const html = await response.text();
        navBar.innerHTML = html;

        const pathName = window.location.pathname.split('/').pop();
        const navlinks = document.querySelectorAll('li a');
        navlinks.forEach(link => {
            if (link.getAttribute('href') === pathName) {
                link.classList.add('active');
            }
            if (
                pathName.includes('product-detail.html') ||
                pathName.includes('order-confirmed.html') ||
                pathName.includes('checkout.html')
            ) {
                console.log(link.getAttribute('href'), 'the second if condition');
                navlinks[1].classList.add('active');
            }
        });
        await loadCart();
        toggleCart();
    } catch (err) {
        console.error('Error: ', err);
    }
}

export async function loadFooter() {
    const footer = document.getElementsByTagName('footer')[0];
    try {
        const response = await fetch('../components/footer.html');
        if (!response.ok) throw new Error('Network response has crashed');
        const html = await response.text();
        footer.innerHTML = html;
    } catch (err) {
        console.error('Error: ', err);
    }
}

bindProductListeners();