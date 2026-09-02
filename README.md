# Volt Sneaker Store

A modern, responsive sneaker e-commerce frontend built with semantic HTML, modular CSS, and vanilla JavaScript. Browse products, search in real time, filter by category and price, sort by price, view product details, manage a fully interactive shopping cart, and walk through a simulated checkout and payment flow — without a framework or build step.

## Features

- Responsive storefront for desktop, tablet, and mobile screens
- Dynamic product listings loaded from `data/products.json` and `data/categories.json`
- Real-time product search
- Category and price-range filtering
- Sort products by price (low → high / high → low)
- Product detail pages with dynamic content (sizes, colors, stock, rating)
- Add, remove, and update cart items (full CRUD)
- Cart persistence with browser storage
- Reusable navbar, product, cart, and footer components
- Multi-step checkout (contact → shipping → payment) with a simulated payment result
- Order-confirmation / receipt page
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
| `shop.html` | Product catalogue, search, filters, and sort |
| `product-detail.html` | Individual product information |
| `checkout.html` | Contact → shipping → payment checkout flow |
| `order-confirmed.html` | Simulated payment result / order receipt |

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
│   ├── global.css
│   ├── components
│   │   ├── navbar.css
│   │   └── footer.css
│   └── pages
│       ├── cart.css
│       ├── home.css
│       ├── product.css
│       ├── product-detail.css
│       ├── checkout.css
│       └── confirmation.css
├── data
│   ├── categories.json
│   └── products.json
├── docs
│   └── documentation.docx
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

## Documentation

`docs/documentation.docx` contains the full system documentation:

- **Data model** — every entity (`User`, `Category`, `Product`, `Cart`, `CartItem`, `Order`, `OrderItem`, `Payment`, `Address`, plus optional `Review` and `PromoCode`), with fields, types, and relationships.
- **Feature list** — the core requested features (cart CRUD, payment simulation, search, category filter, price sort), the supporting features they depend on, and recommended additions (accounts, wishlist, reviews, promo codes, etc.).
- **User stories** — one per feature, written as *As a [role], I want to..., so that...*, with acceptance criteria for the core flows.

## Data files

- `data/products.json` — 304 mock shoe products across 8 categories (Running, Basketball, Lifestyle, Training, Boots, Sandals, Skate, Formal). Each product matches the `Product` entity: `id`, `name`, `description`, `price`, `img`, `categoryId`, `sizes`, `colors`, `stock`, `rating`, `createdAt`.
- `data/categories.json` — the 8 `Category` records (`id`, `name`, `slug`) referenced by each product's `categoryId`.
- Product images are placeholder URLs (`picsum.photos`) — replace with real product photography before going live.

## Technologies

- HTML5
- CSS3
- Vanilla JavaScript (ES modules)
- JSON product/category data
- Browser `localStorage` for cart state

## Customization

- Add or edit products in `data/products.json` and categories in `data/categories.json`.
- Update global styles (colors, type scale, resets) in `css/global.css`.
- Adjust shared component styles in `css/components/`.
- Adjust page-specific layouts in the matching file under `css/pages/`.
- Extend interactions in `js/` without adding a build tool.
- Place product, hero, category, and icon assets in the matching `assets/` directories.

## Development notes

Keep asset paths relative to the page using them, preserve the existing component structure, and validate the project in a browser after changing product data or JavaScript. Since the app is static, deployment can be handled by any static hosting provider.

## License

No license has been specified yet. Add a license before redistributing the project.