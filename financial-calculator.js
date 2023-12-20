class FinancialCalculator extends HTMLElement {
  constructor() {
    super();

    // Создаем Shadow DOM и присваиваем его переменной shadow
    const shadow = this.attachShadow({ mode: 'open' });

    // Создаем элементы для формы и результатов
    const form = document.createElement('form');
    const amountInput = document.createElement('input');
    const rateInput = document.createElement('input');
    const termInput = document.createElement('input');
    const resultDiv = document.createElement('div');

    // Устанавливаем атрибуты и свойства для элементов формы
    amountInput.type = 'number';
    amountInput.placeholder = 'Сумма кредита';
    rateInput.type = 'number';
    rateInput.placeholder = 'Процентная ставка';
    termInput.type = 'number';
    termInput.placeholder = 'Срок кредита';

    // Добавляем элементы формы в Shadow DOM
    form.appendChild(amountInput);
    form.appendChild(rateInput);
    form.appendChild(termInput);

    // Добавляем элементы формы и результатов в Shadow DOM
    shadow.appendChild(form);
    shadow.appendChild(resultDiv);

    // Обработчик события изменения ввода
    form.addEventListener('input', () => this.calculateLoan());

    // Выводим сообщение о создании компонента в консоль
    console.log('Компонент создан');
  }

  // Метод для расчета кредита
  calculateLoan() {
    const amount = parseFloat(this.shadowRoot.querySelector('input:nth-child(1)').value);
    const rate = parseFloat(this.shadowRoot.querySelector('input:nth-child(2)').value);
    const term = parseFloat(this.shadowRoot.querySelector('input:nth-child(3)').value);

    // Валидация входных данных
    if (isNaN(amount) || isNaN(rate) || isNaN(term)) {
      this.shadowRoot.querySelector('div').innerHTML = 'Введите корректные данные';
      return;
    }

    // Расчеты
    const monthlyPayment = (amount * rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1);
    const totalAmount = monthlyPayment * term;
    const totalInterest = totalAmount - amount;

    // Вывод результатов
    this.shadowRoot.querySelector('div').innerHTML =
      `Ежемесячный платеж: ${monthlyPayment.toFixed(2)}<br>` +
      `Общая сумма: ${totalAmount.toFixed(2)}<br>` +
      `Общий процент: ${totalInterest.toFixed(2)}`;
  }

  // Метод, вызываемый при подключении компонента к документу
  connectedCallback() {
    console.log('Компонент подключен');
  }

  // Метод, вызываемый при обновлении компонента
  attributeChangedCallback() {
    console.log('Компонент обновлен');
  }

  // Метод, вызываемый при удалении компонента из документа
  disconnectedCallback() {
    console.log('Компонент удален');
  }
}

// Регистрируем компонент с именем "financial-calculator"
customElements.define('financial-calculator', FinancialCalculator);

