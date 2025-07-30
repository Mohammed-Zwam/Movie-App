const validate = require('../util/registerDataValidation');

module.exports = (req, res, nxt) => {
    const isValid = validate(req.body);
    if (!isValid) {
        const error = validate.errors[0];
        let message = 'Invalid data';

        if (error.instancePath === '/username') {
            message = '3–16 chars, starts with a letter, only letters/numbers/_';
        } else if (error.instancePath === '/email') {
            message = 'Enter a valid email address.';
        } else if (error.instancePath === '/password') {
            message = 'Min 8 chars with uppercase, lowercase, number & symbol.';
        }

        return res.status(400).json({ message });
    } 
    nxt();
};