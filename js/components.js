let productsInCart = [];
const storageKey = 'volt-cart-items';

const normalizeCartItem = product => {
    const basePrice = Number(product.basePrice ?? product.price ?? 0);
    const count = Math.max(1, Number(product.count ?? 1));

    return {
        ...product,
        basePrice,
        count,
        price: basePrice * count
    };
};

const loadCartFromStorage = () => {
    try {
        const savedCart = localStorage.getItem(storageKey);
        return savedCart ? JSON.parse(savedCart).map(item => normalizeCartItem(item)) : [];
    } catch (error) {
        console.error('Cart: failed to load local cart state', error);
        return [];
    }
};

const persistCart = () => {
    localStorage.setItem(storageKey, JSON.stringify(productsInCart));
};

productsInCart = loadCartFromStorage();

const calcSubTotal = () => {
    return productsInCart.reduce((sum, product) => sum + Number(product.price || 0), 0);
};

const updateProductsInCart = product => {
    const normalizedProduct = normalizeCartItem(product);

    for (let p of productsInCart) {
        if (normalizedProduct.id === p.id) {
            p.count += normalizedProduct.count;
            p.price = p.basePrice * p.count;
            return;
        }
    }

    productsInCart.push(normalizedProduct);
};

const updateCartItemQuantity = (id, delta) => {
    productsInCart = productsInCart
        .map(product => {
            if (product.id !== id) return product;

            const nextCount = product.count + delta;
            if (nextCount <= 0) {
                return null;
            }

            return {
                ...product,
                count: nextCount,
                price: product.basePrice * nextCount
            };
        })
        .filter(Boolean);

    persistCart();
    updateCartUI();
};

const removeCartItem = id => {
    productsInCart = productsInCart.filter(product => product.id !== id);
    persistCart();
    updateCartUI();
};

export const addToCart = product => {
    if (!product || !product.id) {
        console.warn('Cart: cannot add an invalid product');
        return;
    }

    updateProductsInCart(product);
    persistCart();
    updateCartUI();
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
                    <p>Price: $${Number(p.price || 0).toFixed(2)}</p>
                    <div class="quantity-controls">
                        <button type="button" data-action="decrease" data-id="${p.id}">-</button>
                        <span>Quantity: ${p.count}</span>
                        <button type="button" data-action="increase" data-id="${p.id}">+</button>
                        <button type="button" class="remove-item" data-action="remove" data-id="${p.id}">Remove</button>
                    </div>
                </div>
            `;
            cartItems.appendChild(productElement);
        }

        const subTotalHTML = document.getElementById('cart-subtotal');
        if (subTotalHTML) {
            subTotalHTML.textContent = `$${calcSubTotal().toFixed(2)}`;
        }
    } else {
        cartItems.innerHTML = '<p class="empty-cart-msg">Your cart is empty.</p>';

        const subTotalHTML = document.getElementById('cart-subtotal');
        if (subTotalHTML) {
            subTotalHTML.textContent = '$0.00';
        }
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

        const cartItems = document.getElementById('purchases');
        if (cartItems && cartItems.dataset.eventsBound !== 'true') {
            cartItems.addEventListener('click', event => {
                const target = event.target.closest('button[data-action]');
                if (!target) return;

                const { action, id } = target.dataset;
                if (!id) return;

                if (action === 'increase') {
                    updateCartItemQuantity(id, 1);
                }

                if (action === 'decrease') {
                    updateCartItemQuantity(id, -1);
                }

                if (action === 'remove') {
                    removeCartItem(id);
                }
            });
            cartItems.dataset.eventsBound = 'true';
        }

        updateCartUI();
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

    const closeBtn = cart.querySelector('.x-button');

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

export function bindProductListeners() {
    const products = document.querySelectorAll('.product');

    products.forEach(product => {
        const addButton = product.querySelector('.add-product');
        if (!addButton || addButton.dataset.listenerBound === 'true') return;

        addButton.dataset.listenerBound = 'true';
        addButton.addEventListener('click', event => {
            event.preventDefault();
            event.stopPropagation();

            const productId = product.dataset.id;
            const name = product.querySelector('h3.name')?.textContent?.trim() || '';
            const priceText = product.querySelector('.price')?.textContent?.trim() || '0';
            const price = Number(priceText.replace(/[^0-9.-]+/g, ''));
            const img = product.querySelector('img.product-img')?.src || '';

            addToCart({
                id: productId,
                name,
                price,
                basePrice: price,
                img,
                count: 1
            });
        });
    });
}

export async function loadNav() {
    const navBar = document.getElementById('navbar');
    try {
        const response = await fetch('../components/navbar.html');
        if (!response.ok) throw new Error('Network response has crashed');
        const html = await response.text();
        navBar.innerHTML = html;

        const pathName = window.location.pathname.split('/').pop();
        const navlinks = document.querySelectorAll('li a');

        navlinks.forEach(link => {
            if (link.getAttribute('href') === pathName) {
                link.classList.add('active');
            }
        });

        if (
            pathName.includes('product-detail.html') ||
            pathName.includes('order-confirmed.html') ||
            pathName.includes('checkout.html')
        ) {
            const shopLink = document.querySelector('li a[href="shop.html"]');
            if (shopLink) {
                shopLink.classList.add('active');
            }
        }

        await loadCart();
        toggleCart();
        updateCartUI();
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