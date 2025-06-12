function initCarousel() {
  // ваш код...
  const carouselInner = document.querySelector('.carousel__inner');
  const arrowRight = document.querySelector('.carousel__arrow_right');
  const arrowLeft = document.querySelector('.carousel__arrow_left');
  const slides = document.querySelectorAll('.carousel__slide');
  
  const slideWidth = carouselInner.offsetWidth;
  let currentSlide = 0;
  const maxSlide = slides.length - 1;
  
  // Инициализация видимости кнопок
  updateArrows();
  
  // Обработчик для кнопки "вперед"
  arrowRight.addEventListener('click', () => {
    currentSlide++;
    carouselInner.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
    updateArrows();
  });
  
  // Обработчик для кнопки "назад"
  arrowLeft.addEventListener('click', () => {
    currentSlide--;
    carouselInner.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
    updateArrows();
  });
  
  // Функция обновления видимости кнопок
  function updateArrows() {
    arrowLeft.style.display = currentSlide === 0 ? 'none' : '';
    arrowRight.style.display = currentSlide === maxSlide ? 'none' : '';
  }
}
