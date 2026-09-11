export async function loadNav() {
    const navBar = document.getElementById("navbar")
    try {
        const response = await fetch('../components/navbar.html');
        console.log("fetched navbar")
        if (!(response).ok) throw new Error('Network response has crashed');
        const html = await response.text();
        navBar.innerHTML = html;
        const pathName = window.location.pathname.split('/').pop();
        const navlinks = document.querySelectorAll('li a');
        navlinks.forEach(link => {
            if (link.getAttribute('href') === pathName) {
                link.classList.add('active')
            }

            if (pathName.includes('product-detail.html') || pathName.includes('order-confirmed.html') ||
                pathName.includes('checkout.html')) {
                console.log(link.getAttribute('href'), 'the second if condition')
                navlinks[1].classList.add('active');
            }
        })

    }
    catch (err) {
        console.error("Error: ", err)
    }
}

export async function loadFooter() {
    const footer = document.getElementsByTagName("footer")[0];
    try {
        const response = await fetch("../components/footer.html")
        if (!response.ok) throw new Error('Network response has crashed');
        const html = await response.text();
        footer.innerHTML = html;
    }
    catch (err) {
        console.error("Error: ", err)
    }
}

export async function loadCart() {
    const cart = document.getElementById('cart');
    console.log("cart loaded")
    try {
        const response = await fetch('../components/cart.html');
        console.log("fetched cart")
        if (!response.ok) throw new Error('Network response has crashed');
        const html = await response.text();
        console.log(html)
        cart.innerHTML = html;
        console.log(cart)
    }
    catch (err) {
        console.error("Error: ", err)
    }
}
// export async function addToCart(productId, quantity) {
//     try {
//         const response = await fetch("../data/products.json")
//         const products = await response.json();
//         for (const product of products) {
//             if (product.id === productId) {
//                 let cart = JSON.parse(localStorage.getItem('cart')) || [];
//                 let existingProductIndex = cart.findIndex(item => item.id === productId);
//                 if (existingProductIndex !== -1) {
//                     cart[existingProductIndex].quantity += quantity;
//                 } else {
//                     cart.push({ ...product, quantity });
//                 }
//                 localStorage.setItem('cart', JSON.stringify(cart));
//                 return;
//             }
//         }
//     } catch (err) {
//         console.error(err)
//     }
// }