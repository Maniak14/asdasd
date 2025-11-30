document.addEventListener('DOMContentLoaded', function() {
  const reviewsCarousel = document.querySelector('.reviews-carousel');
  if (!reviewsCarousel) return;
  
  // Duplicate reviews for seamless loop
  const reviews = reviewsCarousel.innerHTML;
  reviewsCarousel.innerHTML = reviews + reviews;
  
  // Pause on hover
  let isPaused = false;
  reviewsCarousel.addEventListener('mouseenter', () => {
    isPaused = true;
    reviewsCarousel.style.animationPlayState = 'paused';
  });
  
  reviewsCarousel.addEventListener('mouseleave', () => {
    isPaused = false;
    reviewsCarousel.style.animationPlayState = 'running';
  });
});

