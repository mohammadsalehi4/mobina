/* eslint-disable no-var */
/* eslint-disable semi */
/* eslint-disable no-unused-vars */
import { digitsEnToFa } from 'persian-tools'
export function WriteNumber(number) {
    var numberString = number.toString();
    var parts = numberString.split('.');
    var integerPart = parts[0];
    var decimalPart = parts[1] || '';
    var integerWithCommas = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    var result = integerWithCommas + (decimalPart ? `.${  decimalPart}` : '');
    return digitsEnToFa(result);
}