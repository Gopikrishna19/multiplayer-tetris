const chalk = new (require('chalk').Instance)({level: 1});

function redefine(prop, prefix, prefixColor, textColor = (arg) => arg) {
    const original = console[prop];
    const custom = function (...args) {
        original(chalk`{gray [}${prefixColor(prefix)}{gray ]}:`, ...args.map(arg => textColor(arg)));
    };

    console[prop] = custom.bind(console);
}

redefine('info', 'INFO', chalk.blueBright);
redefine('warn', 'WARNING', chalk.yellowBright);
redefine('error', 'ERROR', chalk.redBright, chalk.redBright.bold);
