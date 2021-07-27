module.exports = ChangeContentForBank;

/** @type {import('@redocly/openapi-cli').OasDecorator} */
function ChangeContentForBank() {
    return {
        DefinitionRoot: {
            leave(root) {
                root['info']['title'] = `${process.env.INFO_TITLE}`;
                root['info']['x-logo']['url'] = `${process.env.INFO_XLOGO_URL}`;
                root['info']['description']['$ref'] = `${process.env.INFO_DESCRIPTION_REF}`;
            },
        }
    }
};
