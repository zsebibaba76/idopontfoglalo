document.addEventListener("DOMContentLoaded", function () {
    generateDates();
});

// Időpontfoglaló lenyitása
function toggleBookingMenu() {
    document.getElementById("booking-menu").classList.toggle("hidden");
}

// Dátumok generálása
function generateDates() {
    let datesContainer = document.getElementById("dates-container");
    datesContainer.innerHTML = "";

    let today = new Date();
    for (let i = 0; i < 4; i++) {
        let date = new Date();
        date.setDate(today.getDate() + i);

        let dateStr = date.toLocaleDateString("hu-HU", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        let dateDiv = document.createElement("div");
        dateDiv.classList.add("date-option");
        dateDiv.innerText = dateStr;
        dateDiv.onclick = () => showTimes();
        datesContainer.appendChild(dateDiv);
    }
}

// Időpontok megjelenítése
function showTimes() {
    document.getElementById("dates-container").classList.add("hidden");
    let timesContainer = document.getElementById("times-container");
    timesContainer.classList.remove("hidden");
    timesContainer.innerHTML = "";

    ["14:00", "17:00", "20:00", "23:00"].forEach(time => {
        let timeDiv = document.createElement("div");
        timeDiv.classList.add("time-option");
        timeDiv.innerText = time;
        timeDiv.onclick = () => showPayment(5000); // Fix 5000 Ft időpont foglalás
        timesContainer.appendChild(timeDiv);
    });
}

// Fizetés ablak megjelenítése
function showPayment(amount) {
    document.getElementById("payment-container").classList.remove("hidden");

    // PayPal gomb inicializálása
    paypal.Buttons({
        createOrder: function (data, actions) {
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: amount
                    }
                }]
            });
        },
        onApprove: function (data, actions) {
            return actions.order.capture().then(function (details) {
                closePayment();
                showSuccess();
            });
        }
    }).render("#paypal-button-container");
}

// Fizetés bezárása
function closePayment() {
    document.getElementById("payment-container").classList.add("hidden");
}

// Sikeres foglalás animáció
function showSuccess() {
    let successContainer = document.getElementById("success-container");
    successContainer.classList.remove("hidden");

    setTimeout(() => {
        successContainer.innerHTML = `
            <div class="content">
                <p>Időpont foglalás sikeres!</p>
                <a href="#" class="button">Vissza a főoldalra</a>
            </div>
        `;
    }, 3000);
}
