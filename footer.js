document.addEventListener('DOMContentLoaded', function() {
    const footerHTML = `
    <footer>
        <div class="container">
            <div class="footer-contacts" style="margin-bottom:10px;">
                <a href="https://www.instagram.com/firetraceindia" target="_blank" style="margin-right:15px; color:#fff; text-decoration:none; display:inline-block;" aria-label="Instagram" title="Instagram">
                    <img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/instagram.svg" alt="Instagram" style="width:20px;vertical-align:middle;margin-right:5px;filter:invert(1);"> Instagram
                </a>
                <a href="https://www.facebook.com/firetraceindia" target="_blank" style="margin-right:15px; color:#fff; text-decoration:none; display:inline-block;" aria-label="Facebook" title="Facebook">
                    <img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/facebook.svg" alt="Facebook" style="width:20px;vertical-align:middle;margin-right:5px;filter:invert(1);"> Facebook
                </a>
                <a href="https://wa.me/919967535401" target="_blank" style="margin-right:15px; color:#fff; text-decoration:none; display:inline-block;" aria-label="WhatsApp" title="WhatsApp">
                    <img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/whatsapp.svg" alt="WhatsApp" style="width:20px;vertical-align:middle;margin-right:5px;filter:invert(1);"> WhatsApp
                </a>
                <span style="color:#fff; display:inline-block;" aria-label="Phone" title="Phone">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" style="vertical-align:middle;margin-right:5px;fill:#fff;display:inline;" viewBox="0 0 24 24"><path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.07 21 3 13.93 3 5a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.24 1.01l-2.2 2.2z"/></svg>
                    +91-9967535401
                </span>
            </div>
            <p>&copy; 2025 Fire Trace. All rights reserved.</p>
        </div>
    </footer>
    <div class="fab" onclick="toggleFabOptions()" tabindex="0" aria-label="Contact options" title="Contact options">
        <img src="https://cdn-icons-png.flaticon.com/512/134/134914.png" alt="Message Icon">
        <div id="fab-options" class="fab-options">
            <a href="tel:+919967535401" aria-label="Phone" title="Phone">📞 Phone</a>
            <a href="https://wa.me/919967535401" target="_blank" aria-label="WhatsApp" title="WhatsApp">💬 WhatsApp</a>
            <a href="mailto:info@firetrace.com" aria-label="Email" title="Email">📧 Email</a>
        </div>
    </div>
    `;
    document.body.insertAdjacentHTML('beforeend', footerHTML);

    // Keyboard accessibility for FAB
    const fab = document.querySelector('.fab');
    if (fab) {
        fab.onkeydown = function(e) {
            if (e.key === "Enter" || e.key === " ") {
                toggleFabOptions();
            }
        };
    }
});