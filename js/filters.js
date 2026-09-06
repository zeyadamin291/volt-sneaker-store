import { loadProducts } from "./shop.js"


const filterProducts = async (id) => {
    const products = await loadProducts(); 
    
    let filteredProducts = products.filter(product => {
        return product.categoryId === id; 
    });
    
    return filteredProducts;
}
