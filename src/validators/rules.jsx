const requiredValue = "REQUIRED_VALUE";
const minValue = "MIN_VALUE";
const maxValue = 'MAX_VALUE';
const alphabeticValue = "ALPHABETIC_VALUE";
const alphabeticPattern = /^[آ-یa-zA-Z]+$/;
const emailValue = 'EMAIL_VALUE';

export const requiredValidator = () => ({
    value: requiredValue
});

export const minValidator = min => ({
    value: minValue,
    min
});

export const maxValidator = max => ({
    value: maxValue,
    max
});

export const alphaBeticValidator = () => ({
    value: alphabeticValue
});

export const alphabeticPatternValidator = () => ({
    value: "alphabeticPattern",
    pattern: "^[آ-یa-zA-Z]+$"
});


export const emailValidator = () => ({
    value: emailValue
});

export default { requiredValue, minValue, maxValue, alphabeticValue, alphabeticPattern, emailValue };
