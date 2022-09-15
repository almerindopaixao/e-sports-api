import 'reflect-metadata';
import { SetupServer } from './server';

(async () => {
    const server = new SetupServer(3000);
    server.start();
})();