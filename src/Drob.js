export class Fraction {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    getString() {
        return `${this.x}/${this.y}`
    }
}

export function fplus(a, b) {
    if (a.y != b.y) {
        let new_a = new Fraction(a.x * b.y, a.y * b.y);
        b = new Fraction(b.x * a.y, b.y * a.y);
        a = new_a;
    }
    let out = new Complex(a.x + b.x, a.y);
    return out;
}

export function fmin(a, b) {
    if (a.y != b.y) {
        let new_a = new Fraction(a.x * b.y, a.y * b.y);
        b = new Fraction(b.x * a.y, b.y * a.y);
        a = new_a;
    }
    let out = new Complex(a.x - b.x, a.y);
    return out;
}

export function fdiv(a, b) {
    return new Fraction(a.x * b.y, b.x * a.y);
}

export function fmult(a, b) {
    return new Fraction(a.x * b.x, b.y * a.y);
}