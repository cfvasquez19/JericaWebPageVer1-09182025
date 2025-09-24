document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navLinks = document.getElementById('navLinks');
    
    if (hamburgerBtn && navLinks) {
        hamburgerBtn.addEventListener('click', function() {
            hamburgerBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a navigation link
        navLinks.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                hamburgerBtn.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburgerBtn.contains(e.target) && !navLinks.contains(e.target)) {
                hamburgerBtn.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Don't prevent default - let Formspree handle the submission
            // Show immediate feedback to user
            const formResponse = document.getElementById('formResponse');
            if (formResponse) {
                formResponse.textContent = 'Thank you for contacting us! We will get back to you soon.';
            }
            
            // Let the form submit naturally to Formspree
            // The form will redirect or show Formspree's confirmation page
        });
    }

    // Expand image to fullscreen on click
    document.querySelectorAll('.expandable').forEach(function(img) {
        img.addEventListener('click', function() {
            if (!img.classList.contains('img-fullscreen')) {
                img.classList.add('img-fullscreen');
                img.style.zIndex = '9999';
                img.style.position = 'fixed';
                img.style.top = '0';
                img.style.left = '0';
                img.style.width = '100vw';
                img.style.height = '100vh';
                img.style.objectFit = 'contain';
                img.style.background = 'rgba(0,0,0,0.85)';
            } else {
                img.classList.remove('img-fullscreen');
                img.removeAttribute('style');
            }
        });
    });

    // Gallery slider functionality with auto-play
    const sliderWindow = document.querySelector('.slider-window');
    const sliderImgs = document.querySelectorAll('.slider-img');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    let currentIndex = 0;
    let autoPlayInterval;

    function showSlide(index) {
        if (!sliderWindow) return;
        if (index < 0) index = sliderImgs.length - 1;
        if (index >= sliderImgs.length) index = 0;
        sliderWindow.style.transform = `translateX(-${index * 100}%)`;
        currentIndex = index;
    }

    function startAutoPlay() {
        autoPlayInterval = setInterval(function() {
            showSlide(currentIndex + 1);
        }, 6000);
    }
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    if (prevBtn && nextBtn && sliderImgs.length) {
        prevBtn.addEventListener('click', function() {
            showSlide(currentIndex - 1);
            stopAutoPlay();
            startAutoPlay();
        });
        nextBtn.addEventListener('click', function() {
            showSlide(currentIndex + 1);
            stopAutoPlay();
            startAutoPlay();
        });
        showSlide(0);
        startAutoPlay();
    }

    // Header image expansion functionality (25% screen size)
    const headerImageElement = document.querySelector('.header-img');
    if (headerImageElement) {
        // Create backdrop element
        const backdrop = document.createElement('div');
        backdrop.className = 'header-img-backdrop';
        document.body.appendChild(backdrop);
        
        // Handle header image click
        headerImageElement.addEventListener('click', function(e) {
            e.preventDefault();
            if (headerImageElement.classList.contains('header-img-expanded')) {
                // Collapse image
                headerImageElement.classList.remove('header-img-expanded');
                backdrop.classList.remove('active');
                document.body.style.overflow = '';
            } else {
                // Expand image to 25% screen size
                headerImageElement.classList.add('header-img-expanded');
                backdrop.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
        
        // Handle backdrop click to close
        backdrop.addEventListener('click', function() {
            headerImageElement.classList.remove('header-img-expanded');
            backdrop.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        // Handle ESC key to close
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && headerImageElement.classList.contains('header-img-expanded')) {
                headerImageElement.classList.remove('header-img-expanded');
                backdrop.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Gallery Fullscreen Modal Navigation
    let currentModalIndex = 0;
    const galleryImages = Array.from(document.querySelectorAll('.slider-img'));
    const fullscreenModal = document.getElementById('fullscreen-modal');
    const fullscreenImg = document.getElementById('fullscreen-img');
    const closeModalBtn = document.getElementById('closeModal');
    const modalPrevBtn = document.getElementById('modalPrev');
    const modalNextBtn = document.getElementById('modalNext');

    function openFullscreenModal(index) {
        if (!fullscreenModal || !fullscreenImg || !galleryImages[index]) return;
        currentModalIndex = index;
        fullscreenImg.src = galleryImages[index].src;
        fullscreenImg.alt = galleryImages[index].alt || 'Gallery Image';
        fullscreenModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
    
    function closeFullscreenModal() {
        if (!fullscreenModal) return;
        fullscreenModal.style.display = 'none';
        document.body.style.overflow = '';
    }
    
    function showPrevModalImg() {
        if (galleryImages.length === 0) return;
        currentModalIndex = (currentModalIndex - 1 + galleryImages.length) % galleryImages.length;
        if (fullscreenImg && galleryImages[currentModalIndex]) {
            fullscreenImg.src = galleryImages[currentModalIndex].src;
            fullscreenImg.alt = galleryImages[currentModalIndex].alt || 'Gallery Image';
        }
    }
    
    function showNextModalImg() {
        if (galleryImages.length === 0) return;
        currentModalIndex = (currentModalIndex + 1) % galleryImages.length;
        if (fullscreenImg && galleryImages[currentModalIndex]) {
            fullscreenImg.src = galleryImages[currentModalIndex].src;
            fullscreenImg.alt = galleryImages[currentModalIndex].alt || 'Gallery Image';
        }
    }
    
    // Add event listeners only if elements exist
    if (galleryImages.length && fullscreenModal && fullscreenImg) {
        galleryImages.forEach((img, i) => {
            img.addEventListener('click', () => openFullscreenModal(i));
        });
    }
    
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeFullscreenModal);
    }
    
    if (modalPrevBtn) {
        modalPrevBtn.addEventListener('click', showPrevModalImg);
    }
    
    if (modalNextBtn) {
        modalNextBtn.addEventListener('click', showNextModalImg);
    }
    
    if (fullscreenModal) {
        fullscreenModal.addEventListener('click', function(e) {
            if (e.target === fullscreenModal) closeFullscreenModal();
        });
        
        // Add keyboard support
        document.addEventListener('keydown', function(e) {
            if (fullscreenModal.style.display === 'flex') {
                switch(e.key) {
                    case 'Escape':
                        closeFullscreenModal();
                        break;
                    case 'ArrowLeft':
                        showPrevModalImg();
                        break;
                    case 'ArrowRight':
                        showNextModalImg();
                        break;
                }
            }
        });
    }
});
