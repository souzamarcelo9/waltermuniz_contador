document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.carousel-track');
    const items = document.querySelectorAll('.gallery-item');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const thumbnailsContainer = document.querySelector('.thumbnails');
    const currentSlideEl = document.getElementById('current-slide');
    const totalSlidesEl = document.getElementById('total-slides');

    let currentIndex = 0;
    const totalItems = items.length;

    // Set total slides count
    totalSlidesEl.textContent = totalItems;

    // Create thumbnails
    items.forEach((item, index) => {
        const imgSrc = item.querySelector('img').src;
        const thumbnail = document.createElement('div');
        thumbnail.className = `thumbnail ${index === 0 ? 'active' : ''}`;
        thumbnail.innerHTML = `<img src="${imgSrc}" alt="Thumbnail ${index + 1}">`;
        thumbnail.addEventListener('click', () => goToSlide(index));
        thumbnailsContainer.appendChild(thumbnail);
    });

    const thumbnails = document.querySelectorAll('.thumbnail');

    // Update carousel position
    function updateCarousel() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        currentSlideEl.textContent = currentIndex + 1;

        // Update active states
        items.forEach((item, index) => {
            item.classList.toggle('active', index === currentIndex);
        });

        thumbnails.forEach((thumb, index) => {
            thumb.classList.toggle('active', index === currentIndex);
        });

        items.forEach(item => {
            const img = item.querySelector('img');
            img.onload = function() {
                const ratio = img.naturalHeight / img.naturalWidth;
                if (ratio > 1.5) { // If image is significantly taller than wide
                    item.style.alignItems = 'flex-start'; // Align to top
                    img.style.objectFit = 'contain'; // Show full image
                }
            };
        });
    }

    function goToSlide(index) {
        currentIndex = (index + totalItems) % totalItems;
        updateCarousel();
    }

    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    function prevSlide() {
        goToSlide(currentIndex - 1);
    }

    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Auto-advance (optional)
    let autoSlide = setInterval(nextSlide, 5000);

    // Pause on hover
    track.addEventListener('mouseenter', () => clearInterval(autoSlide));
    track.addEventListener('mouseleave', () => {
        autoSlide = setInterval(nextSlide, 5000);
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === 'ArrowLeft') prevSlide();
    });
});