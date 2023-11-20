module.exports = {
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', "next/core-web-vitals", "plugin:prettier/recommended"],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', "prettier"],
    rules: {
        "prettier/prettier": "error"
    },
    root: true,
};