export function load(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) || fallback; } catch { return fallback; }
}

export function fmt(d) {
  const dt = new Date(d);
  const mo = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][dt.getMonth()];
  const dd = dt.getDate();
  const yr = dt.getFullYear();
  let h = dt.getHours(), m = dt.getMinutes(), ap = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return `${dd} ${mo} ${yr} • ${h}:${String(m).padStart(2,'0')} ${ap}`;
}

export function bumpVer(v) {
  const p = v.split('.');
  return `v${p[0]}.${parseInt(p[1] || 0) + 1}`;
}
