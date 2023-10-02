module.exports = {
    "parser": '@babel/eslint-parser',
    ignorePatterns: ["node_modules/"],
    "rules": {
        "semi": ["error", "always"],
        // "array-bracket-spacing": ["always"],
        "quotes": ["error", "double"],
        "require-jsdoc": ["error", {
            "require": {
                "FunctionDeclaration": true,
                "MethodDefinition": false,
                "ClassDeclaration": false,
                "ArrowFunctionExpression": false,
                "FunctionExpression": false
            }
        }]
    }
}
