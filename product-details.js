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

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');
const product = products[productId];

if (product) {
    document.getElementById('product-name').textContent = product.name;
    document.getElementById('product-image').src = product.image;
    document.getElementById('product-image').alt = product.name;
    document.getElementById('product-brief').textContent = product.brief;
    document.getElementById('product-use').textContent = product.use;

    const sizeSelect = document.getElementById('size-select');
    Object.keys(product.sizes).forEach(size => {
        const option = document.createElement('option');
        option.value = size;
        option.textContent = size;
        sizeSelect.appendChild(option);
    });

    document.getElementById('product-price').textContent = product.sizes[sizeSelect.value];

    sizeSelect.addEventListener('change', function() {
        document.getElementById('product-price').textContent = product.sizes[this.value];
    });
} else {
    document.querySelector('.product-detail-card').innerHTML = "<h2>Product not found.</h2>";
}

// Suggestions logic
const suggestionsList = document.getElementById('suggestions-list');
if (suggestionsList) {
    Object.entries(products).forEach(([id, prod]) => {
        if (id !== productId) {
            const card = document.createElement('div');
            card.className = 'suggestion-card';
            card.innerHTML = `
                <img src="${prod.image}" alt="${prod.name}">
                <h4>${prod.name}</h4>
                <p>${prod.brief}</p>
                <button onclick="location.href='product-details.html?id=${id}'">View</button>
            `;
            suggestionsList.appendChild(card);
        }
    });
}