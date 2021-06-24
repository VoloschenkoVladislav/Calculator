class Conver_10_p {

    //Преобразовать целое в символ
    static int_to_Char(d) {
        if (d == 10) return 'A';
        else if (d == 11) return 'B';
        else if (d == 12) return 'C';
        else if (d == 13) return 'D';
        else if (d == 14) return 'E';
        else if (d == 15) return 'F';
        else return String(d);
    }
    //Преобразовать десятичное целое в с.сч. с основанием р
    static int_to_P(n, p) {
        let 
            cur = n,
            out = ''; 
        while (cur > 0) {
            out = this.int_to_Char(cur % p)+ out;
            cur = Math.floor(cur / p);
        }
        if (out == '') {
            return '0';
        }
        else return out;
    }
    //Преобразовать десятичную дробь в с.сч. с основанием р
    static flt_to_P(n, p, c) {
        let
            cur = n,
            i = 0,
            out = '.';
        while (i < c && cur != 0) {
            cur *= p;
            out += this.int_to_Char(Math.floor(cur));
            cur %= 1;
            cur = cur.toFixed(String(cur).length - String(cur).indexOf('.') - 1);
            i += 1;
        }
        return out;
    }

    //Преобразовать десятичное 
    //действительное число в с.сч. с осн. р
    static dval(n, p, c) {

        if (n === '') return '';
        let sign = false;
        if (n[0] === '-') {
            sign = true;
            n = n.slice(1);
        }
        n = Number(n);
        let
          int = Math.floor(n),
          flt = n % 1;
        if (flt != 0) {
            flt.toFixed(String(n).length - String(n).indexOf('.') - 1);
            if (sign == true)
                return '-' + this.int_to_P(int, p) + this.flt_to_P(flt, p, c);
            else
                return this.int_to_P(int, p) + this.flt_to_P(flt, p, c);
        }
        else {
            if (sign == true)
                return '-' + this.int_to_P(int, p);
            else
                return this.int_to_P(int, p);
        }
    }
}

exports.Conver_10_p = Conver_10_p;