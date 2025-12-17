// Theme Toggle
function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    const themeIcon = document.getElementById('theme-icon');

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    // Sun for dark mode (to switch to light), Moon for light mode (to switch to dark)
    themeIcon.innerHTML = newTheme === 'dark' ? '&#9788;' : '&#9789;';
}

// Load saved theme on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const html = document.documentElement;
    const themeIcon = document.getElementById('theme-icon');

    html.setAttribute('data-theme', savedTheme);
    if (themeIcon) {
        themeIcon.innerHTML = savedTheme === 'dark' ? '&#9788;' : '&#9789;';
    }

    // Initialize counter animations
    initCounters();
});

// Animate counters
function initCounters() {
    const counters = document.querySelectorAll('.stat-number[data-target]');

    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                animateCounter(entry.target);
                entry.target.classList.add('counted');
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
    const target = parseFloat(element.getAttribute('data-target'));
    const duration = 1500;
    const steps = 60;
    const stepDuration = duration / steps;
    const increment = target / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
        step++;
        current = (target / steps) * step;

        if (step >= steps) {
            element.textContent = target % 1 !== 0 ? target.toFixed(1) : target;
            clearInterval(timer);
        } else {
            element.textContent = target % 1 !== 0 ? current.toFixed(1) : Math.floor(current);
        }
    }, stepDuration);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form handling (for contact page)
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        // Create mailto link
        const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
        const mailtoLink = `mailto:r.pabbi001@gmail.com?subject=${subject}&body=${body}`;

        // Open mail client
        window.location.href = mailtoLink;
    });
}

// Add subtle scroll animation for elements
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.featured-card, .expertise-card, .stat-card, .project-card, .publication-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
}

// Initialize scroll animations after DOM is loaded
document.addEventListener('DOMContentLoaded', initScrollAnimations);
