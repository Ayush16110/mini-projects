document.addEventListener("DOMContentLoaded", () => {
    const productList = document.getElementById("product-list");
    const emptyCartMessage = document.getElementById("empty-cart");
    const cartContainer = document.getElementById("cart-container");
    const cartItems = document.getElementById("cart-item-list");
    const totalAmountDisplay = document.getElementById("total-amount");
    const checkoutBtn = document.getElementById("checkout-btn");

    let cartTotal = 0;

    const products = [
        { id: 1, name: "Product 1", price: 29.99 },
        { id: 2, name: "Product 2", price: 19.99 },
        { id: 3, name: "Product 3", price: 49.99 },
    ];

    let cart = [];

    products.forEach((product) => {
        const productLi = document.createElement("li");
        const addToCartButton = document.createElement("button");

        productLi.classList.add("products");
        productLi.innerHTML = `
        <p>${product.name} - $${product.price.toFixed(2)}</p>
        `;

        addToCartButton.classList.add("add-to-cart-btn");
        addToCartButton.id = product.id;

        addToCartButton.innerText = "Add to cart";
        productList.appendChild(productLi);
        productLi.appendChild(addToCartButton);
    });

    productList.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") {
            console.log(e.target.getAttribute("id"));
            const productID = parseInt(e.target.getAttribute("id"));

            const product = products.find((p) => p.id === productID);

            console.log(product);

            addToCart(product);
        }
    });

    function addToCart(product) {
        cart.push(product);
        const cartListItem = document.createElement("li");
        cartListItem.classList.add("items-added");

        cartListItem.innerText = `
        ${product.name} - $${product.price}
        `;

        cartItems.appendChild(cartListItem);

        renderCart();

        updateTotal(product);
    }

    function renderCart() {
        cartContainer.classList.remove("hidden");
        emptyCartMessage.classList.add("hidden");
    }

    function updateTotal(p) {
        cartTotal += p.price;
        totalAmountDisplay.innerText = `
        $${cartTotal.toFixed(2)}
        `;
    }

    checkoutBtn.addEventListener("click", () => {
        alert("Purchase successful");
        cart = [];
        emptyCartMessage.classList.remove("hidden");
        cartContainer.classList.add("hidden");
    });
});
