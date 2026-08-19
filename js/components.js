export async function loadNav() {
    const navBar = document.getElementById("navbar")
    try{
        const response = await fetch('./components/navbar.html');
        console.log("fetched navbar")
        if (!(await response).ok) throw new Error('Network response has crashed');
        const html = await response.text();
        navBar.innerHTML = html;
    }
    catch(err){
        console.error("Error: ", err)
    }
}

export async function loadFooter() {
    const footer = document.getElementsByTagName("footer")[0];
    try{
        const response = await fetch("./components/footer.html")
        if (!response.ok) throw new Error('Network response has crashed');
        const html = await response.text();
        footer.innerHTML = html;
    }
    catch(err){
        console.error("Error: ", err)
    }
}