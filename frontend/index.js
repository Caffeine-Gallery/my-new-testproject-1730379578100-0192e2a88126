import { backend } from 'declarations/backend';

let firstNumber = '';
let secondNumber = '';
let currentOperation = null;
let shouldResetDisplay = false;

const display = document.getElementById('display');

window.appendToDisplay = (value) => {
    if (shouldResetDisplay) {
        display.value = '';
        shouldResetDisplay = false;
    }
    display.value += value;
};

window.setOperation = (operation) => {
    if (currentOperation !== null) calculate();
    firstNumber = display.value;
    currentOperation = operation;
    shouldResetDisplay = true;
};

window.clearDisplay = () => {
    display.value = '';
    firstNumber = '';
    secondNumber = '';
    currentOperation = null;
};

window.calculate = async () => {
    if (currentOperation === null) return;

    secondNumber = display.value;
    display.value = 'Calculating...';

    try {
        const result = await performCalculation(parseFloat(firstNumber), parseFloat(secondNumber), currentOperation);
        display.value = result.toString();
    } catch (error) {
        display.value = 'Error';
    }

    firstNumber = '';
    secondNumber = '';
    currentOperation = null;
    shouldResetDisplay = true;
};

async function performCalculation(a, b, operation) {
    switch (operation) {
        case '+':
            return await backend.add(a, b);
        case '-':
            return await backend.subtract(a, b);
        case '*':
            return await backend.multiply(a, b);
        case '/':
            return await backend.divide(a, b);
        default:
            throw new Error('Invalid operation');
    }
}
