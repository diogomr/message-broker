#!/usr/bin/node

const axios = require('axios').default;
const crypto = require('crypto');

const sleepIntervalMs = process.env.SLEEP_INTERVAL_MS;

async function producer() {
  while (true) {
    postRequest();
    await sleep(sleepIntervalMs);
  }
}

function postRequest() {

  const body = {
    id: crypto.randomUUID(),
    payload: {
      numeric_value: 10,
      bool_value: true,
      complex: {
        'a': 'b',
      },
      string_value: 'message',
    },
  };

  axios.post('http://broker:3000/messages', body).then(function(response) {
    // handle success
    process.stdout.write(`Published ${body.id}`);
  });
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

producer();

