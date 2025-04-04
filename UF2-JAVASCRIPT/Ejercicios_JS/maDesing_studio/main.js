document.getElementById("file-input").addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById("preview-img").src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

const cart = [];

document.getElementById("submit-btn").addEventListener("click", function() {
    const product = document.getElementById("product-select").value;
    const imageSrc = document.getElementById("preview-img").src;
    if (imageSrc) {
        cart.push({ product, imageSrc });
        updateCart();
        alert("Producto agregado al carrito");
    } else {
        alert("Por favor, sube un diseño antes de continuar.");
    }
});

function updateCart() {
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = "";
    cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.innerHTML = `${item.product} <img src="${item.imageSrc}" width="50"> <button onclick="removeFromCart(${index})">Eliminar</button>`;
        cartItems.appendChild(li);
    });
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

document.getElementById("checkout-btn").addEventListener("click", function() {
    if (cart.length > 0) {
        alert("Compra finalizada. Gracias por tu pedido!");
        cart.length = 0;
        updateCart();
    } else {
        alert("El carrito está vacío.");
    }
});
