const id = 'disallow-bank';

/** @type {import('@redocly/openapi-cli').CustomRulesConfig} */
const decorators = {
    oas3: {
        'disallow-path-for-bank': () => {
            const tagsToRemove = new Set();

            return {
                PathItem: {
                    leave(pathItem, ctx) {
                        let deletePath = false;

                        if (pathItem[process.env.DISALLOW_BANK_FLAG_NAME]) {
                            console.log("Deleting " + ctx.parent[ctx.key]);
                            delete ctx.parent[ctx.key];
                            deletePath = true;
                        }

                        // delete any operations inside of a path marked with x-internal
                        const operations = ['get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace'];
                        for (const operation of operations) {
                            if (pathItem[operation] && pathItem[operation][process.env.DISALLOW_BANK_FLAG_NAME]) {
                                delete pathItem[operation];
                            }
                            if (deletePath) {
                                tagsToRemove.add(pathItem[operation].tags || []);
                            }
                        }

                        // delete the path if there are no operations remaining in it
                        if (Object.keys(pathItem).length === 0) {
                            delete ctx.parent[ctx.key];
                            deletePath = true;
                        }
                    },
                },

                DefinitionRoot: {
                    leave(root) {
                        root.tags = root.tags.filter((tag) => tagsToRemove.has(tag.name));
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