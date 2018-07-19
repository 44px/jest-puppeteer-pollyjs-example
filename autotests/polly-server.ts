import * as path from 'path';
import * as Polly from '@pollyjs/node-server';

export default new Polly.Server({
  port: 3002,
  recordingsDir: path.join(__dirname, 'recordings'),
  quiet: true
});
