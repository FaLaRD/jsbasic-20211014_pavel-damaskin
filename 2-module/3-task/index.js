let calculator = {
  _a: '',
  _b: '',

  read(a, b) {
    this._a = a;
    this._b = b;
  },

  sum() {
    return this._a + this._b;
  },

  mul() {
    return this._a * this._b;
  },
};

// НЕ УДАЛЯТЬ СТРОКУ, НУЖНА ДЛЯ ПРОВЕРКИ
window.calculator = calculator; // делает ваш калькулятор доступным глобально
