const {Conver_p_10} = require('./Conver_p_10');
const {Conver_10_p} = require('./Conver_10_p');
const {History} = require('./History');

const accuracy = 5;

class State {
    constructor() {
        this.operands = ['', ''];
        this.operator = '';
        this.memory = 0;
        this.system = 10;
        this.current = '0';
        this.isCalculated = false;
        this.justOperator = false;
        this.memory = 0;
        this.isCurChanged = false;
        this.isCascade = false;
        this.history = new History; 
    }

    //изменение системы счисления в калькуляторе
    changeSystem(p) {
        p = Number(p);

        function from_p1_to_p2(number, p1, p2) {
            number = Conver_p_10.dval(number, p1);
            return Conver_10_p.dval(number, p2, accuracy);
        }

        this.operands = [from_p1_to_p2(this.operands[0], this.system, p), from_p1_to_p2(this.operands[1], this.system, p)];
        this.current = from_p1_to_p2(this.current, this.system, p)
        this.system = p;
    };

    //посчитать выражение
    calculate() {

        let a, b, o;
        

        if (this.operator == '') return;

        if (this.isCalculated && this.isCascade == false) {                //повторяется ли вычисление
            this.operands[0] = a = this.current;
            b = this.operands[1];
            o = this.operator;
        }
        else {
            a = this.operands[0];
            b = this.current;
            o = this.operator;
            this.operands[1] = b;
        }

        this.isCascade = false;
        
        if (a != '' && b != '') {                //если оба операнда доступны
            let result;

            if (this.system != 10) {
                a = Conver_p_10.dval(a, this.system);
                b = Conver_p_10.dval(b, this.system);
            }

            switch (o) {
                case '+':
                    result = String(Number(a) + Number(b));
                    break;
                case '-':
                    result = String(Number(a) - Number(b));
                    break;
                case '*':
                    result = String(Number(a) * Number(b));
                    break;
                case '/':
                    result = String(Number(a) / Number(b));
                    break;
            }

            if (this.system != 10) {
                this.current = Conver_10_p.dval(result, this.system, accuracy);
            }
            else {
                this.current = result;
            }

            this.history.addOperation(this.system, o, a, b, this.current);

            this.isCalculated = true;
        }
        else if (a != '' && b == '') {           //доступен лишь первый операнд
            this.operands[1] = a;
            this.calculate();
        }
        else {                                   //операнды не были назначены
            this.operands[0] = a;
            this.isCalculated = true;
        }
        this.justOperator = true;
        this.isCurChanged = false
    };

    //добавление цифры (не вызывается напрямую)
    addDigit(d) {
        if (this.isCalculated && this.isCascade === false) {
            this.clearAll();
            this.isCalculated = false;
        }
        if (this.justOperator == false) {
            if (d == '0' && this.current == '0') return;                    //защита от двойных нулей
            else if (d == '.' && this.current.indexOf('.') != -1) return;   //защита от двойных разделителей
            else {
                if (this.current == '0' && d != '.') this.current = d;
                else this.current += d;
            }
        }
        else {
            if (d == '.') {
                this.current = '0.';
            }
            else {
                this.current = d;
            }
            
            this.justOperator = false;
        }
        this.isCurChanged = true;
    };

    //добавление оператора (не вызывается напрямую)
    addOperator(o) {


        let operators = ['+', '-', '*', '/'];
        let functions = ['+/-', 'sqrt', 'rev', 'sqr'];
        

        if (functions.indexOf(o) != -1) {
            let a = this.current;
            let result;

            if (this.system != 10) {
                a = Conver_p_10.dval(a, this.system);
            }

            switch(o) {
                case '+/-':
                    result = String(-Number(a));
                    break;
                case 'sqrt':
                    result = String(Math.sqrt(Number(a)));
                    break;
                case 'rev':
                    result = String(1 / Number(a));
                    break;
                case 'sqr':
                    result = String(Math.pow(Number(a), 2));
                    break;
            }

            this.justOperator = true;

            if (this.system != 10) {
                this.current = Conver_10_p.dval(result, this.system, accuracy);
            }
            else {
                this.current = result;
            }

            if (o != '+/-')
                this.history.addFunction(this.system, o, a, this.current);
        }

        if (operators.indexOf(o) != -1) {
            if (this.isCalculated && this.isCascade == false) {
                this.operands = [this.current, ''];
                this.isCalculated = false;
                this.operator = o;
            }
            if (this.operands[0] == '') {                                   //если оператор не был назначен
                this.operands[0] = this.current;
                this.operator = o;
            }
            else if (this.operands[0] != '' && this.operands[1] != '') {    //если уже есть два операнда
                let res = this.calculate();
                this.operands = [res, ''];
                this.operator = o;
            }
            else if (this.operands[0] != '' && this.isCurChanged) {    //если уже есть два операнда (один в текущей строке)
                this.operands[1] = this.current;
                this.calculate();
                this.operands = [this.current, ''];
                this.operator = o;
                this.isCascade = true;
            }
            else {
                this.operator = o;
            }
            this.justOperator = true;
        }
        this.isCurChanged = false;
    };

    //добавление символа
    addSymbol(s) {
        let operators = ['+', '-', '*', '/', 'sqrt', 'rev', 'sqr', '+/-'];
        if (operators.indexOf(s) == -1) this.addDigit(s);
        else this.addOperator(s);
    };

    //удаление последнего символа
    delSymbol() {
        if (this.current.length == 1) this.current = '0';
        else this.current = this.current.slice(0, this.current.length - 1);
    };

    //очистка главной строки (CE)
    clearCurrent() {
        this.current = '0';
        if (this.isCalculated) {
            this.operator = '';
            this.operands = ['', ''];
            this.isCalculated = false;
        }
    };

    //полная очистка
    clearAll() {
        this.current = '0';
        this.operator = '';
        this.operands = ['', ''];
        this.isCalculated = false;
        this.isCascade = false;
    };

    //получение надстроки, содержащей введённые операнды и операторы
    getSubString() {
        let equal = '';
        if (this.isCalculated) equal = '=';

        if (this.operands[1])
            return `${this.operands[0]} ${this.operator} ${this.operands[1]} ${equal}`;
        else
            return `${this.operands[0]} ${this.operator}`;
    };

    //получение строки, с вводимым операндом
    getMainString() {
        return this.current;
    };

    //действия с памятью
    memoryAction(act) {
        let help;

        switch(act) {
            case 'M+':
                if (this.system != 10) {
                    help = Conver_p_10.dval(this.current, this.system);
                }
                else {
                    help = this.current;
                }
                this.memory = this.memory + Number(help);
                break;
            case 'M-':
                if (this.system != 10) {
                    help = Conver_p_10.dval(this.current, this.system);
                }
                else {
                    help = this.current;
                }
                this.memory = this.memory - Number(help);
                break;
            case 'MS':
                if (this.system != 10) {
                    help = Conver_p_10.dval(this.current, this.system);
                }
                else {
                    help = this.current;
                }
                this.memory = Number(help);
                break;
            case 'MR':
                if (this.system != 10) {
                    help = Conver_10_p.dval(String(this.memory), this.system, accuracy);
                }
                else {
                    help = String(this.memory);
                }
                this.current = help;
                break;
            case 'MC':
                this.memory = 0;
                break;
        }
    }

    paste(str) {
        let allowedSym = ['.', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E'].slice(0, this.system + 1);
        for (let i in str) {
            if (allowedSym.indexOf(str[i]) == -1) {
                return;
            }
        }
        if (str.indexOf('.') != -1) {
            if (str.indexOf('.', str.indexOf('.') + 1) != -1) {
                return;
            } 
        }
        this.current = str;
    }

    getHistory() {
        return this.history.getHistory();
    }

    clearHistory() {
        this.history.clearHistory();
    }
}

exports.State = State;