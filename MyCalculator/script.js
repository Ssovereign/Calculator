class Calculator {
    constructor(currentOperandTextElement, previousOperandTextElement) {
        this.currentOperandTextElement = currentOperandTextElement;
        this.previousOperandTextElement = previousOperandTextElement;
        this.clear();
    }

    appendNumber(number) {
        if(this.currentOperand.includes('.') && number == '.') return;
        this.currentOperand = this.currentOperand + number;
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operator = undefined;
    }

    display() {
        this.currentOperandTextElement.innerText = this.currentOperand;
        if(this.operator !== undefined && this.previousOperand !== '') {
            this.previousOperandTextElement.innerText = this.previousOperand + this.operator;
        } else {
            this.previousOperandTextElement.innerText = '';

        }
    }

    addOperation(operator) {
        if(this.currentOperand == '') return;
        if(this.previousOperand !== ''){
            this.compute();
        }
        this.operator = operator;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        if(this.currentOperand == '') return;
        switch(this.operator) {
            case '+':
                this.currentOperand = parseFloat(this.previousOperand) + parseFloat(this.currentOperand);
                break;
            case '-':
                this.currentOperand = parseFloat(this.previousOperand) - parseFloat(this.currentOperand);
                break;
            case '✕':
                this.currentOperand = parseFloat(this.previousOperand) * parseFloat(this.currentOperand);
                break;
            case '÷':
                this.currentOperand = parseFloat(this.previousOperand) / parseFloat(this.currentOperand);
                break;
        }
        this.previousOperand = '';
    }

    delete() {
        this.currentOperand = this.currentOperand.slice(0, -1);
    }
}

const currentOperandTextElement = document.querySelector('[data-current-operand');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const equalButton = document.querySelector('[data-equal]');
const clearButton = document.querySelector('[data-clear]');
const deleteButton = document.querySelector('[data-delete]');
const operatorButton = document.querySelectorAll('[data-operator]');
const numberButton = document.querySelectorAll('[data-number]');

const calculator = new Calculator(currentOperandTextElement, previousOperandTextElement);

numberButton.forEach(button => {
    button.addEventListener('click', e => {
        calculator.appendNumber(button.innerText);
        calculator.display();
    })
})

clearButton.addEventListener('click', e => {
    calculator.clear();
    calculator.display();
})

operatorButton.forEach(button => {
    button.addEventListener('click', e => {
        calculator.addOperation(button.innerText);
        calculator.display();
    })
})

equalButton.addEventListener('click', e => {
    calculator.compute();
    calculator.display();
})

deleteButton.addEventListener('click', e => {
    calculator.delete();
    calculator.display();
})