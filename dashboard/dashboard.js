document.addEventListener('DOMContentLoaded', function() {
    const currentUser = localStorage.getItem("currentUser");

    if (currentUser) {
        const greetingElement = document.querySelector("h2");
        greetingElement.textContent = `Mirësevini ${currentUser}`;
    } else {
        window.location.href = "/login/login.html";  
    }
});

document.getElementById("logOut").addEventListener("click", function(){
    sessionStorage.removeItem("loggedIn");
    localStorage.removeItem("currentUser");
    window.location.href = "/login/login.html";
});
