// Thin client for the ReelMimic server.
const j = async (r) => { const d = await r.json().catch(() => ({})); if (!r.ok) throw new Error(d.error || r.statusText); return d; };
export const api = {
  agents: () => fetch('/api/agents').then(j),
  projects: () => fetch('/api/projects').then(j),
  project: (id) => fetch(`/api/projects/${id}`).then(j),
  create: (form) => fetch('/api/projects', { method: 'POST', body: form }).then(j),
  addInputs: (id, form, to) => fetch(`/api/projects/${id}/inputs${to ? `?to=${to}` : ''}`, { method: 'POST', body: form }).then(j),
  message: (id, text, meta) => fetch(`/api/projects/${id}/message`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text, meta }) }).then(j),
  approve: (id) => fetch(`/api/projects/${id}/approve`, { method: 'POST' }).then(j),
  retry: (id) => fetch(`/api/projects/${id}/retry`, { method: 'POST' }).then(j),
  lyrics: (id, text) => fetch(`/api/projects/${id}/lyrics`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text }) }).then(j),
  waive: (id, input) => fetch(`/api/projects/${id}/waive`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ input }) }).then(j),
  accept: (id) => fetch(`/api/projects/${id}/accept`, { method: 'POST' }).then(j),
  resume: (id) => fetch(`/api/projects/${id}/resume`, { method: 'POST' }).then(j),
  cancel: (id) => fetch(`/api/projects/${id}/cancel`, { method: 'POST' }).then(j),
  events: (id, fn) => { const es = new EventSource(`/api/projects/${id}/events`); es.onmessage = (m) => fn(JSON.parse(m.data)); return () => es.close(); },
  file: (id, p, bust) => `/files/${id}/${p}${bust ? `?v=${bust}` : ''}`,
};
