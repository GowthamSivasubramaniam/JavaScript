function loadCart(filterName="") {
    try {
        document.getElementById("cart").style.display = "block";
        const container = document.getElementById("cart-container");
        container.innerHTML = ""; 

        let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        
        if (cartItems.length === 0) {
            container.innerHTML = "<p>Your cart is empty</p>";
            return;
        }
        if (filterName) {
            cartItems = cartItems.filter(item => item.name.toLowerCase().includes(filterName.toLowerCase()));
        }
        cartItems.forEach((product, index) => {
            if (!product.qty) {
                product.qty = 1; 
            }
            let basePrice = parseInt(product.price);
            const productCard = document.createElement("div");
            productCard.classList.add("product-card");
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p class="price" id="price-${index}">Rs ${basePrice * product.qty}</p>
                <div class="qty-container">
                    <button class="btn" onclick="decreaseQty(${index}, ${basePrice})">-</button>
                    <p class="qty" id="qty-${index}">${product.qty}</p>
                    <button class="btn" onclick="increaseQty(${index}, ${basePrice})">+</button>
                    <button class="btn" onclick="buy(${index})">Buy</button>
                </div>
            `;

            container.appendChild(productCard);
        });
    } catch (error) {
        console.error("Error loading cart:", error);
    }
}

function decreaseQty(index, basePrice) {
    try {
        let cart = JSON.parse(localStorage.getItem('cart'));
        if (cart[index].qty > 1) {
            cart[index].qty--;
            cart[index].qtyprice = basePrice * cart[index].qty;
            localStorage.setItem('cart', JSON.stringify(cart));
            document.getElementById(`qty-${index}`).innerText = cart[index].qty;
            document.getElementById(`price-${index}`).innerText = 'Rs ' + cart[index].qtyprice;
        }
    } catch (error) {
        console.error("Error decreasing quantity:", error);
    }
}

function increaseQty(index, basePrice) {
    try {
        let cart = JSON.parse(localStorage.getItem('cart'));
        cart[index].qty++;
        cart[index].qtyprice = basePrice * cart[index].qty;
        localStorage.setItem('cart', JSON.stringify(cart));
        document.getElementById(`qty-${index}`).innerText = cart[index].qty;
        document.getElementById(`price-${index}`).innerText = 'Rs ' + cart[index].qtyprice;
    } catch (error) {
        console.error("Error increasing quantity:", error);
    }
}

function buy(index) { 
    try {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let item = cart[index];

        document.getElementById("itemName").innerHTML = item.name;
        document.getElementById("itemQty").innerHTML = "Quantity ordered: " + item.qty;
        document.getElementById("itemPrice").innerHTML = "Price: " + item.price;
        document.getElementById("TotalPrice").innerHTML = "Total Price: " + item.qtyprice;
        document.getElementById("Model").style.display = "block";

        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
        console.error("Error processing order:", error);
    }
}

function dispatch() {  
    try {
        document.getElementById("itemName").innerHTML = "Thank You!!";
        document.getElementById("itemQty").innerHTML = "We will notify you once your order is shipped";
        document.getElementById("itemPrice").style.display = "none";
        document.getElementById("TotalPrice").style.display = "none";
        document.getElementById("dispatch").style.display = "none";

        setTimeout(() => {
            document.getElementById("Model").style.display = "none";
            window.location.reload();
        }, 3000);
    } catch (error) {
        console.error("Error dispatching order:", error);
    }
}
