function makeCode(length) {
    let code = '';
    const alphaCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numericCharacters = '0123456789';
    const alphaLength = alphaCharacters.length;
    const numericLength = numericCharacters.length;

    let counter = 0;
    while (counter < length) {
        if (counter % 2 == 0) {
            code += numericCharacters.charAt(Math.floor(Math.random()*numericLength));
            counter += 1;
        } else {
            code += alphaCharacters.charAt(Math.floor(Math.random()*alphaLength));
            counter += 1;
        }
    }
    return code;
}

function makeCode(length) {
    let code = '';
    const alphaCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numericCharacters = '0123456789';
    const alphaLength = alphaCharacters.length;
    const numericLength = numericCharacters.length;

    let counter = 0;
    while (counter < length) {
        if (counter % 2 == 0) {
            code += numericCharacters.charAt(Math.floor(Math.random()*numericLength));
            counter += 1;
        } else {
            code += alphaCharacters.charAt(Math.floor(Math.random()*alphaLength));
            counter += 1;
        }
    }
    return code;
}


module.exports = {
    makeCode
}