const allowBank = require('./decorators/allow-bank');
const id = 'allow-bank';

/** @type {import('@redocly/openapi-cli').CustomRulesConfig} */
const decorators = {
    oas3: {
        'allow-path-for-bank': allowBank
    }
};

module.exports = {
    id,
    decorators
}