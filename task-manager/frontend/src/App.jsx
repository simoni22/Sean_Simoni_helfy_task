import { useEffect, useState } from 'react'
import { api } from './services/api'
import TaskItem from './components/TaskItem.jsx'
import './styles/index.css'

export default function App(){
  const [tasks, setTasks] = useState([])
  const [status, setStatus] = useState('') // '', 'completed', 'pending'
  const [form, setForm] = useState({ id:null, title:'', description:'', priority:'low' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // quick sanity check in console
  useEffect(() => { console.log('App mounted'); }, [])

  const load = async () => {
    setLoading(true); setError('')
    try {
      const data = await api.list(status)
      setTasks(data)
    } catch (e) {
      console.error(e)
      setError('failed to load')
    }
    setLoading(false)
  }
  useEffect(()=>{ load() }, [status])

  const submit = async (e) => {
    e.preventDefault(); setError('')
    if(!form.title.trim()) { setError('title is required'); return }
    try{
      if(form.id){
        await api.update(form.id, { title: form.title, description: form.description, priority: form.priority })
      } else {
        await api.create({ title: form.title, description: form.description, priority: form.priority })
      }
      setForm({ id:null, title:'', description:'', priority:'low' })
      await load()
    }catch(e){ console.error(e); setError('save failed') }
  }

  const onEdit = (t) => setForm({ id: t.id, title: t.title, description: t.description, priority: t.priority })
  const onDelete = async (id) => { await api.remove(id); await load() }
  const onToggle = async (id) => { await api.toggle(id); await load() }

  return (
    <div className="container">
      <header>
        <h1>Task Manager</h1>
        <div className="row">
          <select value={status} onChange={e=>setStatus(e.target.value)}>
            <option value="">All</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </header>

      <form onSubmit={submit} className="card" style={{marginBottom:16}}>
        <div className="row" style={{gap:10}}>
          <input className="input" placeholder="Title"
                 value={form.title} onChange={e=>setForm({...form,title:e.target.value})} />
          <select value={form.priority} onChange={e=>setForm({...form,priority:e.target.value})}>
            <option value="low">low</option>
            <option value="medium">medium</option>
            <option value="high">high</option>
          </select>
        </div>
        <div style={{marginTop:8}}>
          <textarea className="input" rows="3" placeholder="Description"
                    value={form.description} onChange={e=>setForm({...form,description:e.target.value})} />
        </div>
        <div className="footer">
          <button className="btn" type="submit">{form.id ? 'Save' : 'Add Task'}</button>
          {form.id && <button className="btn alt" type="button"
            onClick={()=>setForm({id:null,title:'',description:'',priority:'low'})}>Cancel</button>}
        </div>
        {error && <div style={{color:'crimson',marginTop:8}}>{error}</div>}
      </form>

      {loading ? <div className="card">Loading…</div> : (
        tasks.length === 0 ? <div className="empty">No tasks yet.</div> : (
          <div className="list">
            {tasks.map(t => (
              <TaskItem key={t.id} t={t} onToggle={onToggle} onDelete={onDelete} onEdit={onEdit} />
            ))}
          </div>
        )
      )}
    </div>
  )
}