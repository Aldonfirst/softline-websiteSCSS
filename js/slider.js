const prevButton = document.querySelector('.gallery__prev');
const nextButton = document.querySelector('.gallery__next');
const slider = document.querySelector('.gallery__slider');
const slideWidth = slider.offsetWidth;

prevButton.addEventListener('click', () => {
  slider.scrollBy({
    left: -slideWidth,
    behavior: 'smooth'
  });
});

nextButton.addEventListener('click', () => {
  if (slider.scrollLeft + slider.clientWidth === slider.scrollWidth) {
    slider.scrollTo({
      left: 0,
      behavior: 'smooth'
    });
  } else {
    slider.scrollBy({
      left: slideWidth,
      behavior: 'smooth'
    });
  }
});
