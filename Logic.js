// Web Dev Simplified
// https://www.youtube.com/watch?v=j59qQ7YWLxw




class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
            this.previousOperandTextElement = previousOperandTextElement;
            this.currentOperandTextElement = currentOperandTextElement;
            this.clear();
        }
        // clear different variables
    clear() {
            this.currentOperand = ``;
            this.previousOperand = ``;
            this.operation = undefined;
        }
        // to remove a single number
    delete() {
            this.currentOperand = this.currentOperand.toString().slice(0, -1);
        }
        // adds number to display once clicked 
    appendNumber(number) {
            if (number === `.` && this.currentOperand.includes(`.`)) return; // makes it so can only enter one period.
            this.currentOperand = this.currentOperand.toString() + number.toString(); // toString is to append numbers entered 
        }
        //will add operation selected
    chooseOperation(operation) {

        if (this.currentOperand === ``) return;
        if (this.previousOperand !== ``) {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = ``;
    }


    // computes the operation 
    compute() {
        let computation
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case `+`:
                computation = prev + current;
                break;
            case `-`:
                computation = prev - current;
                break;
            case `&times;`:
                computation = prev * current;
                break;
            case `÷`:
                computation = prev / current;
                break;
            default:
                return;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = ``;

    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split(`.`)[0]);
        const decimalDigits = stringNumber.split(`.`)[1];
        let integerDisplay;
        if (isNaN(integerDisplay)) {
            integerDisplay = ``;
        } else {
            integerDisplay = integerDigits.toLocaleString(`en`, {
                maximumFractionDigits: 0
            })
            if (decimalDigits != null) {
                return `${integerDisplay}.${decimalDigits}`;
            } else {
                return integerDisplay;
            }
        }

    }

    // updates value on display 
    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        if (this.operation !== null) {
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.currentOperand)} ${this.operation}`;
        }

    }


}




// querySelectorAll gets ALL elements with data-number & data-operation
const numberButtons = document.querySelectorAll(`[data-number]`);
const operationButtons = document.querySelectorAll(`[data-operation]`);

// querySelector gets a single element 
const equalsButton = document.querySelector(`[data-equals]`);
const deleteButton = document.querySelector(` [data-delete]`);
const allClearButton = document.querySelector(`[data-all-clear]`);
const previousOperandTextElement = document.querySelector(`[data-previous-operand]`);
const currentOperandTextElement = document.querySelector(`[data-current-operand]`);

// make variables operate  

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

// forEach makes it loop over all buttons
numberButtons.forEach(button => {
    button.addEventListener(`
                click `, () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay(); // updates display with clicked number
    })
})

operationButtons.forEach(button => {
    button.addEventListener(`click`, () => {
        calculator.appendOperation(button.innerText);
        calculator.updateDisplay(); // updates display with clicked number
    })
})

// computation
equalsButton.addEventListener(`click`, button => {
    calculator.compute();
    calculator.updateDisplay();
})


allClearButton.addEventListener(`click`, button => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener(`click`, button => {
    calculator.delete();
    calculator.updateDisplay();
})