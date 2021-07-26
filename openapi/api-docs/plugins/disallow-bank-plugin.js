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
                            deletePath = true;
                        }

                        // delete any operations inside of a path marked with x-internal
                        const operations = ['get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace'];
                        for (const operation of operations) {
                            if (deletePath && pathItem[operation]) {
                                tagsToRemove.add(pathItem[operation].tags);
                            }

                            if (pathItem[operation] && pathItem[operation][process.env.DISALLOW_BANK_FLAG_NAME]) {
                                delete pathItem[operation];
                            }
                        }

                        // delete the path if there are no operations remaining in it
                        if (Object.keys(pathItem).length === 0) {
                            deletePath = true;
                        }

                        if (deletePath) {
                            delete ctx.parent[ctx.key];
                        }
                    },
                },

                DefinitionRoot: {
                    leave(root) {
                        if (root['tags']) {
                            root['tags'] = root['tags'].filter((tag) => tagsToRemove.has(tag['name']));
                        }

                        if (root['x-tagGroups']) {
                            root['x-tagGroups'] = root["x-tagGroups"].filter((xTag) => {
                                xTag['tags'].filter((tag) => {
                                    tagsToRemove.has(tag)
                                }).length > 0
                            })
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