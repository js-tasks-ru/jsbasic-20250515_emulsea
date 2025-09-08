export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.elem = this.#createSlider();
    this.#addEventListeners();
    this.#updateSlider();
  }

  #createSlider() {
    const slider = document.createElement('div');
    slider.className = 'slider';

    // Thumb element
    const thumb = document.createElement('div');
    thumb.className = 'slider__thumb';
    thumb.innerHTML = `<span class="slider__value">${this.value}</span>`;
    slider.appendChild(thumb);

    // Progress bar
    const progress = document.createElement('div');
    progress.className = 'slider__progress';
    slider.appendChild(progress);

    // Steps container
    const stepsContainer = document.createElement('div');
    stepsContainer.className = 'slider__steps';
    slider.appendChild(stepsContainer);

    // Create steps
    for (let i = 0; i < this.steps; i++) {
      const step = document.createElement('span');
      stepsContainer.appendChild(step);
    }

    return slider;
  }

  #addEventListeners() {
    // Click event
    this.elem.addEventListener('click', (event) => {
      this.#updateValueFromPosition(event.clientX);
      this.#dispatchChangeEvent();
    });

    // Drag and drop events
    const thumb = this.elem.querySelector('.slider__thumb');
    thumb.addEventListener('pointerdown', this.#onPointerDown.bind(this));
    thumb.ondragstart = () => false;
  }

  #onPointerDown(event) {
    event.preventDefault();
    this.elem.classList.add('slider_dragging');

    const onPointerMove = (moveEvent) => {
      moveEvent.preventDefault();
      this.#updateValueFromPosition(moveEvent.clientX, true);
    };

    const onPointerUp = () => {
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerup', onPointerUp);
      
      this.elem.classList.remove('slider_dragging');
      this.#updateSliderPosition();
      this.#dispatchChangeEvent();
    };

    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerup', onPointerUp, { once: true });
  }

  #updateValueFromPosition(clientX, isDragging = false) {
    const rect = this.elem.getBoundingClientRect();
    let left = clientX - rect.left;
    let leftRelative = left / this.elem.offsetWidth;

    // Clamp between 0 and 1
    leftRelative = Math.max(0, Math.min(leftRelative, 1));
    const segments = this.steps - 1;
    const approximateValue = leftRelative * segments;
    const newValue = Math.round(approximateValue);

    if (newValue !== this.value || isDragging) {
      this.value = newValue;
      
      if (isDragging) {
        // During drag, update position dynamically
        const leftPercents = leftRelative * 100;
        this.#updateThumbAndProgress(leftPercents);
        this.#updateValueDisplay();
        this.#updateActiveStep();
      } else {
        // For click, update normally
        this.#updateSliderPosition();
      }
    }
  }

  #updateSliderPosition() {
    const segments = this.steps - 1;
    const valuePercent = segments > 0 ? (this.value / segments) * 100 : 0;
    this.#updateThumbAndProgress(valuePercent);
    this.#updateValueDisplay();
    this.#updateActiveStep();
  }

  #updateThumbAndProgress(percent) {
    this.elem.querySelector('.slider__thumb').style.left = `${percent}%`;
    this.elem.querySelector('.slider__progress').style.width = `${percent}%`;
  }

  #updateValueDisplay() {
    this.elem.querySelector('.slider__value').textContent = this.value;
  }

  #updateActiveStep() {
    const steps = this.elem.querySelectorAll('.slider__steps span');
    steps.forEach((step, index) => {
      step.classList.toggle('slider__step-active', index === this.value);
    });
  }

  #updateSlider() {
    this.#updateSliderPosition();
    this.#updateValueDisplay();
    this.#updateActiveStep();
  }

  #dispatchChangeEvent() {
    this.elem.dispatchEvent(
      new CustomEvent('slider-change', {
        detail: this.value,
        bubbles: true
      })
    );
  }
}