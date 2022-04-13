#!/usr/bin/node

const spawn = require('child_process').spawn;

function loadProcesses() {

  const processes = process.env.PROCESSES;
  const script = process.env.SCRIPT;
  console.log(`Spawning ${processes} processes of ${script}`);

  for (let i = 0; i < processes; i++) {
    const process = spawn('node', [script]);

    process.stdout.on('data', function(data) {
      console.log(data.toString());
    });

    process.stderr.on('data', function(err) {
      console.error(err.toString());
    });

    process.on('exit', function() {
      console.log('Done!');
    });
  }
}

loadProcesses();
