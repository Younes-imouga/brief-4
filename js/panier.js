const topanier = JSON.parse(localStorage.getItem('topanier')) || [];

function load(topanier) {
    const container = document.getElementById("bodyOfTable");
    container.innerHTML = '';
    for (let i = 0; i < topanier.length; i++) {
        const productcart = document.createElement("tr");
        productcart.innerHTML = `     
        <td>
            <div class="cart-info">
                <img src=${topanier[i].image} alt="">
                <div>
                    <p>${topanier[i].name}</p>
                    <small>price: $${topanier[i].price}</small><br>
                    <a href="#">Remove</a>
                </div>
            </div>
        </td>
        <td><input type="number" min="1" max="99" style ="width: 50px;" class="quantity" value="${Number(topanier[i].quantity)}"></td>
        <td class = "total-price-num">$${Number(topanier[i].price) * Number(topanier[i].quantity)}</td>`;
        container.appendChild(productcart);
    }
}
load(topanier);

const quantityinputs = document.querySelectorAll(".quantity");

quantityinputs.forEach(quantityinput => {
    quantityinput.addEventListener("change", function() {
        const itemrow = quantityinput.closest("tr");
        const title = itemrow.querySelector("p").textContent;
        
        for (let i = 0; i < topanier.length; i++) {
            if (topanier[i].name === title) {
                topanier[i].quantity = Number(quantityinput.value);

                // Calculate the new total price for this item
                const newTotalPrice = (topanier[i].price * topanier[i].quantity).toFixed(2);

                // Update the total price cell in the cart
                const totalPriceCell = itemrow.querySelector('.total-price-num');
                totalPriceCell.textContent = `$${newTotalPrice}`;

                
                // Save the updated topanier to local storage
                localStorage.setItem('topanier', JSON.stringify(topanier));
                break; // Exit the loop after updating
            }
        }
        updatetotal();
    });
});

function updatetotal() {
    const prices = document.querySelectorAll(".total-price-num");
    let subtotal = 0;

    prices.forEach(priceCell => {
        const priceValue = parseFloat(priceCell.textContent.replace('$', ''));
        subtotal += priceValue;
    });

    const subtotalElement = document.getElementById("subtotal");

    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;

    const tax = document.getElementById("tax");
    let taxes = subtotal/100 * 20;
    tax.textContent = `$${taxes.toFixed(2)}`;

    const finaltotal = document.getElementById("total");
    finaltotal.textContent = `$${(subtotal + taxes).toFixed(2)}`
}

updatetotal();