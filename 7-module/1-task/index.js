import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = this.#render();
    this.#initScroll();
    this.#initCategorySelection();
  }

  #render() {
    const ribbon = createElement(`
      <div class="ribbon">
        <button class="ribbon__arrow ribbon__arrow_left">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
        <div class="ribbon__inner"></div>
        <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      </div>
    `);

    const ribbonInner = ribbon.querySelector('.ribbon__inner');
    
    this.categories.forEach(category => {
      const categoryElement = createElement(`
        <a href="#" class="ribbon__item" data-id="${category.id}">${category.name}</a>
      `);
      ribbonInner.appendChild(categoryElement);
    });

    // Выделяем первую категорию по умолчанию
    ribbonInner.querySelector('.ribbon__item').classList.add('ribbon__item_active');
    
    return ribbon;
  }

  #initScroll() {
    const ribbonInner = this.elem.querySelector('.ribbon__inner');
    const arrowLeft = this.elem.querySelector('.ribbon__arrow_left');
    const arrowRight = this.elem.querySelector('.ribbon__arrow_right');

    arrowLeft.addEventListener('click', () => {
      ribbonInner.scrollBy(-350, 0);
    });

    arrowRight.addEventListener('click', () => {
      ribbonInner.scrollBy(350, 0);
    });

    ribbonInner.addEventListener('scroll', () => {
      const scrollLeft = ribbonInner.scrollLeft;
      const scrollWidth = ribbonInner.scrollWidth;
      const clientWidth = ribbonInner.clientWidth;
      const scrollRight = scrollWidth - scrollLeft - clientWidth;

      arrowLeft.classList.toggle('ribbon__arrow_visible', scrollLeft > 0);
      arrowRight.classList.toggle('ribbon__arrow_visible', scrollRight > 1);
    });
  }

  #initCategorySelection() {
    this.elem.addEventListener('click', event => {
      const item = event.target.closest('.ribbon__item');
      if (!item) return;

      event.preventDefault();

      // Удаляем активный класс у всех элементов
      this.elem.querySelectorAll('.ribbon__item').forEach(el => {
        el.classList.remove('ribbon__item_active');
      });

      // Добавляем активный класс к выбранному элементу
      item.classList.add('ribbon__item_active');

      // Генерируем событие выбора категории
      this.elem.dispatchEvent(new CustomEvent('ribbon-select', {
        detail: item.dataset.id,
        bubbles: true
      }));
    });
  }
}