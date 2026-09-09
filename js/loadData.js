export const loadProducts = async () => {
    try {
        const response = await fetch("../data/products.json")
        const products = await response.json();
        return products

    } catch (err) {
        console.error(err)
    }
}

export const laodCategories = async () => {
    try {
        const response = await fetch("../data/categories.json")
        const categories = await response.json();
        return categories

    } catch (err) {
        console.error(err)
    }
}


export const loadProductById = async id => {
    const response = await fetch("../data/products.json")
    const products = await response.json();
    for (const product of products){
        if(product.id === id){
            return product;
        }
    }
}