// Instantly animate all product cards on page load
window.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.product-card');
    cards.forEach((card, idx) => {
        card.classList.add('animate__animated', 'animate__bounceInUp');
        card.style.setProperty('animation-delay', ((idx + 1) + 's'));
    });
});

// Instantly animate service cards on page load
window.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.about-content .product-card');
    serviceCards.forEach((card, idx) => {
        card.classList.add('animate__animated', 'animate__bounceInUp');
        card.style.setProperty('animation-delay', ((idx + 1) + 's'));
    });
});

// Toggle FAB options visibility
function toggleFabOptions() {
    const fab = document.querySelector('.fab');
    fab.classList.toggle('active');
}

// Optional: Close FAB options when clicking outside
window.addEventListener('click', function(event) {
    const fab = document.querySelector('.fab');
    if (fab && !fab.contains(event.target)) {
        fab.classList.remove('active');
    }
});

// Hero section animation
window.addEventListener('DOMContentLoaded', function() {
    const heroContent = document.querySelector('.hero .animate__animated');
    if (heroContent) {
        heroContent.classList.add('animate__bounceInUp');
        heroContent.style.setProperty('animation-delay', '0.11s');
    }
});

// --- Cart Count Update for FAB/Cart Hover Button ---
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const cartCountElem = document.getElementById('cart-count');
    const cartHover = document.getElementById('cart-hover');
    const count = cart.reduce((sum, i) => sum + i.qty, 0);
    if (cartCountElem) {
        cartCountElem.textContent = count;
    }
    if (cartHover) {
        if (count === 0) {
            cartHover.classList.add('hide');
        } else {
            cartHover.classList.remove('hide');
        }
    }
}
window.addEventListener('DOMContentLoaded', updateCartCount);
window.updateCartCount = updateCartCount;

// --- Cart Logic (shared for all pages) ---
window.cartSuggestions = [
    { id: "abc", name: "ABC Dry Powder", price: 1200 },
    { id: "co2", name: "CO2 Extinguisher", price: 1500 },
    { id: "dlp", name: "DLP Suppression System", price: 25000 },
    { id: "gas", name: "Gas Fire Suppression System", price: 32000 }
];

window.getCart = function() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
};
window.setCart = function(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    if (window.updateCartCount) window.updateCartCount();
};
window.removeFromCart = function(id) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== id);
    setCart(cart);
    if (typeof renderCart === "function") renderCart();
};
window.addQty = function(id) {
    let cart = getCart();
    cart = cart.map(item => item.id === id ? { ...item, qty: item.qty + 1 } : item);
    setCart(cart);
    if (typeof renderCart === "function") renderCart();
};
window.subQty = function(id) {
    let cart = getCart();
    cart = cart.map(item => item.id === id ? { ...item, qty: Math.max(1, item.qty - 1) } : item);
    setCart(cart);
    if (typeof renderCart === "function") renderCart();
};
window.addSuggestionToCart = function(id, name, price) {
    let cart = getCart();
    const found = cart.find(item => item.id === id);
    if (found) {
        found.qty += 1;
    } else {
        cart.push({ id, name, price, qty: 1 });
    }
    setCart(cart);
    if (typeof renderCart === "function") renderCart();
};

// Make addToCart global so it works with inline HTML
window.addToCart = function(id, name, price) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const found = cart.find(item => item.id === id);
    if (found) {
        found.qty += 1;
    } else {
        cart.push({ id, name, price, qty: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    if (window.updateCartCount) window.updateCartCount();
    alert('Added to cart!');
}

// Only define renderCart and renderSuggestions if on cart page
if (document.getElementById('cart-items')) {
    window.renderCart = function() {
        const cart = getCart();
        const cartItems = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');
        if (cart.length === 0) {
            cartItems.innerHTML = "<p>Your cart is empty.</p>";
            cartTotal.textContent = "";
            renderSuggestions([]);
            return;
        }
        let total = 0;
        cartItems.innerHTML = cart.map(item => {
            total += item.price * item.qty;
            return `<div class="cart-item">
                <span class="cart-item-name">${item.name}</span>
                <div class="cart-item-actions">
                    <button onclick="subQty('${item.id}')">-</button>
                    <span>${item.qty}</span>
                    <button onclick="addQty('${item.id}')">+</button>
                    <button onclick="removeFromCart('${item.id}')">Remove</button>
                </div>
                <span>₹${item.price * item.qty}</span>
            </div>`;
        }).join('');
        cartTotal.textContent = "Total: ₹" + total;
        renderSuggestions(cart.map(i => i.id));
    };
    window.renderSuggestions = function(cartIds) {
        const sugDiv = document.getElementById('cart-suggestions');
        const filtered = window.cartSuggestions.filter(s => !cartIds.includes(s.id)).slice(0, 4);
        sugDiv.innerHTML = filtered.map(s =>
            `<div class="suggestion-card" onclick="addSuggestionToCart('${s.id}','${s.name}',${s.price})">
                <h4>${s.name}</h4>
                <div>₹${s.price}</div>
            </div>`
        ).join('');
    };
    // Initial render
    window.addEventListener('DOMContentLoaded', function() {
        renderCart();
        if (window.updateCartCount) window.updateCartCount();
    });
}