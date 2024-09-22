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

document.getElementById("tdb").addEventListener("click", function() {
    window.location.href = "/todaysBilling/tdb.html";
});

document.getElementById('hotCoffeeBtn').addEventListener('click', () => {
    fetchHotCoffees();
    document.getElementById('coldCoffes').style.display = 'none';
    document.getElementById('hotCoffes').style.display = 'grid';
});

document.getElementById('coldCoffeeBtn').addEventListener('click', () => {
    fetchColdCoffees();
    document.getElementById('hotCoffes').style.display = 'none';
    document.getElementById('coldCoffes').style.display = 'grid';
});

const fetchHotCoffees = async () => {
    try {
        const response = await axios.get('https://66e3fb02d2405277ed1288c7.mockapi.io/api/v1/hot_coffes');
        displayCoffees(response.data, 'hotCoffes');
    } catch (error) {
        console.error('Error fetching hot coffees:', error);
    }
};

const fetchColdCoffees = async () => {
    try {
        const response = await axios.get('https://66e3fb02d2405277ed1288c7.mockapi.io/api/v1/cold_coffes');
        displayCoffees(response.data, 'coldCoffes');
    } catch (error) {
        console.error('Error fetching cold coffees:', error);
    }
};

const displayCoffees = (coffees, containerId) => {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    container.classList.add('grid', 'grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-4', 'gap-4');

    coffees.forEach(coffee => {
        const coffeeCard = `
             <div class="w-60 mx-auto bg-[#b3b3b4] shadow-lg rounded-lg overflow-hidden mb-6 mt-4 flex flex-col">
                <img class="w-full h-56 object-cover" src="${coffee.image}" alt="${coffee.name}">
                <div class="p-4 flex flex-col justify-between flex-grow">
                    <div class="flex-grow">
                        <h2 class="text-2xl font-bold text-center text-gray-800">${coffee.name}</h2>
                    </div>
                    <div class="flex justify-between items-center mt-2">
                        <p class="text-2xl font-bold text-gray-600">${coffee.price}€</p>
                        <button class="btn w-20 bg-[#4e525b] text-white font-bold text-lg hover:bg-[#a3a3a4]" 
                            onclick="addToReceipt('${coffee.id}', '${coffee.name}', ${coffee.price})">Shto</button>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += coffeeCard;
    });
};

let receipt = [];
let totalPrice = 0;

const addToReceipt = (id, name, price) => {
    receipt.push({ id, name, price });
    totalPrice += price;
    updateReceiptTable();
    updateTotalPrice();
};

const updateReceiptTable = () => {
    const receiptBody = document.getElementById('receiptBody');
    receiptBody.innerHTML = '';

    receipt.forEach((item, index) => {
        const receiptRow = `
            <tr>
                <th>${index + 1}</th>
                <td>${item.name}</td>
                <td>${item.price.toFixed(2)}€</td>
                <td><button class="pl-2" onclick="removeFromReceipt(${index})"><i class="fa-solid fa-trash"></i></button></td>
            </tr>
        `;
        receiptBody.innerHTML += receiptRow;
    });
};

const updateTotalPrice = () => {
    document.getElementById('totalPrice').innerText = `${totalPrice.toFixed(2)}€`;
};

const removeFromReceipt = (index) => {
    totalPrice -= receipt[index].price;
    receipt.splice(index, 1);
    updateReceiptTable();
    updateTotalPrice();
};

document.getElementById('saveBtn').addEventListener('click', async () => {
    if (receipt.length === 0) return alert("Fatura është e zbrazët!");

    const data = {
        sasia: receipt.length,
        qmimi: totalPrice
    };

    try {
        await axios.post('https://66eee8ce3ed5bb4d0bf2517c.mockapi.io/faturimisotem', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        alert('U ruajt me sukses!');
    } catch (error) {
        console.error('Error saving receipt:', error);
    }
});

document.getElementById('clearBtn').addEventListener('click', () => {
    if (confirm("Dëshiron të fshish të dhënat?")) {
        receipt = [];
        totalPrice = 0;
        updateReceiptTable();
        updateTotalPrice();
    }
});

document.getElementById('printBtn').addEventListener('click', () => {
    const receiptElement = document.querySelector('aside.col-span-3');
    const newWin = window.open('', 'Print-Window');
    newWin.document.open();
    newWin.document.write('<html><head><title>Print Receipt</title>');
    newWin.document.write('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css">');
    newWin.document.write('<style> body { font-family: Arial, sans-serif; } </style>');
    newWin.document.write('</head><body onload="window.print()">');
    newWin.document.write(receiptElement.innerHTML);
    newWin.document.write('</body></html>');
    newWin.document.close();
});
