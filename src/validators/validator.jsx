import rules from "./rules"
import regex from "./regex";

const validator = (value, validations, extraParams) => {
    let validationsResults = []

    for (const validation of validations) {
        if (typeof validation === "function") {
            const valid = validation(value, extraParams);
            if (valid !== true) validationsResults.push(false);
        }
        if (validation.value === rules.requiredValue) {
            if (value.trim().length === 0) validationsResults.push(false)
        }
        else if (validation.value === rules.minValue) {
            if (value.trim().length < validation.min) validationsResults.push(false)
        }
        else if (validation.value === rules.maxValue) {
            if (value.trim().length > validation.max) validationsResults.push(false)
        }
        else if (validation.value === "alphabeticPattern") {
            const regex = new RegExp(validation.pattern)
            if (!regex.test(value.trim())) validationsResults.push(false)
        }
        else if (validation.value === rules.alphabeticValue) {

        }
        else if (validation.value === rules.emailValue) {
            !regex.testEmail(value) && validationsResults.push(false);
        }
    }

    return validationsResults.length === 0
}

export default validator
