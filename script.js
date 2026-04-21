const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.button');

let currentInput = '0';
let shouldResetDisplay = false;

function updateDisplay() {
  display.textContent = currentInput;
  display.scrollleft = display.scrollWidth;
  
  if (currentInput.length > 10 &&  currentInput.length < 16) {
    display.style.fontSize = '28px'
  } else if (currentInput.length >= 16) {
    display.style.fontSize = '26px'
  } else {
    display.style.fontSize = '35px'
  }
}
// Handle all button clicks
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;
    
    if (value === 'AC') {
      currentInput = '0';
    } 
    else if (value === 'C' || value === '⌫') {
      currentInput = currentInput.slice(0, -1) || '0';
    } 
    else if (value === '=') {
      try {
        // Replace × ÷ with * / for eval
        let expression = currentInput.replace(/×/g, '*').replace(/÷/g, '/');
        // Prevent 0.1+0.2 = 0.30000000004
        currentInput = String(parseFloat(eval(expression).toFixed(8)));
        shouldResetDisplay = true;
      } catch {
        currentInput = 'Error';
        shouldResetDisplay = true;
      }
    } 
    else if (value === '%') {
      currentInput = String(parseFloat(currentInput) / 100);
    }
    else {
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

updateDisplay(); // Show initial 0
