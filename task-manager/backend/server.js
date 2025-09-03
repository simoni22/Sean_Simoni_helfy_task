import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

let lastId = 3
let tasks = [
  { id: 1, title: 'Buy groceries', description: 'Milk, Soda, coffee', completed: false, createdAt: '03/09/2025', priority: 'low' },
  { id: 2, title: 'Study React', description: 'Hooks + state', completed: false, createdAt: '03/09/2025', priority: 'high' },
  { id: 3, title: 'Submit assignment', description: 'Zip + README', completed: true, createdAt: '03/09/2025', priority: 'high' }
]


// Helpers
const isPriority = (p) => ['low','medium','high'].includes(p)
const findIndex = (id) => tasks.findIndex(t => t.id === id)

app.get('/health', (_req, res) => res.json({ ok: true }))


// GET all
app.get('/api/tasks', (req, res) => {
  const { status } = req.query
  let result = tasks
  if (status === 'completed') 
    result = tasks.filter(t => t.completed)
  
  if (status === 'pending') 
    result = tasks.filter(t => !t.completed)

  res.json(result)
})


// CREATE
app.post('/api/tasks', (req, res) => {
  const { title, description = '', priority = 'low' } = req.body || {}
  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    return res.status(400).json({ error: 'error with title' })
  }
  if (!isPriority(priority)) {
    return res.status(400).json({ error: "priority must be declared" })
  }
  const id = ++lastId
  const createdAt = new Date().toISOString()
  const item = { id, title: title.trim(), description, completed: false, createdAt, priority }
  tasks.unshift(item)
  res.status(201).json(item)
})


// UPDATE
app.put('/api/tasks/:id', (req, res) => {
  const id = Number(req.params.id)
  const idx = findIndex(id)
  if (idx === -1) return res.status(404).json({ error: 'not found' })

  const { title, description, completed, priority } = req.body || {}
  if (title !== undefined && (typeof title !== 'string' || title.trim().length === 0)) {
    return res.status(400).json({ error: 'error with title' })
  }
  if (priority !== undefined && !isPriority(priority)) {
    return res.status(400).json({ error: "priority must be declared" })
  }
  if (completed !== undefined && typeof completed !== 'boolean') {
    return res.status(400).json({ error: 'completed must be boolean' })
  }

  const current = tasks[idx]
  tasks[idx] = {
    ...current,
    ...(title !== undefined ? { title: title.trim() } : {}),
    ...(description !== undefined ? { description } : {}),
    ...(completed !== undefined ? { completed } : {}),
    ...(priority !== undefined ? { priority } : {})
  }
  res.json(tasks[idx])
})

// DELETE
app.delete('/api/tasks/:id', (req, res) => {
  const id = Number(req.params.id)
  const idx = findIndex(id)
  if (idx === -1) return res.status(404).json({ error: 'not found' })
  tasks.splice(idx, 1)
  res.status(204).end()
})

// TOGGLE completion
app.patch('/api/tasks/:id/toggle', (req, res) => {
  const id = Number(req.params.id)
  const idx = findIndex(id)
  if (idx === -1) return res.status(404).json({ error: 'not found' })
  tasks[idx].completed = !tasks[idx].completed
  res.json(tasks[idx])
})

const PORT = 4000
app.listen(PORT, () => {
  console.log('server on http://localhost:' + PORT)
})
