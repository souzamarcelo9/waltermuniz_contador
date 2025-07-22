document.addEventListener('DOMContentLoaded', function() {
    // ===== Carousel Functionality =====
    const slides = document.querySelectorAll('.left-panel .slide');
    let currentSlide = 0;
    // Update copyright year automatically
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }
    
    if (slides.length > 0) {
        setInterval(nextSlide, 3000);
    }

    // ===== Header Scroll Effect =====
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        header.classList.toggle('scrolled', window.scrollY > 50);
    });

    // ===== Service Card Animations =====
    const serviceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.service-card').forEach(card => {
        card.style.animationPlayState = 'paused';
        serviceObserver.observe(card);
    });

    // ===== Title Animations =====
    const titleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, { threshold: 0.7 });

    document.querySelectorAll('.section-title').forEach(title => {
        titleObserver.observe(title);
    });

    // ===== Testimonial Carousel =====
    let testimonialSlideIndex = 0;
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    
    function showTestimonialSlide(n) {
        testimonialSlides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonialSlideIndex = (n + testimonialSlides.length) % testimonialSlides.length;
        testimonialSlides[testimonialSlideIndex].classList.add('active');
        dots[testimonialSlideIndex].classList.add('active');
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showTestimonialSlide(index);
        });
    });
    
    // Auto-rotate every 8 seconds
    setInterval(() => {
        showTestimonialSlide(testimonialSlideIndex + 1);
    }, 8000);

    
    // Lightbox functionality
document.querySelectorAll('.service-image img').forEach(img => {
    img.addEventListener('click', function() {
        const lightbox = document.getElementById('serviceLightbox');
        const lightboxImg = document.getElementById('lightboxImage');
        const caption = document.querySelector('.caption');
        
        lightbox.style.display = "block";
        lightboxImg.src = this.src;
        caption.textContent = this.alt;
    });
});

document.querySelector('.close-btn').addEventListener('click', function() {
    document.getElementById('serviceLightbox').style.display = "none";
});

    document.querySelector('.close-btn').addEventListener('click', function() {
        document.getElementById('serviceLightbox').style.display = "none";
    });

    // Close lightbox when clicking outside image
    window.addEventListener('click', function(event) {
        const lightbox = document.getElementById('serviceLightbox');
        if (event.target === lightbox) {
            lightbox.style.display = "none";
        }
    });

    

    document.querySelectorAll('.skills-container').forEach(container => {
        progressObserver.observe(container);
    });
});

// Animate progress bars when scrolled to
const progressBars = document.querySelectorAll('.progress');

function animateProgressBars() {
    progressBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width + '%';
    });
}

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateProgressBars();
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.skills-container').forEach(container => {
    skillsObserver.observe(container);
});

// Animate titles when they come into view
const titleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        }
    });
}, { threshold: 0.1 });

// Initialize all section titles
document.querySelectorAll('.section-title').forEach(title => {
    title.style.animationPlayState = 'paused';
    titleObserver.observe(title);
});

// New navigation highlighting functionality
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');

function updateActiveLink() {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= (sectionTop - 300)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);
updateActiveLink(); // Initialize on load

// WhatsApp Online Status Check (simulated)
function updateWhatsAppStatus() {
    const statusIndicator = document.querySelector('.status-indicator');
    // In a real implementation, you would check actual WhatsApp API status
    // This simulates online status (green = online, gray = offline)
    const isOnline = true; // Change to false to simulate offline

    if (isOnline) {
        statusIndicator.style.backgroundColor = '#25D366';
        statusIndicator.setAttribute('title', 'Online agora');
    } else {
        statusIndicator.style.backgroundColor = '#999';
        statusIndicator.setAttribute('title', 'Offline - Mensagem será respondida em breve');
    }
}

// Call on load and every 5 minutes
updateWhatsAppStatus();
setInterval(updateWhatsAppStatus, 300000);