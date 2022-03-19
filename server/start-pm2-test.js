const pm2 = require('pm2');

console.log(process.env.SERVER_NODE_ENV);

pm2.connect(function(err) {
    if (err) {
        console.error(err);
        process.exit(2);
    }
    pm2.start(
        {
            script: './dist/main.js',
            name: 'task-service',
            exec_mode: 'cluster',
            instances: '2',
            env: {
                SERVER_NODE_ENV: process.env.SERVER_NODE_ENV || 'test',
            }
        },
        (err, apps) => {
            pm2.disconnect();
            if (err) {
                throw err;
            }
        },
    );
});
