const id = 'disallow-bank';

/** @type {import('@redocly/openapi-cli').CustomRulesConfig} */
const decorators = {
    oas3: {
        'disallow-path-for-bank': () => {
            return {
                PathItem: {
                    leave(pathItem, ctx) {
                        if (pathItem[process.env.DISALLOW_BANK_FLAG_NAME]) {
                            delete ctx.parent[ctx.key];
                        }

                        // delete any operations inside of a path marked with x-internal
                        const operations = ['get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace'];
                        for (const operation of operations) {
                            if (pathItem[operation] && pathItem[operation][process.env.DISALLOW_BANK_FLAG_NAME]) {
                                delete pathItem[operation];
                            }
                        }

                        // delete the path if there are no operations remaining in it
                        if (Object.keys(pathItem).length === 0) {
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