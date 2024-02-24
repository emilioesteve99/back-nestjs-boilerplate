# Back Nestjs Boilerplate

## Requirements:

1. Install:
- [Node.js (LTS)](https://nodejs.org/en/download/package-manager/)
- [pnpm](https://pnpm.io/installation)
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/cli-command/)

2. Add an .env file based on .env.example

3. Install project dependencies
```bash
pnpm install
```

## Usage:

You can start the app services (database, Firebase Emulator Suite) via docker compose:
```bash
docker compose up -d
```

Then you can start the API with:
```bash
pnpm start:dev
```

Check that it works by accessing the url:
```
http://localhost:NODE_PORT
```
# back-nestjs-boilerplate
