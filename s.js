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

// Update cart count on hover
function updateCartHoverCount() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    const cartCountElem = document.getElementById('cart-count');
    if (cartCountElem) cartCountElem.textContent = count;
}

// Call on page load
document.addEventListener('DOMContentLoaded', updateCartHoverCount);

// Call after any cart update
function addToCart(item) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const idx = cart.findIndex(i => i.id === item.id);
    if (idx > -1) {
        cart[idx].qty += item.qty || 1;
    } else {
        cart.push({ ...item, qty: item.qty || 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartHoverCount();
}


// --- Live Search for Products & Services (UPGRADED) ---
document.addEventListener('DOMContentLoaded', function() {
    const allItems = [
        // PRODUCTS (from product.html)
        {
            id: 'abc',
            name: 'ABC Dry Powder',
            type: 'product',
            url: 'product-details.html?id=abc',
            img: 'abc.jpeg'
        },
        {
            id: 'co2',
            name: 'CO2 Extinguisher',
            type: 'product',
            url: 'product-details.html?id=co2',
            img: 'co2.jpg'
        },
        {
            id: 'foam',
            name: 'Foam Extinguisher',
            type: 'product',
            url: 'product-details.html?id=foam',
            img: 'Foam-Fire-Extinguishers.png'
        },
        {
            id: 'water',
            name: 'Water Mist Extinguisher',
            type: 'product',
            url: 'product-details.html?id=water',
            img: 'water-fire-extinguisher.jpg'
        },
        {
            id: 'automatic-modular',
            name: 'Automatic Modular Extinguisher',
            type: 'product',
            url: 'product-details.html?id=automatic-modular',
            img: 'automatic-modular.jpg'
        },
        {
            id: 'fire-blanket',
            name: 'Kitchen Fire Blanket',
            type: 'product',
            url: 'product-details.html?id=fire-blanket',
            img: 'fire-blanket.jpg'
        },
        {
            id: 'fireball',
            name: 'Fire Ball Extinguisher',
            type: 'product',
            url: 'product-details.html?id=fireball',
            img: 'fireball.jpg'
        },
        {
            id: 'trolley',
            name: 'Trolley Mounted Extinguisher',
            type: 'product',
            url: 'product-details.html?id=trolley',
            img: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=400&q=80'
        },

        // SERVICES (from ourservice.html)
        {
            id: 'dlp',
            name: 'DLP Suppression System',
            type: 'service',
            url: 'service-detail.html?id=dlp',
            img: 'dlp.png'
        },
        {
            id: 'gas',
            name: 'Gas Fire Suppression System',
            type: 'service',
            url: 'service-detail.html?id=gas',
            img: 'gas.jpg'
        },
        {
            id: 'kitchen',
            name: 'Kitchen Fire Suppression System',
            type: 'service',
            url: 'service-detail.html?id=kitchen',
            img: 'KitchenFire.jpg'
        },
        {
            id: 'hydrant',
            name: 'Fire Hydrant System',
            type: 'service',
            url: 'service-detail.html?id=hydrant',
            img: 'firehydrant.jpg'
        },
        {
            id: 'alarm',
            name: 'Fire Alarm System',
            type: 'service',
            url: 'service-detail.html?id=alarm',
            img: 'fire-alarm-system-removebg.png'
        },
        {
            id: 'suppression',
            name: 'Fire Suppression System',
            type: 'service',
            url: 'service-detail.html?id=suppression',
            img: 'sprinkle.jpg'
        },
        {
            id: 'engineering',
            name: 'Engineering & Maintenance',
            type: 'service',
            url: 'service-detail.html?id=engineering',
            img: 'https://cdn-icons-png.flaticon.com/512/1828/1828919.png'
        }
    ];

    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    const searchForm = document.getElementById('search-form');

    if (!searchInput || !searchResults || !searchForm) return;

    // Keyboard accessibility: allow arrow navigation and Enter
    let currentIdx = -1;
    function updateActiveResult(idx) {
        const items = Array.from(searchResults.querySelectorAll('.search-result-item'));
        items.forEach((item, i) => {
            item.classList.toggle('active', i === idx);
            if (i === idx) item.scrollIntoView({ block: 'nearest' });
        });
    }

    searchInput.addEventListener('input', function() {
        const query = searchInput.value.trim().toLowerCase();
        currentIdx = -1;
        if (!query) {
            searchResults.style.display = 'none';
            searchResults.innerHTML = '';
            return;
        }
        const results = allItems.filter(item => item.name.toLowerCase().includes(query));
        if (results.length === 0) {
            searchResults.innerHTML = '<div class="search-result-item" tabindex="0">No results found</div>';
            searchResults.style.display = 'block';
            return;
        }
        searchResults.innerHTML = results.map(item => {
            // Highlight the matching part
            const regex = new RegExp('(' + query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') + ')', 'ig');
            const highlighted = item.name.replace(regex, '<span class="search-highlight">$1</span>');
            return `
                <div class="search-result-item" data-url="${item.url}" tabindex="0" aria-label="${item.name} (${item.type})">
                    <img src="${item.img}" alt="${item.name}" loading="lazy">
                    <span>${highlighted} <span style="font-size:0.85em;color:#888;">(${item.type})</span></span>
                </div>
            `;
        }).join('');
        searchResults.style.display = 'block';

        // Add click listeners for each result
        Array.from(searchResults.querySelectorAll('.search-result-item')).forEach(div => {
            div.onclick = function() {
                const url = div.getAttribute('data-url');
                if (url) window.location.href = url;
            };
            div.onkeydown = function(e) {
                if (e.key === "Enter" || e.key === " ") {
                    const url = div.getAttribute('data-url');
                    if (url) window.location.href = url;
                }
            };
        });
    });

    // Keyboard navigation for results
    searchInput.addEventListener('keydown', function(e) {
        const items = Array.from(searchResults.querySelectorAll('.search-result-item'));
        if (!items.length || searchResults.style.display !== 'block') return;
        if (e.key === "ArrowDown") {
            currentIdx = Math.min(items.length - 1, currentIdx + 1);
            updateActiveResult(currentIdx);
            items[currentIdx]?.focus();
            e.preventDefault();
        } else if (e.key === "ArrowUp") {
            currentIdx = Math.max(0, currentIdx - 1);
            updateActiveResult(currentIdx);
            items[currentIdx]?.focus();
            e.preventDefault();
        }
    });

    document.addEventListener('click', function(e) {
        if (!searchForm.contains(e.target)) {
            searchResults.style.display = 'none';
        }
    });

    searchForm.onsubmit = function(e) {
        e.preventDefault();
        const query = searchInput.value.trim().toLowerCase();
        const result = allItems.find(item => item.name.toLowerCase().includes(query));
        if (result) {
            window.location.href = result.url;
        } else {
            searchResults.innerHTML = '<div class="search-result-item" tabindex="0">No results found</div>';
            searchResults.style.display = 'block';
        }
    };
});