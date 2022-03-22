module.exports = {
    "parser": "@babel/eslint-parser",
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "semi": ["warn", "always"],
        "quotes": ["warn", "single"],
        "no-unused-vars": "warn",
        "no-console": "off",
    }
}
