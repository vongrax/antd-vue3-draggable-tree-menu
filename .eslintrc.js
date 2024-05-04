module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: "plugin:vue/essential",
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaVersion: 2018,
    parser: "@typescript-eslint/parser",
  },
  plugins: ["vue", "@typescript-eslint"],
  rules: {
    "vue/no-v-model-argument": "off",
    "vue/no-multiple-template-root": "off",
  },
};
