const readline = require('node:readline');
const fs = require('fs');
const path = require('path');

module.exports = class Install {
    constructor(process, whiteSassPath) {
        this.process = process
        this.srcPath = `${whiteSassPath}/src`;

        this.destination = null;
        this.stubs = {
            app: `${this.srcPath}/stubs/sass/app.scss`,
            config: `${this.srcPath}/stubs/sass/config`
        }
    }

    setDestination(destinationPath) {
        this.destination = {
            app: `${destinationPath}/app.scss`,
            config: `${destinationPath}/config`
        }
    }

    run() {
        this.checkForPath((input) => {
            let destinationPath = path.normalize(`${this.process.env.PWD}/${input}`)
            this.install(destinationPath);
        })
    }

    checkForPath(then) {
        if (!process.argv[3]) {
            return this.askForPath(then);
        }

        then(this.process.argv[3]);
    }

    askForPath(then) {
        const question = `Please specify the resource path (example: resource/sass) \n`;

        const rl = readline.createInterface({
            input: this.process.stdin,
            output: this.process.stdout,
        });

        rl.question(question, input => {
            then(input);
            rl.close();
        });
    }

    install(destinationPath) {
        this.setDestination(destinationPath)
        Object.keys(this.stubs).forEach(key => {
            this.copy(this.stubs[key], this.destination[key]);
        });
    }

    async copy(source, destination) {
        await fs.cp(source, destination, { recursive: true }, (error) => {
            let message = error
                ? error
                : `${source} => ${destination} \n`

            console.log(message);
        });
    }
}