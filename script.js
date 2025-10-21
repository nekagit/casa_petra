// Newsletter Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('newsletterModal');
    const closeBtn = document.getElementById('closeModal');
    const declineBtn = document.getElementById('declineBtn');
    const form = document.getElementById('newsletterForm');
    const cookieBanner = document.querySelector('.cookie-banner');
    const cookieClose = document.querySelector('.cookie-close');
    const cookieAccept = document.querySelector('.cookie-btn.accept');
    const cookieDecline = document.querySelector('.cookie-btn.decline');

    // Show modal after a short delay (simulating page load)
    setTimeout(() => {
        modal.style.display = 'flex';
    }, 1000);

    // Close modal functionality
    function closeModal() {
        modal.style.display = 'none';
    }

    closeBtn.addEventListener('click', closeModal);
    declineBtn.addEventListener('click', closeModal);

    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const firstName = document.getElementById('firstName').value;
        const email = document.getElementById('email').value;
        
        if (firstName && email) {
            // Simulate form submission
            alert(`Vielen Dank ${firstName}! Du erhältst eine Bestätigung an ${email}. Dein 15% Rabattcode wird dir per E-Mail zugesendet.`);
            closeModal();
            
            // Reset form
            form.reset();
        }
    });

    // Cookie banner functionality
    function hideCookieBanner() {
        cookieBanner.style.display = 'none';
    }

    cookieClose.addEventListener('click', hideCookieBanner);
    cookieAccept.addEventListener('click', function() {
        alert('Cookies wurden akzeptiert!');
        hideCookieBanner();
    });
    cookieDecline.addEventListener('click', function() {
        alert('Cookies wurden abgelehnt. Einige Funktionen der Website sind möglicherweise eingeschränkt.');
        hideCookieBanner();
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('.main-nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // Add smooth scrolling behavior here if needed
            console.log('Navigation clicked:', this.textContent);
        });
    });

    // Header icon functionality
    document.querySelector('.search-btn').addEventListener('click', function() {
        alert('Suchfunktion wird geöffnet...');
    });

    document.querySelector('.user-btn').addEventListener('click', function() {
        alert('Benutzerbereich wird geöffnet...');
    });

    document.querySelector('.cart-btn').addEventListener('click', function() {
        alert('Warenkorb wird geöffnet...');
    });

    // Add some interactive animations
    const jewelryItems = document.querySelectorAll('.jewelry-item');
    jewelryItems.forEach((item, index) => {
        // Add subtle floating animation
        item.style.animation = `float ${3 + index * 0.5}s ease-in-out infinite`;
    });

    // Add CSS for floating animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
        
        .jewelry-item {
            animation-delay: ${Math.random() * 2}s;
        }
    `;
    document.head.appendChild(style);

    // Add hover effects to navigation items
    const navItems = document.querySelectorAll('.main-nav a');
    navItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add click effect to CTA button
    const ctaButton = document.querySelector('.cta-button');
    ctaButton.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });

    // Keyboard navigation for modal
    document.addEventListener('keydown', function(e) {
        if (modal.style.display === 'flex') {
            if (e.key === 'Escape') {
                closeModal();
            }
        }
    });

    // Form validation
    const emailInput = document.getElementById('email');
    const firstNameInput = document.getElementById('firstName');

    emailInput.addEventListener('blur', function() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (this.value && !emailRegex.test(this.value)) {
            this.style.borderColor = '#ff6b6b';
            this.style.boxShadow = '0 0 5px rgba(255, 107, 107, 0.3)';
        } else {
            this.style.borderColor = '#ddd';
            this.style.boxShadow = 'none';
        }
    });

    firstNameInput.addEventListener('blur', function() {
        if (this.value && this.value.length < 2) {
            this.style.borderColor = '#ff6b6b';
            this.style.boxShadow = '0 0 5px rgba(255, 107, 107, 0.3)';
        } else {
            this.style.borderColor = '#ddd';
            this.style.boxShadow = 'none';
        }
    });

    // Reset input styles on focus
    [emailInput, firstNameInput].forEach(input => {
        input.addEventListener('focus', function() {
            this.style.borderColor = '#d4c4a8';
            this.style.boxShadow = '0 0 5px rgba(212, 196, 168, 0.3)';
        });
    });
});
