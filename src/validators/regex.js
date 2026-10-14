const testEmail = (value) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    return emailPattern.test(value)
}

const testCodeMelli = (value) => {
    // Test
}

const testPhoneNumber = (value) => {
    // Test
}

export default {
    testEmail,
    testCodeMelli,
    testPhoneNumber
}