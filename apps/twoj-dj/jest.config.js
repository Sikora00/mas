module.exports = {
  name: 'twoj-dj',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/twoj-dj',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
