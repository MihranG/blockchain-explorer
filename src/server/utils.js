const decimalToHexStringDigit = (decimalNumber) =>{
    return `0x${parseInt(decimalNumber).toString(16)}`;
}

module.exports.decimalToHexStringDigit = decimalToHexStringDigit
