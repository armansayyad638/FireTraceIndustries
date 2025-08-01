// --- Product Data ---
const products = {
    "abc": {
        name: "ABC Dry Powder",
        image: "abc.jpeg",
        brief: "Multipurpose for home, office, and vehicles.",
        use: "Home, office, vehicles",
        sizes: { "2kg": 1000, "4kg": 1500, "6kg": 2000, "12kg": 4000 }
    },
    "co2": {
        name: "CO2 Extinguisher",
        image: "co2.jpg",
        brief: "Best for electrical fires and sensitive equipment.",
        use: "Electrical panels, server rooms",
        sizes: { "2kg": 1200, "5kg": 2500 }
    },
    "foam": {
        name: "Foam Extinguisher",
        image: "Foam-Fire-Extinguishers.png",
        brief: "Ideal for flammable liquids and solid combustibles.",
        use: "Factories, warehouses",
        sizes: { "6L": 1800, "9L": 2500 }
    },
    "water": {
        name: "Water Mist Extinguisher",
        image: "water-fire-extinguisher.jpg",
        brief: "Eco-friendly, safe for most fires including electrical.",
        use: "Offices, homes",
        sizes: { "6L": 1700, "9L": 2200 }
    },
    "automatic-modular": {
        name: "Automatic Modular Extinguisher",
        image: "automatic-modular.jpg",
        brief: "Ceiling-mounted, automatic activation for server rooms and kitchens.",
        use: "Server rooms, kitchens",
        sizes: { "5kg": 3500, "10kg": 6000 }
    },
    "fire-blanket": {
        name: "Kitchen Fire Blanket",
        image: "fire-blanket.jpg",
        brief: "Essential for home and restaurant kitchens.",
        use: "Kitchens, restaurants",
        sizes: { "1m x 1m": 800, "1.2m x 1.8m": 1200 }
    },
    "fireball": {
        name: "Fire Ball Extinguisher",
        image: "fireball.jpg",
        brief: "Self-activating, easy to use, ideal for vehicles and homes.",
        use: "Vehicles, homes",
        sizes: { "1.3kg": 900 }
    },
    "trolley": {
        name: "Trolley Mounted Extinguisher",
        image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=400&q=80",
        brief: "High-capacity for industrial and warehouse use.",
        use: "Industrial, warehouse",
        sizes: { "25kg": 8000, "50kg": 15000 }
    }
};

// --- Get Product ID from URL ---
function getProductId() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

// --- Render Product Details ---
function renderProductDetails() {
    const id = getProductId();
    const product = products[id];
    if (!product) return;

    document.getElementById('product-image').src = product.image;
    document.getElementById('product-image').alt = product.name;
    document.getElementById('product-name').textContent = product.name;
    document.getElementById('product-brief').textContent = product.brief;
    document.getElementById('product-use').textContent = product.use;

    // Populate sizes
    const sizeSelect = document.getElementById('size-select');
    sizeSelect.innerHTML = '';
    Object.entries(product.sizes).forEach(([size, price]) => {
        const option = document.createElement('option');
        option.value = size;
        option.textContent = `${size} - ₹${price}`;
        sizeSelect.appendChild(option);
    });

    // Set initial price
    document.getElementById('product-price').textContent = product.sizes[sizeSelect.value];

    // Update price on size change
    sizeSelect.addEventListener('change', function() {
        document.getElementById('product-price').textContent = product.sizes[this.value];
    });

    // Buy Now button
    document.getElementById('buy-now-btn').onclick = function() {
        const selectedSize = sizeSelect.value;
        const price = product.sizes[selectedSize];
        addToCart(id, product.name + " (" + selectedSize + ")", price);
        alert('Added to cart!');
        if (window.updateCartCount) window.updateCartCount();
    };
}

// --- Cart Logic (shared with s.js) ---
function addToCart(id, name, price) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    // Check if already in cart
    const idx = cart.findIndex(item => item.id === id && item.name === name);
    if (idx > -1) {
        cart[idx].qty += 1;
    } else {
        cart.push({ id, name, price, qty: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
}

// --- Hide Cart Button if Cart is Empty ---
function hideCartIfEmpty() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const cartHover = document.getElementById('cart-hover');
    if (cartHover) {
        if (cart.length === 0) {
            cartHover.style.display = 'none';
        } else {
            cartHover.style.display = '';
        }
    }
}

// --- On Page Load ---
window.addEventListener('DOMContentLoaded', function() {
    renderProductDetails();
    hideCartIfEmpty();
    if (window.updateCartCount) window.updateCartCount();
});