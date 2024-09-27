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

    document.getElementById('printBtn').addEventListener('click', () => {
        const mainSection = document.querySelector('main');
        const clonedSection = mainSection.cloneNode(true);
    
        const headerRow = clonedSection.querySelector('thead tr');
        const fshijHeaderIndex = Array.from(headerRow.children).findIndex(th => th.textContent.trim() === 'Fshij');
    
        if (fshijHeaderIndex !== -1) {
            headerRow.deleteCell(fshijHeaderIndex);
            const bodyRows = clonedSection.querySelectorAll('tbody tr');
            bodyRows.forEach(row => {
                row.deleteCell(fshijHeaderIndex);
            });
        }
    
        const newWin = window.open('', 'Print-Window');
        newWin.document.open();
        newWin.document.write('<html><head><title>Print Receipt</title>');
        newWin.document.write('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css">');
        newWin.document.write('<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css">');
        newWin.document.write('</head><body onload="window.print()" class="flex justify-center items-center h-screen">');
    
        newWin.document.write(`
            <style>
                @media print {
                    body {
                        margin: 0;
                        padding: 0;
                        font-family: Arial, sans-serif;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                    }
                    th, td {
                        border: 1px solid gray;
                        padding: 10px;
                        text-align: left;
                    }
                    th {
                        background-color: #f0f0f0;
                    }
                    /* Add gap between columns */
                    th:not(:last-child), td:not(:last-child) {
                        padding-right: 20px; /* Adjust gap here */
                    }
                }
            </style>
        `);
    
        newWin.document.write(clonedSection.innerHTML);
        newWin.document.write('</body></html>');
        newWin.document.close();
    });
fetchData();
})    
