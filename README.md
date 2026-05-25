# NestJS Clean Architecture API

A simple NestJS Todo API built to show a clean way of organizing a small backend project.

This repo is for learning and reference. It is not trying to be a complete production boilerplate with auth, database setup, Docker, logging, queues, CI, and every other thing a real service may need. Those things are useful, but they can hide the basic structure when someone is just trying to understand how the layers fit together.

The purpose here is smaller: show how a controller, use cases, domain code, and repository can stay separate in a NestJS app without making the project hard to follow.

## What is inside

- NestJS 10 and TypeScript as the main framework and language
- A small Todo module
- DTO validation with `class-validator`
- Swagger docs for trying the API from the browser
- An in-memory repository
- A few tests for repository behavior
- Simple scripts for local development and builds

## Project structure

```text
src/
  app.module.ts
  main.ts
  modules/
    todos/
      application/
        create-todo.use-case.ts
        delete-todo.use-case.ts
        list-todos.use-case.ts
        update-todo.use-case.ts
      domain/
        todo.entity.ts
        todo.repository.ts
      repositories/
        todo.inmemory.repo.ts
      presentation/
        dto/
          create-todo.dto.ts
          update-todo.dto.ts
        todo.controller.ts
      todo.module.ts
test/
  todo.inmemory.repo.test.js
```

## How the module is arranged

The Todo module is split into a few folders:

- `domain` has the Todo model and the repository contract.
- `application` has the use cases, such as creating, listing, updating, and deleting todos.
- `repositories` has the current repository implementation. Right now it keeps data in memory.
- `presentation` has the HTTP controller and DTOs.

The controller calls use cases instead of doing everything itself. The use cases depend on the repository contract, and `todo.module.ts` decides which repository implementation to use.

That is the main idea in this repo: keep the example small, but avoid putting every decision inside the controller.

Because this is a demo project, the repository uses an array in memory. If the app restarts, the todos are gone. That is expected here. The point is to keep the storage part easy to replace later.

## Requirements

- Node.js 18.17 or newer
- npm

The project may run on older Node 18 versions, but current npm versions expect at least Node 18.17.

## Getting started

Install dependencies:

```bash
npm install
```

Start the API in watch mode:

```bash
npm run start:dev
```

The API runs at:

```text
http://localhost:3000/api/v1
```

Swagger docs are available at:

```text
http://localhost:3000/api/docs
```

To use a different port, create a `.env` file from the example and set `PORT`.

```bash
cp .env.example .env
```

## API

### Create a todo

```http
POST /api/v1/todos
Content-Type: application/json

{
  "title": "Buy groceries"
}
```

Example response:

```json
{
  "id": "1716421222333",
  "title": "Buy groceries",
  "completed": false
}
```

### List todos

```http
GET /api/v1/todos
```

Example response:

```json
[
  {
    "id": "1716421222333",
    "title": "Buy groceries",
    "completed": false
  }
]
```

### Update a todo

```http
PATCH /api/v1/todos/1716421222333
Content-Type: application/json

{
  "completed": true
}
```

Example response:

```json
{
  "id": "1716421222333",
  "title": "Buy groceries",
  "completed": true
}
```

### Delete a todo

```http
DELETE /api/v1/todos/1716421222333
```

Successful deletes return `204 No Content`.

## Validation

Request bodies are validated globally with Nest's `ValidationPipe`.

For create requests:

- `title` is required
- `title` must be a string
- `title` is trimmed
- `title` must be between 1 and 120 characters

For update requests:

- `title` is optional, but follows the same rules as create
- `completed` is optional
- `completed` must be a boolean when it is sent
- at least one field must be sent

Unknown fields are rejected.

## Scripts

```bash
npm run start       # start with Nest
npm run start:dev   # start in watch mode
npm run build       # compile the project
npm run start:prod  # run the compiled app
npm test            # build and run tests
```

## Testing

The test suite is small. It checks the in-memory repository because that is the easiest place to show the expected behavior without adding a database.

```bash
npm test
```

## Replacing the in-memory repository

Create a new class in `repositories` that implements `ITodoRepository`, then update the provider in `todo.module.ts`.

```ts
{
  provide: TODO_REPOSITORY,
  useClass: YourDatabaseTodoRepository,
}
```

The controller and use cases should not need to change if the contract stays the same.

## Production note

This repo is meant to explain the structure, not cover everything needed for production.

Before using the same idea in a real service, add the missing parts for your project: a real database, authentication if needed, logging, monitoring, stronger tests, and CI checks.

## License

MIT
