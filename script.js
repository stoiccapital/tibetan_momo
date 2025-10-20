console.log('Willkommen im Tibetan Momo Restaurant!'); 

// Load navbar into all pages
async function loadNavbar() {
    try {
        const response = await fetch('navbar.html');
        const navbarHtml = await response.text();
        
        // Find the navbar placeholder or create one
        let navbarContainer = document.getElementById('navbar-container');
        if (!navbarContainer) {
            // If no placeholder exists, insert navbar at the beginning of body
            const body = document.body;
            const firstChild = body.firstChild;
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = navbarHtml;
            const navbar = tempDiv.firstElementChild;
            body.insertBefore(navbar, firstChild);
        } else {
            navbarContainer.innerHTML = navbarHtml;
        }
    } catch (error) {
        console.error('Error loading navbar:', error);
    }
}

// Load footer into all pages
async function loadFooter() {
    try {
        const response = await fetch('footer.html');
        const footerHtml = await response.text();
        
        // Find the footer placeholder or create one
        let footerContainer = document.getElementById('footer-container');
        if (!footerContainer) {
            // If no placeholder exists, insert footer before the closing body tag
            const body = document.body;
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = footerHtml;
            const footer = tempDiv.firstElementChild;
            body.appendChild(footer);
        } else {
            footerContainer.innerHTML = footerHtml;
        }
    } catch (error) {
        console.error('Error loading footer:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Load navbar and footer
    Promise.all([loadNavbar(), loadFooter()]).then(() => {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-links a');
        const body = document.body;

        // Create overlay element
        const overlay = document.createElement('div');
        overlay.className = 'overlay';
        body.appendChild(overlay);

        // Check if we're on mobile
        function isMobile() {
            return window.innerWidth <= 768;
        }

        // Toggle menu function (only works on mobile)
        function toggleMenu() {
            if (!isMobile()) return; // Don't toggle on desktop
            
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            overlay.classList.toggle('active');
            body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        }

        // Toggle menu on hamburger click (only on mobile)
        if (hamburger) {
            hamburger.addEventListener('click', toggleMenu);
        }

        // Close menu when clicking a link (only on mobile)
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (isMobile()) {
                    toggleMenu();
                }
            });
        });

        // Close menu when clicking outside (only on mobile)
        overlay.addEventListener('click', () => {
            if (isMobile()) {
                toggleMenu();
            }
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            if (!isMobile() && navMenu.classList.contains('active')) {
                // Close mobile menu when switching to desktop
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                overlay.classList.remove('active');
                body.style.overflow = '';
            }
        });
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

// Testimonials Carousel
class TestimonialsCarousel {
    constructor() {
        this.track = document.getElementById('testimonialsTrack');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.dotsContainer = document.getElementById('carouselDots');
        this.cards = document.querySelectorAll('.testimonial-card');
        this.currentIndex = 0;
        this.cardsPerView = 3;
        // For 11 cards showing 3 at a time: slides 0-2, 3-5, 6-8, 9-10 (4 total slides)
        this.totalSlides = Math.ceil(this.cards.length / this.cardsPerView);
        
        this.init();
    }

    init() {
        console.log(`Total cards: ${this.cards.length}, Cards per view: ${this.cardsPerView}, Total slides: ${this.totalSlides}`);
        this.createDots();
        this.updateCarousel();
        this.addEventListeners();
        this.updateButtonStates();
    }

    createDots() {
        for (let i = 0; i < this.totalSlides; i++) {
            const dot = document.createElement('button');
            dot.className = 'carousel-dot';
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => this.goToSlide(i));
            this.dotsContainer.appendChild(dot);
        }
    }

    addEventListeners() {
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Auto-play functionality (optional)
        // setInterval(() => this.nextSlide(), 5000);
    }

    nextSlide() {
        if (this.currentIndex < this.totalSlides - 1) {
            this.currentIndex++;
        } else {
            this.currentIndex = 0; // Loop back to start
        }
        this.updateCarousel();
    }

    prevSlide() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
        } else {
            this.currentIndex = this.totalSlides - 1; // Loop to end
        }
        this.updateCarousel();
    }

    goToSlide(index) {
        this.currentIndex = index;
        this.updateCarousel();
    }

    updateCarousel() {
        // Calculate the translation based on the current slide
        // Each slide moves by exactly 3 cards (100% of the visible area)
        const translateX = -this.currentIndex * 100;
        this.track.style.transform = `translateX(${translateX}%)`;
        
        this.updateDots();
        this.updateButtonStates();
    }

    updateDots() {
        const dots = this.dotsContainer.querySelectorAll('.carousel-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
    }

    updateButtonStates() {
        // Enable/disable buttons based on current position
        // For infinite loop, we don't disable buttons
        // this.prevBtn.disabled = this.currentIndex === 0;
        // this.nextBtn.disabled = this.currentIndex === this.totalSlides - 1;
    }
}

// Initialize cookie consent when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CookieConsent();
    new TestimonialsCarousel();
}); 