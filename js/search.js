const searchBox = document.getElementById('search-box')

searchBox.addEventListener('keyup' , e=>{
    let value = e.target.value.toUpperCase();
    console.log(value) 
    let products = document.querySelectorAll('h3.name');
    products.forEach(product =>{
        if (product.textContent.toUpperCase().includes(value)){
            product.parentNode.parentNode.style.display = 'block'
        }else{
            product.parentNode.parentNode.style.display = 'none'
        }
    })
})