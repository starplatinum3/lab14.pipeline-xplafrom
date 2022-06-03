import { repeat } from 'rambda'
function toRomanNumerals(n) {
    return repeat('I', n).join('')
        .replace(/IIIII/g, "V")
        .replace(/VV/g, "X")
        .replace(/XXXXX/g, "L")
        .replace(/LL/g, "C")
        .replace(/LL/g, "C")
        .replace(/VIIII/g, "IX")
        .replace(/IIII/g, "IV")
        .replace(/LXXXX/g, "XC")
        .replace(/XXXX/g, "XL");
}

console.log(toRomanNumerals(64))
