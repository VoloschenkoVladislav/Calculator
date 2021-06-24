export class Complex {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    
    getString() {
        return `${this.x} + ${this.y}i`
    }
}

export function cplus(a, b) {
    return new Complex(a.x + b.x, a.y + b.y);
}

export function cmin(a, b) {
    return new Complex(a.x - b.x, a.y - b.y);
}

export function cdiv(a, b) {
    return new Complex((a.x*b.x + a.y*b.y) / (Math.pow(b.x, 2) + Math.pow(b.y, 2)), (a.y*b.x - a.x*b.y) / (Math.pow(b.x, 2) + Math.pow(b.y, 2)));
}

export function cmult(a, b) {
    return new Complex(a.x*b.x - a.y*b.y, a.x*b.y - a.y*b.x);
}