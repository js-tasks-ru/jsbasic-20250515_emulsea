let calculator = {
  // ваш код
  a: 0,
  b: 0,

  read (a, b) {
    this.a = a;
    this.b = b;
  },

  sum () {
    return this.a + this.b;
  },

  mul () {
    return this.a * this.b;
  }

};

// НЕ УДАЛЯТЬ СТРОКУ, НУЖНА ДЛЯ ПРОВЕРКИ
window.calculator = calculator; // делает ваш калькулятор доступным глобально
