# Find Denizens

>API to find a list of people who live or are within range of a given city.

[![Build Status](https://cloud.drone.io/api/badges/alastair-smith/find-denizens/status.svg)](https://cloud.drone.io/alastair-smith/find-denizens)
[![Docker Image](https://img.shields.io/badge/dockerhub-alsmith&#47;find&#8211;denizens-blue)](https://hub.docker.com/r/alsmith/find-denizens)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Licence ISC](https://img.shields.io/badge/Licence-ISC-blue)](https://choosealicense.com/licenses/isc/)

## Running Locally

Both of these options will start the service on port `3000`.

The primary endpoint for finding people living in London and people within 50 miles of London can be reached at http://localhost:3000/find-denizens/city/London.

### Using Docker (Recommended)

>Requires [Docker](https://www.docker.com/)

1. Either:

    A. Pull the docker image

    ```bash
    docker pull alsmith/find-denizens:latest
    ```

    B. Build the docker image locally

    ```bash
    docker build . -t find-denizens
    ```

2. Run the docker image

    ```bash
    docker run -p 3000:3000 find-denizens
    ```

### Using NodeJS

>Requires [NodeJS](https://nodejs.org/en/) 14.x.x

1. Install the dependencies

    ```bash
    npm ci
    ```

1. Start the application

    ```bash
    npm start
    ```

## API Specification

See the [OpenAPI specification](./openapi.yml) for detail on the endpoints.
If you want to view the specification in a GUI then copy and paste it into https://editor.swagger.io/.

## Running Tests

These commands require [NodeJS](https://nodejs.org/en/) 14.x.x.

Node modules must be ran before running any of the test commands. This can be done with the following:

```bash
npm ci
```

### Unit Tests

Unit tests verify that each unit of functionality in the service are behaving as expected.

They can be ran with the following command. It will also provide a summary of the test coverage.

```bash
npm test
```

### Linter

The linter/formatter is [StandardJS](https://standardjs.com/). It can be ran with the following:

```bash
npm run linter
```

And any fixes can be ran with:

```bash
npm run linter:fix
```

### End to End

>The end to end requests require [postman](https://www.postman.com/) to be installed.

1. Import the collection and environment from the [./test/endToEnd](./test/endToEnd) directory into postman
1. Start the service locally
1. Run the collection using the impoted environment in postman

## CI Pipeline

The CI pipeline is available at https://cloud.drone.io/alastair-smith/find-denizens.

It runs various checks against the code to identify any issues early on in development.
