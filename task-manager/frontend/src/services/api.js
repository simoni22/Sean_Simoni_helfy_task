const BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000'
export const api = {
  async list(status){ const q = status ? `?status=${status}` : '' ; const r = await fetch(`${BASE}/api/tasks${q}`); return r.json(); },
  async create(data){ const r = await fetch(`${BASE}/api/tasks`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)}); if(!r.ok) throw new Error('create failed'); return r.json(); },
  async update(id,data){ const r = await fetch(`${BASE}/api/tasks/${id}`,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)}); if(!r.ok) throw new Error('update failed'); return r.json(); },
  async remove(id){ const r = await fetch(`${BASE}/api/tasks/${id}`,{method:'DELETE'}); if(!r.ok && r.status!==204) throw new Error('delete failed'); },
  async toggle(id){ const r = await fetch(`${BASE}/api/tasks/${id}/toggle`,{method:'PATCH'}); if(!r.ok) throw new Error('toggle failed'); return r.json(); }
}
