function showPayment(amount) {
    document.getElementById("payment-container").classList.remove("hidden");

    // Ürítsd ki előző gombokat, hogy ne jelenjenek meg többször
    document.getElementById("paypal-button-container").innerHTML = "";

    paypal.Buttons({
        style: {
            layout: 'vertical',
            color: 'black', 
            shape: 'rect', 
            label: 'pay' 
        },
        fundingSource: paypal.FUNDING.PAYPAL,
        createOrder: function (data, actions) {
            return actions.order.create({
                purchase_units: [{
                    amount: { value: amount }
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

    // Apple Pay gomb megjelenítése, ha elérhető
    if (paypal.FUNDING.APPLEPAY) {
        paypal.Buttons({
            fundingSource: paypal.FUNDING.APPLEPAY
        }).render("#paypal-button-container");
    }

    // Bankkártyás fizetés gomb
    if (paypal.FUNDING.CARD) {
        paypal.Buttons({
            fundingSource: paypal.FUNDING.CARD
        }).render("#paypal-button-container");
    }
}
