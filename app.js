const API_URL = "https://api.exchangerate-api.com/v4/latest/";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("currency-form");
  const amountInput = document.getElementById("amount");
  const fromCurrency = document.getElementById("from-currency");
  const toCurrency = document.getElementById("to-currency");
  const resultElement = document.getElementById("result");

  // Popula os seletores de moeda
  async function populateCurrencies() {
    try {
      const response = await fetch(`${API_URL}USD`);
      const data = await response.json();

      const currencies = Object.keys(data.rates);
      currencies.forEach(currency => {
        const optionFrom = document.createElement("option");
        const optionTo = document.createElement("option");

        optionFrom.value = optionTo.value = currency;
        optionFrom.textContent = optionTo.textContent = currency;

        fromCurrency.appendChild(optionFrom);
        toCurrency.appendChild(optionTo);
      });
    } catch (error) {
      console.error("Erro ao carregar as moedas:", error);
    }
  }

  // Realiza a conversão
  async function convertCurrency(event) {
    event.preventDefault();

    const amount = parseFloat(amountInput.value);
    const from = fromCurrency.value;
    const to = toCurrency.value;

    if (isNaN(amount) || !from || !to) {
      alert("Preencha todos os campos corretamente!");
      return;
    }

    try {
      const response = await fetch(`${API_URL}${from}`);
      const data = await response.json();
      const rate = data.rates[to];

      if (!rate) {
        alert("Taxa de câmbio não disponível.");
        return;
      }

      const convertedAmount = (amount * rate).toFixed(2);
      resultElement.textContent = `${amount} ${from} = ${convertedAmount} ${to}`;
    } catch (error) {
      console.error("Erro ao converter moeda:", error);
      resultElement.textContent = "Erro ao converter moeda. Tente novamente.";
    }
  }

  form.addEventListener("submit", convertCurrency);
  populateCurrencies();
});
