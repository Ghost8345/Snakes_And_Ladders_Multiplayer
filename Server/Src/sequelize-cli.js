import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const currentDir = dirname(fileURLToPath(import.meta.url));

export default {
    'config': resolve( currentDir, 'config.js'),
    'models-path': resolve( currentDir,  'models'),
    'migrations-path': resolve( currentDir,  'migrations'),
    'seeders-path': resolve(  currentDir, 'seeders'),
};
console.log(currentDir);