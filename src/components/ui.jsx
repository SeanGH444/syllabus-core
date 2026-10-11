export function Card({ title, action, children }) {
  return <div className="card"><div className="card-head"><h3>{title}</h3>{action && <span>{action}</span>}</div>{children}</div>;
}

export function Legend({ color, text, value }) {
  return <div className="legend-row"><span className="legend-label"><i style={{ background: color }} />{text}</span><strong>{value}</strong></div>;
}

export function Progress({ label, value }) {
  return <div className="progress-row"><div><span>{label}</span><b>{value}%</b></div><div className="bar"><i style={{ width: `${value}%` }} /></div></div>;
}

export function QualityMini({ label, value }) {
  return <div className="quality-mini"><div className="quality-ring" style={{ '--p': `${value * 3.6}deg` }}><span>{value}</span></div><span>{label}</span></div>;
}

export function Deadline({ day, mon, title, note }) {
  return <div className="deadline"><div><b>{day}</b><span>{mon}</span></div><p><strong>{title}</strong><small>{note}</small></p></div>;
}

export function Donut({ value, centerTop, centerBottom }) {
  return <div className="donut" style={{ '--p': `${value * 3.6}deg` }}><div><strong>{centerTop}</strong><small>{centerBottom}</small></div></div>;
}

export function Field({ label, full, children }) {
  return <label className={full ? 'field full' : 'field'}><span>{label}</span>{children}</label>;
}

export function PageHead({ title, subtitle, actions }) {
  return <div className="page-head"><div><h1>{title}</h1><p>{subtitle}</p></div><div className="page-actions">{actions}</div></div>;
}

export function MetricBox({ label, value, note, alert }) {
  return <div className={`metric-box ${alert ? 'alert' : ''}`}><span>{label}</span><strong>{value}</strong><small>{note}</small></div>;
}

export function Recommendation({ level, title, text }) {
  return <div className="recommend"><span className={`priority ${level.toLowerCase()}`}>{level}</span><div><strong>{title}</strong><p>{text}</p></div></div>;
}

export function ChartCard({ title, subtitle, children }) {
  return <div className="chart-card"><div><h3>{title}</h3><p>{subtitle}</p></div>{children}</div>;
}

export function Insight({ n, title, text }) {
  return <div className="insight"><span>{n}</span><div><strong>{title}</strong><p>{text}</p></div></div>;
}

export function Toggle({ on, set, title, text }) {
  return <button className="toggle-row" onClick={() => set(!on)}><span><strong>{title}</strong><small>{text}</small></span><i className={on ? 'on' : ''}><b /></i></button>;
}

export function Assessment({ name, weight, cos }) {
  return <div className="assessment-item"><span className="drag">⋮⋮</span><div><strong>{name}</strong><small>Mapped outcomes: {cos}</small></div><b>{weight}</b><button>•••</button></div>;
}

export function Policy({ title, text }) {
  return <div className="policy"><h3>{title}</h3><textarea defaultValue={text} /></div>;
}
