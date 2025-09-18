document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            document.getElementById('formResponse').textContent = 'Thank you for contacting us! We will get back to you soon.';
            contactForm.reset();
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

    // Gallery slider functionality with auto-play and fullscreen
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

    // Fullscreen feature for slider images (gallery)
    if (sliderImgs.length) {
        sliderImgs.forEach(function(img) {
            img.addEventListener('click', function() {
                if (!img.classList.contains('img-fullscreen')) {
                    // Create overlay
                    const overlay = document.createElement('div');
                    overlay.className = 'img-overlay';
                    overlay.style.position = 'fixed';
                    overlay.style.top = '0';
                    overlay.style.left = '0';
                    overlay.style.width = '100vw';
                    overlay.style.height = '100vh';
                    overlay.style.background = 'rgba(0,0,0,0.85)';
                    overlay.style.zIndex = '9998';
                    overlay.appendChild(img);
                    document.body.appendChild(overlay);
                    img.classList.add('img-fullscreen');
                    img.style.position = 'absolute';
                    img.style.top = '50%';
                    img.style.left = '50%';
                    img.style.transform = 'translate(-50%, -50%)';
                    img.style.width = '90vw';
                    img.style.height = '90vh';
                    img.style.objectFit = 'contain';
                    img.style.background = 'none';
                    img.style.margin = '0';
                    img.style.borderRadius = '0';
                    img.style.boxShadow = 'none';
                    img.style.cursor = 'pointer';
                    img.style.transition = 'none';
                    overlay.addEventListener('click', function() {
                        img.classList.remove('img-fullscreen');
                        img.removeAttribute('style');
                        document.querySelector('.slider-window').appendChild(img);
                        overlay.remove();
                    });
                }
            });
        });
    }

    // Fullscreen feature for header image
    const headerImg = document.querySelector('.header-img');
    if (headerImg) {
        headerImg.addEventListener('click', function() {
            if (!headerImg.classList.contains('img-fullscreen')) {
                const overlay = document.createElement('div');
                overlay.className = 'img-overlay';
                overlay.style.position = 'fixed';
                overlay.style.top = '0';
                overlay.style.left = '0';
                overlay.style.width = '100vw';
                overlay.style.height = '100vh';
                overlay.style.background = 'rgba(0,0,0,0.85)';
                overlay.style.zIndex = '9998';
                overlay.appendChild(headerImg);
                document.body.appendChild(overlay);
                headerImg.classList.add('img-fullscreen');
                headerImg.style.position = 'absolute';
                headerImg.style.top = '50%';
                headerImg.style.left = '50%';
                headerImg.style.transform = 'translate(-50%, -50%)';
                headerImg.style.width = '90vw';
                headerImg.style.height = '90vh';
                headerImg.style.objectFit = 'contain';
                headerImg.style.background = 'none';
                headerImg.style.margin = '0';
                headerImg.style.borderRadius = '0';
                headerImg.style.boxShadow = 'none';
                headerImg.style.cursor = 'pointer';
                headerImg.style.transition = 'none';
                overlay.addEventListener('click', function() {
                    headerImg.classList.remove('img-fullscreen');
                    headerImg.removeAttribute('style');
                    document.querySelector('header').insertBefore(headerImg, document.querySelector('header').firstChild);
                    overlay.remove();
                });
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
        currentModalIndex = index;
        fullscreenImg.src = galleryImages[index].src;
        fullscreenModal.style.display = 'flex';
    }
    function closeFullscreenModal() {
        fullscreenModal.style.display = 'none';
    }
    function showPrevModalImg() {
        currentModalIndex = (currentModalIndex - 1 + galleryImages.length) % galleryImages.length;
        fullscreenImg.src = galleryImages[currentModalIndex].src;
    }
    function showNextModalImg() {
        currentModalIndex = (currentModalIndex + 1) % galleryImages.length;
        fullscreenImg.src = galleryImages[currentModalIndex].src;
    }
    galleryImages.forEach((img, i) => {
        img.addEventListener('click', () => openFullscreenModal(i));
    });
    closeModalBtn.addEventListener('click', closeFullscreenModal);
    modalPrevBtn.addEventListener('click', showPrevModalImg);
    modalNextBtn.addEventListener('click', showNextModalImg);
    fullscreenModal.addEventListener('click', function(e) {
        if (e.target === fullscreenModal) closeFullscreenModal();
    });
});
