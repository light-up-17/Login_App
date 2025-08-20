const API_BASE = 'http://localhost:5000/api';


export async function api(path, options = {}) {
const res = await fetch(`${API_BASE}${path}`, {
credentials: 'include',
headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
...options,
});
const data = await res.json().catch(() => ({}));
if (!res.ok) throw Object.assign(new Error(data.message || 'Request failed'), { status: res.status, data });
return data;
}