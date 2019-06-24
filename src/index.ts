import program from 'commander';
import { createProxy } from './proxy';

program
    .command('up <target> <local>')
    .option('-c, --cors')
    .action(async (target, localPort, { cors }) => {
        await createProxy({ target, localPort, isUseCors: cors });
        console.log('done');
    });

program.parse(process.argv);

// proxy up <host>:<port> <localPort>
