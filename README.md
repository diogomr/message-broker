## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Running with Docker
```bash
# Run the actual message broker. This will also start a MongoDB container 
docker-compose up broker

# Run producers that will write messages into the broker. 
# The number of producers is configurable through ENV variable PROCESSES
docker-compose up producers

# Run consumers that will read messages from the broker 
# The number of consumers is configurable through ENV variable PROCESSES
docker-compose up producers
```
