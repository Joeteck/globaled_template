
// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

// Mobile Menu Toggle
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

function closeMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.remove('active');
}

// Hero Animations
gsap.from(".hero-eyebrow", {
    y: 20,
    opacity: 0,
    duration: 0.8
});

gsap.from(".hero-title", {
    y: 40,
    opacity: 0,
    duration: 1,
    delay: 0.2
});

gsap.from(".hero-description", {
    y: 30,
    opacity: 0,
    duration: 0.9,
    delay: 0.4
});

document.addEventListener('DOMContentLoaded', () => {
    // 1. SCROLL ANIMATIONS
    const fadeElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        threshold: 0.1, // Trigger earlier (10% visibility)
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Once visible, stop observing to save performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        // Check if element is ALREADY in viewport on load
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            el.classList.add('visible');
        } else {
            observer.observe(el);
        }
    });

    // 2. NAVBAR SCROLL EFFECT
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = "10px 40px";
            navbar.style.background = "rgba(255, 255, 255, 0.98)";
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.padding = "20px 40px";
            navbar.style.background = "white";
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.08)';
        }
    });

    // 3. SMOOTH SCROLL
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

gsap.from(".metric", {
    y: 20,
    opacity: 0,
    stagger: 0.2,
    duration: 0.6,
    delay: 0.8
});

gsap.from(".hero-euro-visual img", {
    scale: 1.08,
    opacity: 0,
    duration: 1.5,
    ease: "power2.out"
});

// Stats Counter Animation
const stats = document.querySelectorAll('.stat-number');

stats.forEach(stat => {
    const target = +stat.getAttribute('data-target');
    
    gsap.to(stat, {
        innerText: target,
        duration: 2,
        snap: { innerText: 1 },
        scrollTrigger: {
            trigger: stat,
            start: "top 85%",
            once: true
        }
    });
});

// Stats Box Reveal
gsap.to('.stat-box', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    stagger: 0.15,
    scrollTrigger: {
        trigger: '.stats',
        start: 'top 80%',
        once: true
    }
});

// Feature Cards Reveal
gsap.to('.feature-card', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    stagger: 0.1,
    scrollTrigger: {
        trigger: '.features',
        start: 'top 75%',
        once: true
    }
});

// Footer Animation
gsap.to(".animate-footer", {
    scrollTrigger: {
        trigger: ".footer",
        start: "top 80%",
        once: true
    },
    y: 0,
    opacity: 1,
    duration: 1,
    stagger: 0.2,
    ease: "power3.out"
});

// Navbar Scroll Effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    const currentScroll = window.scrollY;
    
    if (currentScroll > 50) {
        nav.style.padding = "15px 5%";
        nav.style.boxShadow = "0 10px 30px rgba(0,0,0,0.05)";
    } else {
        nav.style.padding = "25px 5%";
        nav.style.boxShadow = "none";
    }
    
    lastScroll = currentScroll;
});

// Newsletter Form Handler
function handleNewsletter(event) {
    event.preventDefault();
    const email = event.target.querySelector('input').value;
    alert(`Thank you for subscribing! We'll send updates to ${email}`);
    event.target.reset();
}

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});


// CTA Section Animations and Form Handling
document.addEventListener('DOMContentLoaded', function() {
    initCTASection();
});

function initCTASection() {
    // Initialize animations
    initCTAAnimations();
    
    // Initialize form handling
    initContactForm();
    
    // Initialize form field animations
    initFormAnimations();
    
    // Initialize stats animation
    initStatsAnimation();
}

function initCTAAnimations() {
    const ctaSection = document.querySelector('.cta-section');
    if (!ctaSection) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate content wrapper
                const contentWrapper = document.querySelector('.cta-content-wrapper');
                if (contentWrapper) {
                    contentWrapper.classList.add('animated');
                    
                    // Stagger service items
                    const serviceItems = document.querySelectorAll('.service-item');
                    serviceItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
                
                // Animate stats bar
                const statsBar = document.querySelector('.cta-stats');
                if (statsBar) {
                    setTimeout(() => {
                        statsBar.classList.add('animated');
                    }, 300);
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    observer.observe(ctaSection);
}

function initContactForm() {
    const form = document.getElementById('consultationForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Simple validation
        if (!validateForm(data)) {
            return;
        }
        
        // Show loading state
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call (replace with actual API endpoint)
        setTimeout(() => {
            // Show success message
            showFormSuccess(form, data);
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
    
    // Add real-time validation
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
}

function validateForm(data) {
    let isValid = true;
    
    if (!data.name || data.name.trim().length < 2) {
        showFieldError('name', 'Please enter your full name');
        isValid = false;
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        showFieldError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    if (!data.interest) {
        showFieldError('interest', 'Please select an area of interest');
        isValid = false;
    }
    
    return isValid;
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validateField(field) {
    const value = field.value.trim();
    const fieldId = field.id;
    
    if (field.required && !value) {
        showFieldError(fieldId, 'This field is required');
        return false;
    }
    
    if (fieldId === 'email' && value && !isValidEmail(value)) {
        showFieldError(fieldId, 'Please enter a valid email');
        return false;
    }
    
    clearFieldError(fieldId);
    return true;
}

function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    
    // Remove existing error
    clearFieldError(fieldId);
    
    // Add error class
    field.classList.add('error');
    
    // Create error message element
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.cssText = `
        color: #ef4444;
        font-size: 0.75rem;
        margin-top: 4px;
    `;
    
    field.parentNode.appendChild(errorElement);
}

function clearFieldError(fieldId) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    
    field.classList.remove('error');
    
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

function showFormSuccess(form, data) {
    // Create success message
    const successDiv = document.createElement('div');
    successDiv.className = 'form-success';
    successDiv.innerHTML = `
        <div style="
            background: #10b981;
            color: white;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
            margin-bottom: 20px;
        ">
            <div style="font-size: 1.5rem; margin-bottom: 10px;">✓</div>
            <h3 style="margin: 0 0 8px 0;">Thank you, ${data.name}!</h3>
            <p style="margin: 0; opacity: 0.9;">
                We've received your request. Our counselor will contact you within 24 hours.
            </p>
        </div>
    `;
    
    // Replace form with success message
    form.style.display = 'none';
    form.parentNode.insertBefore(successDiv, form);
    
    // Send data to analytics/CRM (example)
    sendToAnalytics(data);
}

function sendToAnalytics(data) {
    // Replace with your analytics tracking code
    console.log('Form submitted:', data);
    
    // Example: Google Analytics event
    if (typeof gtag !== 'undefined') {
        gtag('event', 'consultation_request', {
            'event_category': 'Lead Generation',
            'event_label': data.interest
        });
    }
}

function initFormAnimations() {
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach((group, index) => {
        group.style.opacity = '0';
        group.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            group.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            group.style.opacity = '1';
            group.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

function initStatsAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.textContent.replace('+', '').replace('%', ''));
                    animateCounter(stat, target);
                });
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    const statsBar = document.querySelector('.cta-stats');
    if (statsBar) observer.observe(statsBar);
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 60;
    const suffix = element.textContent.includes('+') ? '+' : 
                    element.textContent.includes('%') ? '%' : '';
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + suffix;
    }, 30);
}

// Add error styles to CSS
const errorStyles = `
    .form-group input.error,
    .form-group select.error,
    .form-group textarea.error {
        border-color: #ef4444;
        background: #fef2f2;
    }
    
    .form-group input.error:focus,
    .form-group select.error:focus,
    .form-group textarea.error:focus {
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }
`;

// Inject error styles
const styleSheet = document.createElement('style');
styleSheet.textContent = errorStyles;
document.head.appendChild(styleSheet);




const form = document.getElementById('consultationForm');
const result = document.getElementById('result');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);
    
    result.innerHTML = "Please wait...";
    result.style.color = "var(--brand-primary)";

    fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                access_key: "YOUR_ACCESS_KEY_HERE", // Get one at web3forms.com
                name: object.name,
                email: object.email,
                subject: "New Study Abroad Consultation Request",
            })
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                result.innerHTML = "Success! We will contact you shortly.";
                result.style.color = "var(--success)";
                form.reset();
            } else {
                console.log(response);
                result.innerHTML = json.message;
                result.style.color = "var(--error)";
            }
        })
        .catch(error => {
            console.log(error);
            result.innerHTML = "Something went wrong!";
            result.style.color = "var(--error)";
        });
});


document.addEventListener('DOMContentLoaded', function() {
    const swiper = new Swiper('.countrySwiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        grabCursor: true,
        
        // --- ADDED AUTOPLAY LOGIC ---
        autoplay: {
            delay: 3000, // Slides every 3 seconds
            disableOnInteraction: false, // Keeps sliding after user interaction
            pauseOnMouseEnter: true, // Optional: pauses when user hovers
        },
        // ----------------------------

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1400: { slidesPerView: 4 } // Added for larger screens
        }
    });
});