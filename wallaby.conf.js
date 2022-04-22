module.exports = () => {
  return {
    files: [
      'index.js', 'lib/**/*.js', 'test/setup.js',
      {
        pattern: 'test/node-unit/**/*.fixture.js',
        instrument: false
      }, {
        pattern: 'test/unit/**/*.fixture.js',
        instrument: false
      }
    ],
    filesWithNoCoverageCalculated: ['test/**/*.fixture.js'],
    tests: [
      'test/**/*.test.js'
    ],
    env: {
      type: 'node',
      runner: 'node'
    },
    workers: {recycle: true},
    testFramework: 'mocha',    
    debug: true
  };
};