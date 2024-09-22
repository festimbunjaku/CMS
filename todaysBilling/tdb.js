document.addEventListener('DOMContentLoaded', function() {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
        const greetingElement = document.querySelector("h2");
        greetingElement.textContent = `${currentUser}`;
    } else {
        window.location.href = "/login/login.html";  
    }
});

document.getElementById("logOut").addEventListener("click", function() {
    sessionStorage.removeItem("loggedIn");
    localStorage.removeItem("currentUser");
    window.location.href = "/login/login.html";
});

document.getElementById("dashboard").addEventListener("click", function() {
    window.location.href = "/dashboard/dashboard.html";
});

var n = new Date();
y = n.getFullYear();
m = n.getMonth() + 1;
d = n.getDate();
document.getElementById("data").innerHTML = d + "/" + m + "/" + y;

document.addEventListener('DOMContentLoaded', async () => {
    const receiptBody = document.getElementById('receiptBody');
    const transaksionetCounter = document.getElementById('transaksionet');
    const totalAmountDisplay = document.getElementById('shuma-total');
    const saveBtn = document.getElementById('saveBtn');
    const clearBtn = document.getElementById('clearBtn');
    const printBtn = document.getElementById('printBtn');
    let faturimiData = [];

    const fetchData = async () => {
        try {
            const response = await axios.get('https://66eee8ce3ed5bb4d0bf2517c.mockapi.io/faturimisotem');
            faturimiData = response.data;
            renderTable();
        } catch (error) {
            console.error('Gabim në marrje të të dhënave:', error);
        }
    };

    const renderTable = () => {
        receiptBody.innerHTML = '';
        let totalAmount = 0;

        faturimiData.forEach((item, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${item.sasia}</td>
                <td>${item.qmimi.toFixed(2)}€</td>
                <td><button class="delete-btn" data-id="${item.id}"><i class="fa-solid fa-trash"></i></button></td>
            `;
            receiptBody.appendChild(row);
            totalAmount += item.qmimi;
        });

        transaksionetCounter.textContent = faturimiData.length;
        totalAmountDisplay.textContent = totalAmount.toFixed(2) + "€";
    };

    const deleteItem = async (id) => {
        try {
            await axios.delete(`https://66eee8ce3ed5bb4d0bf2517c.mockapi.io/faturimisotem/${id}`);
            faturimiData = faturimiData.filter(item => item.id !== id);
            renderTable();
        } catch (error) {
            console.error('Gabim në fshirje të të dhënave', error);
        }
    };

    receiptBody.addEventListener('click', (event) => {
        if (event.target.closest('.delete-btn')) {
            const id = event.target.closest('.delete-btn').dataset.id;
            deleteItem(id);
        }
    });

    saveBtn.addEventListener('click', () => {
        const date = document.getElementById("data").textContent;
        const totalTransactions = transaksionetCounter.textContent;
        const totalPrice = totalAmountDisplay.textContent;

        const saveData = {
            date,
            totalTransactions,
            totalPrice,
        };

        localStorage.setItem('faturimiData', JSON.stringify(saveData));
        alert('Të dhënat u ruajtën me sukses ne local storage!');
    });

    clearBtn.addEventListener('click', async () => {
        const confirmation = confirm("Dëshiron të fshish të dhënat?");
        if (confirmation) {
            try {
                for (const item of faturimiData) {
                    await axios.delete(`https://66eee8ce3ed5bb4d0bf2517c.mockapi.io/faturimisotem/${item.id}`);
                }
                faturimiData = [];
                renderTable();
                alert('Të dhënat u fshinë me sukses!');
            } catch (error) {
                console.error('Gabim në fshirje të të dhënave:', error);
            }
        } else {
            alert('Të dhënat nuk u fshinë.');
        }
    });

    printBtn.addEventListener('click', () => {
        const printContent = document.querySelector('main').outerHTML;
        const newWindow = window.open('', '_blank');
        newWindow.document.write(`
            <html>
                <head>
                    <title>Print</title>
                    <style>
                        
                    </style>
                </head>
                <body onload="window.print();">${printContent}</body>
            </html>
        `);
        newWindow.document.close();
    });

    fetchData();
});
