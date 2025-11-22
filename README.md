# NestJS Clean Architecture API

A very simple and beginner‑friendly clean‑architecture structure using NestJS.

## Features
- Clean folder structure  
- Simple Todo module  
- In‑memory repository  
- Easy to extend  
- Ready for GitHub

## Folder Structure
```
src/
 ├─ app.module.ts
 ├─ main.ts
 └─ modules/
     └─ todos/
         ├─ todo.module.ts
         ├─ domain/
         │   ├─ todo.entity.ts
         │   └─ todo.repository.ts
         ├─ infrastructure/
         │   └─ todo.inmemory.repo.ts
         └─ presentation/
             └─ todo.controller.ts
```

## How to Run
```bash
npm install
npm run start:dev
```

## API Endpoints
### Create Todo  
POST `/api/v1/todos`

### List Todos  
GET `/api/v1/todos`

### Update Todo  
PATCH `/api/v1/todos/:id`

### Delete Todo  
DELETE `/api/v1/todos/:id`
