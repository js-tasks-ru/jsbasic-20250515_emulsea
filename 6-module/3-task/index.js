import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.currentSlideIndex = 0;
    this.elem = this.#render();
    this.#initCarousel();
  }

  #render() {
    const carousel = createElement(`
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
        <div class="carousel__inner"></div>
      </div>
    `);

    const carouselInner = carousel.querySelector('.carousel__inner');
    
    this.slides.forEach(slide => {
      const slideElement = createElement(`
        <div class="carousel__slide" data-id="${slide.id}">
          <img src="/assets/images/carousel/${slide.image}" 
               class="carousel__img" 
               alt="${slide.name}">
          <div class="carousel__caption">
            <span class="carousel__price">€${slide.price.toFixed(2)}</span>
            <div class="carousel__title">${slide.name}</div>
            <button type="button" class="carousel__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
        </div>
      `);
      carouselInner.appendChild(slideElement);
    });

    return carousel;
  }

  #initCarousel() {
    const carouselInner = this.elem.querySelector('.carousel__inner');
    const arrowRight = this.elem.querySelector('.carousel__arrow_right');
    const arrowLeft = this.elem.querySelector('.carousel__arrow_left');
    const slidesCount = this.slides.length;

    // Обработчики событий для кнопок "+"
    this.elem.addEventListener('click', event => {
      if (event.target.closest('.carousel__button')) {
        const slideId = event.target.closest('.carousel__slide').dataset.id;
        this.elem.dispatchEvent(new CustomEvent('product-add', {
          detail: slideId,
          bubbles: true
        }));
      }
    });

    // Функция обновления видимости стрелок
    const updateArrows = () => {
      arrowLeft.style.display = this.currentSlideIndex === 0 ? 'none' : '';
      arrowRight.style.display = this.currentSlideIndex === slidesCount - 1 ? 'none' : '';
    };

    // Обработчики событий для стрелок
    arrowRight.addEventListener('click', () => {
      this.currentSlideIndex++;
      const offset = -carouselInner.offsetWidth * this.currentSlideIndex;
      carouselInner.style.transform = `translateX(${offset}px)`;
      updateArrows();
    });

    arrowLeft.addEventListener('click', () => {
      this.currentSlideIndex--;
      const offset = -carouselInner.offsetWidth * this.currentSlideIndex;
      carouselInner.style.transform = `translateX(${offset}px)`;
      updateArrows();
    });

    // Инициализация видимости стрелок
    updateArrows();
    arrowLeft.style.display = 'none';
  }
}