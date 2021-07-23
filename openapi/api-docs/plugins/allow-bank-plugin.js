const id = 'allow-bank';

/** @type {import('@redocly/openapi-cli').CustomRulesConfig} */
const decorators = {
    oas3: {
        'allow-path-for-bank': () => {
            return {
                PathItem: {
                    leave(pathItem, ctx) {
                        if (!pathItem[process.env.ALLOW_BANK_FLAG_NAME]) {
                            delete ctx.parent[ctx.key];
                        }
                    }
                }
            }
        }
    }
};

module.exports = {
    id,
    decorators
}