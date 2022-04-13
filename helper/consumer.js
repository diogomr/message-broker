#!/usr/bin/node

const axios = require('axios').default;

const sleepIntervalMs = process.env.SLEEP_INTERVAL_MS;

async function consumer() {
  while (true) {
    getRequest();
    await sleep(sleepIntervalMs);
  }
}

function getRequest() {

  axios.get('http://broker:3000/messages').then(function(response) {
    // handle success
    if (response && response.status === 200) {
      const data = JSON.stringify(response.data);
      process.stdout.write(data);
    }
  });
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

consumer();
