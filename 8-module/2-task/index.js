import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.render();
  }

  render() {
    this.elem = createElement(`
      <div class="products-grid">
        <div class="products-grid__inner"></div>
      </div>
    `);

    this.renderProducts();
  }

  renderProducts() {
    const gridInner = this.elem.querySelector('.products-grid__inner');
    gridInner.innerHTML = '';

    for (const product of this.getFilteredProducts()) {
      const productCard = new ProductCard(product);
      gridInner.append(productCard.elem);
    }
  }

  getFilteredProducts() {
    return this.products.filter(product => {
      // Фильтр по орехам
      if (this.filters.noNuts && product.nuts === true) {
        return false;
      }

      // Фильтр по вегетарианским
      if (this.filters.vegeterianOnly && !product.vegeterian) {
        return false;
      }

      // Фильтр по остроте
      if (this.filters.maxSpiciness !== undefined &&
        (product.spiciness > this.filters.maxSpiciness)) {
        return false;
      }

      // Фильтр по категории
      if (this.filters.category && product.category !== this.filters.category) {
        return false;
      }

      return true;
    });
  }

  updateFilter(filters) {
    Object.assign(this.filters, filters);
    this.renderProducts();
  }
}