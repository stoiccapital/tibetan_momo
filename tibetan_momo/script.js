console.log('Willkommen im Tibetan Momo Restaurant!'); 

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-links a');
    const body = document.body;

    // Create overlay element
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    body.appendChild(overlay);

    // Toggle menu function
    function toggleMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    }

    // Toggle menu on hamburger click
    hamburger.addEventListener('click', toggleMenu);

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggleMenu();
        });
    });

    // Close menu when clicking outside
    overlay.addEventListener('click', toggleMenu);

    // Close menu on window resize (if open)
    window.addEventListener('resize', () => {
        if (navMenu.classList.contains('active')) {
            toggleMenu();
        }
    });
});

// Auto-update copyright year
const yearSpan = document.getElementById("year");
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// Cookie Consent Management
class CookieConsent {
    constructor() {
        this.cookieName = 'tibetan_momo_cookie_consent';
        this.cookieExpiryDays = 365;
        this.popup = document.getElementById('cookie-consent');
        this.acceptBtn = document.getElementById('accept-cookies');
        this.rejectBtn = document.getElementById('reject-cookies');
        
        this.init();
    }

    init() {
        // Check if user has already made a choice
        if (!this.hasConsent()) {
            this.showPopup();
        }
        
        // Add event listeners
        this.acceptBtn.addEventListener('click', () => this.acceptCookies());
        this.rejectBtn.addEventListener('click', () => this.rejectCookies());
    }

    hasConsent() {
        return this.getCookie(this.cookieName) !== null;
    }

    showPopup() {
        // Small delay to ensure smooth animation
        setTimeout(() => {
            this.popup.classList.add('show');
        }, 1000);
    }

    hidePopup() {
        this.popup.classList.remove('show');
    }

    acceptCookies() {
        this.setCookie(this.cookieName, 'accepted', this.cookieExpiryDays);
        this.hidePopup();
        this.loadAnalytics();
        console.log('Cookies accepted');
    }

    rejectCookies() {
        this.setCookie(this.cookieName, 'rejected', this.cookieExpiryDays);
        this.hidePopup();
        console.log('Cookies rejected');
    }

    setCookie(name, value, days) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
    }

    getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    loadAnalytics() {
        // Placeholder for analytics loading
        // You can add Google Analytics, Facebook Pixel, or other tracking scripts here
        console.log('Analytics would be loaded here');
        
        // Example: Google Analytics
        // if (typeof gtag !== 'undefined') {
        //     gtag('consent', 'update', {
        //         'analytics_storage': 'granted'
        //     });
        // }
    }
}

// Initialize cookie consent when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CookieConsent();
}); 