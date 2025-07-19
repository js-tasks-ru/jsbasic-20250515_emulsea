export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.elem = this.#createSlider();
    this.#addEventListeners();
  }

  #createSlider() {
    const slider = document.createElement('div');
    slider.className = 'slider';

    // Create thumb with value
    const thumb = document.createElement('div');
    thumb.className = 'slider__thumb';
    thumb.innerHTML = `<span class="slider__value">${this.value}</span>`;
    slider.appendChild(thumb);

    // Create progress bar
    const progress = document.createElement('div');
    progress.className = 'slider__progress';
    slider.appendChild(progress);

    // Create steps container
    const stepsContainer = document.createElement('div');
    stepsContainer.className = 'slider__steps';
    slider.appendChild(stepsContainer);

    // Create individual steps
    for (let i = 0; i < this.steps; i++) {
      const step = document.createElement('span');
      if (i === this.value) {
        step.classList.add('slider__step-active');
      }
      stepsContainer.appendChild(step);
    }

    // Calculate initial position
    const segments = this.steps - 1;
    const valuePercent = segments > 0 ? (this.value / segments) * 100 : 0;

    // Set initial position
    thumb.style.left = `${valuePercent}%`;
    progress.style.width = `${valuePercent}%`;

    return slider;
  }

  #addEventListeners() {
    this.elem.addEventListener('click', (event) => {
      // Calculate relative click position
      const rect = this.elem.getBoundingClientRect();
      const left = event.clientX - rect.left;
      const leftRelative = left / this.elem.offsetWidth;

      // Calculate nearest step
      const segments = this.steps - 1;
      let approximateValue = leftRelative * segments;
      let newValue = Math.round(approximateValue);

      // Ensure value is within bounds
      newValue = Math.max(0, Math.min(newValue, segments));

      // Only update if value changed
      if (newValue !== this.value) {
        this.value = newValue;
        this.#updateSlider();

        // Dispatch custom event
        const sliderChange = new CustomEvent('slider-change', {
          detail: this.value,
          bubbles: true
        });
        this.elem.dispatchEvent(sliderChange);
      }
    });
  }

  #updateSlider() {
    const thumb = this.elem.querySelector('.slider__thumb');
    const progress = this.elem.querySelector('.slider__progress');
    const valueDisplay = this.elem.querySelector('.slider__value');
    const steps = this.elem.querySelectorAll('.slider__steps span');

    // Update displayed value
    valueDisplay.textContent = this.value;

    // Update active step
    steps.forEach((step, index) => {
      step.classList.toggle('slider__step-active', index === this.value);
    });

    // Calculate new position
    const segments = this.steps - 1;
    const valuePercent = segments > 0 ? (this.value / segments) * 100 : 0;

    // Update thumb and progress position
    thumb.style.left = `${valuePercent}%`;
    progress.style.width = `${valuePercent}%`;
  }
}