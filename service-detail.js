const services = [
    {
        id: "dlp",
        name: "DLP Suppression System",
        image: "dlp.png",
        desc: "A safety mechanism designed to extinguish, control, or prevent the spread of fire. These systems are crucial for protecting lives, property, and assets in various settings, including commercial buildings, industrial facilities, and even vehicles.",
        price: 25000
    },
    {
        id: "gas",
        name: "Gas Fire Suppression System",
        image: "gas.jpg",
        desc: "Utilizes inert gases to extinguish fires without damaging sensitive equipment. Ideal for server rooms and data centers.",
        price: 32000
    },
    {
        id: "kitchen",
        name: "Kitchen Fire Suppression System",
        image: "KitchenFire.jpg",
        desc: "Specialized systems designed to extinguish fires in commercial kitchens, protecting both people and property.",
        price: 18000
    },
    {
        id: "hydrant",
        name: "Fire Hydrant System",
        image: "firehydrant.jpg",
        desc: "A system of pipe work connected directly to the water supply main to provide water to every hydrant outlet and is intended to provide water for the firemen to fight a fire. The water is discharged into the fire engine form which it is then pumped and sprayed over fire.",
        price: 40000
    },
    {
        id: "alarm",
        name: "Fire Alarm System",
        image: "fire-alarm-system-removebg.png",
        desc: "A unit made of several devices, which uses visual and audio signaling to warn people about a possible fire, smoke, or carbon monoxide occurrence in the area of coverage. Fire alarms are usually set in fire alarm systems to provide zonal coverage for residences and commercial buildings.",
        price: 12000
    },
    {
        id: "suppression",
        name: "Fire Suppression System",
        image: "sprinkle.jpg",
        desc: "A safety mechanism designed to extinguish, control, or prevent the spread of fire. It uses various agents like gases, chemicals, or foams to suppress the fire, often activated by heat or smoke detectors. These systems are crucial for protecting property, assets, and lives in various settings.",
        price: 35000
    },
    {
        id: "engineering",
        name: "Engineering & Maintenance",
        image: "https://cdn-icons-png.flaticon.com/512/1828/1828919.png",
        desc: "Supply, design, engineering, installation, and maintenance of all fire safety systems.",
        price: 15000
    }
];

// Get service id from URL
function getServiceId() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

function renderServiceDetail() {
    const id = getServiceId();
    const service = services.find(s => s.id === id);
    const container = document.getElementById('service-detail-content');
    if (!service) {
        container.innerHTML = `<h2 style="color:#b31217;">Service not found</h2>
        <p>The service you are looking for does not exist.</p>
        <a href="ourservice.html" style="color:#fff;background:#b31217;padding:10px 24px;border-radius:20px;text-decoration:none;">Back to Services</a>`;
        document.getElementById('suggestions-container').style.display = 'none';
        return;
    }
    container.innerHTML = `
        <div class="service-detail-image">
            <img src="${service.image}" alt="${service.name}">
        </div>
        <div class="service-detail-info">
            <h2>${service.name}</h2>
            <p>${service.desc}</p>
            <div class="service-price-highlight">Price: ₹${service.price.toLocaleString()}</div>
            <button class="buy-btn" id="buy-now-btn" aria-label="Buy ${service.name}" title="Buy ${service.name}">Buy Now</button>
            <br>
            <a href="ourservice.html" style="color:#fff;background:#b31217;padding:10px 24px;border-radius:20px;text-decoration:none;" aria-label="Back to Services" title="Back to Services">Back to Services</a>
        </div>
    `;

    // Suggestions (other services)
    const suggestions = services.filter(s => s.id !== id).slice(0, 4);
    let suggestionsHTML = `<h3>Other Services You May Like</h3><div class="suggestions-list">`;
    suggestions.forEach(s => {
        suggestionsHTML += `
            <div class="suggestion-card" tabindex="0" role="button" aria-label="${s.name}" onclick="location.href='service-detail.html?id=${s.id}'" style="cursor:pointer;outline:none;">
                <img src="${s.image}" alt="${s.name}">
                <h4>${s.name}</h4>
            </div>
        `;
    });
    suggestionsHTML += `</div>`;
    document.getElementById('suggestions-container').innerHTML = suggestionsHTML;

    setTimeout(() => {
        const buyBtn = document.getElementById('buy-now-btn');
        if (buyBtn) {
            buyBtn.onclick = function() {
                addServiceToCart(service);
                buyBtn.textContent = "Added!";
                setTimeout(() => { buyBtn.textContent = "Buy Now"; }, 1200);
            };
        }
        // Accessibility: suggestion cards keyboard support
        document.querySelectorAll('.suggestion-card').forEach(card => {
            card.onkeydown = function(e) {
                if (e.key === "Enter" || e.key === " ") {
                    card.click();
                }
            };
        });
    }, 0);
}

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

document.addEventListener('DOMContentLoaded', renderServiceDetail);

function updateCartHoverCount() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const count = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
    const cartCountElem = document.getElementById('cart-count');
    if (cartCountElem) cartCountElem.textContent = count;
}
document.addEventListener('DOMContentLoaded', updateCartHoverCount);

function addServiceToCart(service) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const idx = cart.findIndex(i => i.id === service.id && i.type === 'service');
    if (idx > -1) {
        cart[idx].qty += 1;
    } else {
        cart.push({
            id: service.id,
            name: service.name,
            price: service.price,
            image: service.image,
            type: 'service',
            qty: 1
        });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartHoverCount();
    // Animate cart button for feedback
    const cartBtn = document.getElementById('cart-hover');
    if (cartBtn) {
        cartBtn.style.transform = 'scale(1.15)';
        setTimeout(() => { cartBtn.style.transform = ''; }, 250);
    }
}