const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');

let currentInput = '0';
let shouldResetDisplay = false;

function updateDisplay() {
  display.textContent = currentInput;
  display.scrollLeft = display.scrollWidth;

  if (currentInput.length > 16) {
    display.style.fontSize = '26px';
  } else if (currentInput.length > 10) {
    display.style.fontSize = '28px';
  } else {
    display.style.fontSize = '35px';
  }
}

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (value === 'AC') {
      currentInput = '0';
      shouldResetDisplay = false;
    } 
    else if (value === 'C' || value === '⌫') {
      currentInput = currentInput.slice(0, -1) || '0';
    } 
    else if (value === '=') {
      try {
        let expression = currentInput.replace(/×/g, '*').replace(/÷/g, '/');
        const result = eval(expression);
        if (!isFinite(result)) {
          currentInput = 'Error';
        } else {
          currentInput = String(parseFloat(result.toFixed(8)));
        }
        shouldResetDisplay = true;
      } catch {
        currentInput = 'Error';
        shouldResetDisplay = true;
      }
    } 
    else if (value === '%') {
      // Only apply % if it's a single number (no operators)
      if (!currentInput.includes('+') && !currentInput.includes('-') && 
          !currentInput.includes('×') && !currentInput.includes('÷')) {
        currentInput = String(parseFloat(currentInput) / 100);
      }
    } 
    else if (['+', '-', '×', '÷'].includes(value)) {
      // Handle operators - replace if last char is also operator
      const lastChar = currentInput.slice(-1);
      if (['+', '-', '×', '÷'].includes(lastChar)) {
        currentInput = currentInput.slice(0, -1) + value;
      } else {
        if (shouldResetDisplay || currentInput === 'Error') {
          currentInput = '0' + value;
          shouldResetDisplay = false;
        } else {
          currentInput += value;
        }
      }
    } 
    else {
      // Numbers and decimal
      if (value === '.' && currentInput.split(/[\+\-\*×÷]/).pop().includes('.')) {
        return;
      }
      if (currentInput === '0' || shouldResetDisplay || currentInput === 'Error') {
        currentInput = value;
        shouldResetDisplay = false;
      } else {
        currentInput += value;
      }
    }

    updateDisplay();
  });
});

updateDisplay();