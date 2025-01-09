// Sample cart data (replace with dynamic cart data from the main site)
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function renderCartItems() {
    const cartItemsDiv = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('totalPrice');
    
    let totalPrice = 0;
    cartItemsDiv.innerHTML = '';

    cart.forEach(product => {
        totalPrice += product.price * product.quantity;
        cartItemsDiv.innerHTML += `
            <div class="cart-item">
                <img src="${product.image}" alt="${product.name}">
                <div>${product.name}</div>
                <div>R${product.price} x ${product.quantity}</div>
            </div>
        `;
    });

    totalPriceElement.textContent = `R${totalPrice.toFixed(2)}`;
}

// Initialize Paystack payment
function payWithPaystack() {
    const totalAmount = cart.reduce((total, product) => total + product.price * product.quantity, 0) * 100; // Paystack expects the amount in kobo (cent)
    
    const handler = PaystackPop.setup({
        key: 'your-paystack-public-key',
        email: 'customer-email@example.com',
        amount: totalAmount,
        currency: "ZAR",
        ref: 'order_ref_12345',
        callback: function(response) {
            alert('Payment successful. Reference: ' + response.reference);
            // Here you can handle successful payment, e.g., updating order status, etc.
        },
        onClose: function() {
            alert('Transaction was not completed.');
        }
    });

    handler.openIframe();
}

// Event listener for the Pay Now button
document.getElementById('payButton').addEventListener('click', payWithPaystack);

// Render cart items on page load
renderCartItems();


let listCart = [];
function checkCart(){
        var cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('listCart='));
        if(cookieValue){
            listCart = JSON.parse(cookieValue.split('=')[1]);
        }
}
checkCart();
addCartToHTML();
function addCartToHTML(){
    // clear data default
    let listCartHTML = document.querySelector('.returnCart .list');
    listCartHTML.innerHTML = '';

    let totalQuantityHTML = document.querySelector('.totalQuantity');
    let totalPriceHTML = document.querySelector('.totalPrice');
    let totalQuantity = 0;
    let totalPrice = 0;
    // if has product in Cart
    if(listCart){
        listCart.forEach(product => {
            if(product){
                let newCart = document.createElement('div');
                newCart.classList.add('item');
                newCart.innerHTML = 
                    `<img src="${product.image}">
                    <div class="info">
                        <div class="name">${product.name}</div>
                        <div class="price">$${product.price}/1 product</div>
                    </div>
                    <div class="quantity">${product.quantity}</div>
                    <div class="returnPrice">$${product.price * product.quantity}</div>`;
                listCartHTML.appendChild(newCart);
                totalQuantity = totalQuantity + product.quantity;
                totalPrice = totalPrice + (product.price * product.quantity);
            }
        })
    }
    totalQuantityHTML.innerText = totalQuantity;
    totalPriceHTML.innerText = '$' + totalPrice;
}
function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart)); // Save cart to localStorage
    totalQuantityElement.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    cartItemsDiv.innerHTML = '';
    cart.forEach(product => {
        cartItemsDiv.innerHTML += `
            <div class="cart-item">
                <img src="${product.image}" alt="${product.name}">
                <div>${product.name}</div>
                <div>R${product.price} x ${product.quantity}</div>
                <button class="remove-from-cart" data-id="${product.id}">Remove</button>
            </div>
        `;
    });
}
