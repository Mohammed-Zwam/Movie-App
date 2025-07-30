const Ajv = require('ajv');
const valid = require('validator');

const ajv = new Ajv();

ajv.addFormat('email', {
    type: 'string',
    validate: (email) => valid.isEmail(email),
});

ajv.addFormat('password', {
    type: 'string',
    validate: (password) => valid.isStrongPassword(password),
});

const userSchema = {
    type: 'object',
    properties: {
        username: { type: 'string', pattern: '^[a-zA-Z][a-zA-Z0-9_]{2,15}$' },
        email: { type: 'string', format: 'email' },
        password: { type: 'string', format: 'password' },
        role: { type: 'string', enum: ['user', 'admin'] }
    },
    required: ['username', 'email', 'password'],
};

module.exports = ajv.compile(userSchema);