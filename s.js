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
    const fabOptions = document.getElementById('fab-options');
    if (fabOptions.style.display === 'block') {
        fabOptions.style.display = 'none';
    } else {
        fabOptions.style.display = 'block';
    }
}

// Close FAB options when clicking outside
window.addEventListener('click', function (event) {
    const fab = document.querySelector('.fab');
    const fabOptions = document.getElementById('fab-options');
    if (!fab.contains(event.target)) {
        fabOptions.style.display = 'none';
    }
});

// Hero section animation
window.addEventListener('DOMContentLoaded', function() {
    const heroContent = document.querySelector('.hero .animate__animated');
    heroContent.classList.add('animate__bounceInUp');
    heroContent.style.setProperty('animation-delay', '0.11s');
});