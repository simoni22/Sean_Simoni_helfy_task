export default function TaskItem({ t, onToggle, onDelete, onEdit }){
  return (
    <div className="card">
      <div className="row" style={{justifyContent:'space-between'}}>
        <div>
          <div style={{fontWeight:600}}>{t.title}</div>
          <div style={{fontSize:13,color:'#555'}}>{t.description}</div>
          <div className="row" style={{marginTop:6,gap:6}}>
            <span className={`badge ${t.priority}`}>{t.priority}</span>
            <span className="badge">{new Date(t.createdAt).toLocaleString()}</span>
            <span className="badge">{t.completed ? 'completed' : 'pending'}</span>
          </div>
        </div>
        <div className="footer">
          <button className="btn alt" onClick={()=>onToggle(t.id)}>{t.completed?'Uncomplete':'Complete'}</button>
          <button className="btn alt" onClick={()=>onEdit(t)}>Edit</button>
          <button className="btn" onClick={()=>onDelete(t.id)}>Delete</button>
        </div>
      </div>
    </div>
  )
}
