const Ajv = require('ajv');
const valid = require('validator');

const ajv = new Ajv();

ajv.addFormat('email', {
    type: 'string',
    validate: (email) => valid.isEmail(email),
});



const userSchema = {
    type: 'object',
    properties: {
        email: { type: 'string', format: 'email' },
        password: { type: 'string' },
    },
    required: ['email', 'password'],
};

module.exports = ajv.compile(userSchema);