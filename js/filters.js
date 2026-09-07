import { loadProducts } from "./loadData.js"


export const filterProducts = async (id) => {
    const products = await loadProducts(); 
    
    let filteredProducts = products.filter(product => {
        return product.categoryId === id; 
    });
    
    console.log(typeof filteredProducts)
    console.log( filteredProducts)
    return filteredProducts;
}
