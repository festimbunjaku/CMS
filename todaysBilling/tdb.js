document.addEventListener('DOMContentLoaded', function() {
    const currentUser = localStorage.getItem("currentUser");

    if (currentUser) {
        const greetingElement = document.querySelector("h2");
        greetingElement.textContent = `Hi ${currentUser}`;
    } else {
        window.location.href = "/login/login.html";  
    }
});

document.getElementById("logOut").addEventListener("click", function(){
    sessionStorage.removeItem("loggedIn");
    localStorage.removeItem("currentUser");
    window.location.href = "/login/login.html";
});


document.getElementById("dashboard").addEventListener("click", function(){
    window.location.href = "/dashboard/dashboard.html";
})


n =  new Date();
y = n.getFullYear();
m = n.getMonth() +1;
d = n.getDate();

document.getElementById("data").innerHTML = d + "/" + m + "/" + y;
