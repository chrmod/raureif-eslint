import eslint from 'broccoli-lint-eslint';
import Funnel from 'broccoli-funnel';
import path from 'path';

export default {
  build(tree, project) {
    const options = {
      // TODO: should use 'mocha' - which currently does not print errors due to:
      //   https://github.com/ember-cli/aot-test-generators/blob/master/src/mocha.ts#L29
      testGenerator: 'mocha',
      options: {
        cwd: project.path,
        configFile: path.join(project.path, '.eslintrc'),
      },
    };
    const lintTree = eslint(tree, options);

    return new Funnel(lintTree, {
      includes: ['**/*.lint-test.js'],
      destDir: 'node',
    });
  },
};
