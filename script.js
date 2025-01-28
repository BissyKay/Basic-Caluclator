// Display a welcome message
console.log("Welcome to Bisola's Calculator!");
alert("Welcome to Bisola's Calculator! Let's calculate something fun.");

// Variables to store current input, previous input, operator, and memory
let currentInput = "";
let previousInput = "";
let operator = null;
let memory = 0;

// Get display element and buttons
const display = document.querySelector("#display");
const buttons = document.querySelectorAll("button");

// Update display with the current input
function updateDisplay() {
    if (currentInput.length > 10) {
        display.textContent = currentInput.slice(0, 10) + "...";
    } else {
        display.textContent = currentInput || "0";
    }
}

// Append number to the current input
function appendNumber(number) {
    if (currentInput.length < 12) {
        currentInput += number;
        updateDisplay();
    }
}

// Choose an operator
function chooseOperator(op) {
    if (currentInput === "") return;
    if (previousInput !== "") calculate();
    operator = op;
    previousInput = currentInput;
    currentInput = "";
}

// Perform the calculation
function calculate() {
    if (!previousInput || !currentInput || !operator) return;
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (operator === "/" && current === 0) {
        display.textContent = "Oops! Division by zero is not allowed.";
        return;
    }

    switch (operator) {
        case "+":
            result = prev + current;
            break;
        case "-":
            result = prev - current;
            break;
        case "*":
            result = prev * current;
            break;
        case "/":
            result = prev / current;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    previousInput = "";
    operator = null;

    updateDisplay();
    saveHistory(`${prev} ${operator} ${current} = ${result}`);
}

// Clear the display
function clearDisplay() {
    currentInput = "";
    previousInput = "";
    operator = null;
    updateDisplay();
}

// Delete the last character
function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
}

// Save the current input to memory
function saveToMemory() {
    memory = parseFloat(currentInput) || 0;
    alert(`Saved ${memory} to memory!`);
}

// Recall the saved memory
function recallMemory() {
    currentInput = memory.toString();
    updateDisplay();
}

// Clear the memory
function clearMemory() {
    memory = 0;
    alert("Memory cleared!");
}

// Calculate square root
function calculateSquareRoot() {
    if (currentInput) {
        currentInput = Math.sqrt(parseFloat(currentInput)).toString();
        updateDisplay();
    }
}

// Calculate percentage
function calculatePercentage() {
    if (currentInput) {
        currentInput = (parseFloat(currentInput) / 100).toString();
        updateDisplay();
    }
}

// Save calculation history
let history = [];
function saveHistory(calculation) {
    history.push(calculation);
    if (history.length > 5) {
        history.shift(); // Keep only the last 5 calculations
    }
    console.log("History:", history);
}

// Play a click sound
function playClickSound() {
    const audio = new Audio("click-sound.mp3"); // Add a sound file to your project
    audio.play();
}

// Toggle dark mode
function toggleTheme() {
    document.body.classList.toggle("dark-mode");
}

// Add event listeners to buttons
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        playClickSound(); // Play sound on every button click
        const action = button.dataset.action;
        const value = button.textContent;

        switch (action) {
            case "number":
                appendNumber(value);
                break;
            case "operator":
                chooseOperator(value);
                break;
            case "calculate":
                calculate();
                break;
            case "clear":
                clearDisplay();
                break;
            case "delete":
                deleteLast();
                break;
            case "sqrt":
                calculateSquareRoot();
                break;
            case "percent":
                calculatePercentage();
                break;
            case "memory-save":
                saveToMemory();
                break;
            case "memory-recall":
                recallMemory();
                break;
            case "memory-clear":
                clearMemory();
                break;
            case "theme-toggle":
                toggleTheme();
                break;
        }
    });
});

// Add keyboard support
document.addEventListener("keydown", (event) => {
    const key = event.key;

    if (!isNaN(key)) {
        appendNumber(key); // For number keys
    } else if (["+", "-", "*", "/"].includes(key)) {
        chooseOperator(key); // For operator keys
    } else if (key === "Enter") {
        calculate(); // For Enter key
    } else if (key === "Backspace") {
        deleteLast(); // For Backspace key
    } else if (key === "Escape") {
        clearDisplay(); // For Escape key
    } else if (key === "m") {
        saveToMemory(); // For 'm' key to save memory
    }
});

// Easter egg
document.addEventListener("keydown", (event) => {
    if (event.key === "B" && event.ctrlKey) {
        alert("You found Bisola's Easter Egg! 🎉");
    }
});
