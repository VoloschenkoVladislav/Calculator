class History {
    constructor() {
        this.history = [];
    }

    addFunction(sys, func, opd, result) {
        let template;
        switch(func) {
            case 'sqr':
                template = `${opd}² = ${result}`;
                break;
            case 'sqrt':
                template = `√${opd} = ${result}`;
                break;
            case 'rev':
                template = `1 / ${opd} = ${result}`;
                break;
            default:
                return;
        }
        this.history.push({
            value: template,
            system: sys
        });
    }

    addOperation(sys, operator, opd1, opd2, result) {
        let template;
        switch(operator) {
            case '+':
                template = `${opd1} + ${opd2} = ${result}`;
                break;
            case '-':
                template = `${opd1} - ${opd2} = ${result}`;
                break;
            case '*':
                template = `${opd1} × ${opd2} = ${result}`;
                break;
            case '/':
                template = `${opd1} ÷ ${opd2} = ${result}`;
                break;
            default:
                return;
        }
        this.history.push({
            value: template,
            system: sys
        });
    }

    getHistory() {
        return this.history;
    }

    clearHistory() {
        this.history = [];
    }
}


exports.History = History;