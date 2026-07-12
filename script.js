buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent

    if (value === 'AC') {
      currentInput = '0'
      shouldResetDisplay = false
    } else if (value === 'C' || value === '⌫') {
      currentInput = currentInput.slice(0, -1) || '0'
    } else if (value === '=') {
      try {
        let expression = currentInput.replace(/×/g, '*').replace(/÷/g, '/')
        const result = eval(expression)
        if (!isFinite(result)) {
          currentInput = 'Error'
        } else {
          currentInput = String(parseFloat(result.toFixed(8)))
        }
        shouldResetDisplay = true
      } catch {
        currentInput = 'Error'
        shouldResetDisplay = true
      }
    } else if (value === '%') {
      // Only apply % if the input is a single number
      if (!isNaN(parseFloat(currentInput)) && !currentInput.includes('+') && 
          !currentInput.includes('-') && !currentInput.includes('×') && 
          !currentInput.includes('÷')) {
        currentInput = String(parseFloat(currentInput) / 100)
      }
    } else if (['+', '-', '×', '÷'].includes(value)) {
      // Handle operator replacement
      if (shouldResetDisplay) {
        currentInput = '0' + value
        shouldResetDisplay = false
      } else {
        // Replace last operator if user clicks another
        const lastChar = currentInput.slice(-1)
        if (['+', '-', '×', '÷'].includes(lastChar)) {
          currentInput = currentInput.slice(0, -1) + value
        } else {
          currentInput += value
        }
      }
    } else {
      if (value === '.' && currentInput.split(/[\+\-\*×÷]/).pop().includes('.')) {
        return;
      }
      if (currentInput === '0' || shouldResetDisplay || currentInput === 'Error') {
        currentInput = value
        shouldResetDisplay = false
      } else {
        currentInput += value
      }
    }

    updateDisplay();
  })
})