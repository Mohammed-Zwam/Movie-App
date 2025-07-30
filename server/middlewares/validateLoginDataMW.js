const validate = require('../util/loginDataValidation');

module.exports = (req, res, nxt) => {
    const isValid = validate(req.body);
    if (!isValid) {
        return res.status(400).json({ message: 'Invalid Data !', error: validate.errors });
    }
    nxt();
};  