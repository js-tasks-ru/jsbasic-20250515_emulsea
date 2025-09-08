import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {
  constructor() {
    this.cart = null;
    this.productsGrid = null;
    this.stepSlider = null;
    this.ribbonMenu = null;
  }

  async render() {
    // Создаем и размещаем базовые компоненты
    this.renderCarousel();
    this.renderRibbonMenu();
    this.renderStepSlider();
    this.renderCartIcon();
    
    // Получаем товары с сервера
    const products = await this.fetchProducts();
    
    // Создаем и размещаем сетку товаров
    this.renderProductsGrid(products);
    
    // Применяем начальные фильтры
    this.applyInitialFilters();
    
    // Настраиваем обработчики событий
    this.setupEventListeners();
  }

  renderCarousel() {
    const carousel = new Carousel(slides);
    document.querySelector('[data-carousel-holder]').append(carousel.elem);
  }

  renderRibbonMenu() {
    this.ribbonMenu = new RibbonMenu(categories);
    document.querySelector('[data-ribbon-holder]').append(this.ribbonMenu.elem);
  }

  renderStepSlider() {
    this.stepSlider = new StepSlider({ steps: 5, value: 3 });
    document.querySelector('[data-slider-holder]').append(this.stepSlider.elem);
  }

  renderCartIcon() {
    const cartIcon = new CartIcon();
    document.querySelector('[data-cart-icon-holder]').append(cartIcon.elem);
    this.cart = new Cart(cartIcon);
  }

  async fetchProducts() {
    const response = await fetch('products.json');
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return await response.json();
  }

  renderProductsGrid(products) {
    const gridHolder = document.querySelector('[data-products-grid-holder]');
    gridHolder.innerHTML = ''; // Очищаем заглушки
    
    this.productsGrid = new ProductsGrid(products);
    gridHolder.append(this.productsGrid.elem);
  }

  applyInitialFilters() {
    this.productsGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.value
    });
  }

  setupEventListeners() {
    // Обработчик добавления товара в корзину
    document.body.addEventListener('product-add', (event) => {
      const productId = event.detail;
      const product = this.productsGrid.products.find(p => p.id === productId);
      if (product) {
        this.cart.addProduct(product);
      }
    });

    // Обработчик изменения слайдера остроты
    document.body.addEventListener('slider-change', (event) => {
      this.productsGrid.updateFilter({
        maxSpiciness: event.detail
      });
    });

    // Обработчик выбора категории
    document.body.addEventListener('ribbon-select', (event) => {
      this.productsGrid.updateFilter({
        category: event.detail
      });
    });

    // Обработчик чекбокса "noNuts"
    document.getElementById('nuts-checkbox').addEventListener('change', (event) => {
      this.productsGrid.updateFilter({
        noNuts: event.target.checked
      });
    });

    // Обработчик чекбокса "vegeterianOnly"
    document.getElementById('vegeterian-checkbox').addEventListener('change', (event) => {
      this.productsGrid.updateFilter({
        vegeterianOnly: event.target.checked
      });
    });
  }
}