module.exports = allowBank

const allowBankFlagName = process.env.ALLOW_BANK_FLAG_NAME;

/** @type {import('@redocly/openapi-cli').OasDecorator} */
function allowBank() {
    return {
        PathItem: {
            leave(pathItem, ctx) {
                if (!pathItem[allowBankFlagName]) {
                    delete ctx.parent[ctx.key];
                }
            }
        }
    }
}