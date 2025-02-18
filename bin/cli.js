#!/usr/bin/env node
const path = require('path');
const Install = require('./commands/install');

const commandName = process.argv[2];
const whiteSassPath = path.dirname(`${__dirname}`);

if (commandName === 'install') {
    let command = new Install(process, whiteSassPath);
    command.run();
    return true;
}

console.log('There is not such a command');
