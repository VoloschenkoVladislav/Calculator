class Conver_p_10 {

    //Преобразовать символ в число
    static Char_To_num(d) {
        if (d == 'A') return 10;
        else if (d == 'B') return 11;
        else if (d == 'C') return 12;
        else if (d == 'D') return 13;
        else if (d == 'E') return 14;
        else if (d == 'F') return 15;
        else return Number(d);
    }


    //Преобразовать из с.сч. с основанием р 
    //в с.сч. с основанием 10
    static dval(P_num, P) {

        if (P_num === '') return '';
        let 
            init_degree,
            sign = false,
            result = 0;
        if (P_num[0] === '-') {
            sign = true;
            P_num = P_num.slice(1);
        }
        if (String(P_num).indexOf('.') == -1) {
            init_degree = String(P_num).length - 1;
        }
        else {
            init_degree = String(P_num).indexOf('.') - 1;
        }
        for (let char of (P_num)) {
            if (char != '.') {
                result += this.Char_To_num(char) * Math.pow(P, init_degree);
                init_degree--;
            }
        }
        if (sign == true) result *= -1;
        return String(result);
    }
}

exports.Conver_p_10 = Conver_p_10;