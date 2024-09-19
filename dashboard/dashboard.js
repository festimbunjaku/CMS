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

document.getElementById("tdb").addEventListener("click", function(){
    window.location.href = "/todaysBilling/tdb.html";
});


const hot_coffes = document.querySelector("#hotCoffes")
const cold_coffes = document.querySelector("#coldCoffes")

const API_URL = "https://66e3fb02d2405277ed1288c7.mockapi.io/api/v1/hot_coffes"

async function fetchCoffees() {
    try{
        const response = await fetch(API_URL)
        const data = await response.json()
        return data
    }
    catch(error){
        console.error("Error Fetching Coffes",error)
        return[]
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const hotCoffeeUrl = 'https://66e3fb02d2405277ed1288c7.mockapi.io/api/v1/hot_coffes';
    const coldCoffeeUrl = 'https://66e3fb02d2405277ed1288c7.mockapi.io/api/v1/cold_coffes';

    const hotCoffeeContainer = document.getElementById('hotCoffes').querySelector('.grid');
    const coldCoffeeContainer = document.getElementById('coldCoffes').querySelector('.grid');
    const receiptBody = document.getElementById('receiptBody');
    const totalPriceElem = document.getElementById('totalPrice');

    const hotCoffeeBtn = document.getElementById('hotCoffeeBtn');
    const coldCoffeeBtn = document.getElementById('coldCoffeeBtn');

    hotCoffeeBtn.addEventListener('click', () => {
        fetchAndDisplayCoffees(hotCoffeeUrl, hotCoffeeContainer);
        document.getElementById('hotCoffes').classList.remove('hidden');
        document.getElementById('coldCoffes').classList.add('hidden');
    });

    coldCoffeeBtn.addEventListener('click', () => {
        fetchAndDisplayCoffees(coldCoffeeUrl, coldCoffeeContainer);
        document.getElementById('coldCoffes').classList.remove('hidden');
        document.getElementById('hotCoffes').classList.add('hidden');
    });

    function fetchAndDisplayCoffees(url, container) {
        console.log(`Fetching data from ${url}`); // Debug message
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(coffees => {
                console.log('Coffees data:', coffees); // Debug message
                container.innerHTML = '';
                coffees.forEach(coffee => {
                    container.innerHTML += `
                        <div class="w-60 mx-auto bg-white shadow-lg rounded-lg overflow-hidden col-span-3 mb-6 mt-4 flex flex-col">
                            <img class="w-full h-56 object-cover" src="${coffee.image}" alt="${coffee.name}">
                        <div class="p-4 flex flex-col justify-between flex-grow">
                        <div class="flex-grow">
                            <h2 class="text-2xl font-bold text-center text-gray-800">${coffee.name}</h2>
                        </div>
                        <div class="flex justify-between items-center mt-2">
                            <p class="text-2xl font-bold text-gray-600">$${coffee.price}</p>
                            <button class="btn w-20 bg-slate-500 text-white font-bold text-lg hover:bg-green-700" data-name="${coffee.name}" data-price="${coffee.price}">Add</button>
                        </div>
                    </div>
                </div>

                    `;
                });

                container.querySelectorAll('button').forEach(button => {
                    button.addEventListener('click', addToReceipt);
                });
            })
            .catch(error => console.error('Fetch error:', error));
    }

    function addToReceipt(event) {
        const name = event.target.getAttribute('data-name');
        const price = parseFloat(event.target.getAttribute('data-price'));

        const row = document.createElement('tr');
        row.innerHTML = `
            <th></th>
            <td>${name}</td>
            <td>${price.toFixed(2)}$</td>
            <td><button class="pl-2 delete-btn"><i class="fa-solid fa-trash"></i></button></td>
        `;
        receiptBody.appendChild(row);

        updateTotalPrice(price);

        row.querySelector('.delete-btn').addEventListener('click', () => {
            row.remove();
            updateTotalPrice(-price);
        });
    }

    function updateTotalPrice(amount) {
        const currentTotal = parseFloat(totalPriceElem.textContent.replace('$', ''));
        totalPriceElem.textContent = (currentTotal + amount).toFixed(2) + '$';
    }
});



document.addEventListener('DOMContentLoaded', () => {
    const receiptBody = document.getElementById('receiptBody');
    const totalPriceElem = document.getElementById('totalPrice');
    const saveBtn = document.getElementById('saveBtn');
    const clearBtn = document.getElementById('clearBtn');
    const printBtn = document.getElementById('printBtn');

    // Retrieve existing recipe from local storage or initialize as empty
    let recipe = JSON.parse(localStorage.getItem('recipe')) || [];
    console.log('Initial recipe:', recipe);

    // Function to update the displayed total price
    function updateTotalPrice() {
        const total = recipe.reduce((sum, item) => sum + item.price, 0);
        totalPriceElem.textContent = `${total.toFixed(2)}$`;
        console.log('Updated total price:', totalPriceElem.textContent);
    }

    // Function to render the receipt table
    function renderReceipt() {
        receiptBody.innerHTML = '';
        recipe.forEach((item, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <th>${index + 1}</th>
                <td>${item.name}</td>
                <td>${item.price.toFixed(2)}$</td>
                <td><button class="pl-2 delete-btn" data-index="${index}"><i class="fa-solid fa-trash"></i></button></td>
            `;
            receiptBody.appendChild(row);
        });

        updateTotalPrice();

        // Add delete functionality to each item
        receiptBody.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const index = event.target.getAttribute('data-index');
                recipe.splice(index, 1);
                localStorage.setItem('recipe', JSON.stringify(recipe));
                console.log('Item deleted. New recipe:', recipe);
                renderReceipt();
            });
        });
    }

    // Save button event listener
    saveBtn.addEventListener('click', () => {
        // Get the highest current ID and increment it
        let highestId = parseInt(localStorage.getItem('highestRecipeId') || '0', 10);
        highestId += 1;
        localStorage.setItem('highestRecipeId', highestId);

        const orderData = {
            id: highestId,
            count: recipe.length, // Number of products in the recipe
            total: recipe.reduce((sum, item) => sum + item.price, 0) // Total price
        };
        localStorage.setItem(`order_${highestId}`, JSON.stringify(orderData));
        alert(`Recipe saved with ID ${highestId}`);
        console.log('Recipe saved:', orderData);
    });

    // Clear button event listener
    clearBtn.addEventListener('click', () => {
        recipe = [];
        localStorage.setItem('recipe', JSON.stringify(recipe));
        console.log('Recipe cleared. New recipe:', recipe);
        renderReceipt();
    });

    // Print button event listener
    printBtn.addEventListener('click', () => {
        window.print();
    });

    // Initial render of the receipt
    renderReceipt();

    // Example function to add items to the recipe
    window.addToRecipe = function(name, price) {
        recipe.push({ name, price });
        localStorage.setItem('recipe', JSON.stringify(recipe));
        console.log('Item added:', { name, price });
        renderReceipt();
    }
});