const DisallowPathsForBank = require('./decorators/disallow-paths-for-bank');
const ChangeContentForBank = require('./decorators/change-content-for-bank');
const id = 'decorators';

/** @type {import('@redocly/openapi-cli').CustomRulesConfig} */
const decorators = {
    oas3: {
        'disallow-paths-for-bank': DisallowPathsForBank,
        'change-content-for-bank': ChangeContentForBank,
    }
};

module.exports = {
    id,
    decorators
}