function initCarousel() {
  const carouselContainer = document.querySelector('.carousel');
  const carousel = document.querySelector('.carousel__inner');
  const prev = carouselContainer.querySelector('.carousel__arrow_left');
  const next = carouselContainer.querySelector('.carousel__arrow_right');
  const totalSlides = carousel.querySelectorAll('.carousel__slide').length;
  const slideWidth = carousel.querySelector('.carousel__slide').offsetWidth;
  const totalWidth = slideWidth * totalSlides;

  let currentOffset = 0;

  // prev.hidden = true;
  prev.style.display = 'none';

  const moveCarousel = function() {
    carousel.style.transform = `translateX(${currentOffset}px)`;

    if (currentOffset) {
      prev.style.display = '';
    } else {
      prev.style.display = 'none';
    }

    if (Math.abs(currentOffset) >= (totalWidth - slideWidth)) {
      next.style.display = 'none';
    } else {
      next.style.display = '';
    }
  };

  prev.addEventListener('click', () => {
    currentOffset += slideWidth;
    moveCarousel();
  });

  next.addEventListener('click', () => {
    currentOffset -= slideWidth;
    moveCarousel();
  });
}
