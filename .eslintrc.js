module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    // process.env.NODE_ENV 有两种值
    // production 生产环境 development 开发环境
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
    // 'no-unused-vars': 'off' // 关闭这个规则验证
    // 'no-unused-vars':  process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}
