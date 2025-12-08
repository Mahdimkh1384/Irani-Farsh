const testEmail = (value) => {
    const emailPattern = /^[a-z0-9._-]+@gmail\.(com|ir)$/i;
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