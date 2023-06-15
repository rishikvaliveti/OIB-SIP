// Get the display element
const display = document.getElementById('result');

// Get all the buttons
const buttons = document.querySelectorAll('button');

// Add click event listeners to the buttons
buttons.forEach(button => {
  button.addEventListener('click', () => {
    // Get the button value
    const buttonValue = button.value;

    if (buttonValue === '=') {
      // Evaluate the expression
      try {
        const result = eval(display.value);
        display.value = result;
      } catch (error) {
        display.value = 'Error';
      }
    } else if (buttonValue === 'C') {
      clearDisplay();
    } else {
      // Append the button value to the display
      display.value += buttonValue;
    }
  });
});

// Clear the display
function clearDisplay() {
  display.value = '';
}
