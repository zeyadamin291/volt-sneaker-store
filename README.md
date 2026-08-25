# Volt Sneaker Store

A modern, responsive sneaker e-commerce frontend built with semantic HTML, modular CSS, and vanilla JavaScript. Browse products, search in real time, filter by category and price, view product details, and manage a fully interactive shopping cart—without a framework or build step.

## Features

- Responsive storefront for desktop, tablet, and mobile screens
- Dynamic product listings loaded from `data/products.json`
- Real-time product search
- Category and price-range filtering
- Product detail pages with dynamic content
- Add, remove, and update cart items
- Cart persistence with browser storage
- Reusable navbar, product, cart, and footer components
- Checkout and order-confirmation pages
- Lightweight frontend with no external dependencies

## Quick start

This project uses browser modules and fetches local files, so serve it through a local HTTP server rather than opening `index.html` directly.

```bash
git clone <repository-url>
cd volt-sneaker-store
python3 -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000) in your browser.

Alternatively, use the **Live Server** extension in Visual Studio Code.

## Pages

| Page | Purpose |
| --- | --- |
| `index.html` | Homepage with featured content |
| `shop.html` | Product catalogue, search, and filters |
| `product-detail.html` | Individual product information |
| `checkout.html` | Checkout flow |
| `order-confirmed.html` | Order completion screen |

## Project structure
```

Volt-Sneaker-store
├── assets
│   ├── icons
│   │   ├── cart.svg
│   │   ├── Container-1.svg
│   │   ├── Container.svg
│   │   ├── global.svg
│   │   ├── profile.svg
│   │   ├── search.svg
│   │   └── x-button.svg
│   └── images
│       ├── categories
│       ├── hero
│       └── products
├── checkout.html
├── components
│   ├── cart.html
│   ├── footer.html
│   ├── navbar.html
│   └── products.html
├── css
│   ├── cart.css
│   ├── global.css
│   ├── home.css
│   ├── navbar.css
│   ├── product.css
│   └── product-detail.css
├── data
│   └── products.json
├── index.html
├── js
│   ├── cart.js
│   ├── components.js
│   ├── filters.js
│   ├── main.js
│   ├── product-detail.js
│   └── shop.js
├── order-confirmed.html
├── product-detail.html
├── README.md
└── shop.html
```

## Technologies

- HTML5
- CSS3
- Vanilla JavaScript (ES modules)
- JSON product data
- Browser `localStorage` for cart state

## Customization

- Add or edit products in `data/products.json`.
- Update global styles in `css/global.css`.
- Adjust page-specific layouts in the relevant CSS file.
- Extend interactions in `js/` without adding a build tool.
- Place product, hero, category, and icon assets in the matching `assets/` directories.

## Development notes

Keep asset paths relative to the page using them, preserve the existing component structure, and validate the project in a browser after changing product data or JavaScript. Since the app is static, deployment can be handled by any static hosting provider.

## License

No license has been specified yet. Add a license before redistributing the project.