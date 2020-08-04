const tasks = (arr) => arr.join(' && ')

module.exports = {
  hooks: {
    'pre-push': 'yarn commitlint',
    'pre-commit': 'cross-env TIMING=1 lint-staged --verbose',
  },
}
