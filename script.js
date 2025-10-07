const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';
let operator = '';
let previousInput = '';

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (value === 'C') {
      currentInput = '';
      previousInput = '';
      operator = '';
      display.textContent = '0';
    }

    else if (value === '±') {
      if (currentInput) {
        currentInput = (parseFloat(currentInput) * -1).toString();
        display.textContent = currentInput;
      }
    }

    else if (value === '%') {
      if (currentInput) {
        currentInput = (parseFloat(currentInput) / 100).toString();
        display.textContent = currentInput;
      }
    }

    else if (['÷', '×', '−', '+'].includes(value)) {
      if (currentInput === '') return;
      operator = value;
      previousInput = currentInput;
      currentInput = '';
    }

    else if (value === '=') {
      if (previousInput === '' || currentInput === '' || operator === '') return;

      let result;
      const prev = parseFloat(previousInput);
      const curr = parseFloat(currentInput);

      switch (operator) {
        case '+':
          result = prev + curr;
          break;
        case '−':
          result = prev - curr;
          break;
        case '×':
          result = prev * curr;
          break;
        case '÷':
          result = curr === 0 ? 'Error' : prev / curr;
          break;
      }

      display.textContent = result;
      currentInput = result.toString();
      operator = '';
      previousInput = '';
    }

    else {
      // Handle number or decimal input
      if (value === '.' && currentInput.includes('.')) return;
      currentInput += value;
      display.textContent = currentInput;
    }
  });
});
