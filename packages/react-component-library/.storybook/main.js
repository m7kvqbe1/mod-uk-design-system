const newRelic = require('./newRelic')

module.exports = {
  addons: [
    {
      name: '@storybook/addon-docs',
      options: {
        configureJSX: true,
      },
    },
    '@storybook/addon-a11y',
    '@storybook/addon-controls',
    '@storybook/addon-actions',
  ],
  core: {
    builder: 'webpack5',
  },
  framework: '@storybook/react',
  features: {
    // Currently isn't compatible with IE11 or the storyshots addon:
    // https://github.com/storybookjs/storybook/blob/c4c2ef9d947b504593df30f0be0725fa26e74f8c/MIGRATION.md#storyshots-compatibility-in-the-v7-store
    storyStoreV7: !(
      process.env.IS_CHROMATIC || global.navigator?.userAgent?.match?.('jsdom')
    ),
  },
  previewHead: (head) => `
    ${head}
    ${process.env.NETLIFY ? newRelic.script : ''}
  `,
  stories: ['../src/**/*.stories.tsx'],
}
