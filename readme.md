# Welcome to the Anythink Market repo

To start the app use Docker. It will start both frontend and backend, including all the relevant dependencies, and the db.

Please find more info about each part in the relevant Readme file ([frontend](frontend/readme.md) and [backend](backend/README.md)).

## Development

When implementing a new feature or fixing a bug, please create a new pull request against `main` from a feature/bug branch and add `@vanessa-cooper` as reviewer.

## First setup

1. Install Docker following the instructions [here](https://docs.docker.com/get-docker/)
2. Verify your docker install is working correctly, by running `docker -v` and `docker-compose-v` - If both return without errors, you are good to go.
3. **To start the stack**: In the root directory of this project, run `docker-compose up`
4. Check the api is working by going to http://localhost:3000/api/ping
5. Register a user by going to http://localhost:3001/register
6. Done!

*Note*: If you want to run a command directly on a container you can make use of `docker exec`, see (Docker Exec)[https://docs.docker.com/engine/reference/commandline/exec/] for details.