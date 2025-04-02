document.addEventListener("DOMContentLoaded", () => {
    try {
        document.querySelectorAll(".page").forEach(page => {
            page.style.display = "none";
        });

        const currentHash = window.location.hash;

        if (currentHash === "#cart") {
            document.getElementById("cart").style.display = "block";
            loadCart(); 
        } else {
            document.getElementById("home").style.display = "block";
            loadProducts();
        }
    } catch (error) {
        console.error("Error initializing page:", error);
    }
});

window.onhashchange = () => {
    try {
        document.querySelectorAll(".page").forEach(page => {
            page.style.display = "none";
        });

        if (window.location.hash === "#home") {
            document.getElementById("home").style.display = "block";
            loadProducts();
        }
        if (window.location.hash === "#cart") {
            document.getElementById("cart").style.display = "block";
            loadCart();
        }
    } catch (error) {
        console.error("Error handling hash change:", error);
    }
};

const products = [
    {
        name: "Wireless Headphones",
        price: 1999,
        id:0,
        description: "High-quality sound with noise cancellation.",
        image: "https://media.istockphoto.com/id/860853774/photo/blue-headphones-isolated-on-a-white-background.jpg?s=1024x1024&w=is&k=20&c=ZKSYAESbxiM81eltw3egfMEbzUQOcdHYElT6I-bYqAg="
    },
    {
        name: "Smartwatch",
        price: 19900,
        id:1,
        description: "Track your fitness and receive notifications.",
        image: "https://media.istockphoto.com/id/525575671/vector/smart-watch-isolated-with-icons-on-white-background-vector-illustration.jpg?s=1024x1024&w=is&k=20&c=pOEYO0bZD24Fy_ez7NTTrNnE5fLCG851vn_apib5jMw="
    },
    {
        name: "Laptop",
        price: 299999,
        id:2,
        description: "Ergonomic laptops.",
        image: "https://media.istockphoto.com/id/1478610652/photo/hcmc-vietnam-macbook-pro-14-inches-m2.jpg?s=1024x1024&w=is&k=20&c=Hx97Ask0xQAbEs3ywlEAZxZ4mMmRkFdhufSCh4attf4="
    }
];

function loadProducts(filterName ="") {
    try {

        document.getElementById("home").style.display = "block";
        const container = document.getElementById("product-container");
        let filters=products;
        container.innerHTML = ""; 
        if (filterName) {
            filters = products.filter(item => item.name.toLowerCase().includes(filterName.toLowerCase()));
        }
        filters.forEach(product => {
            const productCard = document.createElement("div");
            productCard.classList.add("product-card");
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <p class="price"> Rs ${product.price}</p>
                <button onclick="addToCart('${product.image}', '${product.name}', '${product.price}',${product.id} )">Add</button>
            `;

            container.appendChild(productCard);
        });
    } catch (error) {
        console.error("Error loading products:", error);
    }
}

function addToCart(image, name, price,id) {   
    try {
        let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        let existingItem = cartItems.find(item => item.id === id);
         if(existingItem)
         {
            window.alert("Item already in Cart");
            return;
         }
        cartItems.push({
            name: name,
            price: price,
            id:id,
            qtyprice: price,
            image: image,
            qty: 1
        });

        localStorage.setItem("cart", JSON.stringify(cartItems));
    } catch (error) {
        console.error("Error adding to cart:", error);
    }
}
