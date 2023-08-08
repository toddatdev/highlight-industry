export default {
    data() {
        return {
            isValid: null,
            validation: {
                required: [
                    v => (v !== null && v !== '' && v !== undefined) || 'Required'
                ],
                phone: [
                    v => (v && v.length === 10) || 'Invalid Number'
                ],
                email: [
                    v => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'Invalid email'
                ],
                maxLength(n) {
                    return [
                        v => !v || (v && (v + '').length <= n) || `Value must be ${n} characters or less`
                    ]
                },
                numeric: [
                    v => !v || !isNaN(v * 1) || 'Value must be numeric'
                ]
            }
        }
    }
}
