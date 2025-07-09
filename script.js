document.addEventListener('DOMContentLoaded', function () {
  let slideIndex = 0;
  const slides = document.getElementsByClassName("slides");
  const carousel = document.querySelector('.carousel');
  let autoPlayInterval = null;

  function showSlides(n) {
    slideIndex = (n + slides.length) % slides.length;
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slides[slideIndex].style.display = "block";
  }

  function nextSlide() {
    showSlides(slideIndex + 1);
  }

  function prevSlide() {
    showSlides(slideIndex - 1);
  }

  function startAutoPlay() {
    stopAutoPlay();
    autoPlayInterval = setInterval(nextSlide, 4000);
  }

  function stopAutoPlay() {
    if (autoPlayInterval) clearInterval(autoPlayInterval);
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === "ArrowLeft") { prevSlide(); stopAutoPlay(); }
    if (e.key === "ArrowRight") { nextSlide(); stopAutoPlay(); }
  });

  // Touch/swipe support
  let startX = 0;
  if (carousel) {
    carousel.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    });
    carousel.addEventListener('touchend', (e) => {
      let endX = e.changedTouches[0].clientX;
      if (endX - startX > 50) { prevSlide(); stopAutoPlay(); }
      if (startX - endX > 50) { nextSlide(); stopAutoPlay(); }
    });
  }

  // Button navigation
  document.querySelector('.prev')?.addEventListener('click', () => {
    prevSlide();
    stopAutoPlay();
  });

  document.querySelector('.next')?.addEventListener('click', () => {
    nextSlide();
    stopAutoPlay();
  });

  // Navbar toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  navToggle?.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !isExpanded);
  });

  // Init carousel
  showSlides(slideIndex);
  startAutoPlay();
});
