async function loadNav() {
    const navBar = document.getElementById("navbar")
    try{
        const response = await fetch('../components/navbar.html');
        if (!response.ok) throw new Error('Network response has crashed');
        const html = await response.text();
        navBar.innerHTML = html;
    }
    catch(err){
        console.error("Error: ", err)
    }
}
loadNav()