const users = [
    { username: "user1", pin: "0000" },
    { username: "user2", pin: "0000" },
    { username: "user3", pin: "0000" },
    { username: "user4", pin: "0000" }
];

localStorage.setItem("users", JSON.stringify(users));

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const enteredUsername = document.getElementById("username").value.trim();
    const enteredPin = document.getElementById("pin").value.trim();

    if (!enteredUsername || !enteredPin) {
        document.getElementById("message").textContent = "Ju lutemi plotësoni të gjitha fushat.";
        return;
    }

    if (enteredPin.length !== 4 || isNaN(enteredPin)) {
        document.getElementById("message").textContent = "PIN duhet të jetë një numër 4-shifror.";
        return;
    }

    const users = JSON.parse(localStorage.getItem("users"));
    const validUser = users.find(user =>
        user.username === enteredUsername && user.pin === enteredPin
    );

    if (validUser) {
        sessionStorage.setItem("loggedIn", "true");
        localStorage.setItem("currentUser", enteredUsername); 
        window.location.href = "/dashboard/dashboard.html";
    } else {
        document.getElementById("message").textContent = "Emri i përdoruesit ose PIN-i është i pasaktë.";
    }
});
