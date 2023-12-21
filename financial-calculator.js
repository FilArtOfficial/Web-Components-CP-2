class FinancialCalculator extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });

    const form = document.createElement('form');
    const amountInput = document.createElement('input');
    const rateInput = document.createElement('input');
    const termInput = document.createElement('input');
    const resultDiv = document.createElement('div');

    amountInput.type = 'number';
    amountInput.placeholder = 'Сумма кредита';
    rateInput.type = 'number';
    rateInput.placeholder = 'Процентная ставка';
    termInput.type = 'number';
    termInput.placeholder = 'Срок кредита';

    form.appendChild(amountInput);
    form.appendChild(rateInput);
    form.appendChild(termInput);

    shadow.appendChild(form);
    shadow.appendChild(resultDiv);

    form.addEventListener('input', () => this.calculateLoan());

    console.log('Компонент создан');
  }

  calculateLoan() {
    const amount = parseFloat(this.shadowRoot.querySelector('input:nth-child(1)').value);
    const rate = parseFloat(this.shadowRoot.querySelector('input:nth-child(2)').value);
    const term = parseFloat(this.shadowRoot.querySelector('input:nth-child(3)').value);

    if (isNaN(amount) || isNaN(rate) || isNaN(term)) {
      this.shadowRoot.querySelector('div').innerHTML = 'Введите корректные данные';
      return;
    }

    const monthlyPayment = (amount * rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1);
    const totalAmount = monthlyPayment * term;
    const totalInterest = totalAmount - amount;

    this.shadowRoot.querySelector('div').innerHTML =
      `Ежемесячный платеж: ${monthlyPayment.toFixed(2)}<br>` +
      `Общая сумма: ${totalAmount.toFixed(2)}<br>` +
      `Общий процент: ${totalInterest.toFixed(2)}`;
  }

  connectedCallback() {
    console.log('Компонент подключен');
  }

  attributeChangedCallback() {
    console.log('Компонент обновлен');
  }

  disconnectedCallback() {
    console.log('Компонент удален');
  }
}

customElements.define('financial-calculator', FinancialCalculator);

