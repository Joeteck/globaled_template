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
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
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

    // Initialize Forms
    initConsultationForm();
    initNewsletterForm();
    initSwiper();
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

// CONSULTATION FORM HANDLER
function initConsultationForm() {
    const form = document.getElementById('consultationForm');
    const resultDiv = document.getElementById('formResult');
    
    if (!form) return;

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = document.getElementById('submitBtn');
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Validate form
        if (!validateConsultationForm(data)) {
            return;
        }
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending...';
        resultDiv.style.display = 'none';
        
        try {
            // Replace with your actual API endpoint
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    access_key: "YOUR_ACCESS_KEY_HERE", // Get free key at web3forms.com
                    name: data.name,
                    email: data.email,
                    subject: "New Study Abroad Consultation Request from GlobalEd",
                    from_name: "GlobalEd Contact Form"
                })
            });

            const result = await response.json();
            
            if (response.ok && result.success) {
                // Success message
                resultDiv.innerHTML = `
                    <div style="background: #10b981; color: white; padding: 20px; border-radius: 8px; text-align: center;">
                        <div style="font-size: 2rem; margin-bottom: 10px;">✓</div>
                        <h4 style="margin: 0 0 8px 0;">Thank you, ${data.name}!</h4>
                        <p style="margin: 0; opacity: 0.95; font-size: 0.95rem;">
                            We've received your request. Our counselor will contact you within 24 hours.
                        </p>
                    </div>
                `;
                resultDiv.style.display = 'block';
                form.reset();
                
                // Track conversion (Google Analytics example)
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'form_submission', {
                        'event_category': 'Lead Generation',
                        'event_label': 'Consultation Form'
                    });
                }
            } else {
                throw new Error(result.message || 'Submission failed');
            }
            
        } catch (error) {
            console.error('Form submission error:', error);
            resultDiv.innerHTML = `
                <div style="background: #ef4444; color: white; padding: 15px; border-radius: 8px;">
                    <strong>Error:</strong> Unable to send your request. Please try again or email us directly at info@globaled.com
                </div>
            `;
            resultDiv.style.display = 'block';
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Get Free Consultation →';
        }
    });
}

function validateConsultationForm(data) {
    if (!data.name || data.name.trim().length < 2) {
        alert('Please enter your full name');
        return false;
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        alert('Please enter a valid email address');
        return false;
    }
    
    if (!data.consent) {
        alert('Please agree to our privacy policy to continue');
        return false;
    }
    
    return true;
}

// NEWSLETTER FORM HANDLER
function initNewsletterForm() {
    const form = document.getElementById('newsletterForm');
    const resultDiv = document.getElementById('newsletterResult');
    
    if (!form) return;

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const email = formData.get('newsletter_email');
        
        if (!isValidEmail(email)) {
            resultDiv.style.color = '#ef4444';
            resultDiv.textContent = 'Please enter a valid email address';
            return;
        }
        
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = '...';
        
        try {
            // Replace with your newsletter API endpoint
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    access_key: "YOUR_ACCESS_KEY_HERE", // Get free key at web3forms.com
                    email: email,
                    subject: "New Newsletter Subscription - GlobalEd",
                    from_name: "GlobalEd Newsletter"
                })
            });

            const result = await response.json();
            
            if (response.ok && result.success) {
                resultDiv.style.color = '#10b981';
                resultDiv.textContent = '✓ Successfully subscribed!';
                form.reset();
            } else {
                throw new Error('Subscription failed');
            }
            
        } catch (error) {
            console.error('Newsletter error:', error);
            resultDiv.style.color = '#ef4444';
            resultDiv.textContent = 'Error subscribing. Please try again.';
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Join';
        }
    });
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// SWIPER INITIALIZATION
function initSwiper() {
    if (typeof Swiper === 'undefined') return;
    
    new Swiper('.countrySwiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        grabCursor: true,
        
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },

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
            1400: { slidesPerView: 4 }
        }
    });
}