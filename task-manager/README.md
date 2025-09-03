# Task Manager

Node + React app per the assignment. Backend is simple and kept in **one file** (`backend/server.js`) with in-memory storage.

****** Unfortunately the app is not working for me as it should, I have learned Node and React only for 2 days, and it was my first encounter with them, as I was trying to do my best for this home assignment!
I did not had Node or React as part of my acedamic degree, and this is my first try, 2 days of study since I have got the call from Hadar. I am sure that with more time to study I can excel in projects like that, as I had to look for a lot of information I was not sure how to implement, of course without the help of LLM's.
I will be glad if you consider to give me another opportunity. I know it is not enough, but I also know I am capabale for more and did not bad with the time and knowledge I have had before this assignment.
Thank you!
Sean Simoni


## Run

### Backend (port 4000)
```bash
cd backend
npm install
npm start
```

### Frontend (port 5173)
```bash
cd frontend
npm install
npm run dev
```

---

## API Documentation

### Task Model
```json
{
  "id": number,
  "title": string,
  "description": string,
  "completed": boolean,
  "createdAt": string,
  "priority": "low" | "medium" | "high"
}
```

### Endpoints
- **GET /api/tasks** → return all tasks  
  Optional query: `?status=completed` or `?status=pending`

- **POST /api/tasks** → create a new task  
  Body:
  ```json
  {
    "title": "string",
    "description": "string",
    "priority": "low|medium|high"
  }
  ```

- **PUT /api/tasks/:id** → update an existing task

- **DELETE /api/tasks/:id** → delete task by id

- **PATCH /api/tasks/:id/toggle** → toggle `completed` field

---

## Assumptions & Design Decisions

- **In-memory storage** (array inside `server.js`), no database.    
- Input validation: `title` must be non-empty, `priority` must be one of `low|medium|high`.   
- Frontend kept minimal and functional — focus was on making it work rather than perfect styling.  

---

## Time Spent

- **Backend API:** ~105 minutes  

- **Frontend Core Features:** ~105 minutes  
  (React components, API calls, basic task form/list, simple state management)

- **Debugging & Testing:** ~30 minutes  
  (white blank frontend page I tried to fix)

**Total: ~4 hours**
